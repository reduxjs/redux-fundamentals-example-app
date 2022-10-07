import todosReducer from './todosSlice'

let initialState

beforeEach(() => {
  initialState = []
  initialState.push({ id: 0, text: 'Test text', completed: false })
})

test('Adds todo to state', () => {
  expect.assertions(2)
  const todoText = 'Added todo'
  const action = { type: 'todos/todoAdded', payload: todoText }
  const result = todosReducer(initialState, action)
  expect(result[1].text).toEqual(todoText)
  expect(result.length).toEqual(2)
})

test('Toggles a todo based on id', () => {
  expect.assertions(2)
  const action = { type: 'todos/todoToggled', payload: 0 }
  const result = todosReducer(initialState, action)
  expect(result[0].completed).toBe(true)
  const result2 = todosReducer(result, action)
  expect(result2[0].completed).toBe(false)
})

test('Should update color of selected todo', () => {
  expect.assertions(1)
  const selectedColor = 'purple'
  const action = {
    type: 'todos/colorSelected',
    payload: { todoId: 0, color: selectedColor },
  }
  const result = todosReducer(initialState, action)
  expect(result[0].color).toEqual(selectedColor)
})

test('Should delete selected todo', () => {
  expect.assertions(4)
  const todoText = 'Added todo'
  const actionAdd = { type: 'todos/todoAdded', payload: todoText }
  const result = todosReducer(initialState, actionAdd)
  expect(result.length).toEqual(2)
  expect(result[1].id).toEqual(1)
  const actionDelete = { type: 'todos/todoDeleted', payload: 1 }
  const result2 = todosReducer(result, actionDelete)
  expect(result2.length).toEqual(1)
  expect(result2[0].id).toEqual(0)
})

test('Should mark all todos as completed', () => {
  expect.assertions(4)
  const todoText = 'Added todo'
  const actionAdd = { type: 'todos/todoAdded', payload: todoText }
  const result = todosReducer(initialState, actionAdd)
  expect(result[0].completed).toBe(false)
  expect(result[1].completed).toBe(false)
  const actionCompleteAll = { type: 'todos/allCompleted' }
  const result2 = todosReducer(result, actionCompleteAll)
  expect(result2[0].completed).toBe(true)
  expect(result2[1].completed).toBe(true)
})

test('Should clear all todos with completed status', () => {
  expect.assertions(7)
  const todoText = 'Added todo'
  const actionAdd = { type: 'todos/todoAdded', payload: todoText }
  const result = todosReducer(initialState, actionAdd)
  expect(result[0].completed).toBe(false)
  expect(result[1].completed).toBe(false)
  const actionCompleteTodo0 = { type: 'todos/todoToggled', payload: 0 }
  const result2 = todosReducer(result, actionCompleteTodo0)
  expect(result2[0].completed).toBe(true)
  expect(result2[1].completed).toBe(false)
  expect(result2.length).toEqual(2)
  const actionDeleteAllCompleted = { type: 'todos/completedCleared' }
  const result3 = todosReducer(result2, actionDeleteAllCompleted)
  expect(result3.length).toBe(1)
  expect(result3[0].id).toBe(1)
})
