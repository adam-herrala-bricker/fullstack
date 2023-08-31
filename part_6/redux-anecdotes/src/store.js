import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import searchReducer from './reducers/searchReducer'


//NOTE THAT THIS IS WHERE THE STORE IS GETTING ITS DIFFERENT PROPERTIES!!!!!
const store = configureStore({
    reducer : {
      anecdotes : anecdoteReducer,
      search : searchReducer
    }
  })

  export default store