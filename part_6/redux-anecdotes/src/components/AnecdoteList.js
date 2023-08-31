import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes) //old one
    console.log('current store', useSelector(state => state))
    const anecdotes = useSelector(({anecdotes, search}) => {
        return search.searchTerm === ''
            ? anecdotes
            : anecdotes.filter(i => i.content.toLowerCase().includes(search.searchTerm.toLowerCase()))
    })

    const dispatch = useDispatch()

    //event handlers
    const handleVote = (id) => {
        dispatch(vote(id))
        console.log('vote', id)
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
                    <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}

        </div>
       
    )


}

export default AnecdoteList