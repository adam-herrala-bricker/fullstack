import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const Blogs = ({blogs, user}) => {
  return(
    <div>
      <h2>Blogs</h2>
      <h4>Logged in as {user.name}</h4>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const LogIn = ({handleLogin, handleFormChange, username, password}) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <form autoComplete='off' onSubmit = {handleLogin}>
        <div>
          username <input name='Username' value={username} onChange = {handleFormChange}/>
        </div>
        <div>
          password <input name='Password' type='password' value={password} onChange = {handleFormChange}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //event handlers
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleFormChange = (event) => {
    const inputField = event.target.name
    inputField === 'Username' && setUsername(event.target.value)
    inputField === 'Password' && setPassword(event.target.value)
  }

  //effect hook originally loaded all the blogs on first go
  //seemed like a bad strategy to load everyone's blogs to FE regardless of login
  //changed to only load for one user once that user is login in
  //even better version would only get from that specific user's id, not get all
  useEffect(() => {
    user !== null &&
    blogService.getAll().then(blogs =>
      setBlogs( blogs.filter(i => i.user.username === user.username) )
    )  
  }, [user])

  return (
    <div>
      {user === null
      ? <LogIn username = {username} password={password} handleLogin = {handleLogin} handleFormChange={handleFormChange}/>
      : <Blogs blogs={blogs} user={user}/>}
    </div>
    
  )
}

export default App