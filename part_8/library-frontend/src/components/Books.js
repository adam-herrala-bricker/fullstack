import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE, ME } from '../queries'

const Books = ({ show }) => {
  const [shownGenres, setShownGenres] = useState(null)
  const result = useQuery(BOOKS_BY_GENRE, {
    variables : {genres: shownGenres}})

  //making a query to get the full list of genres every time
  const resultForGenres = useQuery(ALL_BOOKS)
  
  const user = useQuery(ME)

  //event handler
  const handleGenreChange = (genre) => {
     //special handling for recommend --> only show the user's favorite genre
     if (genre === 'recommend'){
      if (user.data.me) {
        setShownGenres([user.data.me.favoriteGenre])
      } else {
        //why not
        setShownGenres(['funny'])
      }
    }
    //view all is a special case we handle by setting shownGenres to null
    else if (genre === 'view all') {
      setShownGenres(null)
      //adding first genre to list
    } else if (!shownGenres) {
      setShownGenres([genre])
    }
    else {
      //already included --> remove
      if (shownGenres.includes(genre)) {
        setShownGenres(shownGenres.filter(i => i !== genre))
      //doesn't include --> add
      } else {
        setShownGenres([...shownGenres, genre])
      }
    }
  }

  if (!show) {
    return null
  }

  if (result.loading | user.loading | resultForGenres.loading) {
    return <div>loading...</div>
  }

  //putting this down here so it is only computed when the loading is over
  //not sure if there's a fast way, but this does give us a unique list of genres
  const genres = resultForGenres.data.allBooks.reduce((accumulator, book) => {
    const newGenres = []
    
    book.genres.forEach(i => {
      if (!accumulator.includes(i)) {
        newGenres.push(i)
      }
    })

    //no new ones found (wonder if this statement is needed at all . . .)
    if (newGenres.length === 0) {
      return accumulator
    }

    return [...accumulator, ...newGenres]

  }, ['view all', 'recommend'])

  /*
  const books = shownGenres 
    ? result.data.allBooks.filter(i => i.genres.some(j => shownGenres.includes(j)))
    : result.data.allBooks
  */

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.length > 1 && genres.map(i =>
          <button key = {i} className = { shownGenres?.includes(i) ? 'blue-button' : ''} onClick = {() => handleGenreChange(i)}>{i}</button> 
          )}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
