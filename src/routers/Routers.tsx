import React from "react";
import { SignIn } from "../Pages/SignIn";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home'
import {GetOtp} from '../Pages/GetOtp'
import { SignUp} from '../Pages/SignUp';
import { ProtectedRoutes } from "./ProtectedRoutes";
import { About } from "../Pages/About";
import { Contact } from "../Pages/Contact";
import { Project } from "../Pages/Project";
import { ProjectForm } from "../formPages/projectForm";
import { ProjectPage } from "../destinationPage/projectPage";
import { ChangePassword } from "../Pages/Change-Password";
import { BrowseAllProfile} from "../Pages/BrowseAllProfile";

export const Routers:React.FC= () => {
  return (
    
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signIn" element={<SignIn  />} />
        <Route path="/getotp/:email" element={<GetOtp />} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/projects" element={<Project/>}></Route>
        <Route path="/projectForm" element={<ProjectForm/>}></Route>
        <Route path='/projectPage' element={<ProjectPage/>}></Route>
        <Route path='/chnage-password' element={<ChangePassword/>}></Route>
        <Route path='/all-profiles' element={<BrowseAllProfile/>}></Route>
        
        <Route path='/app/*' element={<ProtectedRoutes/>}></Route>
      </Routes>
    
  );
}

