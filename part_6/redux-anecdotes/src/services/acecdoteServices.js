import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

//getting all anecdotes from server
const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export default {getAll}