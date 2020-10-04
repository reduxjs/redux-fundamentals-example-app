import React from 'react'

import { availableColors, capitalize } from '../filters/colors'

const TodoListItem = ({ todo, onColorChange, onCompletedChange, onDelete }) => {
  const { text, completed, color } = todo

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
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={handleCompletedChanged}
        />
        <div className="todo-text">{text}</div>
        <select
          className="colorPicker"
          value={color}
          style={{ color }}
          onChange={handleColorChanged}
        >
          <option value=""></option>
          {colorOptions}
        </select>
        <button className="destroy" onClick={onDelete}></button>
      </div>
    </li>
  )
}

export default TodoListItem
