import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { useSiteMetadata } from 'utils/hooks/useSiteMetadata'

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
  const { language } = useI18next()
  const { title: defaultTitle, description: defaultDescription, siteUrl, image: defaultImage } = useSiteMetadata()

  const seo = {
    title: title ? `${title} | ${t('siteTitle', defaultTitle)}` : t('siteTitle', defaultTitle),
    description: description || t('siteDescription', defaultDescription),
    image: image || defaultImage,
    url: `${siteUrl}${pathname || ''}`,
    lang: language
  }

  // Make sure the url and canonical are correct for language versions
  const localePrefix = language === 'pl' ? '' : `/${language}`
  const canonicalUrl = `${siteUrl}${localePrefix}${pathname || ''}`

  return (
    <Helmet title={seo.title}>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:site_name" content={t('siteTitle', defaultTitle)} />
      <meta property="og:locale" content={seo.lang === 'pl' ? 'pl_PL' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {/* Page specific SEO */}
      {children}
    </Helmet>
  )
}
