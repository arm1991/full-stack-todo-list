import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, removeAuthError } from "./redux/slices/auth.slice";
import Auth from "./components/Auth";
import Content from "./components/Content";
import ErrorModal from "./components/ErrorModal";

export const AuthContext = createContext();

function App() {
  const [hideDone, setHideDone] = useState(false);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);

  const changeHideDone = () => {
    setHideDone(() => !hideDone);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      <AuthContext.Provider value={authStore}>
        {authStore.isError && (
          <ErrorModal
            message={authStore.errorMessage}
            handleModalClose={() => dispatch(removeAuthError())}
          />
        )}
        {!authStore.isAuth ? (
          <Auth />
        ) : (
          <Content changeHideDone={changeHideDone} hideDone={hideDone} />
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
