import React from 'react';
// import { isLoggedIn } from './src/utils/auth';
import PrivateRoute from './src/components/PrivateRoute';

// 共通CSS
import "./public/css/fonts.css";

export const wrapPageElement = ({ element, props }) => {
  if (props.pageContext.access === 'private') {
    return <PrivateRoute component={element} {...props} />;
  }

  return element;
};
