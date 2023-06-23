import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    element={isLoggedIn ? <Component /> : <Navigate to="/" />}
  />
);

export default ProtectedRoute;