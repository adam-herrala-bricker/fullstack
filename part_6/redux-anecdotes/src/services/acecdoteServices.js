import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

//helper function for packaging anecdote to object
const asObject = (anecdote) => {
    return {content: anecdote, votes: 0}
  }

//getting all anecdotes from server
const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

//add new acecdote to server
const addNew = async (anecdote) => {
    const response = await axios.post(baseURL, asObject(anecdote))
    return response.data
}

export default {getAll, addNew}