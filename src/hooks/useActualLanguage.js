/**
 * useActualLanguage Hook
 * ----------------------
 * SSR-safe hook for detecting actual language from URL path.
 *
 * Consolidates duplicated language detection pattern found in 9+ components:
 *   const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname || '/'
 *   const actualLanguage = getLanguageFromPath(currentPath)
 *
 * @param {string} pathnameFallback - Fallback pathname for SSR (from props or context)
 * @returns {'pl'|'en'} The detected language
 */
import { getLanguageFromPath } from 'consts/languageConfig'
import { isClientSide } from 'utils/ssrHelpers'

export const useActualLanguage = (pathnameFallback = '/') => {
  const currentPath = isClientSide()
    ? window.location.pathname
    : pathnameFallback

  return getLanguageFromPath(currentPath)
}

export default useActualLanguage
