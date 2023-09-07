import React, { useState, useEffect } from 'react'
import {useCountry} from './hooks'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

/*
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {})

  return country
}
*/

const Country = ({ country }) => {

  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log('country component country', country)

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  console.log('value', nameInput.value)
  console.log('name', name)
  console.log('main app country', country)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App