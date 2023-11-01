import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const [signInMutation, result] = useMutation(SIGN_IN)
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()

    const signIn = async ({ username, password }) => {
        //console.log('username:', username)
        //console.log('password:', password)
        const thisResult = await signInMutation({variables: {username, password}})
        //console.log(thisResult.data)

        const foundToken = thisResult.data.authenticate.accessToken
        await authStorage.setAccessToken(foundToken)
        apolloClient.resetStore() //clears the cache and re-executes all active queries

        //just checking that everything worked
        const tokenInStorage = await authStorage.getAccessToken()
        console.log('token in storage', tokenInStorage)

        return thisResult

    }

    return [signIn, result]
}

export default useSignIn