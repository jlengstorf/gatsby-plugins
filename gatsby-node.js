exports.createPages = ({ actions, reporter }) => {
  reporter.info('Creating the unstructured page');
  actions.createPage({
    path: '/unstructured',
    component: require.resolve('./src/templates/1-unstructured.js')
  });
};
