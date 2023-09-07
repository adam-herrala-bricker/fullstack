import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    console.log('effect name', name)
    const [country, setCountry] = useState(null)
    const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/name'
    useEffect(() => {
        axios.get(`${baseURL}/${name}`).then(i => setCountry(i.data)).catch(error => setCountry(null))

        
    }, [name])

    console.log('custom hook country', country)

    return country
}

