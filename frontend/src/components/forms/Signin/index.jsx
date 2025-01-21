import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "./values";
import style from "../auth.module.css";
import InputItem from "../../UI/input-item/InputItem";

const Signin = ({ setSignin, handleSubmit }) => {
  const handleRegistrate = () => {
    setSignin((prev) => !prev);
  };

  const handleInputChange = (e, formik) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...formik.values,
      [name]: value,
    };

    formik.setValues(updatedValues);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formik) => (
          <Form className={style.form}>
            <InputItem
              formik={formik}
              handleChange={handleInputChange}
              placeholder={"example@gmail.com"}
              type={"email"}
              name={"email"}
              autoComplete={"email"}
              label={"Email"}
            />
            <InputItem
              formik={formik}
              handleChange={handleInputChange}
              placeholder={"* * * * * * * *"}
              type={"password"}
              name={"password"}
              autoComplete={"password"}
              label={"Password"}
            />

            <button className={style.formButton} type="submit">
              Sign in
            </button>
            <button className={style.formButton} onClick={handleRegistrate}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signin;
