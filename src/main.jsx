import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import './api/server'

import store from './store'

console.log('Dispatching action')
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
console.log('Dispatch complete')

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
