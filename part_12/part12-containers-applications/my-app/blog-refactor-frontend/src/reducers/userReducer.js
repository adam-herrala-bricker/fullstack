import { createSlice } from '@reduxjs/toolkit'
import { notifier } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const defaultUser = null

const userSlice = createSlice({
  name : 'user',
  initialState : defaultUser,
  reducers : {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(notifier('username or password incorrect', 'error', 5))
    }
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(setUser(null))
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(notifier('Legend! You\'ve successfully logged out!', 'message', 5))
  }
}

export default userSlice.reducer