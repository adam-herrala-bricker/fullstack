import React from 'react'
import SingleEntry from './SingleEntry'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => <SingleEntry 
        todo = {todo}
        deleteTodo = {deleteTodo}
        completeTodo = {completeTodo}
        />).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
