import React from 'react';
import { Helmet } from 'react-helmet';

const BaseLayout = ({ children }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <div>
      {children}
    </div>
  </>
);

export default BaseLayout;
