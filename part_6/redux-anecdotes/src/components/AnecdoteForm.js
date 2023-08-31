import { useDispatch } from 'react-redux'
import {newEntry} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    //event handler
    const handleNew = (event) => {
        event.preventDefault()
        dispatch(newEntry(event.target.create.value))
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