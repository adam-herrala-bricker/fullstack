import { gql } from '@apollo/client';

//gets the info for a logged in user (otherwise returns null)
export const GET_ME = gql`
query ($includeReviews: Boolean = false, $first: Int, $after: String){
    me {
        id
        username
        reviews (first: $first, after: $after) @include(if: $includeReviews) {
            edges {
                node {
                    repositoryId
                    id
                    text
                    rating
                    createdAt
                    repository {
                        url
                        name
                    }
                    user {
                        id
                        username
                    }
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
}
`;

//exactly what it sounds likes. get all the repositories 
export const GET_REPOSITORIES = gql `
    query (
        $orderBy: AllRepositoriesOrderBy, 
        $orderDirection: OrderDirection, 
        $searchKeyword: String,
        $first: Int,
        $after: String
        ){
        repositories (
            orderBy: $orderBy, 
            orderDirection: $orderDirection, 
            searchKeyword: $searchKeyword,
            first: $first,
            after: $after
            ){
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
            pageInfo {
                endCursor
                startCursor
                hasNextPage
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