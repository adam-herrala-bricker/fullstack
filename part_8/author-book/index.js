const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const User = require('./models/userModel')

require('dotenv').config()

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB!')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB :(', error.message)
  })

//mongoose.set('debug', true)

//start is all in one function
//Note: If you're not doing subscriptions, this bulky config can be avoided
//see ex. 8.22 for that.
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  //seperate websocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)
  
  const server = new ApolloServer({ 
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
            }
          }
        }
      }
    ]
   })

   await server.start()

   app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          const currentUser = await User.findById(decodedToken.id)
    
          return { currentUser }
        }
      }
    })
   )

  const PORT = 4000

  httpServer.listen(PORT, () => 
  console.log(`Server is now running on http://localhost:${PORT}`)
  )
  
}

start()

