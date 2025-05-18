/**
 * Language helpers - dynamic, single-source implementation
 * --------------------------------------------------------
 * • getLanguageFromPath(pathname)  -> 'pl' | 'en'
 * • getLanguageUrls(pathname)      -> { pl, en, default }
 *
 * Features:
 *  ◦ Always returns paths with trailing slash (except for root '/')
 *  ◦ Removes '/en' prefix from base path before building variants
 *  ◦ No static maps - works for any static or dynamic page
 */

const SITE_URL = 'https://www.kowalstwo-karny.pl';

/**
 * Normalize pathname:
 * 1. Enforce leading '/'
 * 2. Remove query & hash
 * 3. Reduce multiple slashes
 * 4. Add trailing slash (except for root '/')
 */
/**
 * Improved path normalization with enhanced handling of special cases
 * 1. Handles leading and trailing slashes consistently
 * 2. Properly normalizes empty paths to root
 * 3. Removes query parameters and fragments
 * 4. Collapses multiple slashes into single ones
 * @param {string} pathname - The path to normalize
 * @returns {string} Normalized path
 */
const normalizePath = (pathname = '/') => {
  // Handle undefined/null paths
  if (!pathname) return '/';
  
  let path = String(pathname).trim();

  // Ensure leading slash
  if (!path.startsWith('/')) path = `/${path}`;

  // Strip query parameters and fragments
  path = path.split('?')[0].split('#')[0];

  // Collapse multiple slashes into single ones
  path = path.replace(/\/{2,}/g, '/');
  
  // Handle 404 page and special paths consistently
  if (path.includes('404')) {
    return '/404/';
  }

  // Add trailing slash for all paths except root (which is already just '/')
  if (path !== '/' && !path.endsWith('/')) path += '/';

  return path;
};

/**
 * Determine language based on path.
 * @param {string} pathname
 * @returns {'pl' | 'en'}
 */
export const getLanguageFromPath = (pathname = '/') => {
  const path = normalizePath(pathname);
  return path === '/en/' || path.startsWith('/en/') ? 'en' : 'pl';
};

/**
 * Return full URLs for both languages.
 * @param {string} pathname
 */
/**
 * Return full URLs for both languages.
 * Enhanced to ensure valid URLs and proper encoding.
 * @param {string} pathname
 */
export const getLanguageUrls = (pathname = '/') => {
  const path = normalizePath(pathname);

  // base path without '/en' prefix
  const basePath = path === '/en/' ? '/' : path.replace(/^\/en\//, '/');

  // Ensure paths are properly formatted
  const plPath = encodeURI(basePath).replace(/%5B/g, '[').replace(/%5D/g, ']');
  const enPath = basePath === '/' ? '/en/' : `/en${encodeURI(basePath).replace(/%5B/g, '[').replace(/%5D/g, ']')}`;

  // Add trailing slash consistency
  const ensureTrailingSlash = (url) => url.endsWith('/') ? url : `${url}/`;

  return {
    pl: ensureTrailingSlash(`${SITE_URL}${plPath}`),
    en: ensureTrailingSlash(`${SITE_URL}${enPath}`),
    default: ensureTrailingSlash(`${SITE_URL}${plPath}`),
  };
};
