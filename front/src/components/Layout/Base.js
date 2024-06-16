import React from 'react';
import { Helmet } from 'react-helmet';

const BaseLayout = ({ children }) => (
  <>
    <Helmet>
      <title>Todo App</title>
    </Helmet>
    <main>
      {children}
    </main>
  </>
);

export default BaseLayout;
