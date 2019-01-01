// Export a function called `createPages` to hook into Gatsby’s lifecycle APIs.
// Docs: https://www.gatsbyjs.org/docs/node-apis/#createPages
exports.createPages = ({ actions: { createPage } }) => {
  // Load JSON data that we’ll use to create our pages.
  const people = require('./data/plain-data.json');

  // Choose the folder where template components will be saved.
  const templateDir = `${__dirname}/src/templates`;

  // Create a page that shows all people.
  createPage({
    path: `/plain-data`,
    component: `${templateDir}/plain-data-list.js`,
    context: { people },
  });

  // Create a page for each post.
  people.forEach(person => {
    createPage({
      path: `/plain-data/${person.slug}`,
      component: `${templateDir}/plain-data-person.js`,
      context: { person },
    });
  });
};
