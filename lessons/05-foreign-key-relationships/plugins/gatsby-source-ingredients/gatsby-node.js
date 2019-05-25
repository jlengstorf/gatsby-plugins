const ingredients = require('./data/ingredients.json');

const getIngredientByName = name =>
  new Promise(resolve => {
    setTimeout(() => {
      const ingredient = ingredients.find(ing => ing.name === name);
      resolve(ingredient);
    }, 1000);
  });

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  if (node.internal.type !== 'Cocktail') {
    return;
  }

  // create an array of Promises: one for each node to be created
  const createNodePromises = node.recipe.map(async obj => {
    const ingredient = await getIngredientByName(obj.ingredient);

    if (!ingredient) {
      reporter.info(`no ingredient found for ${obj.ingredient}`);
      return;
    }

    reporter.info(`adding ingredient details for ${obj.ingredient}`);

    const ingredientNode = {
      ...ingredient,

      id: createNodeId(`Ingredient-${ingredient.key}`),
      parent: node.id,
      children: [],
      internal: {
        type: 'Ingredient',
        contentDigest: createContentDigest(ingredient),
      },
    };

    actions.createNode(ingredientNode);
    actions.createParentChildLink({ parent: node, child: ingredientNode });
  });

  // by returning Promise.all(), we make sure Gatsby waits for all nodes to be
  // created before continuing to build the site
  return Promise.all(createNodePromises);
};
