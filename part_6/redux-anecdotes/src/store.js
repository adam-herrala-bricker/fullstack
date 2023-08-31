import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import searchReducer from './reducers/searchReducer'
import notificationReducer from './reducers/notificationReducer'


//NOTE THAT THIS IS WHERE THE STORE IS GETTING ITS DIFFERENT PROPERTIES!!!!!
const store = configureStore({
    reducer : {
      anecdotes : anecdoteReducer,
      search : searchReducer,
      notification : notificationReducer
    }
  })

  export default store