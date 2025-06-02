const { ApolloServer, gql } = require('apollo-server')

// 初始化数据
let books = [
  {
    title: 'Clean Code',
    author: 'Robert Martin',
    published: 2008,
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    author: 'Robert Martin',
    published: 2002,
    genres: ['agile', 'patterns']
  },
  {
    title: 'Refactoring, edition 2',
    author: 'Martin Fowler',
    published: 2018,
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    author: 'Joshua Kerievsky',
    published: 2008,
    genres: ['refactoring']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    author: 'Sandi Metz',
    published: 2012,
    genres: ['refactoring']
  },
  {
    title: 'Crime and punishment',
    author: 'Fyodor Dostoevsky',
    published: 1866,
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    author: 'Fyodor Dostoevsky',
    published: 1872,
    genres: ['classic', 'revolution']
  }
]

let authors = [
  { name: 'Robert Martin', born: null },
  { name: 'Martin Fowler', born: null },
  { name: 'Fyodor Dostoevsky', born: null },
  { name: 'Joshua Kerievsky', born: null },
  { name: 'Sandi Metz', born: null }
]

// 定义GraphQL schema
const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

// 解析器
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      return books.filter(b =>
        (!args.author || b.author === args.author) &&
        (!args.genre || b.genres.includes(args.genre))
      )
    },
    allAuthors: () => {
      return authors.map(a => ({
        ...a,
        bookCount: books.filter(b => b.author === a.name).length
      }))
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args }
      books.push(book)
      if (!authors.find(a => a.name === args.author)) {
        authors.push({ name: args.author, born: null })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null
      author.born = args.setBornTo
      return author
    }
  }
}

// 创建Apollo服务器
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// 启动服务
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
