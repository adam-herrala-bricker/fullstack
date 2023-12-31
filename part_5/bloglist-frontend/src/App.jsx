import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import Create from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login'
import objectHelper from './utils/objectHelper'


const Notification = ({ message }) => {
  if (message.content === null) {
    return(null)
  }

  return(
    <div className={message.type}>
      {message.content}
    </div>
  )
}

const Blogs = ({ blogs, setBlogs, user, handleLogout }) => {
  //helper function for sorting blogs
  const sortByLikes = (obj1, obj2) => {
    if (obj1.likes < obj2.likes) {
      return 1
    } else if (obj1.likes > obj2.likes) {
      return -1
    } else {
      return 0
    }
  }

  //event handlers
  const handleLike = async (blog) => {
    const thisID = blog.id
    const updatedEntry = { ...blog, likes: blog.likes + 1 }

    const returnedUpdate = await blogService.update(updatedEntry)

    //update currently displayed blogs
    const replaceIndex = blogs.findIndex((i) => objectHelper.singleEqualityChecker(i,blog))
    setBlogs(blogs.with(replaceIndex, returnedUpdate))
  }

  //sort blogs!
  blogs.sort(sortByLikes)

  return(
    <div>
      <h2>Blogs</h2>
      <b>Logged in as {user.name} </b>
      <button onClick ={handleLogout}>log out</button>
      <p> </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs = {blogs} user = {user} setBlogs = {setBlogs} handleLike={() => handleLike(blog)}/>
      )}
    </div>
  )
}

const LogIn = ({ handleLogin, handleFormChange, username, password }) => {
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
        <button id = 'login-button'type='submit'>login</button>
      </form>
    </div>
  )
}

//prop types
LogIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const ToggleView = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  //event handler
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //?? that ref thing ??
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  if (visible) {
    return(
      <div>
        {children}
        <button onClick = {toggleVisibility}>cancel</button>
      </div>
    )
  }
  return(
    <div>
      <button onClick = {toggleVisibility}>{buttonLabel}</button>
    </div>
  )
})

ToggleView.displayName = 'Togglable'

const App = () => {
  const emptyMessage = { type: null, content : null }

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(emptyMessage)

  const blogFormRef = useRef()

  //helper function for setting notification
  const notifier = (type, content) => {
    setMessage({ type: type, content: content })
    setTimeout(() => {
      setMessage(emptyMessage)
    }, 5000)
  }

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
      notifier('error', 'username or password incorrect')
    }
  }

  const handleFormChange = (event) => {
    const inputField = event.target.name
    inputField === 'Username' && setUsername(event.target.value)
    inputField === 'Password' && setPassword(event.target.value)
  }

  const handleCreateNew = async (passedEntry) => {

    blogFormRef.current.toggleVisibility()

    const newEntry = {
      title: passedEntry.title,
      author: passedEntry.author,
      url: passedEntry.url
    }

    const newBlog = await blogService.create(newEntry)
    setBlogs(blogs.concat(newBlog))
    notifier('message', `New blog added: '${newBlog.title}' by ${newBlog.author}.`)
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
  //update: changed it back
  useEffect(() => {
    if (user !== null) {
      const fetchData = async() => {
        const foundBlogs = await blogService.getAll()
        setBlogs(foundBlogs)
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
      <Notification message = {message}/>
      {user === null
        ? <LogIn username = {username} password={password} handleLogin = {handleLogin} handleFormChange={handleFormChange}/>
        : <div>
          <Blogs blogs={blogs} setBlogs = {setBlogs} user={user} handleLogout = {handleLogout}/>
          <ToggleView buttonLabel='new blog' ref={blogFormRef}>
            <Create handleCreateNew = {handleCreateNew} />
          </ToggleView>
        </div>}
    </div>

  )
}

export default App