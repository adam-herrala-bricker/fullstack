import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import anecdoteReducer from './reducers/anecdoteReducer'
import searchReducer from './reducers/searchReducer'

//NOTE THAT THIS IS WHERE THE STORE IS GETTING ITS DIFFERENT PROPERTIES!!!!!
const reducer = combineReducers({
  anecdotes : anecdoteReducer,
  search: searchReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)