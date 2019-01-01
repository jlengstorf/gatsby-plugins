import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

// `pageContext` contains whatever we pass as `context` in `createPage`.
// Docs: https://www.gatsbyjs.org/docs/actions/#createPage
export default ({ pageContext }) => (
  <Layout>
    <h1>Look at These Folks!</h1>
    <ul>
      {pageContext.people.map(person => (
        <li key={person.slug}>
          <Link to={`/plain-data/${person.slug}`}>{person.name}</Link>
        </li>
      ))}
    </ul>
  </Layout>
);
