import React from 'react'
import { WEBSITE_URL, PHONE_NUMBER, BUSINESS_NAME_ML } from 'consts/contactDetails'

export function ProductSchema({ language, cityName }) {
  const products = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": language === 'pl' ? `Ogrodzenia na Zamówienie ${cityName}` : `Custom Fences ${cityName}`,
      "description": language === 'pl' 
        ? `Profesjonalne ogrodzenia kute na zamówienie w ${cityName}. Indywidualne projekty, różnorodne wzory, 5 lat gwarancji. Najlepszy kowal w regionie.`
        : `Professional custom wrought iron fences in ${cityName}. Individual designs, various patterns, 5-year warranty. Best blacksmith in the region.`,
      "brand": {
        "@type": "Brand",
        "name": BUSINESS_NAME_ML[language]
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "PLN",
        "lowPrice": "250",
        "highPrice": "800",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "offerCount": "50",
        "seller": {
          "@type": "LocalBusiness",
          "name": BUSINESS_NAME_ML[language],
          "telephone": PHONE_NUMBER
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": language === 'pl' ? `Bramy Kute na Zamówienie ${cityName}` : `Custom Wrought Iron Gates ${cityName}`,
      "description": language === 'pl'
        ? `Ekskluzywne bramy kute na zamówienie w ${cityName}. Bramy dwuskrzydłowe, przesuwne, z automatyką. Projekt, wykonanie, montaż.`
        : `Exclusive custom wrought iron gates in ${cityName}. Double-leaf, sliding gates with automation. Design, manufacturing, installation.`,
      "brand": {
        "@type": "Brand", 
        "name": BUSINESS_NAME_ML[language]
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "PLN",
        "lowPrice": "3000",
        "highPrice": "15000",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "offerCount": "30",
        "seller": {
          "@type": "LocalBusiness",
          "name": BUSINESS_NAME_ML[language],
          "telephone": PHONE_NUMBER
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "89",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": language === 'pl' ? `Balustrady na Zamówienie ${cityName}` : `Custom Railings ${cityName}`,
      "description": language === 'pl'
        ? `Balustrady na zamówienie w ${cityName} - wewnętrzne i zewnętrzne. Balustrady schodowe, balkonowe, tarasowe. Stal kuta i nierdzewna.`
        : `Custom railings in ${cityName} - interior and exterior. Stair, balcony, terrace railings. Wrought and stainless steel.`,
      "brand": {
        "@type": "Brand",
        "name": BUSINESS_NAME_ML[language]
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "PLN",
        "lowPrice": "300",
        "highPrice": "1200", 
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "offerCount": "40",
        "seller": {
          "@type": "LocalBusiness",
          "name": BUSINESS_NAME_ML[language],
          "telephone": PHONE_NUMBER
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "73",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ]

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