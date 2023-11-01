import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations'

const useSignIn = () => {
    const [signInMutation, result] = useMutation(SIGN_IN)

    const signIn = async ({ username, password }) => {
       // console.log('username:', username)
        //console.log('password:', password)
        const thisResult = await signInMutation({variables: {username, password}})
        //console.log(thisResult.data)

        return thisResult

    }

    return [signIn, result]
}

export default useSignIn