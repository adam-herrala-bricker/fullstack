const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//helper function (gives big, pseudo-random number )
const generateID = () => {
    return(Math.round(Math.random()*10e20)
)}

//HANDLING REQUESTS TO SERVER

//get request for info page
app.get('/info', (request, response)=> {
    response.send(`
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${Date()}</p>
    `)
})

//get request for all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//get request for single person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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

    //person already added
    if (persons.map(entry => entry.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    //otherwise . . .
    const person = {
        name: body.name,
        number: body.number,
        id: newID
    }
    
    persons = persons.concat(person)
    response.json(person)
})


//sending this bad boy out into the world
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})