exports.createPages = async ({ actions, graphql, reporter }) => {
  reporter.info('Creating the unstructured page');

  actions.createPage({
    path: '/unstructured',
    component: require.resolve('./src/templates/1-unstructured.js'),
    context: {
      title: 'This title came from context!',
      body: 'The body copy, too!'
    }
  });

  reporter.info('Create a page using site metadata');

  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('oh no', result.errors);
  }

  const { title, description } = result.data.site.siteMetadata;

  actions.createPage({
    path: '/meta',
    component: require.resolve('./src/templates/1-unstructured.js'),
    context: {
      title,
      body: description
    }
  });
};
