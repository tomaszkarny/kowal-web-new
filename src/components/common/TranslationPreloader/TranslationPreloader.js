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
  const loadedRef = useRef(false)

  useEffect(() => {
    // Only load namespaces once per language to prevent redundant loading during navigation
    const cacheKey = `${language}_namespaces_loaded`
    const alreadyLoaded = loadedRef.current || sessionStorage.getItem(cacheKey)
    
    if (i18n && !alreadyLoaded) {
      // Use a Promise.all to load all namespaces in parallel
      Promise.all(namespaces.map(ns => i18n.loadNamespaces(ns)))
        .then(() => {
          // Mark as loaded to prevent redundant loading
          loadedRef.current = true
          try {
            sessionStorage.setItem(cacheKey, 'true')
          } catch (e) {
            // Ignore storage errors
          }
        })
    }
  }, [i18n, language, namespaces])

  return null // This component doesn't render anything
}

export default React.memo(TranslationPreloader)
