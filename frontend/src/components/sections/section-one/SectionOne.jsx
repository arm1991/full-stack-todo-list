import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../../store/slices/todos.slice";
import "./SectionOne.css";

const SectionOne = () => {
  const authStore = useSelector((state) => state.auth);
  const userId = authStore.user.id;
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const handleCreateTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      title: input,
      done: false,
      isEditing: false,
    };

    dispatch(addTodo(userId, newTodo));
    setInput(() => "");
  };

  return (
    <section className="section-one">
      <input
        type="text"
        placeholder="Arman's To Do List"
        id="to-do-list-body-header-input"
        value={input}
        onChange={(e) => setInput(() => e.target.value)}
        className="todo-input input"
      />
      <button
        id="save"
        className="text to-do-list-body-header-button"
        onClick={handleCreateTodo}
      >
        save
      </button>
    </section>
  );
};

export default SectionOne;
