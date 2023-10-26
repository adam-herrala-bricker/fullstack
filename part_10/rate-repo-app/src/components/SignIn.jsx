import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik'
import FormikTextInput  from './FormikTextInput'

import theme from '../theme';

const styles = StyleSheet.create({
    boxCommon: {
        margin: 8,
        padding: 10,

        borderRadius: theme.radii.subtleRadius,

        fontSize: theme.fontSizes.subheading
    },

    textBox: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.colors.backgroundDark,

    },

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

const SignInForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput autoCapitalize = {false} name = 'username' placeholder = 'Username' style = {[styles.boxCommon, styles.textBox]}/>
            <FormikTextInput secureTextEntry name = 'password' placeholder = 'Password' style = {[styles.boxCommon, styles.textBox]}/>
            <View style = {styles.buttonContainer}>
                <Pressable onPress = {onSubmit}>
                    <Text style = {[styles.buttonBox]}>Log in</Text>
                </Pressable>
            </View>
        </View>
    );

};

const SignIn = () => {
    const initialValues = {username: '', password: ''}
    
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik initialValues = {initialValues} onSubmit = {onSubmit}>
            {({ handleSubmit }) => <SignInForm onSubmit = {handleSubmit} />}
        </Formik>
    );
};

export default SignIn;