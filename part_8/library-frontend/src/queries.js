import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`
export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
                born
            }
            published
            genres
        }
    }
`
//this is a 'named query'
export const BOOKS_BY_GENRE = gql`
    query booksByGenre($genres: [String]) {
        allBooks(genres: $genres) {
            title
            author {
                name
                born
            }
            published
            genres
        }
    }
`

//super unclear to me why user and token aren't both returned on login, rather than handling them seperately
export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author {
                name
                born
            }
            published
        }
    }
`

export const SET_BIRTHDATE = gql`
    mutation setBirthyear($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
        }
    }
`

export const LOGIN = gql `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const BOOK_ADDED = gql `
    subscription {
        bookAdded {
            title
            author {
                name
                born
            }
            published
            genres
        }
    }
`


