import { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LogIn from './components/LogIn'
import { ALL_BOOKS, BOOKS_BY_GENRE, BOOK_ADDED } from './queries'

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

  //subscription
  useSubscription(BOOK_ADDED, {
    //note: error in fullstack example: missing client param
    onData: ({client, data}) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      console.log('new data', data)
      
      console.log('cache', client.cache)

      client.cache.updateQuery({ query : ALL_BOOKS}, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

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
