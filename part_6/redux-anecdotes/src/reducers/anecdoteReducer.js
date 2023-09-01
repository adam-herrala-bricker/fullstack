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

//helper function for packaging anecdote to object (moved back here after brief stay in services)
const asObject = (anecdote) => {
  return {content: anecdote, votes: 0}
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

    //essentially appending
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
//(NOTE: even though you don't have import anything, these usethe redux thunk library??)
export const initializeAnecdotes = () => {
  return async dispatch => {
    const entries = await anecdoteServices.getAll()
    dispatch(setEntries(entries))
  }
}

//adding new anecdote to server
export const addEntry = (newContent) => {
  return async dispatch => {
    const thisEntry = await anecdoteServices.addNew(asObject(newContent))
    dispatch(newEntry(thisEntry))
  }
}

export default anecdoteSlice.reducer