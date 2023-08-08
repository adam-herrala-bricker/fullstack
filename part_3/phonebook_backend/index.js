require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Entry = require('./models/entry')

//middleware!!
app.use(express.json())
app.use(express.static('build'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postRes')) //'tiny' formatting plus our custom job
 //add token to morgan for logging POST request only
 morgan.token('postRes', function (req, res ) {
    if(req.method === 'POST') {
        return(
        JSON.stringify(req.body)
        )
    }
    return(' ') 
})

//helper function (gives big, pseudo-random number )
const generateID = () => {
    return(Math.round(Math.random()*10e20)
)}

//HANDLING REQUESTS TO SERVER

//get request for info page
app.get('/info', (request, response)=> {
    Entry.find({}).then(entries => {
        response.send(`
        <p>Phonebook has info for ${entries.length} people.</p>
        <p>${Date()}</p>
        `)
    })
})

//get request for all persons
app.get('/api/persons', (request, response) => {
    Entry.find({}).then(entries => {
        response.json(entries)
    })
})

//get request for single person
app.get('/api/persons/:id', (request, response) => {
    Entry.findById(request.params.id)
    .then(entry => {response.json(entry)})
})

//delete request for single person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id) //includes every person but the one being deleted

    response.status(204).end()
})

//post request to add new person
app.post('/api/persons/', (request, response) => {
    const body = request.body
    newID = generateID()

    //missing name or number
    if (!body.name | !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    /*
    //person already added
    if (persons.map(entry => entry.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    */

    //otherwise . . .
    const person = new Entry ({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})


//sending this bad boy out into the world
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})