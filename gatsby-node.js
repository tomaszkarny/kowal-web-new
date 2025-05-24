/**
 * Gatsby Node API implementation
 * 
 * This file provides customizations for the Gatsby build process.
 * Future implementations can include custom page creation, data sourcing,
 * and other build-time modifications.
 */

// Simple example to demonstrate the file exists and is properly configured
exports.onPreInit = () => {
  console.log('Gatsby Node APIs are working!');
};

// Add debugging for page creation
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Log page creation and context for debugging
  console.log(`[gatsby-node] Creating page: ${page.path}`);
  console.log(`[gatsby-node] Page context:`, JSON.stringify(page.context, null, 2));
  
  // Check if language is in pageContext
  if (page.context && page.context.language) {
    console.log(`[gatsby-node] Language detected in pageContext: ${page.context.language}`);
  } else {
    console.log(`[gatsby-node] WARNING: No language in pageContext for ${page.path}`);
  }

  // Ensure EN pages are created properly
  if (page.path.startsWith('/en/')) {
    console.log(`[gatsby-node] EN page created: ${page.path}`);
  }
};

// Debug build completion
exports.onPostBuild = ({ reporter }) => {
  reporter.info('Build completed successfully');
  console.log('All pages should now be available, including /en/* routes');
};

// Removed conflicting redirect - now handled by netlify.toml
// exports.createPages = ({ actions }) => {
//   const { createRedirect } = actions;
//   
//   // Redirect root page to Polish version - MOVED TO NETLIFY.TOML
//   createRedirect({
//     fromPath: `/`,
//     toPath: `/pl/`,
//     redirectInBrowser: true,
//     isPermanent: false, // Use 302 redirect for flexibility
//   });
// };

// We can re-implement lastModified dates for pages in the future
// using a more compatible approach with gatsby-plugin-sitemap

