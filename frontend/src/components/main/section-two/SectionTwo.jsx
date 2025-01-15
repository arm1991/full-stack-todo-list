import { useDispatch, useSelector } from "react-redux";
import { removeTodoError } from "../../../redux/slices/todos.slice";
import Todo from "./todo/Todo";
import ErrorModal from "../../ErrorModal";
import "./SectionTwo.css";

const SectionTwo = ({ hideDone }) => {
  const todoStore = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      {todoStore.isError && (
        <ErrorModal
          message={todoStore.errorMessage}
          handleModalClose={() => dispatch(removeTodoError())}
        />
      )}
      <section className="section-two">
        {todoStore.data && todoStore.data.length ? (
          todoStore.data.map((todo) =>
            !hideDone || !todo?.done ? (
              <Todo key={todo?._id?.toString()} todo={todo} />
            ) : null
          )
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default SectionTwo;
