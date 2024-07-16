import React from 'react';
import { Helmet } from 'react-helmet';

const BaseLayout = ({ id, children }) => (
  <>
    <Helmet>
      <title>HABIT TRACKER</title>
    </Helmet>
    <header>
      <h1>HABIT TRACKER</h1>
    </header>
    <section id={id}>
      <div class="wrap">
        <main>
          { children }
        </main>
      </div>
    </section>
    <footer></footer>
  </>
);

export default BaseLayout;
