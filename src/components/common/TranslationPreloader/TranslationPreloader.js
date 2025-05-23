import React, { useEffect, useRef } from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next'

/**
 * A component that helps improve translation loading performance
 * by preloading language resources before they're needed.
 *
 * @param {Object} props Component props
 * @param {Array<string>} [props.namespaces] Optional array of specific namespaces to load
 */
const TranslationPreloader = ({ namespaces = ['common', 'about', 'gallery', 'contact'] }) => {
  const { i18n, language } = useI18next()
  const loadedRef = useRef({})
  const loadingRef = useRef({})

  useEffect(() => {
    // Skip if no i18n instance or already loaded/loading
    if (!i18n || !language) return
    
    const cacheKey = `${language}_namespaces_loaded`
    const isAlreadyLoaded = loadedRef.current[language] || sessionStorage.getItem(cacheKey)
    const isCurrentlyLoading = loadingRef.current[language]
    
    if (isAlreadyLoaded || isCurrentlyLoading) return

    // Set loading flag immediately to prevent race conditions
    loadingRef.current[language] = true

    // Check which namespaces actually need loading
    const namespacesToLoad = namespaces.filter(ns => !i18n.hasResourceBundle(language, ns))
    
    if (namespacesToLoad.length === 0) {
      // All namespaces already loaded
      loadedRef.current[language] = true
      loadingRef.current[language] = false
      try {
        sessionStorage.setItem(cacheKey, 'true')
      } catch (e) {
        // Ignore storage errors
      }
      return
    }

    // Load only the missing namespaces
    Promise.all(namespacesToLoad.map(ns => i18n.loadNamespaces(ns)))
      .then(() => {
        // Mark as loaded
        loadedRef.current[language] = true
        loadingRef.current[language] = false
        try {
          sessionStorage.setItem(cacheKey, 'true')
        } catch (e) {
          // Ignore storage errors
        }
      })
      .catch(err => {
        // On error, reset flags to allow retry
        console.warn('Failed to load translations:', err)
        loadedRef.current[language] = false
        loadingRef.current[language] = false
      })

    // Cleanup function
    return () => {
      // Reset loading flag on unmount
      loadingRef.current[language] = false
    }
  }, [i18n, language, namespaces])

  return null // This component doesn't render anything
}

export default React.memo(TranslationPreloader)
