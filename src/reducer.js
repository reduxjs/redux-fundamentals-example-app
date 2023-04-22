import filtersReducer from "./filters/filterSlice";
import todosReducer from "./todos/todoSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducer;
