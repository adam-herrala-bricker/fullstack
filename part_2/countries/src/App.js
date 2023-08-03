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
      <img src={country.flags.png} alt={country.flags.alt} className='flagStyle'/>
    </div>
  )
}

const DisplaySearchResults = ({searchResults, searchTerm, countryData, handleShowButton, weatherData}) => {
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
    if (!weatherData){
      return(
        <div>
           <InfoCard country={thisCountry} />
          <p>no weather information for {thisCountry.capital} found</p>
        </div>
    )
  }
    return(
      <div>
        <InfoCard country={thisCountry} />
        <WeatherCard country={thisCountry} weatherData={weatherData}/>
      </div>
    )
  }
}

const Search = ({searchResults, searchTerm, handleSearchTermChange, countryData, handleShowButton, weatherData}) => {
  return(
    <div>
      find countries <input values = {searchTerm} onChange = {handleSearchTermChange}/>
      <DisplaySearchResults searchResults = {searchResults} searchTerm = {searchTerm} countryData = {countryData} handleShowButton = {handleShowButton} weatherData ={weatherData}/>
    </div>
  )
}

const WeatherCard = ({country, weatherData}) => {
  console.log(weatherData)
  const iconURL = `https://openweathermap.org/img/wn/${weatherData.weather['0'].icon}@2x.png`
  const thisCapital = country.capital
  return(
    <div>
      <h1>Weather in {thisCapital}</h1>
      <p>temperature {Math.round(weatherData.main.temp)} <sup>o</sup>C</p> 
      <img src={iconURL} />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )

}

const App = () => {
  //states
  const [countryData, setCountryData] = useState(null) //data for every country
  const [countryNames, setCountryNames] = useState([]) //set once; array of every country name
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

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

  //helper function for fetching new weather data
  const fetchWeatherData = (newCountryData) => {
    const thisCity = newCountryData.capital
    serverBuddy
    .getWeather(thisCity)
    .then(returnedData => {
      setWeatherData(returnedData)
    })
    .catch(error => {
      setWeatherData(null) //shockingly few aren't found. Palau is a good test.
    })
  }

  //event handlers
  const handleSearchTermChange = (event) => {
    const currentSearchTerm = event.target.value.trim() //slightly more robust search if leading/trailing spaces don't break it
    setSearchTerm(currentSearchTerm)
    const newSearchResults = countryNames.filter(i => i.toLowerCase().includes(currentSearchTerm.toLowerCase()))
    setSearchResults(newSearchResults)
    //get weather if exactly one result
    if (newSearchResults.length === 1){
      const countryName = newSearchResults[0]
      const newCountryData = countryData.filter(i => i.name.common.toLowerCase() === countryName.toLowerCase())[0]
      fetchWeatherData(newCountryData)
    }
  }

  const handleShowButton = (countryName) => {
    const newCountryData = countryData.filter(i => i.name.common.toLowerCase() === countryName.toLowerCase())[0]
    setSearchResults([countryName]) //automatically triggers the info card
    fetchWeatherData(newCountryData)
  }
  
  return(
    <>
    <Search searchResults ={searchResults} searchTerm ={searchTerm} handleSearchTermChange = {handleSearchTermChange} handleShowButton = {handleShowButton} countryData = {countryData} weatherData={weatherData}/>
    </>
  )
}

export default App;
