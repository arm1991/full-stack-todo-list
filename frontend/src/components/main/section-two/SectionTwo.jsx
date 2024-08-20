import "./SectionTwo.css";
import Todo from "./todo/Todo";

const SectionTwo = ({
    hideDone,
    todos,
    deleteTodo,
    editingTodo,
    editTodo,
    markAsDoneTodo,
}) => {
    return (
        <section className="section-two">
            {todos && todos.length ? (
                todos.map((todo) =>
                    !hideDone || !todo?.done ? (
                        <Todo
                            key={todo?.id?.toString()}
                            todo={todo}
                            deleteTodo={deleteTodo}
                            editingTodo={editingTodo}
                            editTodo={editTodo}
                            markAsDoneTodo={markAsDoneTodo}
                        />
                    ) : null
                )
            ) : (
                <></>
            )}
        </section>
    );
};

export default SectionTwo;
