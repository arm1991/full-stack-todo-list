import { Field, Form, Formik, ErrorMessage } from "formik";
import { initialValues, validationSchema } from "./values";
import style from "../auth.module.css";
import { useState } from "react";

const Signup = ({ setSignin, handleSubmit }) => {
  const [errorRes, setErrorRes] = useState("");
  const handleLoginClick = () => {
    setSignin((prev) => !prev);
  };

  const handleSubmitClick = (values) => {
    const res = handleSubmit(values);
    if (res) {
      setErrorRes(res);
    }
  };

  const handleChange = (e, formik) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...formik.values,
      [name]: value,
    };

    if (errorRes) {
      setErrorRes("");
    }
    formik.setValues(updatedValues);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmitClick(values)}
      >
        {(formik) => (
          <Form className={style.form}>
            <div className={style.formContainer}>
              <label htmlFor="fullname" className={style.label}>
                Full Name
              </label>
              <span className={style.error}>
                <ErrorMessage name="fullname" />
              </span>
              <Field
                className={style.formInput}
                type="text"
                autoComplete="name"
                placeholder="Joe Smith"
                name="fullname"
                onChange={(e) => handleChange(e, formik)}
              />
            </div>
            <div className={style.formContainer}>
              <label htmlFor="email" className={style.label}>
                Email
              </label>
              <span className={style.error}>
                <ErrorMessage name="email" />
              </span>
              <Field
                className={style.formInput}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                onChange={(e) => handleChange(e, formik)}
              />
            </div>
            <div className={style.formContainer}>
              <label htmlFor="password" className={style.label}>
                Password
              </label>
              <span className={style.error}>
                <ErrorMessage name="password" />
                {errorRes}
              </span>
              <Field
                className={style.formInput}
                type="password"
                name="password"
                placeholder="* * * * * * * *"
                onChange={(e) => handleChange(e, formik)}
              />
            </div>
            <div className={style.formContainer}>
              <label htmlFor="repeatPassword" className={style.label}>
                Repeat Password
              </label>
              <span className={style.error}>
                <ErrorMessage name="repeatPassword" />
              </span>
              <Field
                className={style.formInput}
                type="password"
                name="repeatPassword"
                placeholder="* * * * * * * *"
                onChange={(e) => handleChange(e, formik)}
              />
            </div>

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
