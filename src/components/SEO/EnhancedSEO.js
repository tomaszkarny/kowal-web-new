import React from 'react'
import { useLocation } from '@reach/router'
import { WEBSITE_URL } from 'consts/contactDetails'
import { SITE_DOMAIN } from 'consts/site'
import { useSiteMetadata } from '../../utils/hooks/useSiteMetadata'
import { getLanguageUrls, getLanguageFromPath } from '../../consts/languageConfig'
import { getSEOTranslations } from '../../utils/seoLanguageDetection'
import { WebVitals } from './WebVitals'

// Use the centralized domain constant for all SEO elements
const CANONICAL_DOMAIN = SITE_DOMAIN

/**
 * Enhanced SEO component that provides comprehensive SEO optimization
 * Based on the original SEO component but with expanded functionality
 */
export function EnhancedSEO({
  title,
  description,
  pathname,
  image,
  socialCard,
  article = false,
  datePublished,
  dateModified,
  pageType = 'other',
  language, // Accept language prop
  children,
  /* ⬇ NEW FLAGS */
  appendSiteTitle = true,
  injectBaseSchemas = true,
  structuredData = 'website',
  /* keywords removed - deprecated */
  noindex = false,
  breadcrumbs = [],
  faq = []
}) {
  // IMPORTANT: Don't use useTranslation hooks in Head API - they're unreliable during build
  // Instead, we'll use the language prop and hardcoded translations
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

  // Improved language detection that works for both SSR and client-side
  let currentLanguage;
  
  // First priority: explicit language prop (from pageContext during build)
  if (language) {
    currentLanguage = language;
  } 
  // Second priority: detect from pathname (works for both SSR and client)
  else {
    const currentPath = pathname || path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    currentLanguage = getLanguageFromPath(currentPath) || 'pl';
  }
  
  // Force re-render on language change by using the language in the component key
  const languageKey = `seo-${currentLanguage}-${pageType}`;
  
  // Debug logging for build issues
  if (typeof window === 'undefined') {
    console.log(`[EnhancedSEO SSR] Building page - language: ${currentLanguage}, pathname: ${pathname || path}, pageType: ${pageType}, title prop: ${title}, language prop: ${language}`);
  }
  
  // Get translations from our hardcoded data (same as in seoLanguageDetection.js)
  const translations = getSEOTranslations(currentLanguage, pageType);
  
  // Determine default meta title based on page type
  const pageTitle = title || translations.pageTitle || '';
  
  // Debug what we're getting
  if (typeof window === 'undefined') {
    console.log(`[EnhancedSEO SSR] pageTitle: ${pageTitle}, translations.pageTitle: ${translations.pageTitle}`);
  }
  
  // Determine default meta description based on page type
  const pageDescription = description || translations.pageDescription || '';
  
  // Use hardcoded site titles based on language
  const baseSiteTitle = translations.siteTitle || (currentLanguage === 'pl'
    ? 'Pracownia Kowalstwa Artystycznego - Tadeusz Karny'
    : 'Tadeusz Karny Artistic Blacksmith');
  
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
  
  // Debug final title
  if (typeof window === 'undefined') {
    console.log(`[EnhancedSEO SSR] Final title: ${finalTitle}`);
  }

  const siteDescriptionFallback = currentLanguage === 'en'
    ? 'Artistic blacksmithing – bespoke gates, railings, fences and decorative ironwork.'
    : 'Kowalstwo artystyczne – bramy, balustrady i ogrodzenia na zamówienie.';

  const seo = {
    title: finalTitle,
    description: pageDescription || translations.siteDescription || siteDescriptionFallback,
    image: socialCard || image || defaultImage,
    url: `${siteDomain}${cleanPath}`,
    lang: currentLanguage
    /* keywords removed - deprecated */
  }

  // Get the current path adjusted for proper canonical URL
  let adjustedPath = cleanPath;
  
  // For Polish pages, ensure canonical URLs never have /pl/ prefix
  if (currentLanguage === 'pl' && adjustedPath.startsWith('/pl/')) {
    adjustedPath = adjustedPath.replace(/^\/pl/, '') || '/';
    console.log(`[EnhancedSEO] Stripped /pl/ prefix from canonical: ${cleanPath} → ${adjustedPath}`);
  }
  
  // Get language-specific URLs using our configuration
  const languageUrls = getLanguageUrls(adjustedPath)
  
  // Canonical URL = clean URL without /pl/ prefix for Polish, with /en/ for English
  const canonicalUrl = `${siteDomain}${adjustedPath}`;
  
  // hreflang tags are now handled by gatsby-plugin-react-i18next

  // Create structured data for different types
  const generateStructuredData = () => 
    // We're removing the schema generation from here since
    // language-aware schemas are now handled by dedicated components
    // (LocalBusinessSchema, FAQSchema, etc.) on each page
     []
  

  return (
    <>
      <html lang={seo.lang} />
      <title key={languageKey}>{seo.title}</title>
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
      <meta property="og:site_name" content={baseSiteTitle} />
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
      
      {/* Web Vitals monitoring */}
      <WebVitals />
    </>
  )
}

/**
 * React component for use with Gatsby's Head API
 * This function is what gets exported from page components
 */
export function PageSEO(props) {
  return <EnhancedSEO {...props} />
}

// Also export as Head for backward compatibility
export const Head = PageSEO
