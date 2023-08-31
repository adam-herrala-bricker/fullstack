import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//helper function for making random id
const getId = () => (100000 * Math.random()).toFixed(0)

//helper function for packaging anecdote to object
const asObject = (anecdote) => {
  return {content: anecdote, id: getId(), votes: 0}
}

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
  initialState: anecdotesAtStart.map(asObject),
  reducers : {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(i => i.id === id)
      const changedAnecdote = {...anecdoteToChange, votes : anecdoteToChange.votes + 1}
      
      return state.map(i => i.id !== id ? i : changedAnecdote).sort(sortByVotes)
    },

    newEntry(state, action) {
      const newEntry = asObject(action.payload)

      return [...state, newEntry]
    }    
  }
})

export const {vote, newEntry} = anecdoteSlice.actions
export default anecdoteSlice.reducer