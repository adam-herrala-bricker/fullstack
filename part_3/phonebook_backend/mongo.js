//this runs from commandline using: node mongo.js <secret password> <name to add> <number to add>
//if you don't give it a name and number, it will just print the existing db to console

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const collectionName = "phonebook"
const password = process.argv[2] //2nd parameter passed in shell command

const url =
  `mongodb+srv://fullstack:${password}@cluster0.e3ajqqx.mongodb.net/${collectionName}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

//pass name and number --> add new entry
if (process.argv.length === 5) {
    const newEntry = new Entry({
        name: process.argv[3],
        number: process.argv[4],
    })

    newEntry.save().then(result => {
        console.log('entry saved!')
        mongoose.connection.close()
      })
} else { //just display existing entries
    console.log('phonebook:')
    Entry.find({}).then(result =>{
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })

}



