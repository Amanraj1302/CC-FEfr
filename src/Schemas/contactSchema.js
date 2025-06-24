import * as Yup from "yup";

export const contactValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Invalid Indian phone number")
    .required("Phone number is required"),

  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});
