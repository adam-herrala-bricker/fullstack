import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput  from './FormikTextInput'
import * as yup from 'yup'

import useSignIn from '../hooks/useSignIn'
import AuthStorage from '../utils/authStorage'

import theme from '../theme';

const styles = StyleSheet.create({

    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'center',

        margin: 8,
        padding: 10,

        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: theme.radii.subtleRadius,
    },

    buttonBox : {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading,
        color: theme.colors.textWhite
    }

});

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('username required'),
    password: yup
        .string()
        .required('password is required')
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput autoCapitalize = {false} name = 'username' placeholder = 'Username' />
            <FormikTextInput secureTextEntry name = 'password' placeholder = 'Password' />
            <Pressable style = {styles.buttonContainer} onPress = {onSubmit}>
                <Text style = {[styles.buttonBox]}>Log in</Text>
            </Pressable>
        </View>
    );

};

const SignIn = () => {
    const initialValues = {username: '', password: ''}
    const [signIn] = useSignIn()

    const thisAuth = new AuthStorage('thisUser')
    
    const onSubmit = async (values) => {
        const { username, password } = values
        console.log(values);
        
        try {
            const result = await signIn({ username, password })
            const thisToken = result.data.authenticate.accessToken
            console.log('token recieved from BE:', thisToken)
            await thisAuth.setAccessToken(thisToken)
            //await thisAuth.removeAccessToken()
            const tokenFromStorage = await thisAuth.getAccessToken()
            console.log('token in storage:', tokenFromStorage)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Formik 
            initialValues = {initialValues} 
            onSubmit = {onSubmit}
            validationSchema = {validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit = {handleSubmit} />}
        </Formik>
    );
};

export default SignIn;