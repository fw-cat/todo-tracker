const path = require('path');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);
  if (!page.path.match(/^\/user\/login/)) {
    createPage({
      ...page,
      context: {
        ...page.context,
        access: 'private',
        layout: 'main',
      },
    });

  } else {
    createPage({
      ...page,
      context: {
        ...page.context,
        layout: 'login',
      },
    });
  }
};
