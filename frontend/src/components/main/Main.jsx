import SectionOne from "./section-one/SectionOne";
import SectionTwo from "./section-two/SectionTwo";
import { $DELETE, $POST, $PUT } from "../../api";
import { setIsEditing } from "../../redux/slices/todos.slice";
import { useDispatch, useSelector } from "react-redux";
import "./Main.css";

const Main = ({ hideDone, get }) => {
    const todos = useSelector((state) => state.todos.data);
    const dispatch = useDispatch();

    const addItemToStore = (newItem) => {
        const set = async (newItem) => {
            try {
                await $POST("/addTodo", JSON.stringify(newItem));
                await get();
            } catch (err) {
                throw console.log(err);
            }
        };

        set(newItem);
    };

    const deleteTodo = (id) => {
        const deleteCall = async (id) => {
            try {
                await $DELETE("/deleteTodo", JSON.stringify(id));
                await get();
            } catch (err) {
                throw console.log(err);
            }
        };

        deleteCall(id);
    };

    const editTodo = (id, input) => {
        const changeData = async (id, input) => {
            try {
                await $PUT("/updateTodo", { id, title: input });
                await get();
            } catch (err) {
                console.error(err);
            }
        };
        changeData(id, input);
    };

    const editingTodo = (id) => {
        dispatch(setIsEditing(id));
    };

    const markAsDoneTodo = (id) => {
        const changeData = async (id) => {
            try {
                await $PUT("/updateTodoDone", { id });
                await get();
            } catch (err) {
                console.error(err);
            }
        };

        changeData(id);
    };

    return (
        <main>
            <SectionOne onAddItem={addItemToStore} />
            <SectionTwo
                hideDone={hideDone}
                todos={todos}
                deleteTodo={deleteTodo}
                editingTodo={editingTodo}
                editTodo={editTodo}
                markAsDoneTodo={markAsDoneTodo}
            />
        </main>
    );
};

export default Main;
