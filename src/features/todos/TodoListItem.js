import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  deleteTodo,
  selectColor,
  selectTodoById,
  toggleTodo,
} from './todosSlice'
import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availableColors, capitalize } from '../filters/colors'

const TodoListItem = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId))
  const { text, completed, color } = todo

  const dispatch = useDispatch()

  const onCompletedChange = () => {
    dispatch(toggleTodo(todoId))
  }

  const onColorChange = (value) => {
    dispatch(selectColor(value, todoId))
  }

  const onDelete = () => {
    dispatch(deleteTodo(todoId))
  }

  const handleCompletedChanged = (e) => {
    onCompletedChange(e.target.checked)
  }

  const handleColorChanged = (e) => {
    onColorChange(e.target.value)
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
