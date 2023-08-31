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

//action creators
export const vote = (id) => {
  return {type : 'vote', payload : {id}}
}

export const newEntry = (anecdote) => {
  return {type: 'create', payload: asObject(anecdote)}
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'vote' : {
      const id = action.payload.id
      const anecdoteToChange = state.find(i => i.id === id)
      const changedAnecdote = {...anecdoteToChange, votes : anecdoteToChange.votes + 1}
      
      return state.map(i => i.id !== id ? i : changedAnecdote)
    }
    case 'create' : {
      const newEntry = action.payload

      return [...state, newEntry]
    }
     
    default: return state
  }
}

export default reducer