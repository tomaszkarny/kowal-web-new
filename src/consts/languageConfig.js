/**
 * Language configuration for hreflang tags
 * Maps pathnames to their corresponding language variants
 * 
 * Structure:
 * {
 *   [pathname]: {
 *     pl: pathInPolish,
 *     en: pathInEnglish,
 *     default: defaultPath (typically Polish version)
 *   }
 * }
 */

// Site URL from gatsby-config
const SITE_URL = 'https://www.kowalstwo-karny.pl';

// Main page paths - map each page to its language variants
export const LANGUAGE_PATHS = {
  // Homepage
  '/': {
    pl: '/',
    en: '/en/',
    default: '/'
  },
  '/en/': {
    pl: '/',
    en: '/en/',
    default: '/'
  },
  
  // About page
  '/about/': {
    pl: '/about/',
    en: '/en/about/',
    default: '/about/'
  },
  '/en/about/': {
    pl: '/about/',
    en: '/en/about/',
    default: '/about/'
  },
  
  // Gallery page
  '/gallery/': {
    pl: '/gallery/',
    en: '/en/gallery/',
    default: '/gallery/'
  },
  '/en/gallery/': {
    pl: '/gallery/',
    en: '/en/gallery/',
    default: '/gallery/'
  },
  
  // Contact page
  '/contact/': {
    pl: '/contact/',
    en: '/en/contact/',
    default: '/contact/'
  },
  '/en/contact/': {
    pl: '/contact/',
    en: '/en/contact/',
    default: '/contact/'
  },
  
  // 404 page
  '/404/': {
    pl: '/404/',
    en: '/en/404/',
    default: '/404/'
  },
  '/en/404/': {
    pl: '/404/',
    en: '/en/404/',
    default: '/404/'
  }
};

/**
 * Helper function to get full URLs with the site domain
 * @param {string} pathname - The current pathname
 * @returns {Object} Object with full URLs for each language variant
 */
export const getLanguageUrls = (pathname) => {
  const paths = LANGUAGE_PATHS[pathname] || {
    pl: pathname,
    en: pathname.startsWith('/en/') ? pathname : `/en${pathname}`,
    default: pathname
  };
  
  return {
    pl: `${SITE_URL}${paths.pl}`,
    en: `${SITE_URL}${paths.en}`,
    default: `${SITE_URL}${paths.default}`
  };
};

/**
 * Get the language code from the current pathname
 * @param {string} pathname - The current pathname
 * @returns {string} Language code ('pl' or 'en')
 */
export const getLanguageFromPath = (pathname) => {
  return pathname.startsWith('/en/') ? 'en' : 'pl';
};
