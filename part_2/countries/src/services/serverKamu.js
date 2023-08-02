import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAllCountries = () => {
    const request = axios.get(`${baseURL}all`)
    return(request.then(response => response.data))
}

const getCountry = (country) => {
    const request = axios.get(`${baseURL}name/${country}`)
    return(request.then(response => response.data))
}

export default {getCountry, getAllCountries}