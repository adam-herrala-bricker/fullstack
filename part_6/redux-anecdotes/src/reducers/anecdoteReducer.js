import { createSlice } from '@reduxjs/toolkit'

//helper function for making random id
const getId = () => (100000 * Math.random()).toFixed(0)

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
      //const newEntry = asObject(action.payload)
      //changed so that conversion to object is handled during post request

      return [...state, action.payload]
    },

    setEntries(state, action) {
      return action.payload
    }
  }
})

export const { vote, newEntry, setEntries } = anecdoteSlice.actions
export default anecdoteSlice.reducer