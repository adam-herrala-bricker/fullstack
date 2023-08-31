import { useSelector, useDispatch } from 'react-redux'
import {vote, newEntry} from './reducers/anecdoteReducer'

const App = () => {
  //helper function to sort the store
  const sortByVotes = (entry1, entry2) => {
    if (entry1.votes < entry2.votes) {
      return 1
    } else if (entry1.votes > entry2.votes) {
      return -1
    } else {
      return 0
    }
  }

  const anecdotes = useSelector(state => state)
  anecdotes.sort(sortByVotes)

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