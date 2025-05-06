import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { useSiteMetadata } from 'utils/hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

/**
 * SEO component for optimizing pages for search engines
 * Handles title, description, canonical URLs and social media tags
 */
export const SEO = ({ 
  title, 
  description, 
  pathname, 
  image, 
  article,
  children 
}) => {
  const { t } = useTranslation('common')
  const { language, languages, originalPath } = useI18next()
  const location = useLocation()
  const { title: defaultTitle, description: defaultDescription, siteUrl, image: defaultImage } = useSiteMetadata()

  // Use the provided pathname or get it from the location
  const path = pathname || location.pathname || ''
  
  // Handle trailing slashes for canonical URLs
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  
  const seo = {
    title: title ? `${title} | ${t('siteTitle', defaultTitle)}` : t('siteTitle', defaultTitle),
    description: description || t('siteDescription', defaultDescription),
    image: image || defaultImage,
    url: `${siteUrl}${cleanPath}`,
    lang: language
  }

  // Make sure the url and canonical are correct for language versions
  const localePrefix = language === 'pl' ? '' : `/${language}`
  // Create absolute canonical URL with no trailing slash (except homepage)
  const canonicalUrl = `${siteUrl}${localePrefix}${cleanPath || '/'}`
  
  // Create hreflang URLs for all supported languages
  const hreflangUrls = languages.map(lang => {
    const langPrefix = lang === 'pl' ? '' : `/${lang}`
    return {
      lang: lang === 'pl' ? 'pl-PL' : 'en-US',
      url: `${siteUrl}${langPrefix}${originalPath || cleanPath || '/'}`
    }
  })

  return (
    <Helmet title={seo.title}>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      
      {/* Canonical URL - essential for SEO */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags for language variants - important for multilingual SEO */}
      {hreflangUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      {/* Add x-default hreflang for search engines to select default language */}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${originalPath || cleanPath || '/'}`} />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=PT+Sans&display=swap" rel="stylesheet" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image?.startsWith('http') ? seo.image : `${siteUrl}${seo.image}`} />}
      <meta property="og:site_name" content={t('siteTitle', defaultTitle)} />
      <meta property="og:locale" content={seo.lang === 'pl' ? 'pl_PL' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image?.startsWith('http') ? seo.image : `${siteUrl}${seo.image}`} />}

      {/* Page specific SEO */}
      {children}
    </Helmet>
  )
}
