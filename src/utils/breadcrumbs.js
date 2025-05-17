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
  }
}

/**
 * Generate breadcrumb items for the current page path
 * 
 * @param {string} pathname - The current page path
 * @param {function} t - Translation function from useTranslation hook
 * @returns {Array} - Array of breadcrumb items with name, url, and position
 */
export const generateBreadcrumbs = (pathname, t) => {
  // Ensure path ends with trailing slash for consistency
  const currentPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  
  // If path is not in the hierarchy, return a minimal breadcrumb with home + current
  if (!PAGE_HIERARCHY[currentPath]) {
    // Just home + current page
    const isEnglish = currentPath.startsWith('/en/')
    const homePath = isEnglish ? '/en/' : '/'
    const homeLabel = t('common:home')
    
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
      position: position++
    })
    
    path = pageInfo.parent
  }
  
  return breadcrumbs
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
  const isEnglish = path.startsWith('/en/')
  const pageName = path.replace('/en/', '/').split('/')[1]
  
  switch (pageName) {
    case 'about':
      return t('about')
    case 'gallery':
      return t('gallery')
    case 'contact':
      return t('contact')
    default:
      // Fallback to capitalized page name if no translation exists
      return pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }
}

/**
 * React hook to get breadcrumbs for current page
 * 
 * @param {string} pathname - Current page path
 * @returns {Array} - Array of breadcrumb items
 */
export const useBreadcrumbs = (pathname) => {
  // Include both common and seo namespaces to get breadcrumb translations
  const { t } = useTranslation(['common', 'seo'])
  
  // Custom translation function that checks seo.breadcrumbs first, then falls back to common
  const getBreadcrumbLabel = (key) => {
    // Try to get the translation from seo.breadcrumbs namespace first
    const seoTranslation = t(`seo:breadcrumbs.${key}`, { ns: 'seo' })
    
    // If the key exists in seo:breadcrumbs, use it
    if (seoTranslation !== `seo:breadcrumbs.${key}`) {
      return seoTranslation
    }
    
    // Otherwise fall back to common namespace
    return t(key, { ns: 'common' })
  }
  
  return generateBreadcrumbs(pathname, getBreadcrumbLabel)
}
