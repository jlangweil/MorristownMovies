// src/AuthContext.js
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [pic, setPic] = useState(null);

  const login = (userData) => {
    const userName = userData.first_name + ' ' + userData.last_name;
    setCurrentUser(userName);
    setUserEmail(userData.email);
    setUserId(userData.id);
    setCity(userData.city);
    setState(userData.state);
    setPic(userData.pic);
    setSessionTimeout(Date.now() + 30 * 60 * 1000); // 30 minutes
  };

  const updatePic = (newPic) => {
    setPic(newPic);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserEmail(null);
    setUserId(null);
    setState(null);
    setCity(null);
    clearTimeout(sessionTimeout);
    setPic(null);
  };

  useEffect(() => {
    if (sessionTimeout && currentUser) {
      const warningTimeoutId = setTimeout(() => {
        alert('Due to inactivity, your session will expire in 1 minute.');
      }, sessionTimeout - Date.now() - 1 * 60 * 1000); // 1 minute before session expires

      const timeoutId = setTimeout(() => {
        alert('Your session has expired. You will be logged out.');
        logout();
      }, sessionTimeout - Date.now());

      return () => {
        clearTimeout(warningTimeoutId);
        clearTimeout(timeoutId);
      };
    }
  }, [sessionTimeout, currentUser]);

  const value = {
    currentUser,
    userEmail,
    userId,
    pic,
    city,
    state,
    updatePic,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
