// src/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const login = (userData) => {
    const userName = userData.first_name + ' ' + userData.last_name;
    setCurrentUser(userName);
    setUserEmail(userData.email);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserEmail(null);
  };

  const value = {
    currentUser,
    userEmail,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
