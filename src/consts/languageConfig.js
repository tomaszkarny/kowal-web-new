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
 * But preserves single language prefixes to avoid breaking valid paths
 */
export const cleanLanguagePrefixes = (path) => {
  if (!path || path === '/') return '/'
  
  let cleanPath = path
  
  // Only remove if there are multiple consecutive language prefixes
  // This handles cases like /en/en/cities/ or /pl/en/about/
  while (cleanPath.match(/^\/(?:en|pl)\/+(?:en|pl)\//)) {
    cleanPath = cleanPath.replace(/^\/(?:en|pl)\/+/, '/')
  }
  
  // Remove any language prefix to get the base path
  // This ensures we always get the clean path without language prefixes
  cleanPath = cleanPath.replace(/^\/(?:en|pl)\//, '/') || '/'
  
  return cleanPath
}

/**
 * Build a language-specific path from a clean base path
 */
export const buildLanguagePath = (basePath, targetLanguage) => {
  if (targetLanguage === 'pl') return basePath
  return basePath === '/' ? '/en/' : `/en${basePath}`
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
