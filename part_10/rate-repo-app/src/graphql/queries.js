import { gql } from '@apollo/client';

//exactly what it sounds likes. get all the repositories 
export const GET_REPOSITORIES = gql `
    query {
        repositories {
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