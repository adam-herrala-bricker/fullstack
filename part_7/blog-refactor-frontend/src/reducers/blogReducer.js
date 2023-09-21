import { createSlice } from '@reduxjs/toolkit'
import { notifier } from './notificationReducer'
import blogService from '../services/blogs'

//helper function for sorting blogs
const sortByLikes = (obj1, obj2) => {
    if (obj1.likes < obj2.likes) {
      return 1;
    } else if (obj1.likes > obj2.likes) {
      return -1;
    } else {
      return 0;
    }
  };

const blogSlice = createSlice({
    name : 'blog',
    initialState : [],
    reducers : {
        setBlogs(state, action) {
            return action.payload
        },
        
        addBlog(state, action) {
            return [...state, action.payload]
        },

        sortBlogs(state, action) {
            const sortedBlogs = state.sort(sortByLikes)

            return sortedBlogs
        }
    }
})

export const { setBlogs, addBlog, sortBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
        dispatch(sortBlogs())
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        //notice that the error handling/notification lives in here!
        try {
            const newBlog = await blogService.create(content)
            dispatch(addBlog(newBlog))
            dispatch(sortBlogs())
            dispatch(notifier(`New blog added: '${newBlog.title}' by ${newBlog.author}.`, "message", 5))
        } catch (exception) {
            console.log('exception', exception.message)
            dispatch(notifier(exception.message, 'error', 5))
        }
        
    }
}

export default blogSlice.reducer