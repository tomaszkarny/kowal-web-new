import React from 'react'
import { getProductSchemaData } from 'utils/schemaTranslations'
import { PHONE_NUMBER, BUSINESS_NAME_ML } from 'consts/contactDetails'

export function ProductSchema({ language, cityName }) {
  const products = getProductSchemaData(
    language,
    cityName,
    BUSINESS_NAME_ML[language],
    PHONE_NUMBER
  )

  return (
    <>
      {products.map((product, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
        />
      ))}
    </>
  )
}

export default ProductSchema
