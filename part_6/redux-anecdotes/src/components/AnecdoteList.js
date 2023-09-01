import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notifier } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes) //old one
    const anecdotes = useSelector(({anecdotes, search}) => {
        return search.searchTerm === ''
            ? anecdotes
            : anecdotes.filter(i => i.content.toLowerCase().includes(search.searchTerm.toLowerCase()))
    })

    const lastTimeoutID = useSelector(state => state.notification.timeoutID)

    const dispatch = useDispatch()

    //event handlers
    const handleVote = (anecdote) => {
        //vote --> store + server
        dispatch(addVote(anecdote))

        //notification
        dispatch(notifier(`New vote for: ${anecdote.content}`, 5))

    }
    
    return (
        <div>
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

export default AnecdoteList