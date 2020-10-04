import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value.trim())

  const handleKeyDown = (e) => {
    // If the user pressed the Enter key:
    if (e.which === 13) {
      // highlight-start
      // Dispatch the "todo added" action with this text
      dispatch({ type: 'todos/todoAdded', payload: text })
      // highlight-end
      // And clear out the text input
      setText('')
    }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
