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

import { WEBSITE_URL } from './contactDetails'

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
 * Simplified language detection from path
 * @param {string} path - The path to analyze
 * @returns {'pl'|'en'} Language code
 */
export const getLanguageFromPath = (path = '') => path.startsWith('/en') ? 'en' : 'pl'

/**
 * Zwraca bezwzględne URL-e dla obu wersji językowych + x-default.
 * Przykład:
 *   /en/about/   →  { pl: https://…/about/, en: https://…/en/about/, default: https://…/about/ }
 *   /gallery/    →  { pl: https://…/gallery/, en: https://…/en/gallery/, default: https://…/gallery/ }
 */
/**
 * Robust path cleaning that handles malformed URLs with multiple language prefixes
 * Handles cases like /en/en/cities/ or /pl/en/about/ by iteratively cleaning
 */
export const cleanLanguagePrefixes = (path) => {
  let cleanPath = path
  // Remove multiple consecutive language prefixes iteratively
  while (cleanPath.match(/^\/(?:en|pl)\/+(?:en|pl)\//)) {
    cleanPath = cleanPath.replace(/^\/(?:en|pl)\/+/, '/')
  }
  // Final cleanup of any remaining single prefix
  return cleanPath.replace(/^\/(?:en|pl)\/+/, '/') || '/'
}

/**
 * Build a language-specific path from a clean base path
 */
export const buildLanguagePath = (basePath, targetLanguage) => {
  return targetLanguage === 'pl'
    ? basePath
    : basePath === '/' ? '/en/' : `/en${basePath}`
}

export const getLanguageUrls = (inputPath = '/') => {
  const raw = inputPath.startsWith('/') ? inputPath : `/${inputPath}`
  const clean = raw.endsWith('/') ? raw : `${raw}/`

  // Use the robust cleaning function
  const basePath = cleanLanguagePrefixes(clean)
  
  // Generate clean Polish path (no prefix)
  const plPath = basePath
  
  // Generate clean English path (with single /en/ prefix)
  const enPath = buildLanguagePath(basePath, 'en')

  return {
    pl: `${WEBSITE_URL}${plPath}`,
    en: `${WEBSITE_URL}${enPath}`,
    default: `${WEBSITE_URL}${plPath}`
  }
}
