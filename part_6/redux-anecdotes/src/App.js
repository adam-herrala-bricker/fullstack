import { useSelector, useDispatch } from 'react-redux'
import {vote, newEntry} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  //event handlers
  const handleVote = (id) => {
    dispatch(vote(id))
    console.log('vote', id)
  }

  const handleNew = (event) => {
    event.preventDefault()
    dispatch(newEntry(event.target.create.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit = {handleNew} autoComplete='false'>
        <div><input name = 'create'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App