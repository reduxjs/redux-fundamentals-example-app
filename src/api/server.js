import { http, HttpResponse, delay } from 'msw'
import { setupServer } from 'msw/native'

// Add an extra delay to all endpoints, so loading spinners show up.
// Set this to 2000 to simulate a slow network.
const ARTIFICIAL_DELAY_MS = 2000

// In-memory "database" of todo entries
let todos = [
  { id: 0, text: 'Buy milk', completed: false, color: '' },
  { id: 1, text: 'Clean house', completed: false, color: '' },
  { id: 2, text: 'Read newspaper', completed: false, color: '' },
  { id: 3, text: 'Buy toys', completed: false, color: '' },
  { id: 4, text: 'Clean car', completed: false, color: '' },
]

let nextId = todos.length

const findTodo = (id) => todos.find((todo) => todo.id === Number(id))

export const handlers = [
  http.get('/fakeApi/todos', async () => {
    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json({ todos })
  }),

  http.get('/fakeApi/todos/:todoId', async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS)
    const todo = findTodo(params.todoId)
    if (!todo) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({ todo })
  }),

  http.post('/fakeApi/todos', async ({ request }) => {
    await delay(ARTIFICIAL_DELAY_MS)
    const data = await request.json()

    if (data.todo.text === 'error') {
      return HttpResponse.json(
        { message: 'Could not save the todo!' },
        { status: 500 }
      )
    }

    const todo = {
      id: nextId++,
      text: data.todo.text,
      completed: false,
      color: '',
      ...data.todo,
    }
    todos.push(todo)
    return HttpResponse.json({ todo })
  }),

  http.put('/fakeApi/todos/:todoId', async ({ request, params }) => {
    await delay(ARTIFICIAL_DELAY_MS)
    const todo = findTodo(params.todoId)
    if (!todo) {
      return new HttpResponse(null, { status: 404 })
    }
    const data = await request.json()
    Object.assign(todo, data.todo, { id: todo.id })
    return HttpResponse.json({ todo })
  }),

  http.delete('/fakeApi/todos/:todoId', async ({ params }) => {
    await delay(ARTIFICIAL_DELAY_MS)
    const todo = findTodo(params.todoId)
    if (!todo) {
      return new HttpResponse(null, { status: 404 })
    }
    todos = todos.filter((t) => t !== todo)
    return HttpResponse.json({ todo })
  }),
]

// This uses the `msw/native` entry point, which intercepts `fetch` calls
// directly in the page rather than registering a browser service worker.
// That allows the fake API to run inside browser sandboxes like StackBlitz.
export const server = setupServer(...handlers)

server.listen({ onUnhandledRequest: 'bypass' })
