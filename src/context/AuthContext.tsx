// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string;
  userName: string;
  role: string;
  login: (data: { email: string; userName: string; role: string }) => void;
  logout: () => void;
}


const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  userEmail: '',
  userName: '',
  role: '',
  login: () => { },
  logout: () => { },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Omit<AuthContextType, 'login' | 'logout'>>({
    isLoggedIn: false,
    userEmail: '',
    userName: '',
    role: '',
  });

  const login = (data: { email: string; userName: string ; role: string}): void => {
    setAuth({
      isLoggedIn: true,
      userEmail: data.email,
      userName: data.userName ,
      role: data.role,
    });

  };


  const logout = (): void => {
    setAuth({
      isLoggedIn: false,
      userEmail: '',
      userName: '',
      role: '',
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext easily
export const useAuth = () => useContext(AuthContext);