import React, { createContext, useState, useContext } from 'react'
import axios from 'axios'

const initialUser = JSON.parse(localStorage.getItem('user'));
const initialToken = localStorage.getItem('token');

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setCurrentUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    token,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}