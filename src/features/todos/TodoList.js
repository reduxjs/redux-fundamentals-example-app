import React from 'react'

import TodoListItem from './TodoListItem'

const TodoList = ({ todos }) => {
  const renderedItems = todos.map((todo) => {
    const onTodoCompleted = () =>
      console.log('Todo completed changed: ', todo.id)
    const onTodoColorChanged = (color) =>
      console.log('Todo color changed: ', todo.id, color)

    const onTodoDeleted = () => console.log('Todo deleted: ', todo.id)

    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        onCompletedChange={onTodoCompleted}
        onColorChange={onTodoColorChanged}
        onDelete={onTodoDeleted}
      />
    )
  })

  return <ul className="todo-list">{renderedItems}</ul>
}

export default TodoList
