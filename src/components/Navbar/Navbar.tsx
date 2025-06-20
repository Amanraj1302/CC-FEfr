import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NavLinks } from './NavLinks';
import { AuthButtons } from './AuthButtons';
import { UserDropdown } from './UserDropdown';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userEmail, logout } = useAuth();

  const showSignIn = !pathname.endsWith('signIn');
  const showSignUp = !pathname.endsWith('signUp');

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        logout();
        navigate('/signIn');
        setShowDropdown(false);
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <div className="relative w-full">
      <nav className="fixed z-10 bg-white shadow-md w-full flex justify-between items-center p-2">
        <div
          className="text-2xl font-bold ml-14 pl-3 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          CastConnect
        </div>

        <div className="hidden md:flex items-center justify-between gap-[20px]">
          <NavLinks />

          <div className="hidden md:flex mr-14 space-x-4">
            {isLoggedIn ? (
              <div className="relative text-gray-700">
                <User
                  size={28}
                  className="cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <UserDropdown
                    userEmail={userEmail}
                    onEditProfile={() => {setShowDropdown(false); navigate(`/app/dashboard/0`)}}
                    onLogout={handleLogout}
                  />
                )}
              </div>

            ) : (
              <AuthButtons showSignIn={showSignIn} showSignUp={showSignUp} />
            )}
          </div>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle mobile menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-10  left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
           {isLoggedIn ?
           (<UserDropdown userEmail={userEmail} onEditProfile={() => setShowDropdown(false)} onLogout={() => { handleLogout(); }} />)
           :(<><NavLinks /><AuthButtons showSignIn={true} showSignUp={true} /></>)
           }
          </div>
        )}
      </nav>
    </div>
  );
};
