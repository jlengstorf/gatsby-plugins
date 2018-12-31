import React from 'react';
import Layout from '../components/layout';

export default () => (
  <Layout>
    <h1>This is a static page.</h1>
    <p>
      Its contents are hard-coded in <code>src/pages/index.js</code>.
    </p>
    <h2>This is just a demonstration.</h2>
    <p>
      This page won’t be updated during the course. It’s only here to show us
      what the base styles are for the site. Specifically: this shows what the{' '}
      <code>&lt;Layout /&gt;</code> wrapper adds to a page full of otherwise
      plain markup.
    </p>
  </Layout>
);
