import React from 'react'
import { SchemaOrg } from 'components/SEO/SchemaOrg'
import { useBreadcrumbs } from 'utils/breadcrumbs'
import { WEBSITE_URL } from 'consts/contactDetails'

/**
 * Component for adding BreadcrumbList structured data to pages
 * Simplifies the process of adding schema.org BreadcrumbList markup
 * 
 * @param {Object} props - Component props
 * @param {string} props.pathname - The current page path
 * @param {string} props.url - The full URL of the current page (defaults to website URL + pathname)
 */
export const BreadcrumbSchema = ({
  pathname,
  url
}) => {
  // Generate breadcrumbs for the current page
  const breadcrumbs = useBreadcrumbs(pathname)
  
  // Only render if we have breadcrumbs
  if (!breadcrumbs || breadcrumbs.length < 2) {
    return null
  }
  
  return (
    <SchemaOrg
      url={url || `${WEBSITE_URL}${pathname}`}
      structuredDataType="breadcrumbs"
      breadcrumbs={breadcrumbs}
    />
  )
}

export default BreadcrumbSchema
