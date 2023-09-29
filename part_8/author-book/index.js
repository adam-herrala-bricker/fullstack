const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/authorModel')
const Book = require('./models/bookModel')
const User = require('./models/userModel')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB!')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB :(', error.message)
  })

/*
let authors = [
    {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963
    },
    {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821
    },
    { 
      name: 'Joshua Kerievsky', // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
      name: 'Sandi Metz', // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
  ]


let books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'crime']
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
  ]

*/

const typeDefs = `
    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Book {
        title: String!
        published: Int
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Token {
      value: String!
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: [String]): [Book!]!
        allAuthors: [Author!]
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let returnBooks = await Book.find({}).populate('author', {name : 1, born : 1})
            
            if (args.author) {
                returnBooks = returnBooks.filter(i => i.author.name === args.author)
            }

            if (args.genres) {
                returnBooks = returnBooks.filter(i => i.genres.some(j => args.genres.includes(j)))
            }

            return returnBooks
        },
        
        allAuthors: async () => await Author.find({}),
        me: (root, args, context) => {return context.currentUser}
    },

    //adding custom resolver
    Author: {
        bookCount: async (root) => {
          const books = await Book.find({}).populate('author', {name : 1, born : 1})
          return books.filter(i => i.author.name === root.name).length
        }
     },

     Mutation: {
        addBook: async (root, args, context) => {
          //first check that user is authenticated (must be logged in to add book)
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {code: 'BAD_USER_INPUT'}
            })
          }

          //now check to see if author is already in DB
          const authors = await Author.find({})
          const thisAuthor = args.author
          if (!authors.map(i => i.name).includes(thisAuthor)) {
            const newAuthor = new Author({name: thisAuthor})
            try {
              await newAuthor.save()
            } catch (error) {
              throw new GraphQLError('Adding author failed', {
                extensions : {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.author,
                  error
                }
              })
            }
          }

          //need author DB entry bc "author" field in book DB isn't string, but mongo entry
          const authorEntry = await Author.find({name : args.author})

          const newBook = new Book({...args, author : authorEntry[0]._id})

          try {
            await newBook.save()
            await newBook.populate('author', {name : 1, born : 1})
          } catch (error) {
            throw new GraphQLError('Adding book failed', {
              extensions : {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title, 
                error
              }
            })
          }
        
          return newBook
        },

        editAuthor: async (root, args, context) => {
          //first check that user is authenticated (must be logged in to add book)
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {code: 'BAD_USER_INPUT'}
            })
          }
          
          const thisAuthor = (await Author.find({})).filter(i => i.name === args.name)[0]
          
          //author not found
          if (!thisAuthor) {
              return null
          }

          const updatedEntry = await Author.findByIdAndUpdate(thisAuthor._id, {born : args.setBornTo}, {new: true})

          return updatedEntry
        },

        createUser: async (root, args) => {
          const user = new User({username : args.username, favoriteGenre : args.favoriteGenre})
          try {
            return await user.save()
          } catch (error) {
            throw new GraphQLError('Creating new user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          }
        },

        login: async (root, args) => {
          const user = await User.findOne({ username: args.username })

          //hardcoding PW in for now
          if (!user || args.password !== 'password') {
            throw new GraphQLError('username or password incorrect', {
              excentions: {code : "BAD_USER_INPUT"}
            })
          }

          //create and return token
          const userForToken = {username: user.username, id: user._id}

          return {value: jwt.sign(userForToken, process.env.SECRET)} 
        }
     }
}

const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, { 
  listen : { port : 4000 },
  //context is where you add operations done to multiple queries (unclear why async/then mixing is fine here though ...)
  //this is a nice way of keeping the user authentication all in once place
  context : async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})
  .then( ({ url }) => { console.log(`Server ready at ${url}`) })
