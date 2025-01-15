import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Required"),
  password: Yup.string()
    .min(3, "Must be min 3 characters")
    .max(32, "Must be max 32 characters")
    .required("Required"),
});
