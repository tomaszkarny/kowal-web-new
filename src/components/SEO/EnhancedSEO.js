import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useSiteMetadata } from '../../utils/hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { getLanguageUrls, getLanguageFromPath } from '../../consts/languageConfig'
import { WEBSITE_URL } from 'consts/contactDetails'
import { SITE_DOMAIN } from 'consts/site'

// Use the centralized domain constant for all SEO elements
const CANONICAL_DOMAIN = SITE_DOMAIN

/**
 * Enhanced SEO component that provides comprehensive SEO optimization
 * Based on the original SEO component but with expanded functionality
 */
export const EnhancedSEO = ({
  title,
  description,
  pathname,
  image,
  socialCard,
  article = false,
  datePublished,
  dateModified,
  pageType = 'other',
  children,
  /* ⬇ NEW FLAGS */
  appendSiteTitle = true,
  injectBaseSchemas = true,
  structuredData = 'website',
  /* keywords removed - deprecated */
  noindex = false,
  breadcrumbs = [],
  faq = []
}) => {
  const { t: tCommon } = useTranslation('common') // For site title and common elements
  const { t: tSeo } = useTranslation('seo') // For page-specific titles and descriptions
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
  
  // Always use the canonical domain for all SEO elements to ensure consistent indexing
  const siteDomain = CANONICAL_DOMAIN;

  // Use the provided pathname or get it from the location
  const path = pathname || location.pathname || ''

  // Helper function to ensure consistent trailing slashes for all URLs
  const ensureTrailingSlash = (urlPath) => {
    if (urlPath === '/') return urlPath;
    return urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  };
  
  // Clean the path and ensure it has a trailing slash for consistency
  const cleanPath = ensureTrailingSlash(path)

  // Detect language once
  const currentLanguage = getLanguageFromPath(path);
  
  // Determine default meta title based on page type
  let pageTitle = title || '';
  if (!pageTitle) {
    // Explicitly check both translations for debugging
    const debugSeoKey = `${pageType}.title`;
    // Use a safer approach to check for translation existence
    // We'll try-catch in case i18n.exists is problematic
    let hasTitleInSeo = false;
    try {
      // First check if the key exists using the translation function
      const translatedValue = tSeo(`${pageType}.title`, null);
      hasTitleInSeo = translatedValue !== null && translatedValue !== `${pageType}.title`;
    } catch (e) {
      // console.warn(`Error checking translation existence: ${e.message}`); // Removed warning
    }
    
    // Always fall back to common namespace for page names if seo title is missing
    if (hasTitleInSeo) {
      // Use the seo namespace title if it exists - using tSeo hook
      pageTitle = tSeo(`${pageType}.title`);
    } else {
      // Fall back construction with site title - using tCommon hook
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
  
  // Use the translation hooks properly to ensure consistency
  // Using tCommon instead of i18n.t as a safer approach
  // Force translation in the detected language
  const translatedSiteTitle = tCommon('siteTitle', { lng: currentLanguage });

  // Fallback to language-specific defaults if translation is missing, empty, or returns the key itself
  const baseSiteTitle =
    translatedSiteTitle &&
    translatedSiteTitle !== 'siteTitle' &&
    translatedSiteTitle !== 'common:siteTitle'
      ? translatedSiteTitle
      : currentLanguage === 'pl'
        ? 'Pracownia Kowalstwa Artystycznego - Tadeusz Karny'
        : defaultTitle;
  
  // Implement smart title handling with appendSiteTitle flag
  const baseTitle = pageTitle || ''; // pageTitle is the 'title' prop from page
  const siteNameString = baseSiteTitle; // baseSiteTitle is already defined as: tCommon('siteTitle') || defaultTitle;
  let finalTitle;

  if (pageType === 'home') {
    // For the home page, use the title passed in (baseTitle).
    // If baseTitle is empty, fall back to the siteNameString.
    finalTitle = baseTitle || siteNameString;
  } else {
    // For other pages, apply append logic if appendSiteTitle is true.
    if (appendSiteTitle && baseTitle && siteNameString) {
      // Only append if baseTitle is not the same as siteNameString and does not already include it.
      if (baseTitle.trim().toLowerCase() !== siteNameString.trim().toLowerCase() && 
          !baseTitle.toLowerCase().includes(siteNameString.toLowerCase())) {
        finalTitle = `${baseTitle} | ${siteNameString}`;
      } else {
        // baseTitle is already the site name or includes it.
        finalTitle = baseTitle;
      }
    } else {
      // If not appending, or baseTitle/siteNameString is missing, use baseTitle or fallback to siteNameString.
      finalTitle = baseTitle || siteNameString;
    }
  }

  // Final fallback if somehow finalTitle is still empty (e.g., baseTitle and siteNameString were both empty)
  if (!finalTitle) {
    finalTitle = siteNameString; // Default to site name if all else fails
  }

  const seo = {
    title: finalTitle,
    description: pageDescription || tCommon('siteDescription', defaultDescription),
    image: socialCard || image || defaultImage,
    url: `${siteDomain}${cleanPath}`,
    lang: currentLanguage
    /* keywords removed - deprecated */
  }

  // Get the current path adjusted for proper canonical URL (no trailing slash except homepage)
  const adjustedPath = path.endsWith('/') || path === '' ? path : `${path}/`
  
  // Get language-specific URLs using our configuration
  const languageUrls = getLanguageUrls(adjustedPath)
  
  // Current language from path already detected earlier
  // const currentLanguage = getLanguageFromPath(adjustedPath)
  
  // Canonical URL = dokładny URL bieżącej strony (z trailing slash jeśli trzeba)
  const canonicalUrl = `${siteDomain}${adjustedPath}`;
  
  // hreflang tags are now handled by gatsby-plugin-react-i18next

  // Create structured data for different types
  const generateStructuredData = () => {
    // Basic organization data
    const orgData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteDomain}/#organization`,
      name: tCommon('siteTitle', defaultTitle),
      url: siteDomain,
      logo: `${siteDomain}/logo.png`,
      description: seo.description
    }
    
    // Local business data
    const localBusinessData = {
      '@context': 'https://schema.org',
      '@type': 'BlacksmithShop',
      '@id': `${siteDomain}/#localbusiness`,
      name: tCommon('siteTitle', defaultTitle),
      url: siteDomain,
      image: `${siteDomain}${defaultImage}`,
      description: seo.description
    }
    
    // Website data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteDomain}/#website`,
      name: seo.title,
      description: seo.description,
      url: siteDomain
    }
    
    const schema = [];

    /* ⬇ Add base schemas if flag is active */
    if (injectBaseSchemas) {
      schema.push(websiteData, orgData);
    }

    /* Handle existing structuredData parameter (for backward compatibility) */
    switch (structuredData) {
      case 'local-business':
        schema.push(localBusinessData);
        break;
      case 'organization':
        if (!injectBaseSchemas) schema.push(orgData);
        break;
      case 'website':
      default:
        if (!injectBaseSchemas) schema.push(websiteData);
    }

    return schema;
  }

  return (
    <Helmet title={seo.title} key={`helmet-${currentLanguage}-${cleanPath}`}>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />
      {/* keywords meta tag removed - deprecated */}
      <meta name="image" content={seo.image} />
      
      {/* Robots control for search engines */}
      {/* Remove canonical URL for noindex pages */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Canonical URL - essential for SEO - only for indexable pages */}
      {!noindex && <link rel="canonical" href={canonicalUrl} key="canonical" />}

      {/* Google Fonts - match original implementation exactly */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=PT+Sans&display=swap" rel="stylesheet" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={noindex ? siteUrl : canonicalUrl} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image.startsWith('http') ? seo.image : `${siteDomain}${seo.image}`} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={tCommon('siteTitle', defaultTitle)} />
      <meta property="og:locale" content={seo.lang === 'pl' ? 'pl_PL' : 'en_US'} />
      {seo.lang === 'pl' ? (
        <meta property="og:locale:alternate" content="en_US" />
      ) : (
        <meta property="og:locale:alternate" content="pl_PL" />
      )}

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
      {seo.image && <meta name="twitter:image" content={seo.image.startsWith('http') ? seo.image : `${siteDomain}${seo.image}`} />}
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
