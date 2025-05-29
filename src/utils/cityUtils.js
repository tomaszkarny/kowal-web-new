/**
 * Utility functions for city pages
 */

/**
 * Get the localized path for a city page
 * @param {Object} city - City object with slug property
 * @param {string} language - Current language (pl/en)
 * @returns {string} The localized path to the city page
 */
export function getCityPath(city, language) {
  // gatsby-plugin-react-i18next automatically handles language prefixes
  // so we don't need to add them manually
  const citySlug = language === 'pl' ? city.slug.pl : city.slug.en
  return `/cities/${citySlug}/`
}

/**
 * Get all cities data
 * This is a re-export for convenience
 */
export { default as cities } from 'data/cities'