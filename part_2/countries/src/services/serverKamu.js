import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = process.env.REACT_APP_API_KEY //API key is in .env file in root directory

const getAllCountries = () => {
    const request = axios.get(`${baseURL}all`)
    return(request.then(response => response.data))
}

const getWeather = (city) => {
    const request = axios.get(`${weatherURL}${city}&appid=${apiKey}&units=metric`) //remarkably robust just giving it a city name
    return(request.then(response => response.data))
}

export default {getAllCountries, getWeather}