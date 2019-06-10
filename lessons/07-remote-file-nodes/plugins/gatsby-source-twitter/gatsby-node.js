const { createRemoteFileNode } = require('gatsby-source-filesystem');
const twitterAccounts = require('./data/accounts.json');

exports.sourceNodes = async ({
  actions,
  cache,
  createNodeId,
  createContentDigest,
  reporter,
  store,
}) => {
  const promises = twitterAccounts.map(async account => {
    const { key, name, handle, avatar } = account;
    const accountID = createNodeId(`Twitter-${key}`);

    // grab the image from Twitter and store it locally
    const fileNode = await createRemoteFileNode({
      url: avatar,
      parentNodeId: accountID,
      createNode: actions.createNode,
      store,
      cache,
      createNodeId,
    });

    reporter.info(`created a remote file node with ID ${fileNode.id}`);

    return {
      key,
      name,
      handle,
      id: accountID,
      avatar___NODE: fileNode.id,
      internal: {
        type: 'Twitter',
        contentDigest: createContentDigest({ key, name, handle, avatar }),
      },
    };
  });

  return Promise.all(promises).then(accountNodes => {
    accountNodes.forEach(node => actions.createNode(node));
  });
};
