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
morgan.token('postRes', function (req ) {
    if(req.method === 'POST') {
        return(
            JSON.stringify(req.body)
        )
    }
    return(' ')
})

//HANDLING REQUESTS TO SERVER

//get request for info page
app.get('/info', (request, response, next) => {
    Entry.find({}).then(entries => {
        response.send(`
        <p>Phonebook has info for ${entries.length} people.</p>
        <p>${Date()}</p>
        `)
    })
        .catch(error => next(error))
})

//get request for all persons
app.get('/api/persons', (request, response, next) => {
    Entry.find({}).then(entries => {
        response.json(entries)
    })
        .catch(error => next(error))
})

//get request for single person
app.get('/api/persons/:id', (request, response, next) => {
    Entry.findById(request.params.id)
        .then(entry => {
            if (entry) {
                response.json(entry)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

//delete request for single person
app.delete('/api/persons/:id', (request, response, next) => {
    Entry.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//post request to add new person
app.post('/api/persons/', (request, response, next) => {
    const body = request.body
    const person = new Entry ({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
})

//put request to change existing entry
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const thisID = request.params.id
    const updates = { name: body.name, number: body.number, id: thisID }

    Entry.findByIdAndUpdate(thisID, updates, { overwrite: true, runValidators: true })
        .then(() => {
            response.json(updates)
        })
        .catch(error => next(error))

})

//Error handling middleware (needs to go at end!)
const errorHandler = (error, request, response, next) => {
    console.error('error:', error.message)
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


app.use(errorHandler)

//sending this bad boy out into the world
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})