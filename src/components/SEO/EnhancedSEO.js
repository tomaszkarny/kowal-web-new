import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { useSiteMetadata } from '../../utils/hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { getLanguageUrls, getLanguageFromPath } from '../../consts/languageConfig'

/**
 * Enhanced SEO component that provides comprehensive SEO optimization
 * Based on the original SEO component but with expanded functionality
 */
export const EnhancedSEO = ({
  title,
  description,
  pathname,
  image,
  article = false,
  datePublished,
  dateModified,
  pageType = 'other',
  children,
  structuredData = 'website',
  keywords = [],
  noindex = false,
  breadcrumbs = [],
  faq = []
}) => {
  const { t: tCommon } = useTranslation('common') // For site title and common elements
  const { t: tSeo } = useTranslation('seo') // For page-specific titles and descriptions
  const { language, languages, originalPath } = useI18next()
  const location = useLocation()
  const { 
    title: defaultTitle, 
    description: defaultDescription, 
    siteUrl, 
    image: defaultImage,
    author,
    twitterUsername,
    organization
  } = useSiteMetadata()

  // Use the provided pathname or get it from the location
  const path = pathname || location.pathname || ''
  
  // Handle trailing slashes for canonical URLs
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  
  // Determine default meta title based on page type
  let pageTitle = title || '';
  if (!pageTitle) {
    // Explicitly check both translations for debugging
    const debugSeoKey = `${pageType}.title`;
    const hasTitleInSeo = tSeo(debugSeoKey, { defaultValue: null }) !== null;
    
    // Log translation debugging info if in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SEO Debug] Language: ${language}, PageType: ${pageType}`);
      console.log(`[SEO Debug] Looking for key: "${debugSeoKey}" in seo namespace`);
      console.log(`[SEO Debug] Found in seo namespace: ${hasTitleInSeo}`);
    }
    
    // Always fall back to common namespace for page names if seo title is missing
    if (hasTitleInSeo) {
      // Use the seo namespace title if it exists
      pageTitle = tSeo(`${pageType}.title`);
    } else {
      // Fall back construction with site title
      const pageName = tCommon(pageType, '');
      const siteName = tCommon('siteTitle', '');
      
      if (pageName && siteName) {
        pageTitle = `${pageName} - ${siteName}`;
      } else if (pageType === 'home') {
        pageTitle = tCommon('siteTitle', 'Pracownia Kowalstwa Artystycznego - Tadeusz Karny');
      }
    }
  }
  
  // Determine default meta description based on page type
  let pageDescription = description || '';
  if (!pageDescription) {
    switch(pageType) {
      case 'home':
        pageDescription = tSeo('home.description', 'Pracownia Kowalstwa Artystycznego');
        break;
      case 'about':
        pageDescription = tSeo('about.description', 'Poznaj naszą pracownię kowalstwa artystycznego.');
        break;
      case 'gallery':
        pageDescription = tSeo('gallery.description', 'Zobacz nasze portfolio bram, balustrad, ogrodzeń.');
        break;
      case 'contact':
        pageDescription = tSeo('contact.description', 'Skontaktuj się z nami.');
        break;
      default:
        pageDescription = '';
    }
  }
  
  const seo = {
    title: pageTitle ? `${pageTitle} | ${tCommon('siteTitle', defaultTitle)}` : tCommon('siteTitle', defaultTitle),
    description: pageDescription || tCommon('siteDescription', defaultDescription),
    image: image || defaultImage,
    url: `${siteUrl}${cleanPath}`,
    lang: language,
    keywords: keywords ? keywords.join(', ') : ''
  }

  // Get the current path adjusted for proper canonical URL (no trailing slash except homepage)
  const adjustedPath = path.endsWith('/') || path === '' ? path : `${path}/`
  
  // Get language-specific URLs using our configuration
  const languageUrls = getLanguageUrls(adjustedPath)
  
  // Current language from path
  const currentLanguage = getLanguageFromPath(adjustedPath)
  
  // Create absolute canonical URL for the current language version
  const canonicalUrl = currentLanguage === 'pl' ? languageUrls.pl : languageUrls.en
  
  // Create hreflang URLs for all supported languages with proper language codes
  const hreflangUrls = [
    { lang: 'pl-PL', url: languageUrls.pl },
    { lang: 'en-US', url: languageUrls.en }
  ]

  // Create structured data for different types
  const generateStructuredData = () => {
    // Basic organization data
    const orgData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: tCommon('siteTitle', defaultTitle),
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description: seo.description
    }
    
    // Local business data
    const localBusinessData = {
      '@context': 'https://schema.org',
      '@type': 'BlacksmithShop',
      '@id': `${siteUrl}/#localbusiness`,
      name: tCommon('siteTitle', defaultTitle),
      url: siteUrl,
      image: `${siteUrl}/images/workshop.jpg`,
      description: seo.description
    }
    
    // Website data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: seo.title,
      description: seo.description,
      url: siteUrl
    }
    
    switch(structuredData) {
      case 'local-business':
        return localBusinessData;
      case 'organization':
        return orgData;
      case 'website':
      default:
        return websiteData;
    }
  }

  return (
    <Helmet title={seo.title} key={`helmet-${language}-${path}-${Date.now()}`}>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      <meta name="image" content={seo.image} />
      
      {/* Robots control for search engines */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Canonical URL - essential for SEO */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags for language variants - important for multilingual SEO */}
      {hreflangUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      {/* Add x-default hreflang for search engines to select default language */}
      <link rel="alternate" hrefLang="x-default" href={languageUrls.default} />
      
      {/* Self-referential hreflang tag for current language (recommended for completeness) */}
      <link rel="alternate" hrefLang={currentLanguage === 'pl' ? 'pl-PL' : 'en-US'} href={canonicalUrl} />

      {/* Google Fonts - match original implementation exactly */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=PT+Sans&display=swap" rel="stylesheet" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image.startsWith('http') ? seo.image : `${siteUrl}${seo.image}`} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={tCommon('siteTitle', defaultTitle)} />
      <meta property="og:locale" content={seo.lang === 'pl' ? 'pl_PL' : 'en_US'} />

      {/* Article specific metadata */}
      {article && datePublished && (
        <>
          <meta property="article:published_time" content={datePublished} />
          <meta property="article:author" content={author || 'Tadeusz Karny'} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      {twitterUsername && <meta name="twitter:site" content={twitterUsername} />}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image.startsWith('http') ? seo.image : `${siteUrl}${seo.image}`} />}
      <meta name="twitter:image:alt" content={seo.title} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>

      {/* Page specific SEO */}
      {children}
    </Helmet>
  )
}

/**
 * React component for use with Gatsby's Head API
 * This function is what gets exported from page components
 */
export const PageSEO = (props) => (
  <EnhancedSEO {...props} />
)

// Also export as Head for backward compatibility
export const Head = PageSEO
