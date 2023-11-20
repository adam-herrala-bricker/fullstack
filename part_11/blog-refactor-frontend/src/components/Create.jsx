import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { toggleView } from '../reducers/viewReducer'
import { Button, Input } from 'semantic-ui-react'

const Create = () => {
  const emptyNewEntry = { title: '', author: '', url: '' }
  const [newEntry, setNewEntry] = useState(emptyNewEntry)

  const dispatch = useDispatch()

  //event handlers
  const handleEntryChange = (event) => {
    const thisField = event.target.name
    setNewEntry({ ...newEntry, [thisField]: event.target.value })
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()

    dispatch(createBlog(newEntry))
    dispatch(toggleView())
  }

  return (
    <form autoComplete="off" onSubmit={handleCreateNew}>
      <div className = 'create-container'>
        <h2>Create new</h2>
        <div className = 'create-item'>
          title{' '}
          <Input
            name="title"
            value={newEntry.title}
            onChange={handleEntryChange}
            fluid
          />
        </div>
        <div className = 'create-item'>
          author{' '}
          <Input
            name="author"
            value={newEntry.author}
            onChange={handleEntryChange}
            fluid
          />
        </div>
        <div className = 'create-item'>
          url{' '}
          <Input name="url" value={newEntry.url} onChange={handleEntryChange} fluid/>
        </div>
        <div>
          <Button primary type="submit">create</Button>
          <Button onClick = {() => dispatch(toggleView())}>cancel</Button>
        </div>
      </div>
    </form>

  )
}

export default Create
