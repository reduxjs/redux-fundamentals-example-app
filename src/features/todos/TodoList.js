import React from 'react'
import { useSelector } from 'react-redux'

import { selectFilteredTodoIds, selectLoadingState } from './todosSlice'
import TodoListItem from './TodoListItem'

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector(selectLoadingState)

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    )
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} todoId={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
