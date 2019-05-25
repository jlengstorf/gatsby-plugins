// Quick-and-dirty helper to convert strings into URL-friendly slugs.
const slugify = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

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
      slug: slugify(appetizer.name),

      // Fields required by Gatsby
      id: createNodeId(`appetizer-${appetizer.key}`),
      parent: null,
      children: [],
      internal: {
        type: 'Appetizer',
        contentDigest: createContentDigest(appetizer),
      },
    });
  });
};
