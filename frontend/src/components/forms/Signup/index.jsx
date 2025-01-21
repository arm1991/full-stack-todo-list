import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "./values";
import InputItem from "../../UI/input-item/InputItem";
import style from "../auth.module.css";
import { useDispatch } from "react-redux";
import { setAuthError } from "../../../store/slices/auth.slice";

const Signup = ({ setSignin, handleSubmit }) => {
  const dispatch = useDispatch();
  const handleLoginClick = () => {
    setSignin((prev) => !prev);
  };

  const handleFormSubmit = (values) => {
    if (values.password !== values.repeatPassword) {
      dispatch(setAuthError("Passwords does not match"));
    } else {
      handleSubmit(values);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {() => (
          <Form className={style.form}>
            <InputItem
              placeholder={"Joe Smith"}
              type={"text"}
              name={"fullname"}
              autoComplete={"name"}
              label={"Full Name"}
            />
            <InputItem
              placeholder={"example@gmail.com"}
              type={"email"}
              name={"email"}
              autoComplete={"email"}
              label={"Email"}
            />
            <InputItem
              placeholder={"* * * * * * * *"}
              type={"password"}
              name={"password"}
              autoComplete={"password"}
              label={"Password"}
            />
            <InputItem
              placeholder={"* * * * * * * *"}
              type={"password"}
              name={"repeatPassword"}
              autoComplete={"password"}
              label={"Repeat Password"}
            />
            <button className={style.formButton} type="submit">
              Sign up
            </button>
            <button className={style.formButton} onClick={handleLoginClick}>
              Sign in
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
