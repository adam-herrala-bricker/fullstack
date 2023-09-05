import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn : (newAnecdote) => axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data),
    //update on screen
    onSuccess : () => {queryClient.invalidateQueries({queryKey : ['anecdotes']})}
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({content, votes : 0})
    event.target.anecdote.value = ''
    console.log('new anecdote')
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
