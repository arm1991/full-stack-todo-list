import "./Todo.css";
import deleteImg from "./assets/delete.svg";
import editImg from "./assets/edit.svg";
import markAsDoneImg from "./assets/mark-as-done.svg";
import { useState } from "react";

const Todo = ({ todo, deleteTodo, editingTodo, editTodo, markAsDoneTodo }) => {
    let [input, setInput] = useState(todo?.title || "");

    const saveEvent = (id) => {
        editTodo(id, input);
    };

    const deleteItem = (id) => {
        deleteTodo(id);
    };

    const markAsDoneItem = (id) => {
        markAsDoneTodo(id);
    };

    const editItem = (id) => {
        editingTodo(id);
    };

    return (
        <div className="lists">
            {!todo?.isEditing ? (
                <>
                    <h4 className={todo?.done ? "done" : ""}>{todo?.title}</h4>
                    <div className="images">
                        <img
                            src={deleteImg}
                            onClick={() => deleteItem(todo.id)}
                            alt="delete"
                        />
                        <img
                            src={editImg}
                            onClick={() => editItem(todo.id)}
                            alt="edit"
                        />
                        <img
                            src={markAsDoneImg}
                            onClick={() => markAsDoneItem(todo.id)}
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
                        onClick={() => saveEvent(todo.id)}
                    >
                        save
                    </button>
                </>
            )}
        </div>
    );
};

export default Todo;
