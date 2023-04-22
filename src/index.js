import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "./api/server";

import store from "./store";

console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("State of dispatch: ", store.getState());
});

store.dispatch({ type: "todos/addTodo", payload: "Learn about actions" });
store.dispatch({ type: "todos/addTodo", payload: "Learn about reducers" });
store.dispatch({ type: "todos/addTodo", payload: "Learn about stores" });

store.dispatch({ type: "todos/toggleTodo", payload: 0 });
store.dispatch({ type: "todos/toggleTodo", payload: 1 });

store.dispatch({ type: "filters/changeFilterStatus", payload: "Active" });
store.dispatch({
  type: "filters/changeFilterColor",
  payload: { color: "red", changeType: "added" },
});

unsubscribe();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
