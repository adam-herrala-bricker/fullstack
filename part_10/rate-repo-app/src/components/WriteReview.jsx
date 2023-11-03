import { Pressable, Text, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import FormikTextInput  from './FormikTextInput'
import * as yup from 'yup'

import { styles } from './SignIn'

const isOnGithub = async (value) => {
    const url = `https://github.com/${value}`
    const response = await fetch(url)

    return response.status === 200
}

const ownerError = (value) => `${value.value} not found on github`

const isRepo = async (value, context) => {
    const owner = context.from[0].value.owner
    const url = `https://github.com/${owner}/${value}`
    const response = await fetch(url)
    console.log(context.path)

    return(
        response.status === 200 || 
        context.createError({message: `${owner}/${value} not found on github`})
    )
}

const repoError = (context) => {
    console.log(context)
    return('7')
}

const validationSchema = yup.object().shape({
    owner: yup
        .string()
        .test('owner-github', ownerError, isOnGithub)
        .required('repository owner is required'),
    repository: yup
        .string()
        .test({name: 'repo-github', test: isRepo})
        .required('repository name is required'),
    rating: yup
        .number().min(0).max(100)
        .typeError('rating must be a number') //error message for type error
        .required('rating is required'),
    comments: yup
        .string()
})

const ReviewForm = ({onSubmit}) => {

    return(
        <View>
            <FormikTextInput 
                autoCapitalize = {false}
                autoComplete = {false} 
                autoCorrect = {false}
                name = 'owner' 
                placeholder = 'Repository owner' />
            <FormikTextInput 
                autoCapitalize = {false}
                autoComplete = {false} 
                autoCorrect = {false}
                name = 'repository'
                placeholder = 'Repository name'/>
            <FormikTextInput
                inputMode = 'numeric'
                name = 'rating'
                placeholder = 'Rating between 0 and 100'/>
            <FormikTextInput 
                name = 'comments'
                placeholder = 'Comments (optional)'
                multiline />
            <Pressable onPress = {onSubmit} style = {styles.buttonContainer}>
                <Text style = {styles.buttonBox}>
                    Submit
                </Text>
            </Pressable>
        </View>
    )
    
}

const WriteReview = () => {
    const initialValues = { owner: '', repository: '', rating: 0, comments: '' }
    const navigate = useNavigate()

    //event handler
    const handleSubmit = async (values) => {
        console.log(values)
        //navigate('/')
    }

    return(
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit = {handleSubmit}>
            {({ handleSubmit }) => <ReviewForm onSubmit = {handleSubmit}/>}
        </Formik>
    )
}

export default WriteReview