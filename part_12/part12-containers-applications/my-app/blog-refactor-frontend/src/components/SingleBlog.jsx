import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, changeBlog } from '../reducers/blogReducer'
import  { useParams } from 'react-router-dom'
import { Button, Icon, Input, Segment } from 'semantic-ui-react'

const SingleBlog = () => {
  const [commentField, setCommentField] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()

  const user = useSelector(i => i.user)
  const blogs = useSelector(i => i.blog)

  const blog = blogs.filter(i => i.id === id)[0]

  const handleDelete = async () => {
    if ( window.confirm(`Are you sure that you want to remove '${blog.title}'?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const handleLike = async () => {
    const newBlog = { ...blog, likes : blog.likes + 1 }
    dispatch(changeBlog(newBlog))
  }

  const handleType = (event) => {
    setCommentField(event.target.value)
  }

  //note: not handling comments like the exercise suggested (via a seperate post request)
  //since comments aren't linked to users, only blogs, extremely unclear why we would need seperate routing
  //to handle adding comments to the DB. they're just an attribute of the blog.
  const handleComment = async (event) => {
    event.preventDefault()
    const newBlog = { ...blog, comments : [...blog.comments, commentField] }
    dispatch(changeBlog(newBlog))
    setCommentField('')
  }


  if (!blog) {
    return null
  }

  return (
    <div className = 'bloggy'>
      <h3>
        {blog.title} -- {blog.author}{' '}
        <Button icon basic compact onClick={handleLike}><Icon color = 'red' name = 'like'/></Button>
      </h3>
      <p>{blog.url}</p>
      <p>
            likes: {blog.likes}
      </p>
      <p>{blog.user.name}</p>
      <Button
        negative={user.username === blog.user.username ? true : false}
        disabled={user.username === blog.user.username ? false : true}
        onClick={handleDelete}>
            remove
      </Button>
      <h3>comments</h3>
      <form autoComplete="off" onSubmit = {handleComment}>
        <div className = 'comment-add-container'>
          <Input name = 'comment' value = {commentField} onChange = {handleType}/>
          <Button type = 'submit'>new comment</Button>
        </div>
      </form>
      <Segment.Group>
        {blog.comments.map(i =>
          < Segment key = {i}>{i}</Segment>)}
      </Segment.Group>
    </div>
  )
}


export default SingleBlog