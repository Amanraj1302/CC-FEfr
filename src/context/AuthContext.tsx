// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
 
  userEmail: string;
  login: ( email: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  
  userEmail: '',
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Omit<AuthContextType, 'login' | 'logout'>>({
    isLoggedIn: false,
    userEmail: '',
  });

  const login = ( email: string): void => {
    setAuth({
      isLoggedIn: true,
      userEmail: email,
    });
  };

  const logout = (): void => {
    setAuth({
      isLoggedIn: false,
      userEmail: '',
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
