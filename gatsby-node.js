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

// Create redirect from root to Polish homepage
exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  
  // Redirect root page to Polish version
  createRedirect({
    fromPath: `/`,
    toPath: `/pl/`,
    redirectInBrowser: true,
    isPermanent: false, // Use 302 redirect for flexibility
  });
};

// We can re-implement lastModified dates for pages in the future
// using a more compatible approach with gatsby-plugin-sitemap

