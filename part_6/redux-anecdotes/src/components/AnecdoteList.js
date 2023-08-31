import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import { setNotification, clearNotification, setLastTimeoutID } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes) //old one
    console.log('current store', useSelector(state => state))
    const anecdotes = useSelector(({anecdotes, search}) => {
        return search.searchTerm === ''
            ? anecdotes
            : anecdotes.filter(i => i.content.toLowerCase().includes(search.searchTerm.toLowerCase()))
    })

    const lastTimeoutID = useSelector(state => state.notification.timeoutID)

    const dispatch = useDispatch()

    //event handlers
    const handleVote = (anecdote) => {
        //vote --> store
        dispatch(vote(anecdote.id))

        //notification
        clearTimeout(lastTimeoutID) //avoids weird timing bugs when mashing votes
        dispatch(setNotification(`New vote for: ${anecdote.content}`))
        const thisTimeoutID = setTimeout(() => {
            dispatch(clearNotification())
        },5000)
        console.log(thisTimeoutID)
        dispatch(setLastTimeoutID(thisTimeoutID))

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