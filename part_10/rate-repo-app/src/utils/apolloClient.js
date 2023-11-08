import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri: Constants.manifest.extra.uri
});

//this all was added just for the infinite scroll (previously just cache: new InMemoryCache() in ApolloClient)
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination()
            }
        },
        User: {
            fields: {
                reviews: relayStylePagination()
            }
        }
    }
})

console.log(Constants.manifest.extra.uri)

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers}) => {
        try {
            const accessToken = await authStorage.getAccessToken()
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : '',
                }
            }
        } catch (error) {
            console.log(error)
            return {
                headers,
            }
        }
    })

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache
    });
};

export default createApolloClient;