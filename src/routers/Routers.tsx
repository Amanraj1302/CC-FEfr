import React from "react";
import { SignIn } from "../Pages/SignIn";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../Pages/Home'
import {GetOtp} from '../Pages/GetOtp'
import { SignUp} from '../Pages/SignUp';
import { ProtectedRoutes } from "./ProtectedRoutes";
import { About } from "../Pages/About";
import { Contact } from "../Pages/Contact";
import { Project } from "../Pages/Project";
import { ProjectForm } from "../formPages/projectForm";
export const Routers:React.FC= () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signIn" element={<SignIn  />} />
        <Route path="/getotp/:email" element={<GetOtp />} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/projects" element={<Project/>}></Route>
        <Route path="/projectForm" element={<ProjectForm/>}></Route>
        <Route path='/app/*' element={<ProtectedRoutes/>}></Route>
      </Routes>
    
  );
}

