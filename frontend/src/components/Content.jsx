import { useEffect } from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import { getTodos } from "../redux/slices/todos.slice";
import { useDispatch, useSelector } from "react-redux";

const Content = ({ changeHideDone, hideDone }) => {
  const authStore = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userId = authStore.user.id;

  useEffect(() => {
    dispatch(getTodos(userId));
  }, [dispatch, userId]);
  return (
    <>
      <Header changeHideDone={changeHideDone} hideDone={hideDone} />
      <Main hideDone={hideDone} />
    </>
  );
};
export default Content;
