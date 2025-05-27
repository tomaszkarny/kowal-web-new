/**
 * Breadcrumb utilities for generating hierarchical path data
 * Used for BreadcrumbList schema.org structured data
 */
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { WEBSITE_URL } from 'consts/contactDetails'

// Site page structure - defines the hierarchy of pages
const PAGE_HIERARCHY = {
  '/': { // Home
    parent: null,
    level: 0
  },
  '/en/': { // English Home
    parent: null,
    level: 0
  },
  '/about/': {
    parent: '/',
    level: 1
  },
  '/en/about/': {
    parent: '/en/',
    level: 1
  },
  '/gallery/': {
    parent: '/',
    level: 1
  },
  '/en/gallery/': {
    parent: '/en/',
    level: 1
  },
  '/contact/': {
    parent: '/',
    level: 1
  },
  '/en/contact/': {
    parent: '/en/',
    level: 1
  },
  '/faq/': {
    parent: '/',
    level: 1
  },
  '/en/faq/': {
    parent: '/en/',
    level: 1
  }
}

/**
 * Get static translation for SSR
 * @param {string} key - Translation key
 * @param {string} lang - Language code
 * @returns {string} - Translated text
 */
const getStaticTranslation = (key, lang) => {
  const translations = {
    pl: {
      home: 'Strona główna',
      about: 'O nas',
      gallery: 'Galeria',
      contact: 'Kontakt',
      faq: 'FAQ'
    },
    en: {
      home: 'Home',
      about: 'About',
      gallery: 'Gallery',
      contact: 'Contact',
      faq: 'FAQ'
    }
  }
  
  return translations[lang]?.[key] || key
}

/**
 * Get the translated label for a page path
 * 
 * @param {string} path - The page path
 * @param {function} t - Translation function
 * @returns {string} - Translated page label
 */
const getPageLabel = (path, t) => {
  if (path === '/' || path === '/en/') {
    return t('home')
  }
  
  // Extract the page name from the path
  const pageName = path.replace('/en/', '/').split('/')[1]
  
  switch (pageName) {
    case 'about':
      return t('about')
    case 'gallery':
      return t('gallery')
    case 'contact':
      return t('contact')
    case 'faq':
      return t('faq')
    default:
      // Fallback to capitalized page name if no translation exists
      return pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }
}

/**
 * Generate breadcrumb items for the current page path
 * 
 * @param {string} pathname - The current page path
 * @param {string|function} langOrT - Language code ('pl' or 'en') or translation function
 * @returns {Array} - Array of breadcrumb items with name, url, and position
 */
export const generateBreadcrumbs = (pathname, langOrT = 'pl') => {
  // Ensure path ends with trailing slash for consistency
  const currentPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  
  // Determine if we have a translation function or language code
  const isFunction = typeof langOrT === 'function'
  const t = isFunction ? langOrT : (key) => getStaticTranslation(key, langOrT)
  
  // If path is not in the hierarchy, return a minimal breadcrumb with home + current
  if (!PAGE_HIERARCHY[currentPath]) {
    // Just home + current page
    const homePath = currentPath.startsWith('/en/') ? '/en/' : '/'
    const homeLabel = t('home')
    
    const current = {
      name: getPageLabel(currentPath, t),
      url: `${WEBSITE_URL}${currentPath}`,
      position: 2
    }
    
    return [
      {
        name: homeLabel,
        url: `${WEBSITE_URL}${homePath}`,
        position: 1
      },
      current
    ]
  }
  
  // Build complete breadcrumb trail by traversing up the hierarchy
  const breadcrumbs = []
  let path = currentPath
  let position = 1
  
  while (path !== null) {
    const pageInfo = PAGE_HIERARCHY[path]
    
    if (!pageInfo) break
    
    breadcrumbs.unshift({
      name: getPageLabel(path, t),
      url: `${WEBSITE_URL}${path}`,
      position
    })
    
    position += 1
    path = pageInfo.parent
  }
  
  return breadcrumbs
}

/**
 * React hook to get breadcrumbs for current page
 * Uses the translation system
 * 
 * @param {string} pathname - Current page pathname
 * @returns {Array} - Array of breadcrumb items
 */
export const useBreadcrumbs = (pathname) => {
  const { t } = useTranslation('common')
  return generateBreadcrumbs(pathname, t)
}

/**
 * Helper to get breadcrumbs for specific language during build
 * 
 * @param {string} pathname - Current page pathname
 * @param {string} language - Language code
 * @returns {Array} - Array of breadcrumb items
 */
export const getBreadcrumbsForLanguage = (pathname, language) => generateBreadcrumbs(pathname, language)