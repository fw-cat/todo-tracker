import React from 'react';
import { Helmet } from 'react-helmet';

const BaseLayout = ({ id, children, headerContent }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <header>
      {headerContent || <h1>HABIT TRACKER</h1>}
    </header>
    <section id={id}>
      <div className="wrap">
        <main>
          { children }
        </main>
      </div>
    </section>
    <footer></footer>
  </>
);

export default BaseLayout;
