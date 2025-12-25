import React from 'react'
import { getServiceSchemaData } from 'utils/schemaTranslations'

export function ServiceSchema({ language }) {
  const schema = getServiceSchemaData(language)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ServiceSchema
