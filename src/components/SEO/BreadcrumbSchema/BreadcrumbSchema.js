import React from 'react'
import { generateBreadcrumbs } from 'utils/breadcrumbs'
import { WEBSITE_URL } from 'consts/contactDetails'
import { StructuredDataScript } from 'components/common/StructuredDataScript'

/**
 * Component for adding BreadcrumbList structured data to pages
 * Uses provided breadcrumbs prop if available, otherwise generates from pathname
 *
 * @param {Object} props - Component props
 * @param {Array} props.breadcrumbs - Optional pre-built breadcrumb items
 * @param {string} props.pathname - The pathname of the current page
 * @param {string} props.url - The full URL of the current page
 * @param {string} props.language - Language code (pl or en)
 */
export function BreadcrumbSchema({
  breadcrumbs: breadcrumbsProp,
  pathname,
  url,
  language = 'pl',
}) {
  // Use provided breadcrumbs or generate from pathname
  const breadcrumbItems =
    breadcrumbsProp && breadcrumbsProp.length > 0
      ? breadcrumbsProp.map((item, index) => ({
          name: item.name,
          url: (item.item || '').startsWith('http')
            ? item.item
            : `${WEBSITE_URL}${item.item || ''}`,
        }))
      : generateBreadcrumbs(pathname, language)

  // Return null if no breadcrumbs (e.g., for homepage)
  if (!breadcrumbItems || breadcrumbItems.length === 0) {
    return null
  }

  // Build the schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url?.startsWith('http')
        ? item.url
        : `${WEBSITE_URL}${item.url}`,
    })),
  }

  return <StructuredDataScript schema={schema} id="breadcrumb-schema" />
}

export default BreadcrumbSchema