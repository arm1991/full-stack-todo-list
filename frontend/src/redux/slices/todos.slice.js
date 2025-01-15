import { createSlice } from "@reduxjs/toolkit";
import TodoService from "../../services/TodoService";
import { getErrorTextFromResponse } from "../../helpers";

const initialState = {
  data: null,
  isError: false,
  errorMessage: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.data = payload;
    },

    setIsEditing(state, { payload }) {
      const id = payload;
      state.data = state.data.map((todo) => {
        if (todo._id === id) {
          return {
            ...todo,
            isEditing: !todo.isEditing,
          };
        }
        return todo;
      });
    },

    setTodoError(state, { payload }) {
      state.isError = true;
      state.errorMessage = payload;
    },

    removeTodoError(state) {
      state.isError = false;
      state.errorMessage = "";
    },
  },
});

export const { setData, setIsEditing, setTodoError, removeTodoError } =
  todosSlice.actions;
export default todosSlice.reducer;

export const getTodos = (userId) => async (dispatch) => {
  try {
    const { data } = await TodoService.getTodos(userId);

    dispatch(setData(data));
  } catch (e) {
    if (e.response?.data) {
      const errorMessage = getErrorTextFromResponse(e.response.data);

      dispatch(setTodoError(errorMessage));
    } else {
      dispatch(setTodoError("Unknown error occurred"));
    }
  }
};

export const deleteTodo = (userId, todoId) => async (dispatch) => {
  try {
    const { data } = await TodoService.deleteTodo(userId, todoId);

    dispatch(setData(data));
  } catch (e) {
    if (e.response?.data) {
      const errorMessage = getErrorTextFromResponse(e.response.data);

      dispatch(setTodoError(errorMessage));
    } else {
      dispatch(setTodoError("Unknown error occurred"));
    }
  }
};

export const editTodo =
  (userId, todoId, propertyName, value) => async (dispatch) => {
    try {
      const { data } = await TodoService.editTodo(
        userId,
        todoId,
        propertyName,
        value
      );

      dispatch(setData(data));
    } catch (e) {
      if (e.response?.data) {
        const errorMessage =
          e.response.data
            .match(/<pre>Error:.*?<br>/)[0]
            .replace(/<br>/, "")
            .replace(/<pre>/, "") || "Unknown error occurred";

        dispatch(setTodoError(errorMessage));
      } else {
        dispatch(setTodoError("Unknown error occurred"));
      }
    }
  };

export const addTodo = (userId, todo) => async (dispatch) => {
  try {
    const { data } = await TodoService.addTodo(userId, todo);

    dispatch(setData(data));
  } catch (e) {
    if (e.response?.data) {
      const errorMessage = getErrorTextFromResponse(e.response.data);

      dispatch(setTodoError(errorMessage));
    } else {
      dispatch(setTodoError("Unknown error occurred"));
    }
  }
};
