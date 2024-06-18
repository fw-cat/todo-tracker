import React from 'react';
import { Helmet } from 'react-helmet';

const LoginLayout = ({ children }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <div id="login">
      {children}
    </div>
  </>
);

export default LoginLayout;
