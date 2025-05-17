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
const normalizePath = (pathname = '/') => {
  let path = pathname.trim();

  if (!path.startsWith('/')) path = `/${path}`;

  // strip query / fragment
  path = path.split('?')[0].split('#')[0];

  // collapse multiple slashes
  path = path.replace(/\/{2,}/g, '/');

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
export const getLanguageUrls = (pathname = '/') => {
  const path = normalizePath(pathname);

  // base path without '/en' prefix
  const basePath = path === '/en/' ? '/' : path.replace(/^\/en\//, '/');

  const plPath = basePath;
  const enPath = basePath === '/' ? '/en/' : `/en${basePath}`;

  return {
    pl: `${SITE_URL}${plPath}`,
    en: `${SITE_URL}${enPath}`,
    default: `${SITE_URL}${plPath}`,
  };
};
