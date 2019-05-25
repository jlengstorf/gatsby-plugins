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

  // reporter.info('create pages for each appetizer');

  // const appetizerQueryResult = await graphql(`
  //   {
  //     allAppetizer {
  //       nodes {
  //         name
  //         slug
  //       }
  //     }
  //   }
  // `);

  // if (appetizerQueryResult.errors) {
  //   reporter.panic('error loading appetizers', appetizerQueryResult.errors);
  // }

  // appetizerQueryResult.data.allAppetizer.nodes.forEach(appetizer => {
  //   actions.createPage({
  //     path: `/appetizer/${appetizer.slug}`,
  //     component: require.resolve('./src/templates/with-context.js'),
  //     context: {
  //       title: appetizer.name,
  //       body: 'Delicious!'
  //     }
  //   });
  // });
};
