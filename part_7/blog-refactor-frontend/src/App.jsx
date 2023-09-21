import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Blog from "./components/Blog";
import Create from "./components/Create";
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { toggleView } from './reducers/viewReducer'
import { login, logout, setUser } from './reducers/userReducer'
import blogService from './services/blogs'

const Notification = () => {
  const notification = useSelector(i => i.notification)

  if (notification.message === null) {
    return null;
  }

  return (
    <div className = 'notification-container'>
      <div className={notification.type}>{notification.message}</div>
    </div>
  );
};

const Blogs = () => {
  const blogs = useSelector(i => i.blog)
  const user = useSelector(i => i.user)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const LogIn = ({ handleLogin, handleFormChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form autoComplete="off" onSubmit={handleLogin}>
        <div>
          username{" "}
          <input name="Username" value={username} onChange={handleFormChange} />
        </div>
        <div>
          password{" "}
          <input
            name="Password"
            type="password"
            value={password}
            onChange={handleFormChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

//prop types
LogIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const view = useSelector(i => i.view)
  const user = useSelector(i => i.user)

  //event handlers
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password))

    //think it makes sense to keep username and password as regular react states
    setUsername("")
    setPassword("")
  };

  const handleFormChange = (event) => {
    const inputField = event.target.name;
    inputField === "Username" && setUsername(event.target.value);
    inputField === "Password" && setPassword(event.target.value);
  };

  const handleLogout = () => {
    dispatch(logout())
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
    }
  }, [user]);

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      //console.log(savedUser)
      dispatch(setUser(savedUser));
      blogService.setToken(savedUser.token);
    }
  }, []);

  return (
    <div>
      <Notification />
      {user === null ? (
        <LogIn
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleFormChange={handleFormChange}
        />
      ) : (
        <div>
          <div className = 'display-user'>
            <h2>Blogs</h2>
            <b>Logged in as {user.name} </b>
            <button onClick={handleLogout}>log out</button>
          </div>
          
          <Blogs
            handleLogout={handleLogout}
          />
          {view
            ? <Create/> 
            : <button onClick = {() => dispatch(toggleView())}>new blog</button>
          }
        </div>
      )}
    </div>
  );
};

export default App;
