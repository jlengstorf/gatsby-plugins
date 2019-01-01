import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
  {
    allPerson {
      edges {
        node {
          slug
          name
        }
      }
    }
  }
`;

// `pageContext` contains whatever we pass as `context` in `createPage`.
// Docs: https://www.gatsbyjs.org/docs/actions/#createPage
export default ({ data }) => {
  const people = data.allPerson.edges.map(({ node }) => node);

  return (
    <Layout>
      <h1>Look at These Folks!</h1>
      <ul>
        {people.map(person => (
          <li key={person.slug}>
            <Link to={`/person/${person.slug}`}>{person.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
