// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  // Function to load tokens from localStorage on initial load
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setAuth({
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  // Function to handle login
  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuth({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  };

  // Function to refresh access token
  const refreshAccessToken = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.refreshToken}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        setAuth((prev) => ({
          ...prev,
          accessToken: data.access_token,
          isAuthenticated: true,
        }));
        return data.access_token;
      } else {
        // Refresh token is invalid or expired
        logout();
        return null;
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
