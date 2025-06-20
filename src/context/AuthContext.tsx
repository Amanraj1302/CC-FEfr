// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string;
  userName: string;
  login: (data: string | { email: string; userName?: string }) => void;
  logout: () => void;
}


const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  userEmail: '',
  userName:'',
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
  });

  const login = (data: string | { email: string; userName?: string }): void => {
  if (typeof data === "string") {
    setAuth({
      isLoggedIn: true,
      userEmail: data,
      userName: '',
    });
  } else {
    setAuth({
      isLoggedIn: true,
      userEmail: data.email,
      userName: data.userName || '',
    });
  }
};


  const logout = (): void => {
    setAuth({
      isLoggedIn: false,
      userEmail: '',
      userName: '',
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