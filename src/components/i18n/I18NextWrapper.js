import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// This wrapper component initializes i18next with backend before rendering children
const I18NextWrapper = ({ children }) => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only initialize once
    if (!i18next.isInitialized) {
      i18next
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          fallbackLng: 'pl',
          debug: process.env.NODE_ENV === 'development',
          
          // Backend configuration for loading translations
          backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
          },
          
          // Disable suspense to prevent loading spinner
          react: {
            useSuspense: false,
          },
          
          interpolation: {
            escapeValue: false, // Not needed for React
          },
          
          // Custom handling for missing keys
          saveMissing: false,
          missingKeyHandler: (lng, ns, key) => {
            // Ignore gallery image keys to prevent console spam
            if (key && key.startsWith('gallery.images.')) {
              return
            }
            // Log other missing keys only in development
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Missing translation key: ${key} in namespace: ${ns} for language: ${lng}`)
            }
          },
        })
        .then(() => {
          setInitialized(true)
        })
    } else {
      setInitialized(true)
    }
  }, [])

  // Don't render children until i18next is initialized
  if (!initialized) {
    return null // Or a loading indicator if you prefer
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default I18NextWrapper
