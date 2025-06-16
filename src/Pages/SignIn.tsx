
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { loginSchema } from '../Schemas/loginSchema';
import { useAuth } from '../context/AuthContext';

type FormValues = {
  email: string;
  password: string;
};

const formFields = [
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email'
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password'
  },

] as const;

export const SignIn: React.FC = () => {

  const navigate = useNavigate();

  const { login } = useAuth();
  const { values, handleBlur, errors, handleSubmit, touched, handleChange } = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, action) => {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        });
        const { email } = values;
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error || "Login failed");
        } else {
          toast.success("Login successful");
          login(email);
          action.resetForm();
          navigate(`/app/dashboard/0`);

        }
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
        console.error(error);
      }
    },
    validationSchema: loginSchema,
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {formFields.map(({ id, label, placeholder, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm mb-1 font-medium">
                {label}
              </label>
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
                    ? "input-error w-full border border-red-500 rounded px-3 py-2 mb-2 outline-none"
                    : "w-full border border-gray-300 rounded px-3 py-2 mb-2 outline-none"
                }
              />
              {errors[id as keyof FormValues] && touched[id as keyof FormValues] && (
                <p className="text-red-500 text-sm mb-2">
                  {errors[id as keyof FormValues]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 rounded text-black bg-red-600 hover:bg-red-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signUp")}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>

  );

}

