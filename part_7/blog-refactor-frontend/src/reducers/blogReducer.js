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
        },

        removeBlog(state, action) {
            const blogToRemove = action.payload
            const newBlogs = state.filter(i => i.id !== blogToRemove.id)

            return newBlogs
        },

        updateBlog(state, action) {
            const updatedBlog = action.payload
            const otherBlogs = state.filter(i => i.id !== updatedBlog.id)

            return [...otherBlogs, updatedBlog]
        }
    }
})

export const { setBlogs, addBlog, sortBlogs, removeBlog, updateBlog } = blogSlice.actions

//these functions are what get used in the components themselves.
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
            dispatch(notifier(exception.message, 'error', 5))
        }   
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        try {
            await blogService.erase(blog)
            dispatch(removeBlog(blog))
            dispatch(sortBlogs())
            dispatch(notifier(`'${blog.title}' deleted`, 'message', 5))
        } catch (exception) {
            dispatch(notifier(exception.message, 'error', 5))
        }
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = {...blog, likes : blog.likes + 1}
        try {
            const returnedBlog = await blogService.update(newBlog)
            dispatch(updateBlog(returnedBlog))
            dispatch(sortBlogs()) 
        } catch (exception) {
            dispatch(notifier(exception.message, 'error', 5))
        }
    }
}

export default blogSlice.reducer