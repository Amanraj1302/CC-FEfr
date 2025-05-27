
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignIn: React.FC = () => {
 
 const [password, setpassword] = useState('');
   const [email, setEmail] = useState('');
   const navigate = useNavigate();
 
 
   const handleGetOtp = (): void => {
    
       toast.success("OTP Sent");
       setTimeout(() => {
         navigate('/getotp');
       }, 2000);
     }
 
 return(
<div className="min-h-screen flex items-center justify-center bg-white px-4 ">
      <div className="w-full max-w-sm bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 outline-none"
        />


        <div className="flex items-center justify-center mb-4">
          <hr className="flex-grow border-t" />
          
          <hr className="flex-grow border-t" />
        </div>

        <label className="block text-sm mb-1">Password</label>
        <input
          type="String"
          placeholder="Enter your email"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 outline-none"
        />

        <button
          onClick={handleGetOtp}
        
          className={`w-full py-2 rounded text-white ${password && email ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          Submit
        </button>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
    
  );
};




