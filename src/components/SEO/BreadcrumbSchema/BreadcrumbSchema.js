import React from 'react'
import { generateBreadcrumbs } from 'utils/breadcrumbs'
import { WEBSITE_URL } from 'consts/contactDetails'
import { StructuredDataScript } from 'components/common/StructuredDataScript'

/**
 * Component for adding BreadcrumbList structured data to pages
 * Automatically generates breadcrumb schema based on the current pathname
 * 
 * @param {Object} props - Component props
 * @param {string} props.pathname - The pathname of the current page
 * @param {string} props.url - The full URL of the current page
 * @param {string} props.language - Language code (pl or en)
 */
export function BreadcrumbSchema({ pathname, url, language = 'pl' }) {
  // Generate breadcrumbs for the current path
  const breadcrumbs = generateBreadcrumbs(pathname, language)
  
  // Return null if no breadcrumbs (e.g., for homepage)
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null
  }
  
  // Build the schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${WEBSITE_URL}${item.url}`
    }))
  }
  
  return <StructuredDataScript schema={schema} id="breadcrumb-schema" />
}

export default BreadcrumbSchema