import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/acecdoteServices'

//helper function to sort the anecdotes
const sortByVotes = (entry1, entry2) => {
  if (entry1.votes < entry2.votes) {
  return 1
  } else if (entry1.votes > entry2.votes) {
  return -1
  } else {
  return 0
  }
}

const anecdoteSlice = createSlice({
  name: 'ancecdotes',
  initialState: [],
  reducers : {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(i => i.id === id)
      const changedAnecdote = {...anecdoteToChange, votes : anecdoteToChange.votes + 1}
      
      return state.map(i => i.id !== id ? i : changedAnecdote).sort(sortByVotes)
    },

    newEntry(state, action) {
      return [...state, action.payload]
    },

    setEntries(state, action) {
      return action.payload
    }
  }
})

export const { vote, newEntry, setEntries } = anecdoteSlice.actions

//getting from server on start-up
export const initializeAnecdotes = () => {
  return async dispatch => {
    const entries = await anecdoteServices.getAll()
    dispatch(setEntries(entries))
  }
}
export default anecdoteSlice.reducer