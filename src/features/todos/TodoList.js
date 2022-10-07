import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'

const selectTodoIds = (state) => state.todos.map((todo) => todo.id)

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} todoId={todoId} />
  })

  console.log('rendering TodoList...')

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
