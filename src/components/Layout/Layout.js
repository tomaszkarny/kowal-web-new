import React from 'react'
import Helmet from 'react-helmet'

import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { THEME } from 'consts/theme'
import { GlobalStyles } from 'components/common/GlobalStyles'

import { useSiteMetadata } from 'utils/hooks/useSiteMetadata'

import { MainNav } from 'components/Layout/MainNav/MainNav'
import { Footer } from 'components/Layout/Footer/Footer'
import { AsideFooter } from 'components/Layout/AsideFooter/AsideFooter'

import { LayoutContent } from 'components/Layout/Layout.styles'

export const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()

  return (
    <ThemeProvider theme={THEME}>
      <Global styles={GlobalStyles} />

      <Helmet>
        <html lang="en" />
        <title> {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <MainNav />

      <LayoutContent>{children}</LayoutContent>
      <Footer />
      <AsideFooter />
    </ThemeProvider>
  )
}
