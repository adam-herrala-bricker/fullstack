import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LogIn = ({ show, setToken, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    //event handler
    const handleLogin = async (event) => {
        event.preventDefault()
        const result = await login({variables: {username, password}})
        const newToken = result.data.login.value
        setToken(newToken)
        localStorage.setItem('library-user-token', newToken)

        setUsername('')
        setPassword('')

        setPage('authors')
    }

    if(!show) {
        return null
    }

    return(
        <div>
            <h2>log in</h2>
            <form onSubmit = {handleLogin}>
                <div>
                    username <input value = {username} onChange = {(e) => setUsername(e.target.value)}></input>
                </div>
                <div>
                    password <input type = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <button type = 'submit'>log in</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn