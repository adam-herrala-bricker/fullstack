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

const DisplaySearchResults = ({searchResults, searchTerm, countryData}) => {
  //null on first render + display noting when nothing searched
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
        <li key={i}>{i}</li>
        )
    )
  }
  //no results ???
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

const Search = ({searchResults, searchTerm, handleSearchTermChange, countryData}) => {
  return(
    <div>
      find countries <input values = {searchTerm} onChange = {handleSearchTermChange}/>
      <DisplaySearchResults searchResults = {searchResults} searchTerm = {searchTerm} countryData = {countryData}/>
    </div>
  )
}

const App = () => {
  //temp; remove when done using
  //const finland = {"name":{"common":"Finland","official":"Republic of Finland","nativeName":{"fin":{"official":"Suomen tasavalta","common":"Suomi"},"swe":{"official":"Republiken Finland","common":"Finland"}}},"tld":[".fi"],"cca2":"FI","ccn3":"246","cca3":"FIN","cioc":"FIN","independent":true,"status":"officially-assigned","unMember":true,"currencies":{"EUR":{"name":"Euro","symbol":"€"}},"idd":{"root":"+3","suffixes":["58"]},"capital":["Helsinki"],"altSpellings":["FI","Suomi","Republic of Finland","Suomen tasavalta","Republiken Finland"],"region":"Europe","subregion":"Northern Europe","languages":{"fin":"Finnish","swe":"Swedish"},"translations":{"ara":{"official":"جمهورية فنلندا","common":"فنلندا"},"bre":{"official":"Republik Finland","common":"Finland"},"ces":{"official":"Finská republika","common":"Finsko"},"cym":{"official":"Republic of Finland","common":"Finland"},"deu":{"official":"Republik Finnland","common":"Finnland"},"est":{"official":"Soome Vabariik","common":"Soome"},"fin":{"official":"Suomen tasavalta","common":"Suomi"},"fra":{"official":"République de Finlande","common":"Finlande"},"hrv":{"official":"Republika Finska","common":"Finska"},"hun":{"official":"Finn Köztársaság","common":"Finnország"},"ita":{"official":"Repubblica di Finlandia","common":"Finlandia"},"jpn":{"official":"フィンランド共和国","common":"フィンランド"},"kor":{"official":"핀란드 공화국","common":"핀란드"},"nld":{"official":"Republiek Finland","common":"Finland"},"per":{"official":"جمهوری فنلاند","common":"فنلاند"},"pol":{"official":"Republika Finlandii","common":"Finlandia"},"por":{"official":"República da Finlândia","common":"Finlândia"},"rus":{"official":"Финляндская Республика","common":"Финляндия"},"slk":{"official":"Fínska republika","common":"Fínsko"},"spa":{"official":"República de Finlandia","common":"Finlandia"},"srp":{"official":"Република Финска","common":"Финска"},"swe":{"official":"Republiken Finland","common":"Finland"},"tur":{"official":"Finlandiya Cumhuriyeti","common":"Finlandiya"},"urd":{"official":"جمہوریہ فن لینڈ","common":"فن لینڈ"},"zho":{"official":"芬兰共和国","common":"芬兰"}},"latlng":[64,26],"landlocked":false,"borders":["NOR","SWE","RUS"],"area":338424,"demonyms":{"eng":{"f":"Finnish","m":"Finnish"},"fra":{"f":"Finlandaise","m":"Finlandais"}},"flag":"🇫🇮","maps":{"googleMaps":"https://goo.gl/maps/HjgWDCNKRAYHrkMn8","openStreetMaps":"openstreetmap.org/relation/54224"},"population":5530719,"gini":{"2018":27.3},"fifa":"FIN","car":{"signs":["FIN"],"side":"right"},"timezones":["UTC+02:00"],"continents":["Europe"],"flags":{"png":"https://flagcdn.com/w320/fi.png","svg":"https://flagcdn.com/fi.svg","alt":"The flag of Finland has a white field with a large blue cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side."},"coatOfArms":{"png":"https://mainfacts.com/media/images/coats_of_arms/fi.png","svg":"https://mainfacts.com/media/images/coats_of_arms/fi.svg"},"startOfWeek":"monday","capitalInfo":{"latlng":[60.17,24.93]},"postalCode":{"format":"#####","regex":"^(?:FI)*(\\d{5})$"}}
  
  //states
  const [currentCountry, setCurrentCountry] = useState(null)
  const [countryData, setCountryData] = useState(null)
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


  //need something to get data from server
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
    <button onClick={() => handleNewCountry('austria')}>change to Austria!</button>
    <button onClick={() => handleNewCountry('finland')}>change to Finland!</button>
    <Search searchResults ={searchResults} searchTerm ={searchTerm} handleSearchTermChange = {handleSearchTermChange} countryData = {countryData}/>
    </>
  )
}

export default App;
