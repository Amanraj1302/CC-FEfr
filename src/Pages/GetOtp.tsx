import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { otpSchema } from '../Schemas/loginSchema';

const otpFields = Array.from({ length: 6 });

export const GetOtp: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const { email } = useParams();
  console.log("🚀 ~ email:", email)

  // const query = new URLSearchParams(useLocation().search);
  // console.log("🚀 ~ query:", query)
  // const email = query.get('email');

  const [isValidEmail, setIsValidEmail] = useState(true);


  const verifyOtp = async (email: string, otp: string) => {

    try {
      const response = await fetch('http://localhost:5000/api/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      console.log("🚀 ~ verifyOtp ~ response:", response)

      return response;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: Array(6).fill(''),
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      const enteredOtp = values.otp.join('');
      const response = await verifyOtp(email || '', enteredOtp);
      if (response && response?.ok) {
        toast.success('OTP verified successfully!');
       
        navigate('/signIn');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const otp = [...formik.values.otp];
    otp[index] = value;
    formik.setFieldValue('otp', otp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      (next as HTMLInputElement)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      (prev as HTMLInputElement)?.focus();
    }
  };

  
  if (!isValidEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center bg-red-100 text-red-600 px-4 py-6 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2">Invalid or Missing Email</h2>
          <p className="text-sm">Please provide a valid email address in the URL.</p>
          <p className="mt-2 text-xs text-gray-500">Example: <code>/getotp?email=your@email.com</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
        <p className="mb-4 text-center text-gray-600">
          Enter the 6-digit OTP sent to <br />
          <span className="text-blue-600">{email}</span>
        </p>

        <div className="mt-4 flex justify-center text-sm text-blue-600 font-medium gap-8">
          <button className="hover:underline">Change email</button>
          <button className="hover:underline">Resend OTP</button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-2 mb-4 mt-6">
            {formik.values.otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                name={`otp[${index}]`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            ))}
          </div>

          {formik.errors.otp && typeof formik.errors.otp === 'string' && (
            <p className="text-red-500 text-sm mb-2 text-center">{formik.errors.otp}</p>
          )}

          <button
            type="submit"
            disabled={formik.values.otp.includes('')}
            className={`w-40 py-2 rounded text-white mx-auto block ${formik.values.otp.includes('')
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
