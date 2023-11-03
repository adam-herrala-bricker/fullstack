import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { SignInContainer } from '../../components/SignIn'

describe('Sign In', () => {
    describe('SignInForm', () => {
        
        it('calls onSubmit as expected', async () => {
            //mock function
            const onSubmit = jest.fn()

            render(<SignInContainer onSubmit = {onSubmit}/>)

            //'type' text --> press submit
            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'randy_1953')
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
            fireEvent.press(screen.getByText('Log in'))

            //formik's form submissions are async, so need to await for it
            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1)
                
                //onSubmit.mock.calls[0][0] = the first argument of the FIRST CALL
                expect(onSubmit.mock.calls[0][0]).toEqual({username: 'randy_1953', password: 'password'})
            })
        })
    })
})