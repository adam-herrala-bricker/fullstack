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
      number: '(616) 844-2540'
    }
    //check for repeat entry
    //NOTE THE SYNTAX!! This is far more temperamental than, say, python.
    // Can't check for .includes({object}) bc of how object identity works:
    //e.g., [{name: 'Adam'}].includes({name='Adam'}) returns false!!!
    if (persons.map(i => i.name).includes(newPerson.name)) {
      //Also note the formatting here for a string w a variable
       window.alert(`${newName} is already added to phonebook`)

    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
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
