import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useLocation } from '@reach/router'

// Import the translation preloader
import TranslationPreloader from 'components/common/TranslationPreloader/TranslationPreloader'

import { ThemeProvider } from '@emotion/react'
import { Global } from '@emotion/react'
import { THEME } from 'consts/theme'
import { GlobalStyles } from 'components/common/GlobalStyles'

import { SEO } from 'components/SEO/SEO'

import { MainNav } from 'components/Layout/MainNav/MainNav'
import { Footer } from 'components/Layout/Footer/Footer'
import { AsideFooter } from 'components/Layout/AsideFooter/AsideFooter'

import { LayoutContent } from 'components/Layout/Layout.styles'

export const Layout = ({ children, title, description, image, article }) => {
  const { t } = useTranslation('common')
  const location = useLocation()
  const mountedRef = useRef(false)

  // Track initial mount
  useEffect(() => {
    // Set a flag to track if this is the first render
    if (!mountedRef.current) {
      mountedRef.current = true

      // Add a global flag to track page initialization
      if (typeof window !== 'undefined') {
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
      <TranslationPreloader namespaces={['common', 'about', 'gallery', 'contact']} />
      <Global styles={GlobalStyles} />

      <SEO
        title={title}
        description={description}
        pathname={location.pathname}
        image={image}
        article={article}
      >
        {/* Add preload hints for faster navigation with proper 'as' attributes */}
        <link rel="prefetch" href="/about/" as="document" />
        <link rel="prefetch" href="/gallery/" as="document" />
        <link rel="prefetch" href="/contact/" as="document" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </SEO>

      <MainNav />

      <LayoutContent>{children}</LayoutContent>
      <Footer />
      <AsideFooter />
    </ThemeProvider>
  )
}
