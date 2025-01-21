import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, registration } from "../store/slices/auth.slice";
import Signin from "./forms/Signin";
import Signup from "./forms/Signup";

const Auth = () => {
  const [signIn, setSignin] = useState(true);

  const dispatch = useDispatch();

  const handleRegistrationClick = ({ email, password, fullname }) => {
    dispatch(registration(email, password, fullname));
  };

  const handleLoginClick = ({ email, password }) => {
    dispatch(login(email, password));
  };

  return (
    <>
      {signIn ? (
        <Signin setSignin={setSignin} handleSubmit={handleLoginClick} />
      ) : (
        <Signup setSignin={setSignin} handleSubmit={handleRegistrationClick} />
      )}
    </>
  );
};

export default Auth;
