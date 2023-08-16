require('dotenv').config()

const PORT = process.env.PORT
const mongourl = process.env.NODE_ENV === 'testing'
    ? process.env.TEST_MONGODB_URI
    : processes.env.MONGODB_URI

module.exports = {mongourl, PORT}