import React, { useState, useRef, useEffect } from 'react';
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
  const { isLoggedIn, logout ,userName} = useAuth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

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
              <div
                ref={dropdownRef}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <User
                  size={28}
                  className="cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <UserDropdown
                    userName={userName}
                    onEditProfile={() => { setShowDropdown(false); navigate(`/app/dashboard/0?mode=edit`); }}
                    onLogout={handleLogout}
                    onChangePassword={() => { setShowDropdown(false); navigate(`/chnage-password`); }}
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
           (<UserDropdown userName={userName} onEditProfile={() => setShowDropdown(false)}
            onLogout={() => { handleLogout();}} onChangePassword={() => setShowDropdown(false)} />)
           :(<><NavLinks /><AuthButtons showSignIn={true} showSignUp={true} /></>)
           }
          </div>
        )}
      </nav>
    </div>
  );
};
