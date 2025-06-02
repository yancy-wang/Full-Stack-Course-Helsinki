// index.js
require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { PubSub } = require('graphql-subscriptions')
const DataLoader = require('dataloader')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/user')
const Book = require('./models/book')

// Check required environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required')
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

const pubsub = new PubSub()
const JWT_SECRET = process.env.JWT_SECRET

const createBookCountLoader = () => new DataLoader(async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } })
  return authorIds.map(id => books.filter(b => b.author.toString() === id.toString()).length)
})

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    startServer()
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  })

async function startServer() {
  try {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/graphql',
    })

    useServer({
      schema,
      context: async (ctx) => ({
        pubsub,
        bookCountLoader: createBookCountLoader()
      })
    }, wsServer)

    const server = new ApolloServer({ schema })
    await server.start()

    app.use(
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          try {
            const auth = req.headers.authorization
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
              const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
              const currentUser = await User.findById(decodedToken.id)
              return { currentUser, pubsub, bookCountLoader: createBookCountLoader() }
            }
            return { pubsub, bookCountLoader: createBookCountLoader() }
          } catch (error) {
            console.error('Error in context:', error.message)
            return { pubsub, bookCountLoader: createBookCountLoader() }
          }
        }
      })
    )

    const PORT = process.env.PORT || 4000
    httpServer.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`)
      console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`)
    })
  } catch (error) {
    console.error('Error starting server:', error.message)
    process.exit(1)
  }
}
