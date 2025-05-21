/**
 * Central configuration for site-wide constants
 * This file serves as a single source of truth for domain and site-related constants
 * Import these values in other files to ensure consistency across the codebase
 */

// Primary domain with www prefix (canonical version)
export const SITE_DOMAIN = 'https://www.kowalstwo-karny.pl'

// Site metadata
export const SITE_NAME = {
  pl: 'Pracownia Kowalstwa Artystycznego Tadeusz Karny',
  en: 'Artistic Blacksmithing Workshop Tadeusz Karny'
}

// Sitemap configuration
export const SITEMAP_URL = `${SITE_DOMAIN}/sitemap/sitemap-index.xml`

/**
 * Helper function to build full URLs with the canonical domain
 * @param {string} path - Path to append to the domain (should start with /)
 * @returns {string} Full URL with canonical domain
 */
export const buildUrl = (path = '/') => {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_DOMAIN}${normalizedPath}`
}
