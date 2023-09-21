import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import viewReducer from './reducers/viewReducer'

const store = configureStore({
    reducer : {
        notification : notificationReducer,
        blog : blogReducer,
        view : viewReducer
    }
})

export default store