//this uses mongoose to set a schema to deal w the database
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const entrySchema = new mongoose.Schema({
    name: {type: String, minLength: 3, required: true},
    number: {type: String, minLength: 8, required: true, 
        validate: {validator: function(i){return /\b(\d{2}|\d{3})-\d+\b/.test(i)}},
        message: () => 'invalid phone number!' //can't figure out how to pass this to the actual error message 
    },
    })

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)