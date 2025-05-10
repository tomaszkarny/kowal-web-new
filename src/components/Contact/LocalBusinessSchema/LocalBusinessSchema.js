import React from 'react'
import { SchemaOrg } from 'components/SEO/SchemaOrg'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { WEBSITE_URL, BUSINESS_NAME, BUSINESS_DESCRIPTION } from 'consts/contactDetails'
import { getLanguageFromPath } from 'consts/languageConfig'

/**
 * Component for adding LocalBusiness structured data to pages
 * Simplifies the process of adding schema.org LocalBusiness markup
 * 
 * @param {Object} props - Component props
 * @param {string} props.url - The URL of the current page (defaults to website URL)
 * @param {string} props.title - The title of the current page
 * @param {string} props.description - Page description (if different from default business description)
 * @param {string} props.image - Main image for the business (optional)
 * @param {string} props.pathname - Current page path for language detection
 */
export const LocalBusinessSchema = ({
  url = WEBSITE_URL,
  title,
  description,
  image,
  pathname
}) => {
  const { t, i18n } = useTranslation('seo')
  const currentLang = pathname ? getLanguageFromPath(pathname) : i18n.language
  
  // Use translations or fallback to provided values
  const businessName = title || t('business.name', BUSINESS_NAME)
  const businessDescription = description || t('business.description', BUSINESS_DESCRIPTION)
  
  // Set the appropriate language for schema
  const inLanguage = currentLang === 'en' ? 'en-US' : 'pl-PL'
  
  return (
    <SchemaOrg
      url={url}
      title={businessName}
      description={businessDescription}
      image={image}
      language={inLanguage}
      structuredDataType="local-business"
    />
  )
}

export default LocalBusinessSchema
