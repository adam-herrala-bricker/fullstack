import { useDispatch } from 'react-redux'
import {newEntry} from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    //event handler
    const handleNew = (event) => {
        event.preventDefault()
        const newContent = event.target.create.value

        //sending new entry to store
        dispatch(newEntry(newContent))

        //notification bit
        dispatch(setNotification(`New entry added: ${newContent}`))
        setTimeout(() => {
            dispatch(clearNotification())
        },5000)
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit = {handleNew} autoComplete='off'>
                <div><input name = 'create'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm