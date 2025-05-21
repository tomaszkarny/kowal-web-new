/**
 * Utility functions and constants for gatsby-config.js
 * This allows us to use ES modules and import site constants
 */

// Single source of truth for domain constants
const SITE_DOMAIN = 'https://www.kowalstwo-karny.pl'
const SITEMAP_URL = `${SITE_DOMAIN}/sitemap/sitemap-index.xml`

// Export constants for use in gatsby-config.js
module.exports = {
  SITE_DOMAIN,
  SITEMAP_URL
}
