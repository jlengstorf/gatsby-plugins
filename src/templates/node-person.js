import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
  query loadPersonByID($id: String) {
    person(id: { eq: $id }) {
      name
      cocktails {
        name
        mainIngredient
      }
    }
  }
`;

// `pageContext` contains whatever we pass as `context` in `createPage`.
// Docs: https://www.gatsbyjs.org/docs/actions/#createPage
export default ({ data }) => (
  <Layout>
    <h1>{data.person.name}</h1>
    <ul>
      <li>
        <strong>Patronus:</strong> {data.person.patronus}
      </li>
      <li>
        <strong>Favorite Cocktails:</strong>
        <ul>
          {data.person.cocktails.map(cocktail => (
            <li key={cocktail.name}>
              {cocktail.name} (main ingredient: {cocktail.mainIngredient})
            </li>
          ))}
        </ul>
      </li>
    </ul>

    <footer>
      <Link to="/people">Return to all posts</Link>
    </footer>
  </Layout>
);
