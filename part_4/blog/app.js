//note: added stuff from the exercises too
const {mongourl, PORT} = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
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

app.use('/api/blogs', blogsRouter)

//then custom error handling MW that goes at end would go here

module.exports = app