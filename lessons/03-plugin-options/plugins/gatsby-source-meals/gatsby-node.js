// Quick-and-dirty helper to convert strings into URL-friendly slugs.
const slugify = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const meals = [
  {
    key: 1,
    name: 'Smoked Brisket',
    diet: 'omnivore',
  },
  {
    key: 2,
    name: 'Ratatouille',
    diet: 'vegetarian',
  },
  {
    key: 3,
    name: 'Chicken Pot Pie',
    diet: 'omnivore',
  },
  {
    key: 4,
    name: 'Vegetable Fried Rice',
    diet: 'vegetarian',
  },
];

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest, reporter },
  pluginOptions,
) => {
  reporter.info(
    `creating nodes for all meals that fit ${pluginOptions.diet} diets`,
  );

  const filteredMeals = meals.filter(meal => meal.diet === pluginOptions.diet);

  filteredMeals.forEach(meal => {
    actions.createNode({
      // custom fields
      ...meal,
      slug: slugify(meal.name),

      // required fields for Gatsby
      id: createNodeId(`Meal-${meal.key}`),
      internal: {
        type: 'Meal',
        contentDigest: createContentDigest(meal),
      },
    });
  });
};
