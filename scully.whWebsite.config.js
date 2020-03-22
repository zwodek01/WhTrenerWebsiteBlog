exports.config = {
  projectRoot: "./src",
  projectName: "whWebsite",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};