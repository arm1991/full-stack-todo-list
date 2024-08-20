import { useState } from "react";
import "./SectionOne.css";

const SectionOne = ({ onAddItem }) => {
    let [input, setInput] = useState("");
    
    const saveEvent = () => {
        if (input.trim() === "") return;
        onAddItem({
            id: Math.floor(
                Math.random() * Math.floor(Math.random() * Date.now())
            ),
            title: input,
            done: false,
            isEditing: false,
        });
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
                onClick={() => saveEvent()}
            >
                save
            </button>
        </section>
    );
};

export default SectionOne;
