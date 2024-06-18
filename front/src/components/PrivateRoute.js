import React from 'react';
import { isLoggedIn } from '../utils/auth';
import { navigate } from 'gatsby';

const PrivateRoute = ({ component: Component, element: Element, location, ...rest }) => {
  console.log('call to PrivateRoute', Element)
  if (!isLoggedIn() && location.pathname !== `/user/login`) {
    navigate('/user/login');
    return null;
  }

  return <Component {...rest}>{Element}</Component>;
};

export default PrivateRoute;
