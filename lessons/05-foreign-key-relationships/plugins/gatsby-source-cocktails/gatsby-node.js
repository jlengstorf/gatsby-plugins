const cocktails = require('./data/cocktails.json');

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  reporter.info('creating cocktail recipe nodes');

  cocktails.forEach(cocktail => {
    actions.createNode({
      ...cocktail,

      // required fields for Gatsby
      id: createNodeId(`Cocktail-${cocktail.key}`),
      parent: null,
      children: [],
      internal: {
        type: 'Cocktail',
        contentDigest: createContentDigest(cocktail),
      },
    });
  });
};
