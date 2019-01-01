// Export a function called `createPages` to hook into Gatsby’s lifecycle APIs.
// Docs: https://www.gatsbyjs.org/docs/node-apis/#createPages
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Load JSON data that we’ll use to create our pages using GraphQL.
  const result = await graphql(`
    {
      allPerson {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  // Convert the result into an array of people.
  const people = result.data.allPerson.edges.map(({ node }) => node);

  // Choose the folder where template components will be saved.
  const templateDir = `${__dirname}/src/templates`;

  // We don’t need to create a listing page programmatically anymore.
  // See `src/pages/people.js` for details.

  // Create a page for each post.
  people.forEach(person => {
    createPage({
      path: `/person/${person.slug}`,
      component: `${templateDir}/node-person.js`,
      context: { id: person.id },
    });
  });
};
