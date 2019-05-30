const cocktails = require('./data/cocktails.json');
const ingredients = require('./data/ingredients.json');

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const createNodes = (dataArr, idField, type) =>
    dataArr.map(data => ({
      ...data,
      id: createNodeId(`${type}-${data[idField]}`),
      internal: {
        type: type,
        contentDigest: createContentDigest(data),
      },
    }));

  const ingredientNodes = createNodes(ingredients, 'key', 'Ingredient');
  const cocktailNodes = createNodes(cocktails, 'key', 'Cocktail');

  reporter.info('creating ingredient nodes');
  ingredientNodes.forEach(ingredientNode => {
    // find all cocktails using this ingredient and grab their node IDs
    const cNodeIDs = cocktailNodes
      .filter(cocktail =>
        cocktail.recipe
          .map(recipe => recipe.ingredient)
          .includes(ingredientNode.name),
      )
      .map(node => node.id);

    actions.createNode({
      ...ingredientNode,
      cocktails___NODE: cNodeIDs,
    });
  });

  reporter.info('creating cocktail nodes');
  cocktailNodes.forEach(cocktailNode => {
    // use the whole ingredient node instead of just the name
    const recipe = cocktailNode.recipe.map(({ ingredient, quantity }) => ({
      quantity,
      ingredient___NODE: ingredientNodes.find(n => n.name === ingredient).id,
    }));

    actions.createNode({
      ...cocktailNode,
      recipe,
    });
  });
};
