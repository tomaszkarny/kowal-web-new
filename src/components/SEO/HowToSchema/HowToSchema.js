import React from 'react'
import { getHowToSchemaData } from 'utils/schemaTranslations'
import { WEBSITE_URL, PHONE_NUMBER, BUSINESS_NAME_ML } from 'consts/contactDetails'

export function HowToSchema({ language, schemaType = 'ordering' }) {
  const schema = getHowToSchemaData(
    language,
    schemaType,
    BUSINESS_NAME_ML[language],
    PHONE_NUMBER,
    WEBSITE_URL
  )

  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default HowToSchema
