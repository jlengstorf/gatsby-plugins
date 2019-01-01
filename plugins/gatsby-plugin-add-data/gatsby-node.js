// To add new data to Gatsby’s GraphQL data layer, we use the `sourceNodes` API.
// Docs: https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
exports.sourceNodes = ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  // Load JSON data about people and the drinks they like.
  const people = require('./data/people.json');

  // Loop through the array and create a node for each person.
  people.forEach(person => {
    const node = {
      ...person,
      // The fields below tell Gatsby how this field works.
      id: createNodeId(`person-${person.id}`),
      internal: {
        type: 'Person',
        contentDigest: createContentDigest(person),
      },
    };

    createNode(node);
  });
};
