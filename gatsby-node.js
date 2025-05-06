/**
 * Gatsby Node API implementation
 * 
 * This file implements onCreatePage API to add lastModified dates
 * to page context for sitemap generation with lastmod dates.
 */

// Import necessary dependencies
const fs = require('fs');
const path = require('path');

/**
 * Add lastModified dates to page context for sitemap
 */
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  
  // Delete the original page
  deletePage(page);
  
  // Try to get the last modified date from Git for the page component file
  try {
    // Get the absolute path to the page component file
    const pagePath = page.component;
    
    // Create a new page with lastModified date in context
    createPage({
      ...page,
      context: {
        ...page.context,
        // Use the current date as the lastModified date
        // In a production setup, you could use Git history to get the real lastModified date
        lastModified: new Date().toISOString(),
      },
    });
  } catch (error) {
    // If there's an error, just create the page without lastModified date
    createPage(page);
    console.error(`Error adding lastModified date to ${page.path}:`, error);
  }
};
