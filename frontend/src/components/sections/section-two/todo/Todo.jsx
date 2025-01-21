import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteTodo,
  editTodo,
  setIsEditing,
} from "../../../../store/slices/todos.slice";
import deleteImg from "./assets/delete.svg";
import editImg from "./assets/edit.svg";
import markAsDoneImg from "./assets/mark-as-done.svg";
import "./Todo.css";

const Todo = ({ todo }) => {
  const [input, setInput] = useState(todo?.title || "");
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const userId = authStore.user.id;

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(userId, todoId));
  };

  const handleEditTodo = (todoId, propertyName, value) => {
    dispatch(editTodo(userId, todoId, propertyName, value));
  };

  const handleEditingTodo = (todoId) => {
    dispatch(setIsEditing(todoId));
  };

  const handleSaveEditedTodo = (todoId, propertyName, value) => {
    dispatch(setIsEditing(todoId));
    dispatch(editTodo(userId, todoId, propertyName, value));
  };

  return (
    <div className="lists">
      {!todo?.isEditing ? (
        <>
          <h4 className={todo?.done ? "done" : ""}>{todo?.title}</h4>
          <div className="images">
            <img
              src={deleteImg}
              onClick={() => handleDeleteTodo(todo?.id)}
              alt="delete"
            />
            <img
              src={editImg}
              onClick={() => handleEditingTodo(todo?.id)}
              alt="edit"
            />
            <img
              src={markAsDoneImg}
              onClick={() => handleEditTodo(todo?.id, "done", !todo.done)}
              alt="mark as done"
            />
          </div>
        </>
      ) : (
        <>
          <input
            className="editing-input"
            type="text"
            value={input}
            onChange={(e) => setInput(() => e.target.value)}
          />
          <button
            className="editing-save"
            onClick={() => handleSaveEditedTodo(todo?.id, "title", input)}
          >
            save
          </button>
        </>
      )}
    </div>
  );
};

export default Todo;
