import React from 'react';
import { isLoggedIn } from '../utils/auth';
import { navigate } from 'gatsby';
import BaseLayout from "../components/Layout/Base"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/user/login`) {
    navigate('/user/login');
    return null;
  }

  return <BaseLayout {...rest} />;
};

export default PrivateRoute;
