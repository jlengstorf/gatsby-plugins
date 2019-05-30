exports.createPages = async ({ actions, graphql, reporter }) => {
  reporter.info('creating a page with hard-coded data');

  actions.createPage({
    path: '/hard-coded',
    component: require.resolve('./src/templates/hard-coded.js'),
  });

  reporter.info('creating a page using context');

  actions.createPage({
    path: '/with-context',
    component: require.resolve('./src/templates/with-context.js'),
    context: {
      title: 'This title came from context!',
      body: 'The body copy, too!',
    },
  });

  reporter.info('creating a page using site metadata');

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
    component: require.resolve('./src/templates/with-context.js'),
    context: {
      title,
      body: description,
    },
  });
};
