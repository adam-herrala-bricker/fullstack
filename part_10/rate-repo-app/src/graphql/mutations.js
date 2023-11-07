import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation signInMutation($username: String!, $password: String!) {
        authenticate(credentials: {username: $username, password: $password}) {
            accessToken
        }
    }
`;

//
export const NEW_REVIEW = gql`
    mutation createNewReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
        createReview(review: {
            ownerName: $ownerName, 
            repositoryName: $repositoryName, 
            rating: $rating, 
            text: $text
        }) {
            repositoryId
        }
    }
`

//don't think we need this to return anything
export const NEW_USER = gql`
    mutation createNewUser($username: String!, $password: String!) {
        createUser(user: {username: $username, password: $password}) {
            id
        }
    }
`