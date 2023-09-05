import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import axios from 'axios'
import NotificationContext from './state/notificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()


  //query for updating entry
  const updateEntryMutation = useMutation({
    mutationFn : (currentEntry) => axios.put(`http://localhost:3001/anecdotes/${currentEntry.id}`, {...currentEntry, votes : currentEntry.votes + 1}).then(res => res.data),
    onSuccess : () => {queryClient.invalidateQueries({queryKey : ['anecdotes']})}
  })

  const handleVote = (anecdote) => {
    console.log('vote!')
    updateEntryMutation.mutate(anecdote)
    dispatchNotification({type : 'set', payload : `New vote for: ${anecdote.content}`})
    setTimeout(() => {
      dispatchNotification({type : 'clear'})
    }, 5000)
  }

  //get data from server
  const result = useQuery({
    queryKey : ['anecdotes'],
    queryFn : () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry : 1
  })

  if (result.isLoading) {
    return <div>loading data . . . </div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
