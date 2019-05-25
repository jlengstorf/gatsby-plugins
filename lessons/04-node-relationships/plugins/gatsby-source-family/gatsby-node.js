const family = require('./data/family.json');

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  reporter.info('creating nodes with relationships');

  const type = 'Family';
  const nodes = family.map(person => ({
    // Custom fields
    key: person.key,
    name: person.name,

    // add relationships
    family___NODE: person.family.map(key => createNodeId(`${type}-${key}`)),

    // required fields for Gatsby
    id: createNodeId(`${type}-${person.key}`),
    parent: null,
    children: [],
    internal: {
      type,
      contentDigest: createContentDigest(person),
    },
  }));

  nodes.forEach(node => actions.createNode(node));
};
