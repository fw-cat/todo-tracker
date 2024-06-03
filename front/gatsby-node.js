const path = require('path');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  if (!page.path.match(/^\/user\/login/)) {
    deletePage(page);

    createPage({
      ...page,
      context: {
        ...page.context,
        access: 'private',
      },
    });
  }
};
