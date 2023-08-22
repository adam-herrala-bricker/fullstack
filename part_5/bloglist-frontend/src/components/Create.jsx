import { useState } from 'react'

const Create = ({ handleCreateNew }) => {
  const emptyNewEntry = { title: '', author: '', url: '' }
  const [newEntry, setNewEntry] = useState(emptyNewEntry)

  //event handlers
  const handleEntryChange = (event) => {
    const thisField = event.target.name
    setNewEntry({ ...newEntry, [thisField] : event.target.value })
  }


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

export default Create