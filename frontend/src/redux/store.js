import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todos.slice";
import authReducer from "./slices/auth.slice";

const store = configureStore({
  reducer: { todos: todosReducer, auth: authReducer },
});

export default store;
