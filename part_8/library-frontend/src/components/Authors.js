import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHDATE } from '../queries'

const BirthYear = () => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [addBirthyear] = useMutation(SET_BIRTHDATE, {refetchQueries : [{query : ALL_AUTHORS}]})

  //event handlers
  const handleSubmit = (event) => {
    event.preventDefault()
    addBirthyear({ variables : { name, setBornTo : birthyear}})

    setName('')
    setBirthyear('')

  }

  return(
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit = {handleSubmit}>
        <div>
          name <input id = 'name' value = {name} onChange = {(event) => setName(event.target.value)}/>
        </div>
        <div>
          birthyear <input id = 'birthyear' value = {birthyear} onChange = {(event) => setBirthyear(parseInt(event.target.value))}/>
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
      <BirthYear />
    </div>
  )
}

export default Authors
