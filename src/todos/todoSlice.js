const initialState = [
  // { id: 0, text: "Learn React", completed: true },
  // { id: 1, text: "Learn Redux", completed: false, color: "purple" },
  // { id: 2, text: "Build something fun!", completed: false, color: "blue" },
];

const nextId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/addTodo": {
      return [
        ...state,
        {
          id: nextId(state),
          text: action.payload,
          completed: false,
        },
      ];
    }

    case "todos/toggleTodo": {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
        return { ...todo, completed: !todo.completed };
      });
    }

    default:
      return state;
  }
};

export default todosReducer;
