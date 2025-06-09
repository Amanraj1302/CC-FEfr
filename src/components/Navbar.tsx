import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';


export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
    console.log("🚀 ~ pathname:", pathname)
    
    const hideButtons = pathname.split("/").includes("getotp");

  const showSignIn = pathname.split('/').at(-1) !== "signIn";
  const showSignUp = pathname.split('/').at(-1) !== "signUp";
  // const isAuthPage = ["/signIn", "/signUp", "/dashboard"].includes(pathname);

  
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signIn');
  }

  const handlerSignUpClick = () => {
    navigate('/signUp')

  }

  return (
    <div  >
      <nav className="position-relative bg-white shadow-md w-full flex justify-between items-center p-2">

        <div className="text-2xl font-bold ml-14 pl-3">CastConnect</div>

        <ul className="hidden md:flex space-x-16 font-bold ml-24">
          <li><a href="/home">Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>


        <div className="hidden md:flex mr-14  space-x-4">
          {pathname.endsWith('/dashboard') ? (
            <div className="text-gray-700">
              <User size={28} className="cursor-pointer" />
            </div>
          ) : (
           !hideButtons && <>
              {showSignIn && <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleSignInClick}>Sign in</button>}
              {showSignUp && <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handlerSignUpClick}>Sign up</button>}
            </>
          )}

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
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
            <a href="#">Home</a>
            <a href="#">About us</a>
            <a href="#">Contact</a>
            <button className="w-4/5 px-4 py-2 bg-red-500 text-white rounded">Sign in</button>
            <button className="w-4/5 px-4 py-2 bg-red-500 text-white rounded">Sign up</button>
          </div>
        )}
      </nav>
    </div>
  )
};
