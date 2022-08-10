import { combineReducers } from "redux";
import filterReducer from "./features/filters/filtersSlice";
import todosReducer from "./features/todos/todosSlice";

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filterReducer
})
// Use the initialState as a default value
export default rootReducer
