import React from 'react'

import { availableColors, capitalize } from '../filters/colors'
import { StatusFilters } from '../filters/filtersSlice'

const StatusFilter = ({ status, onStatusChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onStatusChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ colors, onColorChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onColorChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

const Footer = () => {
  const colors = ['blue']
  const onColorChange = (color, changeType) =>
    console.log('Color change: ', { color, changeType })

  const status = StatusFilters.Active

  const onStatusChange = (status) => console.log('Status change: ', status)

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>

        <button className="button">Clear Completed</button>
      </div>
      <div className="todo-count">
        <h5>Remaining Todos</h5>
        <strong>1</strong> item left
      </div>

      <StatusFilter status={status} onStatusChange={onStatusChange} />

      <ColorFilters colors={colors} onColorChange={onColorChange} />
    </footer>
  )
}

export default Footer
