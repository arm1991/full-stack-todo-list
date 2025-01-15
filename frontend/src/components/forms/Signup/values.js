import * as Yup from "yup";

export const initialValues = {
  fullname: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Required"),
  fullname: Yup.string()
    .min(3, "Too Short")
    .max(32, "Too Long")
    .required("Required"),
  password: Yup.string()
    .max(32, "Must be max 32 characters")
    .min(3, "Must be min 3 characters")
    .required("Required"),
  repeatPassword: Yup.string()
    .max(32, "Must be max 32 characters")
    .min(3, "Must be min 3 characters")
    .required("Required"),
});
