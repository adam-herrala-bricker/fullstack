import { gql } from '@apollo/client';

//gets the info for a logged in user (otherwise returns null)
export const GET_ME = gql`
query {
    me {
        id
        username
    }
    }
`;

//exactly what it sounds likes. get all the repositories 
export const GET_REPOSITORIES = gql `
    query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
        repositories (orderBy: $orderBy, orderDirection: $orderDirection){
            edges {
                node {
                  description
                  fullName
                  ownerAvatarUrl
                  id
                  reviewCount
                  ratingAverage
                  name
                  stargazersCount
                  language
                  createdAt
                  forksCount
                  ownerName
                }
                cursor
            }
        }
    }
`;

export const GET_REPOSITORY = gql `
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
            description
            fullName
            ownerAvatarUrl
            id
            reviewCount
            ratingAverage
            name
            stargazersCount
            language
            createdAt
            forksCount
            ownerName
            url
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;