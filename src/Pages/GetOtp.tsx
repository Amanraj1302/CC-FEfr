import React, { useEffect } from 'react'
import  { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



 export const GetOtp: React.FC = () => {
  
   const [otp, setOtp] = useState(Array(6).fill(''));
   
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
       const value = e.target.value;
       if (!/^[0-9]?$/.test(value)) return;
   
       const newOtp = [...otp];
       newOtp[index] = value;
       setOtp(newOtp);
   
       if (value && index < 5) {
         const next = document.getElementById(`otp-${index + 1}`);
         (next as HTMLInputElement)?.focus();
       }
     };
   
     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
       if (e.key === 'Backspace' && !otp[index] && index > 0) {
         const prev = document.getElementById(`otp-${index - 1}`);
         (prev as HTMLInputElement)?.focus();
       }
     };
   
     const handleSubmit = (): void => {
       const enteredOtp: string = otp.join('');
       toast.success(`Entered OTP: ${enteredOtp}`);
     };
   
   
    return (
         <div className="min-h-screen flex items-center justify-center  bg-white px-4 ">
       
     
           <div className="flex flex-col items-center justify-center  w-full max-w-sm bg-white p-6 rounded shadow">
             <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
             <p className="mb-4 text-center text-gray-600">
               Enter the 6-digit OTP sent to <br />
               <span className="text-blue-600">abc@yopmail.com</span>
             </p>
             <div className="mt-4 flex justify-center text-sm text-blue-600 font-medium gap-8">
               <button className="hover:underline">Change email</button>
               <button className="hover:underline">Resend OTP</button>
             </div>
     
     
             <div className="flex space-x-2 mb-4">
               {otp.map((digit, index) => (
                 <input
                   key={index}
                   id={`otp-${index}`}
                   type="text"
                   maxLength={1}
                   value={digit}
                   onChange={(e) => handleChange(e, index)}
                   onKeyDown={(e) => handleKeyDown(e, index)}
                   className="w-10 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                 />
               ))}
             </div>
     
             <button
               onClick={handleSubmit}
               disabled={otp.includes('')}
               className={`w-40 py-2 rounded text-white ${otp.includes('') ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                 }`}
             >
               Submit
             </button>
           </div>
     
           <ToastContainer position="top-center" autoClose={3000} theme="colored" />
     
         </div>
  
  );
};







