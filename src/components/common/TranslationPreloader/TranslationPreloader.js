import React, { useEffect } from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next'

/**
 * A component that helps improve translation loading performance
 * by preloading language resources before they're needed.
 */
const TranslationPreloader = () => {
  const { i18n } = useI18next()

  useEffect(() => {
    // Preload all namespaces for the current language
    const namespaces = ['common', 'about', 'gallery', 'contact']
    
    // Load all namespaces for the current language upfront
    if (i18n) {
      i18n.loadNamespaces(namespaces)
    }
    
  }, [i18n])

  return null // This component doesn't render anything
}

export default TranslationPreloader
