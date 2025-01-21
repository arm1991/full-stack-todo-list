import { ErrorMessage, Field } from "formik";
import style from "./styles.module.css";
import { useState } from "react";

const InputItem = ({ placeholder, type, name, autoComplete, label }) => {
  const [inputType, setInputType] = useState(type);

  const toggleShowPassword = () => {
    setInputType((value) => {
      if (value === "password") {
        return "text";
      } else {
        return "password";
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <span className={style.error}>
        <ErrorMessage name={name} />
      </span>
      <Field
        className={style.formInput}
        type={inputType}
        autoComplete={autoComplete}
        placeholder={placeholder}
        name={name}
      />
      {type === "password" && (
        <button
          className={style.showPassword}
          type="button"
          onClick={toggleShowPassword}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
          >
            <path d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7-11-7-11-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default InputItem;
