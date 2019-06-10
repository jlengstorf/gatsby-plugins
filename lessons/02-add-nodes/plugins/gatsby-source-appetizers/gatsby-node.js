const appetizers = [
  {
    key: 1,
    name: 'Caesar Salad Sliders',
  },
  {
    key: 2,
    name: 'Charcuterie',
  },
  {
    key: 3,
    name: 'Veggie Tray',
  },
];

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  reporter.info('adding appetizer nodes');

  appetizers.forEach(appetizer => {
    actions.createNode({
      // Custom fields
      ...appetizer,

      // Fields required by Gatsby
      id: createNodeId(`appetizer-${appetizer.key}`),
      internal: {
        type: 'Appetizer',
        contentDigest: createContentDigest(appetizer),
      },
    });
  });
};
