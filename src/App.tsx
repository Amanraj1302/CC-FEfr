import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Routers } from './components/Routers';
import './App.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { Footer } from './components/Footer';


function App() {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();
  const [isloading, setIsLoading] = useState(true);
  // const refreshToken = async () => {
    
  // }
  // useEffect(() => {
  //   refreshToken();
  // }, [])
  // if (isloading) {
  //   // return Loader;
  // }
    //else {}
    return (
      <>
        <Navbar />
        <Routers />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </>
    );
  }


export { App };


