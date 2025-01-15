import { useState } from "react";
import { login, registration } from "../redux/slices/auth.slice";
import { useDispatch } from "react-redux";
import Signin from "./forms/Signin";
import Signup from "./forms/Signup";

const Auth = () => {
  const [signIn, setSignin] = useState(true);

  const dispatch = useDispatch();

  const handleRegistrationClick = ({
    email,
    password,
    fullname,
    repeatPassword,
  }) => {
    if (repeatPassword !== password) {
      return "Passwords does not match";
    }
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
