import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../store/slices/todos.slice";
import Header from "./header/Header";
import Main from "./main/Main";

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
