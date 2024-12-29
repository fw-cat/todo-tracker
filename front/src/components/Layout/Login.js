import React from 'react';
import { Helmet } from 'react-helmet';
import Loading from '../Parts/Loading'

const LoginLayout = ({ id, children }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <Loading />
    <section id={id}>{children}</section>
  </>
);

export default LoginLayout;
