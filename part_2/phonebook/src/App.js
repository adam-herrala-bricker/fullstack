import { useState } from 'react'

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

const DisplaySearchResults = ({results}) => {
  console.log(results)
  if (results.length === 0){
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

const Search = ({persons}) => {
  const [newSearchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  //Event handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    //holy fuck this took forever to figure out (need to make new var to get up-to-date search value)
    console.log(newSearchTerm)
    const currentSearchTerm = event.target.value
    console.log(currentSearchTerm)
    const newSearchResults = persons.filter(i => i.name.toLowerCase().includes(currentSearchTerm.toLowerCase()))
      return(
        setSearchResults(newSearchResults)
      )
  }

  //nice to have a button toreset field
  const buttonPress = () => setSearchTerm('')

  
  return(
    <div>
      filter name shown with <input value={newSearchTerm} onChange={handleSearchChange} />
        <button onClick={buttonPress}> clear search</button>
      <DisplaySearchResults results={searchResults} />
    </div>

  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 'KL5-3226', id: 1 },
    {name: 'Craig Billingsly', number: '(616) 844-2540', id: 2}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState ('')




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
  

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Search persons={persons} />
      <h2>Add a new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Entry persons={persons}/>
    </div>
  )
}

export default App
