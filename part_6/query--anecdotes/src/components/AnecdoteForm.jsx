import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import axios from 'axios'
import NotificationContext from '../state/notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn : (newAnecdote) => axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data),
    //update on screen
    onSuccess : () => {queryClient.invalidateQueries({queryKey : ['anecdotes']})},
    onError : () => {
      dispatchNotification({type : 'set', payload: 'error: entries must be at least 5 characters in length'})
      setTimeout(() => {
        dispatchNotification({type : 'clear'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({content, votes : 0})
    event.target.anecdote.value = ''
    console.log('new anecdote')
    dispatchNotification({type : 'set', payload : `New note created: ${content}`})
    setTimeout(() => {
      dispatchNotification({type : 'clear'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate} autoComplete='off'>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
