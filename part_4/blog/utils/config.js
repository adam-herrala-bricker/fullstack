require('dotenv').config()

const PORT = process.env.PORT
const TOKEN = process.env.TOKEN
const RANDY_HASH = process.env.RANDY_HASH
const mongourl = process.env.NODE_ENV === 'testing'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const NODE_ENV = process.env.NODE_ENV

module.exports = {mongourl, PORT, TOKEN, RANDY_HASH, NODE_ENV}