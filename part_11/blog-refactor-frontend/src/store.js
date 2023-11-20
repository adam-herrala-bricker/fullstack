import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import viewReducer from './reducers/viewReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer : {
    notification : notificationReducer,
    blog : blogReducer,
    view : viewReducer,
    user : userReducer
  }
})

export default store