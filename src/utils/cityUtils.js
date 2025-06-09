/**
 * Utility functions for city pages
 */

/**
 * Extract city slug from a path
 * @param {string} path - The path to extract from
 * @returns {string|null} The city slug or null if not a city page
 */
export function extractCitySlug(path) {
  const cityPageMatch = path.match(/^\/cities\/([^\/]+)\/?$/)
  return cityPageMatch ? cityPageMatch[1] : null
}

/**
 * Find a city by slug in either language
 * @param {string} slug - The slug to search for
 * @param {Array} cities - Array of city objects
 * @returns {Object|null} The city object or null if not found
 */
export function findCityBySlug(slug, cities) {
  return cities.find(city => 
    city.slug.pl === slug || city.slug.en === slug
  )
}

/**
 * Get the localized path for a city page
 * @param {Object} city - City object with slug property
 * @param {string} language - Current language (pl/en)
 * @returns {string} The localized path to the city page
 */
export function getCityPath(city, language) {
  const citySlug = language === 'pl' ? city.slug.pl : city.slug.en
  
  // Polish pages have no prefix, English pages have /en/ prefix
  if (language === 'en') {
    return `/en/cities/${citySlug}/`
  }
  
  return `/cities/${citySlug}/`
}

/**
 * Get all cities data
 * This is a re-export for convenience
 */
export { default as cities } from 'data/cities'