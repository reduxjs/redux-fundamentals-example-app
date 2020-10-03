const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: 'All',
    colors: [],
  },
}

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false,
          },
        ],
      }
    }
    case 'todos/todoToggled': {
      return {
        // Again copy the entire state object
        ...state,
        // This time, we need to make a copy of the old todos array
        todos: state.todos.map((todo) => {
          // If this isn't the todo item we're looking for, leave it alone
          if (todo.id !== action.payload) {
            return todo
          }

          // We've found the todo that has to change. Return a copy:
          return {
            ...todo,
            // Flip the completed flag
            completed: !todo.completed,
          }
        }),
      }
    }
    default:
      return state
  }
}
