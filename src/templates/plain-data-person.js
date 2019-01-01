import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

// `pageContext` contains whatever we pass as `context` in `createPage`.
// Docs: https://www.gatsbyjs.org/docs/actions/#createPage
export default ({ pageContext }) => (
  <Layout>
    <h1>{pageContext.person.name}</h1>
    <ul>
      <li>
        <strong>Patronus:</strong> {pageContext.person.patronus}
      </li>
      <li>
        <strong>Favorite Cocktails:</strong>
        <ul>
          {pageContext.person.cocktails.map(cocktail => (
            <li key={cocktail.name}>
              {cocktail.name} (main ingredient: {cocktail.mainIngredient})
            </li>
          ))}
        </ul>
      </li>
    </ul>

    <footer>
      <Link to="/plain-data">Return to all posts</Link>
    </footer>
  </Layout>
);
