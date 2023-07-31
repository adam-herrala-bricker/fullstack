import { useState } from 'react'

const Entry = ({persons}) => {
  return(
    <ul>
      {persons.map((person) =>
      <li key={person.name}>
        {person.name}
      </li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('. . .')

  //Event handlers
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: '(616) 844-2540',
      id: persons.length + 1
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    }
   
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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
