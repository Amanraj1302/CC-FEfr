import React from "react";
import { SignIn } from "../Pages/SignIn";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../Pages/Home'
import {GetOtp} from '../Pages/GetOtp'
import { SignUp} from '../Pages/SignUp';
export const Routers:React.FC= () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn  />} />
        <Route path="/getotp" element={<GetOtp />} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
    
  );
}

