const { GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/authorModel')
const Book = require('./models/bookModel')
const User = require('./models/userModel')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
        
          //for subscription
          pubsub.publish('BOOK_ADDED', { bookAdded : newBook})

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
     },
     Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
     }
}

module.exports = resolvers