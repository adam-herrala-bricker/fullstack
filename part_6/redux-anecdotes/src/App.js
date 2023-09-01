import { useEffect } from 'react'
import anecdoteServices from './services/acecdoteServices'
import Search from './components/Search'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {setEntries} from './reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteServices
      .getAll()
      .then(i => dispatch(setEntries(i)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Search />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App