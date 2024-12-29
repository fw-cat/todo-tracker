import React from 'react';
import { Helmet } from 'react-helmet';
import Loading from '../Parts/Loading'

const BaseLayout = ({ id, children, headerContent }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <Loading />
    <header>
      {headerContent || <h1>HABIT TRACKER</h1>}
    </header>
    <section id={id}>
      <div className="wrap">
        <main>{children}</main>
      </div>
    </section>
    <footer>
      <h6>&copy;Atelier KiKi</h6>
    </footer>
  </>
);

export default BaseLayout;
