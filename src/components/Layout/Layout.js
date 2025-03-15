import React from 'react'
import Helmet from 'react-helmet'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'

// Import the translation preloader
import TranslationPreloader from 'components/common/TranslationPreloader/TranslationPreloader'

import { ThemeProvider } from '@emotion/react'
import { Global } from '@emotion/react'
import { THEME } from 'consts/theme'
import { GlobalStyles } from 'components/common/GlobalStyles'

import { useSiteMetadata } from 'utils/hooks/useSiteMetadata'

import { MainNav } from 'components/Layout/MainNav/MainNav'
import { Footer } from 'components/Layout/Footer/Footer'
import { AsideFooter } from 'components/Layout/AsideFooter/AsideFooter'

import { LayoutContent } from 'components/Layout/Layout.styles'

export const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()
  const { t } = useTranslation('common')
  const { language } = useI18next()

  return (
    <ThemeProvider theme={THEME}>
      {/* Add the translation preloader to improve page transition performance */}
      <TranslationPreloader />
      <Global styles={GlobalStyles} />

      <Helmet>
        <html lang={language} />
        <title>{t('siteTitle', title)}</title>
        <meta name="description" content={t('siteDescription', description)} />
      </Helmet>
      <MainNav />

      <LayoutContent>{children}</LayoutContent>
      <Footer />
      <AsideFooter />
    </ThemeProvider>
  )
}
