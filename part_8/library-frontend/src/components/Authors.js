import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHDATE } from '../queries'

const BirthYear = ({ result }) => {
  const [name, setName] = useState(result.data.allAuthors[0].name) //prevent bug when trying to update the first author without changing the menu
  const [birthyear, setBirthyear] = useState('')

  const [addBirthyear] = useMutation(SET_BIRTHDATE, {refetchQueries : [{query : ALL_AUTHORS}]})

  //event handlers
  const handleYearChange = (event) => {
    event.preventDefault()

    const thisEntry = parseInt(event.target.value)

    if (thisEntry) {
      setBirthyear(thisEntry)
    } else if (event.target.value === '') {
      setBirthyear('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addBirthyear({ variables : { name, setBornTo : birthyear}})

    setName(result.data.allAuthors[0].name)
    setBirthyear('')

  }

  return(
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit = {handleSubmit}>
        <select value = {name} onChange = {(event) => setName(event.target.value)}>
          {result.data.allAuthors.map(i => 
            <option key = {i.name} value = {i.name}>{i.name}</option>
          )}
        </select>
        <div>
          birthyear <input id = 'birthyear' value = {birthyear} onChange = {handleYearChange} autoComplete='off'/>
        </div>
        <div>
          <button type = 'submit'>add birthyear</button>
        </div>
      </form>
    </div>
  )
}


const Authors = ({ show }) => {

  //NOTE THAT THE ATTRIBUTES OF RESULT WILL CHANGE AS IT FETCHES THE DATA!!!
  //This means that you can't manipulate the fetched data up here.
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYear result = { result }/>
    </div>
  )
}

export default Authors
