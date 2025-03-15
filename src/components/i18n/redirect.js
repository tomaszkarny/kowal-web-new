import React from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'

// This component is used by gatsby-plugin-react-i18next to handle redirects
const Redirect = () => {
  const { languages, originalPath, defaultLanguage } = useI18next()

  React.useEffect(() => {
    const detected =
      typeof window !== 'undefined' && window.localStorage.getItem('language')
        ? window.localStorage.getItem('language')
        : defaultLanguage

    if (typeof window !== 'undefined') {
      // Handle language detection and redirect
      const path = `/${detected}${originalPath}`
      navigate(path, { replace: true })
    }
  }, [])

  return null
}

export default Redirect
