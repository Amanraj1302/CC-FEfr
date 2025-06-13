import React, { act } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { formSchema } from '../Schemas/loginSchema'

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
};

const formFields = [
  {
    id: 'userName',
    label: 'User Name',
    placeholder: 'Enter your Name',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    type: 'password',
  },

] as const;

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { values, handleBlur, errors, handleSubmit, touched, handleChange } = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    },

    onSubmit: async (values, action) => {
      try {
        const response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error || "Registration failed");
        } else {
          toast.success("Sign Up Successful");
          action.resetForm();
          navigate(`/getotp/${values.email}`);

        }

      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
        console.error(error);
      }
    }
    ,
    validationSchema: formSchema,

  });

  return (
    <div className="min-h-screen flex items-center  justify-center bg-white px-4 ">
      <div className="w-full max-w-sm bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {formFields.map(({ id, label, placeholder, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm mb-1">{label}</label>
              <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={values[id as keyof FormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors[id as keyof FormValues] && touched[id as keyof FormValues]
                    ? "input-error w-full border rounded px-3 py-2 mb-4 outline-none"
                    : "w-full border rounded px-3 py-2 mb-4 outline-none"
                }
              />
              {errors[id as keyof FormValues] && touched[id as keyof FormValues] && (
                <p className="text-red-500 text-sm mb-2">
                  {errors[id as keyof FormValues]}
                </p>
              )}
            </div>
          ))}

          <button type="submit" className="w-full py-2 rounded text-black bg-red-600 hover:bg-red-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}















