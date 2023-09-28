import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LogIn from './components/LogIn'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const handleLogout = () => {
    console.log('logout!')
    setToken(null)
    localStorage.removeItem('library-user-token')
  }

//check local storage for token
useEffect(() => {
  const foundToken = localStorage.getItem('library-user-token')
  foundToken && setToken(foundToken)
}, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token 
          ? <button onClick = {() => setPage('login')}>log in</button>
          : <button onClick = {handleLogout}>log out</button>}
      </div>

      <Authors show={page === 'authors'} token = {token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      
      <LogIn show={page === 'login'} setToken = {setToken} setPage = {setPage}/>

    </div>
  )
}

export default App
