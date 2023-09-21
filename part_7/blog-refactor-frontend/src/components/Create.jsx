import { useState } from "react"
import { useDispatch } from "react-redux";
import { notifier} from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer"
import { toggleView } from '../reducers/viewReducer'

const Create = () => {
  const emptyNewEntry = { title: "", author: "", url: "" };
  const [newEntry, setNewEntry] = useState(emptyNewEntry);

  const dispatch = useDispatch()

  //event handlers
  const handleEntryChange = (event) => {
    const thisField = event.target.name;
    setNewEntry({ ...newEntry, [thisField]: event.target.value });
  };

  const handleCreateNew = async (event) => {
    event.preventDefault()

    dispatch(createBlog(newEntry))
    dispatch(toggleView())
  };

  return (
    <div>
      <h2>Create new</h2>
      <form autoComplete="off" onSubmit={handleCreateNew}>
        <div>
          title{" "}
          <input
            name="title"
            value={newEntry.title}
            onChange={handleEntryChange}
          />
        </div>
        <div>
          author{" "}
          <input
            name="author"
            value={newEntry.author}
            onChange={handleEntryChange}
          />
        </div>
        <div>
          url{" "}
          <input name="url" value={newEntry.url} onChange={handleEntryChange} />
        </div>
        <button type="submit">create</button>
        <button onClick = {() => dispatch(toggleView())}>cancel</button>
      </form>
    </div>
  );
};

export default Create;
