import { Pressable, Text, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import FormikTextInput  from './FormikTextInput'
import * as yup from 'yup'

import useSignIn from '../hooks/useSignIn'
import { NEW_USER } from '../graphql/mutations'

import { styles } from './SignIn'

//checks whether password and passwordConfirm matc
const matchCheck = (value, context) => {
    const password = context.from[0].value.password
    const passwordConfirm = value

    return password === passwordConfirm
}

const validationSchema = yup.object().shape({
    username: yup
        .string().min(5).max(20)
        .required('username required'),
    password: yup
        .string().min(5).max(20)
        .required('password required'),
    passwordConfirm: yup
        .string().min(5).max(20)
        .test({
            name: 'passwords-match',
            test: matchCheck,
            message: "password confirmation doesn't match password"
        })
        .required('password confirmation required')
})

const SignUpForm = ({onSubmit}) => {
    return(
        <View>
            <FormikTextInput 
                autoCapitalize = {false}
                autoComplete = {false} 
                autoCorrect = {false}
                name = 'username' 
                placeholder = 'Username' />
            <FormikTextInput 
                secureTextEntry
                name = 'password'
                placeholder = 'Password'/>
            <FormikTextInput 
                secureTextEntry
                name = 'passwordConfirm'
                placeholder = 'Confirm Password'/>
            <Pressable onPress = {onSubmit} style = {styles.buttonContainer}>
                <Text style = {styles.buttonBox}>
                    Sign up
                </Text>
            </Pressable>
        </View>
    )
}

const SignUp = () => {
    const initialValues = {username: '', password: '', passwordConfirm: ''}
    const [createNewUser, result] = useMutation(NEW_USER)
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    //event handler
    const handleSubmit = async (values) => {
        console.log(values)
        const username = values.username
        const password = values.password

        await createNewUser({variables: {username, password}})
        await signIn({ username, password })

        navigate('/')
    }

    return(
        <Formik
            initialValues={initialValues}
            onSubmit = {handleSubmit}
            validationSchema = {validationSchema}>
            
            {({handleSubmit}) => <SignUpForm onSubmit = {handleSubmit}/>}

        </Formik>
    )
}

export default SignUp