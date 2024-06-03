import React from 'react';
// import { isLoggedIn } from './src/utils/auth';
import PrivateRoute from './src/components/PrivateRoute';

export const wrapPageElement = ({ element, props }) => {
  if (props.pageContext.access === 'private') {
    return <PrivateRoute component={element} {...props} />;
  }

  return element;
};
