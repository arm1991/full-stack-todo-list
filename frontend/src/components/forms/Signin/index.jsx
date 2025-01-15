import { Field, Form, Formik, ErrorMessage } from "formik";
import { initialValues, validationSchema } from "./values";
import style from "../auth.module.css";

const Signin = ({ setSignin, handleSubmit }) => {
  const handleRegistrate = () => {
    setSignin((prev) => !prev);
  };

  const handleChange = (e, formik) => {
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
                autoComplete="email"
                name="email"
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
              </span>
              <Field
                className={style.formInput}
                type="password"
                name="password"
                placeholder="* * * * * * * *"
                onChange={(e) => handleChange(e, formik)}
              />
            </div>

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
