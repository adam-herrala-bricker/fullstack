import serverBuddy from './services/serverKamu'
import {useState, useEffect} from 'react'

//import flag from './fi.png' 

const InfoCard = ({country}) => {
   //no country to display
   if (!country) {
    return(null)
  }
  
  //need a tidy array for languages
  const langArray = Object.values(country.languages)

  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km<sup>2</sup></p>
      <p>Languages:</p>
      <ul>
        {langArray.map((i) =>
        <li key={i}>
          {i}
        </li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const DisplaySearchResults = ({searchResults, searchTerm, countryData, singleCountryData, handleShowButton}) => {
  //null on first render + display nothing when nothing searched
  if (!searchResults | searchTerm === '') {
    return(null)
  }
  //more than 10 results
  if (searchResults.length > 10) {
    return(
      <p>Too many results found. Try something more specific.</p>
    )
  }
  //more than 1 but less than 10 results
  if (1 < searchResults.length & searchResults.length < 10) {
    return(
         searchResults.map(i =>
         <div key={i}>
          <li>{i}</li><button onClick={() => handleShowButton(i)}>show</button>
        </div>
        )
    )
  }
  //no results
  if (searchResults.length === 0) {
    return(
      <p>No results found.</p>
    )
  }
  //exactly 1 result
  if (searchResults.length === 1) {
    const countryName = searchResults[0].toLowerCase()
    const thisCountry = countryData.filter(i => i.name.common.toLowerCase() === countryName)[0]
    return(
      <InfoCard country={thisCountry} />
    )
  }
}

const Search = ({searchResults, searchTerm, handleSearchTermChange, countryData, handleShowButton, singleCountryData}) => {
  return(
    <div>
      find countries <input values = {searchTerm} onChange = {handleSearchTermChange}/>
      <DisplaySearchResults searchResults = {searchResults} searchTerm = {searchTerm} countryData = {countryData} singleCountryData = {singleCountryData} handleShowButton = {handleShowButton}/>
    </div>
  )
}

const App = () => {
  //states
  const [currentCountry, setCurrentCountry] = useState(null) //idk if this gets used . . .
  const [countryData, setCountryData] = useState(null) //data for every country
  const [singleCountryData, setSingleCountryData] = useState(null)
  const [countryNames, setCountryNames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  //hook to get array of country names
  const hook = () => {
    serverBuddy
    .getAllCountries()
    .then(returnedData => {
      setCountryData(returnedData)
      const foundCountryNames = returnedData
      .map((i) => i.name.common).sort()
      console.log(foundCountryNames) //holy shit it works on the first try!
      setCountryNames(foundCountryNames)
    })
  }

  useEffect(hook, [])

  //event handlers
  const handleSearchTermChange = (event) => {
    const currentSearchTerm = event.target.value
    setSearchTerm(currentSearchTerm)
    const newSearchResults = countryNames.filter(i => i.toLowerCase().includes(currentSearchTerm.toLowerCase()))
    setSearchResults(newSearchResults)
  }

  const handleShowButton = (countryName) => {
    const newCountryData = countryData.filter(i => i.name.common.toLowerCase() === countryName.toLowerCase())[0]
    setSingleCountryData(newCountryData)
    setSearchResults([countryName]) //automatically triggers the info card
  }


  //need something to get data from server
  //note, don't think you use this, or the associated serve buddy thing, in the final product
  const handleNewCountry = (country) => {
    setCurrentCountry(country)
    serverBuddy
    .getCountry(country)
    .then(returnedData => {
      setCountryData(returnedData)
    })
  } 

  
  return(
    <>
    <Search searchResults ={searchResults} searchTerm ={searchTerm} handleSearchTermChange = {handleSearchTermChange} handleShowButton = {handleShowButton} countryData = {countryData} singleCountryData = {singleCountryData}/>
    </>
  )
}

export default App;
