//note: added stuff from the exercises too
const {mongourl, PORT} = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', mongourl)

mongoose.connect(mongourl)
    .then(() => {
        logger.info('connected to MongoDB!')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB: error.message')
    })

app.use(cors())
app.use(express.json())
/* would put connection to static FE and custom middleware here too, e.g.:
app.use(express.static('build))
app.use(middleWare.requestLogger)
*/

app.use(middleware.tokenExtractor) //this must go before the routers!!!!

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


//then custom error handling MW that goes at end goes here
app.use(middleware.errorHandler)

module.exports = app