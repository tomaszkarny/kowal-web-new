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
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "description": language === 'pl' 
            ? "Bezpłatna wycena dostosowana do indywidualnego projektu"
            : "Free quote tailored to individual project requirements"
        },
        "warranty": "P5Y",
        "deliveryLeadTime": "P14D",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": language === 'pl' ? "Województwo Podlaskie" : "Podlaskie Voivodeship"
        },
        "acceptedPaymentMethod": [
          "https://schema.org/Cash",
          "https://schema.org/BankTransferInAdvance"
        ],
        "seller": {
          "@type": "LocalBusiness",
          "name": BUSINESS_NAME_ML[language],
          "telephone": PHONE_NUMBER
        }
      },
      "category": "Home & Garden > Outdoor Living > Fencing",
      "material": language === 'pl' ? "Stal kutą S235, S355" : "Wrought Steel S235, S355",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Materiał" : "Material",
          "value": language === 'pl' ? "Stal S235, S355 - najwyższa jakość" : "Steel S235, S355 - highest quality"
        },
        {
          "@type": "PropertyValue", 
          "name": language === 'pl' ? "Gwarancja" : "Warranty",
          "value": language === 'pl' ? "5 lat na wykonanie i materiały" : "5 years on workmanship and materials"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Wycena" : "Quote",
          "value": language === 'pl' ? "Bezpłatna wycena i projekt koncepcyjny" : "Free quote and conceptual design"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Montaż" : "Installation",
          "value": language === 'pl' ? "Profesjonalny montaż w cenie" : "Professional installation included"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Doświadczenie" : "Experience", 
          "value": language === 'pl' ? "30 lat w kowalstwie artystycznym" : "30 years in artistic blacksmithing"
        }
      ],
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
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "description": language === 'pl' 
            ? "Bezpłatna wycena - cena zależy od typu bramy i automatyki"
            : "Free quote - price depends on gate type and automation"
        },
        "warranty": "P5Y",
        "deliveryLeadTime": "P21D",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": language === 'pl' ? "Województwo Podlaskie" : "Podlaskie Voivodeship"
        },
        "acceptedPaymentMethod": [
          "https://schema.org/Cash",
          "https://schema.org/BankTransferInAdvance"
        ],
        "seller": {
          "@type": "LocalBusiness",
          "name": BUSINESS_NAME_ML[language],
          "telephone": PHONE_NUMBER
        }
      },
      "category": "Home & Garden > Outdoor Living > Gates",
      "material": language === 'pl' ? "Stal kuta S235, S355" : "Wrought Steel S235, S355",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Typ" : "Type",
          "value": language === 'pl' ? "Dwuskrzydłowe, przesuwne, z automatyką" : "Double-leaf, sliding, with automation"
        },
        {
          "@type": "PropertyValue", 
          "name": language === 'pl' ? "Gwarancja" : "Warranty",
          "value": language === 'pl' ? "5 lat na wykonanie i automatykę" : "5 years on workmanship and automation"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Automatyka" : "Automation",
          "value": language === 'pl' ? "Montaż i konfiguracja w cenie" : "Installation and configuration included"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Projekt" : "Design",
          "value": language === 'pl' ? "Indywidualny projekt 3D" : "Individual 3D design"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Serwis" : "Service", 
          "value": language === 'pl' ? "Serwis pogwarancyjny" : "Post-warranty service"
        }
      ],
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
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "description": language === 'pl' 
            ? "Bezpłatna wycena - cena zależy od typu i złożoności balustrady"
            : "Free quote - price depends on type and complexity of railings"
        },
        "warranty": "P5Y",
        "deliveryLeadTime": "P10D",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": language === 'pl' ? "Województwo Podlaskie" : "Podlaskie Voivodeship"
        },
        "acceptedPaymentMethod": [
          "https://schema.org/Cash",
          "https://schema.org/BankTransferInAdvance"
        ],
        "seller": {
          "@type": "LocalBusiness",
          "name": BUSINESS_NAME_ML[language],
          "telephone": PHONE_NUMBER
        }
      },
      "category": "Home & Garden > Indoor Living > Railings",
      "material": language === 'pl' ? "Stal kuta, stal nierdzewna" : "Wrought steel, stainless steel",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Zastosowanie" : "Application",
          "value": language === 'pl' ? "Wewnętrzne i zewnętrzne" : "Interior and exterior"
        },
        {
          "@type": "PropertyValue", 
          "name": language === 'pl' ? "Typy" : "Types",
          "value": language === 'pl' ? "Schodowe, balkonowe, tarasowe" : "Stair, balcony, terrace railings"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Gwarancja" : "Warranty",
          "value": language === 'pl' ? "5 lat na wykonanie" : "5 years on workmanship"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Montaż" : "Installation",
          "value": language === 'pl' ? "Ekspresowy montaż w 24h" : "Express installation within 24h"
        },
        {
          "@type": "PropertyValue",
          "name": language === 'pl' ? "Wykończenie" : "Finish", 
          "value": language === 'pl' ? "Malowanie proszkowe, galwanizacja" : "Powder coating, galvanization"
        }
      ],
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