import React, { useEffect, useRef } from 'react'
// Import the translation preloader
import TranslationPreloader from 'components/common/TranslationPreloader/TranslationPreloader'

import { ThemeProvider, Global } from '@emotion/react'
import { THEME } from 'consts/theme'
import { GlobalStyles } from 'components/common/GlobalStyles'

// Import moved to individual page components

import { MainNav } from 'components/Layout/MainNav/MainNav'
import { Footer } from 'components/Layout/Footer/Footer'
import { AsideFooter } from 'components/Layout/AsideFooter/AsideFooter'

import { LayoutContent } from 'components/Layout/Layout.styles'

export function Layout({ children }) {
  const mountedRef = useRef(false)

  // Track initial mount
  useEffect(() => {
    // Set a flag to track if this is the first render
    if (!mountedRef.current) {
      mountedRef.current = true

      // Add a global flag to track page initialization
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-underscore-dangle
        window.__pageLoaded = true
        
      }
    }

    // Cleanup function
    return () => {
      // This runs when the component unmounts or before re-render
    }
  }, [])

  return (
    <ThemeProvider theme={THEME}>
      {/* Preload all translations at once */}
      <TranslationPreloader namespaces={['common', 'about', 'gallery', 'contact', 'seo']} />
      <Global styles={GlobalStyles} />

      {/* SEO is now handled by individual page components */}
      {/* Preload hints have been moved to gatsby-ssr.js */}

      <MainNav />

      <LayoutContent>{children}</LayoutContent>
      <Footer />
      <AsideFooter />
    </ThemeProvider>
  )
}
