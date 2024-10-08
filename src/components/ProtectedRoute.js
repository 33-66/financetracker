// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
