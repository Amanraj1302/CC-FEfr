import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Routers } from './routers/Routers';
import './App.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { Footer } from './components/Footer';
import { FadeLoader } from 'react-spinners';


function App() {
  const { login } = useAuth();
  const [isloading, setIsLoading] = useState(true);
  const refreshToken = async () => {
    try {
      const response: any = await fetch("http://localhost:5000/api/users/getDetails", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      console.log("response", response);
      if (!response.ok) return;
      const result = await response.json();
      const email = result.data.email;
      const name = result.data.userName;
      login({ email, userName: name });

    } catch (err) {
      console.log("###########", err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    refreshToken();
  }, [])
  if (isloading) {
    return <div className=" flex justify-center items-center h-screen" ><FadeLoader /></div>
  }
  else {
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
}
export { App };


