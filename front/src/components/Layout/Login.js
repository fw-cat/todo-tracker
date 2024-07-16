import React from 'react';
import { Helmet } from 'react-helmet';

const LoginLayout = ({ id, children }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <section id={id}>
      {children}
    </section>
  </>
);

export default LoginLayout;
