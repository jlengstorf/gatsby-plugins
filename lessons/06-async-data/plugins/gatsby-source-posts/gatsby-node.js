const postData = require('./data/posts.json');
const authorData = require('./data/authors.json');
const commentData = require('./data/comments.json');

// simulates a request to a third-party API
const fakeApi = data =>
  new Promise(resolve => setTimeout(() => resolve(data), 200));

const getAllPosts = () => fakeApi(postData);

const getAuthorById = id =>
  fakeApi(authorData.find(author => author.key === id));

const getCommentsById = idArray =>
  fakeApi(commentData.filter(comment => idArray.includes(comment.key)));

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const generateNode = type => data => ({
    ...data,
    id: createNodeId(`${type}-${data.key}`),
    internal: {
      type,
      contentDigest: createContentDigest(data),
    },
  });

  const generatePostNode = generateNode('Post');
  const generateAuthorNode = generateNode('Author');
  const generateCommentNode = generateNode('Comment');

  let authorNodes = [];
  let commentNodes = [];

  reporter.info('loading post data...');
  const posts = await getAllPosts();
  reporter.info('loaded post data!');

  const promises = posts.map(async post => {
    reporter.info(`loading author data for “${post.title}”...`);
    const postAuthor = await getAuthorById(post.author);
    reporter.info(`loading comment data for “${post.title}”...`);
    const postComments = await getCommentsById(post.comments);
    reporter.info(`loaded author and comment data for “${post.title}”`);

    // this creates the node structure but _does not_ add it to Gatsby yet
    const author = generateAuthorNode(postAuthor);
    const comments = postComments.map(generateCommentNode);

    const {
      author: _,
      comments: __,
      ...postNodeWithoutConflictingFields
    } = post;

    // cross-reference post authors and comments
    const postNode = generatePostNode({
      ...postNodeWithoutConflictingFields,
      author___NODE: author.id,
      comments___NODE: comments.map(c => c.id),
    });

    // cross-reference the post from each comment
    const commentsWithPostRelationships = comments.map(node => ({
      ...node,
      post___NODE: postNode.id,
    }));

    authorNodes.push(author);
    commentNodes.push(...commentsWithPostRelationships);

    return postNode;
  });

  return Promise.all(promises).then(postNodes => {
    // connect each author to all posts they’ve written
    const authorsWithPosts = authorNodes.map(node => ({
      ...node,
      posts___NODE: postNodes
        .filter(p => p.author___NODE === node.id)
        .map(p => p.id),
    }));

    // now that all relationships are set, we actually add the nodes to Gatsby
    reporter.info('adding nodes to the GraphQL data layer!');
    authorsWithPosts.forEach(node => actions.createNode(node));
    commentNodes.forEach(node => actions.createNode(node));
    postNodes.forEach(post => actions.createNode(post));
  });
};
