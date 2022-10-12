import todosReducer, {
  deleteTodo,
  selectColor,
  todoAdded,
  todosAllCompleted,
  todosClearCompleted,
  toggleTodo,
} from './todosSlice'

let initialState

const todoText = 'Added todo'
const todoId = 1
const todoCompleted = false

const todo = {
  id: todoId,
  text: todoText,
  completed: todoCompleted,
}

beforeEach(() => {
  initialState = {
    status: 'idle',
    entities: {
      0: {
        id: 0,
        text: 'Initial todo',
        completed: false,
      },
    },
  }
})

test('Adds todo to state', () => {
  expect.assertions(2)
  const action = todoAdded(todo)
  const result = todosReducer(initialState, action)
  expect(result.entities[1].text).toEqual(todoText)
  expect(Object.keys(result.entities).length).toEqual(2)
})

test('Toggles a todo based on id', () => {
  expect.assertions(2)
  const action = toggleTodo(0)
  const result = todosReducer(initialState, action)
  expect(result.entities[0].completed).toBe(true)
  const result2 = todosReducer(result, action)
  expect(result2.entities[0].completed).toBe(false)
})

test('Should update color of selected todo', () => {
  expect.assertions(1)
  const selectedColor = 'purple'
  const action = selectColor(selectedColor, 0)
  const result = todosReducer(initialState, action)
  expect(result.entities[0].color).toEqual(selectedColor)
})

test('Should delete selected todo', () => {
  expect.assertions(4)
  const actionAdd = todoAdded(todo)
  const result = todosReducer(initialState, actionAdd)
  expect(Object.keys(result.entities).length).toEqual(2)
  expect(result.entities[1].id).toEqual(1)
  const actionDelete = deleteTodo(1)
  const result2 = todosReducer(result, actionDelete)
  expect(Object.keys(result2.entities).length).toEqual(1)
  expect(result2.entities[0].id).toEqual(0)
})

test('Should mark all todos as completed', () => {
  expect.assertions(4)
  const actionAdd = todoAdded(todo)
  const result = todosReducer(initialState, actionAdd)
  expect(result.entities[0].completed).toBe(false)
  expect(result.entities[1].completed).toBe(false)
  const actionCompleteAll = todosAllCompleted()
  const result2 = todosReducer(result, actionCompleteAll)
  expect(result2.entities[0].completed).toBe(true)
  expect(result2.entities[1].completed).toBe(true)
})

test('Should clear all todos with completed status', () => {
  expect.assertions(7)
  const actionAdd = todoAdded(todo)
  const result = todosReducer(initialState, actionAdd)
  expect(result.entities[0].completed).toBe(false)
  expect(result.entities[1].completed).toBe(false)
  const actionCompleteTodo0 = toggleTodo(0)
  const result2 = todosReducer(result, actionCompleteTodo0)
  expect(result2.entities[0].completed).toBe(true)
  expect(result2.entities[1].completed).toBe(false)
  expect(Object.keys(result2.entities).length).toEqual(2)
  const actionDeleteAllCompleted = todosClearCompleted()
  const result3 = todosReducer(result2, actionDeleteAllCompleted)
  expect(Object.keys(result3.entities).length).toBe(1)
  expect(result3.entities[1].id).toBe(1)
})
