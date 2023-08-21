import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const Blogs = ({blogs, user, handleLogout}) => {
  return(
    <div>
      <h2>Blogs</h2>
      <h4>Logged in as {user.name}</h4>
      <button onClick ={handleLogout}>log out</button>
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

const Create = ({handleCreateNew, newEntry, handleEntryChange}) => {
  return(
    <div>
      <h2>Create new</h2>
      <form autoComplete = 'off' onSubmit = {handleCreateNew}>
        <div>
          title <input name = 'title' value = {newEntry.title} onChange = {handleEntryChange} />
        </div>
        <div>
          author <input name = 'author' value = {newEntry.author} onChange = {handleEntryChange} />
        </div>
        <div>
          url <input name = 'url' value = {newEntry.url} onChange = {handleEntryChange} />
        </div>
        <button type = 'submit'>create</button>
      </form>
    </div>

  )


}

const App = () => {
  const emptyNewEntry = {title: '', author: '', url: ''}

  const [blogs, setBlogs] = useState([])
  const [newEntry, setNewEntry] = useState(emptyNewEntry)
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
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
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

  const handleEntryChange = (event) => {
    const thisField = event.target.name
    setNewEntry({...newEntry, [thisField] : event.target.value})
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()
    
    const newBlog = await blogService.create(newEntry)
    setNewEntry(emptyNewEntry)
    setBlogs(blogs.concat(newBlog))
    
  }

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.clear()
  }

  //effect hook originally loaded all the blogs on first go
  //seemed like a bad strategy to load everyone's blogs to FE regardless of login
  //changed to only load for one user once that user is login in
  //even better version would only get from that specific user's id, not get all
  useEffect(() => {
    if (user !== null) {
      const fetchData = async() => {
        const foundBlogs = await blogService.getAll()
        setBlogs(foundBlogs.filter(i => i.user.username === user.username))
      }
    fetchData()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null
      ? <LogIn username = {username} password={password} handleLogin = {handleLogin} handleFormChange={handleFormChange}/>
      : <div>
          <Blogs blogs={blogs} user={user} handleLogout = {handleLogout}/>
          <Create handleCreateNew = {handleCreateNew} handleEntryChange = {handleEntryChange} newEntry = {newEntry}/>
        </div>}
    </div>
    
  )
}

export default App