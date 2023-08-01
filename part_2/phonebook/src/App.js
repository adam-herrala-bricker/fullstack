import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplaySearchResults = ({results, query}) => {
  console.log(results)
  if (results.length === 0 | query === ''){
    return(
      <p>(no results to display)</p>
    )
  }
  return(
    results.map(i =>
      <p key={i.id}>{i.name} {i.number}</p>
      )
  )
}

const Search = ({change, searchBar, display, bPress}) => {
  return(
    <div>
      filter name shown with <input value={searchBar} onChange={change} />
        <button onClick={bPress}> clear search</button>
      <DisplaySearchResults results={display} query={searchBar}/>
    </div>
  )
}

const Form = ({onSubmit, onNameChange, onNumberChange, newName, newNumber}) =>{
  return(
    <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Entry = ({persons}) => {
  return(
    <ul>
      {persons.map((person) =>
      <li key={person.id}>
        {person.name} {person.number}
      </li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState ('')
  const [newSearchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  //Hook
  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  //Event handlers
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    //check for repeat entry
    //NOTE THE SYNTAX!! This is far more temperamental than, say, python.
    // Can't check for .includes({object}) bc of how object identity works:
    //e.g., [{name: 'Adam'}].includes({name='Adam'}) returns false!!!
    //(also: allows for multiple people to share a number, since instructions didn't say otherwise)
    if (persons.map(i => i.name).includes(newPerson.name)) {
      //Also note the formatting here for a string w a variable
       window.alert(`${newName} is already added to phonebook`)

    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

   const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    //holy fuck this took forever to figure out (needed to make new var to get up-to-date search value)
    console.log(newSearchTerm)
    const currentSearchTerm = event.target.value
    console.log(currentSearchTerm)
    const newSearchResults = persons.filter(i => i.name.toLowerCase().includes(currentSearchTerm.toLowerCase()))
      return(
        setSearchResults(newSearchResults)
      )
  }

  //nice to have a button to reset field
  const buttonPress = () => setSearchTerm('')

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Search persons={persons} change={handleSearchChange} searchBar={newSearchTerm} display={searchResults} bPress={buttonPress} />
      <h2>Add a new entry</h2>
      <Form onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} newName ={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Entry persons={persons}/>
    </div>
  )
}

export default App
