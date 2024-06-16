import React from 'react';
import { Helmet } from 'react-helmet';

const LoginLayout = ({ children }) => (
  <>
    <Helmet>
      <title>Todo App</title>
    </Helmet>
    <div id="login">
      {children}
    </div>
  </>
);

export default LoginLayout;
