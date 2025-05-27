import React, { act } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { formSchema } from '../Schemas/index'
import { useEffect } from 'react';
import { error } from 'console';

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
    placeholder: 'Enter your Email',
    type: 'text',
  },
  {
    id: 'password',
    label: 'Create Password',
    placeholder: 'Enter your Password',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Re-enter your Password',
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

      console.log(values, action);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000));
      action.resetForm();

      toast.success("Sign Up Successful");
    },
    validationSchema: formSchema,

  });
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-white px-4 ">
      <div className="w-full max-w-sm bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
       
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

        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </div>
    </div>
  )
}





 {/* <form autoComplete="off" onSubmit={handleSubmit}>


          <label className="block text-sm mb-1" > User Name</label>
          <input
            value={values.userName}
            onChange={handleChange}
            id='userName'
            type='text'
            placeholder='Enter your Name'
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "input-error" : ""
              + "w-full border rounded px-3 py-2 mb-4 outline-none"}
          />
          {errors.userName && touched.userName && <p className="text-red-500 text-sm mb-2">{errors.userName}</p>}

          <div className="flex items-center justify-center mb-4">
            <hr className="flex-grow border-t" />
      
            <hr className="flex-grow border-t" />
          </div>

          <label className="block text-sm mb-1"> Email</label>
          <input
            value={values.email}
            onChange={handleChange}
            id='email'
            type='text'
            placeholder='Enter your Email'
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""
              + " w-full border rounded px-3 py-2 mb-4 outline-none"}

          />
          {errors.email && touched.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <div className="flex items-center justify-center mb-4">
            <hr className="flex-grow border-t" />
            
            <hr className="flex-grow border-t" />
          </div>

          <label className="block text-sm mb-1" >Create Password</label>
          <input
            value={values.password}
            onChange={handleChange}
            id='password'
            type='text'
            placeholder='Enter your Password'
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""
              + "w-full border rounded px-3 py-2 mb-4 outline-none"}
          />
          {errors.password && touched.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <div className="flex items-center justify-center mb-4">
            <hr className="flex-grow border-t" />

            <hr className="flex-grow border-t" />
          </div>

          <label className="block text-sm mb-1" > Confirm Password</label>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            id='confirmPassword'
            type='text'
            placeholder='Re-enter your Password'
            onBlur={handleBlur}
            className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""
              + "w-full border rounded px-3 py-2 mb-4 outline-none"}
          />
          {errors.confirmPassword && touched.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}

          <button type="submit" className="w-full py-2 rounded text-Black bg-red-600 hover:bg-red-700">
            Submit
          </button>
        </form> */}
















