const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        filter.author = author._id
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: async (root, args, context) => {
      return context.bookCountLoader.load(root._id)
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser, pubsub } = context
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
        const populated = await book.populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: populated })
        return populated
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return author.save()
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })
      return await user.save()
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password') {
        throw new UserInputError("wrong credentials")
      }
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET
      )
      return { value: token }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: (root, args, { pubsub }) => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
