const express = require('express')
const app = express()

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


//sending this bad boy out
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})