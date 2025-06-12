import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { SchemaOrg } from 'components/SEO/SchemaOrg'
import { getLanguageFromPath } from 'consts/languageConfig'
import { 
  BUSINESS_NAME_ML, 
  BUSINESS_DESCRIPTION_ML,
  ADDRESS_ML,
  WEBSITE_URL
} from 'consts/contactDetails'

/**
 * Component for adding consistent structured NAP data to pages
 * Ensures that all contact information is consistently structured
 * across all pages where it appears
 * 
 * @param {Object} props - Component props
 * @param {string} props.pathname - Current page path
 * @param {string} props.url - Full URL of current page
 */
export function StructuredNapData({
  pathname,
  url
}) {
  const { t, i18n } = useTranslation('seo')
  const currentLang = pathname ? getLanguageFromPath(pathname) : i18n.language
  
  // Get language-appropriate business name and description
  const businessName = t('business.name', BUSINESS_NAME_ML[currentLang])
  const businessDescription = t('business.description', BUSINESS_DESCRIPTION_ML[currentLang])
  
  return (
    <SchemaOrg
      url={url || WEBSITE_URL}
      title={businessName}
      description={businessDescription}
      structuredDataType="local-business"
    />
  )
}

export default StructuredNapData
