import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  console.log("🚀 ~ pathname:", pathname)

  const hideButtons = pathname.split("/").includes("getotp");

  const showSignIn = pathname.split('/').at(-1) !== "signIn";
  const showSignUp = pathname.split('/').at(-1) !== "signUp";
  const { isLoggedIn } = useAuth();
  console.log("🚀 ~ isLoggedIn:", isLoggedIn)
  // const isAuthPage = ["/signIn", "/signUp", "/dashboard"].includes(pathname);


  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signIn');
  }

  const handlerSignUpClick = () => {
    navigate('/signUp')

  }

  return (
    <div className='relative w-full' >
      <nav className="fixed z-10 bg-white shadow-md w-full flex justify-between items-center p-2">

        <div className="text-2xl font-bold ml-14 pl-3 cursor-pointer"
          onClick={() => navigate('/home')} >CastConnect</div>
        <div className='hidden md:flex items-center justify-between gap-[20px]'>
          <ul className="hidden md:flex space-x-16 font-semibold text-gray-600  ml-24">
            <li><a className='hover:text-red-500' href="/home">Home</a></li>
            <li><a className='hover:text-red-500' href="#">About us</a></li>
            <li><a className='hover:text-red-500' href="#">Contact</a></li>
          </ul>


          <div className="hidden md:flex mr-14  space-x-4">
            {isLoggedIn ? (
              <div className="text-gray-700">
                <User size={28} className="cursor-pointer" />
              </div>
            ) : (

              <>
                {showSignIn && <button className="px-4 py-2  border-2 border-red-500 rounded-xl font-semibold text-gray-600 rounded hover:text-red-500 hover:shadow-md hover:opacity-80 " onClick={handleSignInClick}>Sign in</button>}
                {showSignUp && <button className="px-4 py-2 bg-red-500 font-semibold text-white rounded-xl hover:shadow-md hover:opacity-80 " onClick={handlerSignUpClick}>Sign up</button>}
              </>
            )}

          </div>

        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle mobile menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={isOpen
                ? 'M6 18L18 6M6 6l12 12'
                : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute top-10 z-10 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
            <a href="/home">Home</a>
            <a href="#">About us</a>
            <a href="#">Contact</a>
            <button onClick={() => { navigate('/signIn'); setIsOpen(false) }} className="w-4/5 px-4 py-2 bg-red-500 text-white rounded">Sign in</button>
            <button onClick={() => { navigate('/signUp'); setIsOpen(false) }} className="w-4/5 px-4 py-2 bg-red-500 text-white rounded">Sign up</button>
          </div>
        )}
      </nav>
    </div>
  )
};







