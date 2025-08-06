import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    // User is not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the route is restricted by role
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // User's role is not authorized, redirect to home page
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized, render the children
  return children;
};

export default ProtectedRoute;
