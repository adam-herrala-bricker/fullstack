import {useDispatch} from 'react-redux'
import {searcher} from '../reducers/searchReducer'

const Search = () => {
    const dispatch = useDispatch()

    //event hander
    const handleChange = (event) => {
        console.log(event.target.value)
        dispatch(searcher(event.target.value))


    }
    return(
        <div className=  'filter-container'>
            filter <input onChange = {handleChange}/>
        </div>

    )
}

export default Search