import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import rootReducer from './reducer'

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
  // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)
export default store
