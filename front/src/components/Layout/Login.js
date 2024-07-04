import React from 'react';
import { Helmet } from 'react-helmet';

const LoginLayout = ({ id, children }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <div id={id}>
      {children}
    </div>
  </>
);

export default LoginLayout;
