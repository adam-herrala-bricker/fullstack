import { useState} from 'react'

const Blog = ({ blog, handleLike }) => {
  const [unroll, setUnroll] = useState(false)

  //event handlers
  const toggleUnroll = () => {
    setUnroll(!unroll)
  }
  
  if (unroll) {
    return(
      <div className = 'bloggy'>
        <p>{blog.title} -- {blog.author} <button onClick={toggleUnroll}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick = {handleLike}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }
  
  
  return(
    <div className = 'bloggy'>
    {blog.title} -- {blog.author} <button onClick={toggleUnroll}>view</button>
  </div> 
  )
   
}

export default Blog