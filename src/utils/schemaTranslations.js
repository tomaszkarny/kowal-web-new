/**
 * Schema translations helper for Gatsby Head API context
 * This reads translations directly since useTranslation doesn't work in Head
 */

import plSeo from '../../locales/pl/seo.json'
import enSeo from '../../locales/en/seo.json'

const seoTranslations = {
  pl: plSeo,
  en: enSeo
}

/**
 * Get schema translations for the given language
 * @param {string} language - 'pl' or 'en'
 * @returns {object} Schema translations object
 */
export const getSchemaTranslations = (language) => {
  return seoTranslations[language]?.schema || seoTranslations.pl.schema
}

/**
 * Get translated value with template variable replacement
 * @param {object} translations - The schema translations object
 * @param {string} key - Dot-notation key like 'products.fences.name'
 * @param {object} params - Template parameters like { city: 'Białystok' }
 * @returns {string} Translated string with replaced variables
 */
export const getSchemaValue = (translations, key, params = {}) => {
  const keys = key.split('.')
  let value = translations

  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) return key // fallback to key if not found
  }

  if (typeof value === 'string' && params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => params[paramKey] || '')
  }

  return value
}

/**
 * Get complete product schema data for a city
 * @param {string} language - 'pl' or 'en'
 * @param {string} cityName - City name for templates
 * @param {string} businessName - Business name in the given language
 * @param {string} phoneNumber - Business phone number
 * @returns {array} Array of Product schema objects
 */
export const getProductSchemaData = (language, cityName, businessName, phoneNumber) => {
  const schema = getSchemaTranslations(language)
  const t = (key, params = {}) => getSchemaValue(schema, key, params)

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": t('products.fences.name', { city: cityName }),
      "description": t('products.fences.description', { city: cityName }),
      "brand": {
        "@type": "Brand",
        "name": businessName
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "description": t('products.common.priceDescription')
        },
        "warranty": "P5Y",
        "deliveryLeadTime": "P14D",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": t('products.common.areaServed')
        },
        "acceptedPaymentMethod": [
          "https://schema.org/Cash",
          "https://schema.org/BankTransferInAdvance"
        ],
        "seller": {
          "@type": "LocalBusiness",
          "name": businessName,
          "telephone": phoneNumber
        }
      },
      "category": "Home & Garden > Outdoor Living > Fencing",
      "material": t('products.common.material'),
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": t('products.properties.material.name'),
          "value": t('products.properties.material.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.warranty.name'),
          "value": t('products.properties.warranty.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.quote.name'),
          "value": t('products.properties.quote.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.installation.name'),
          "value": t('products.properties.installation.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.experience.name'),
          "value": t('products.properties.experience.value')
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
      "name": t('products.gates.name', { city: cityName }),
      "description": t('products.gates.description', { city: cityName }),
      "brand": {
        "@type": "Brand",
        "name": businessName
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "description": t('products.gates.priceDescription')
        },
        "warranty": "P5Y",
        "deliveryLeadTime": "P21D",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": t('products.common.areaServed')
        },
        "acceptedPaymentMethod": [
          "https://schema.org/Cash",
          "https://schema.org/BankTransferInAdvance"
        ],
        "seller": {
          "@type": "LocalBusiness",
          "name": businessName,
          "telephone": phoneNumber
        }
      },
      "category": "Home & Garden > Outdoor Living > Gates",
      "material": t('products.common.material'),
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": t('products.properties.type.name'),
          "value": t('products.properties.type.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.gatesWarranty.name'),
          "value": t('products.properties.gatesWarranty.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.automation.name'),
          "value": t('products.properties.automation.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.design.name'),
          "value": t('products.properties.design.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.service.name'),
          "value": t('products.properties.service.value')
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
      "name": t('products.railings.name', { city: cityName }),
      "description": t('products.railings.description', { city: cityName }),
      "brand": {
        "@type": "Brand",
        "name": businessName
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "description": t('products.railings.priceDescription')
        },
        "warranty": "P5Y",
        "deliveryLeadTime": "P10D",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": t('products.common.areaServed')
        },
        "acceptedPaymentMethod": [
          "https://schema.org/Cash",
          "https://schema.org/BankTransferInAdvance"
        ],
        "seller": {
          "@type": "LocalBusiness",
          "name": businessName,
          "telephone": phoneNumber
        }
      },
      "category": "Home & Garden > Indoor Living > Railings",
      "material": t('products.railings.material'),
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": t('products.properties.application.name'),
          "value": t('products.properties.application.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.types.name'),
          "value": t('products.properties.types.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.railingsWarranty.name'),
          "value": t('products.properties.railingsWarranty.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.expressInstallation.name'),
          "value": t('products.properties.expressInstallation.value')
        },
        {
          "@type": "PropertyValue",
          "name": t('products.properties.finish.name'),
          "value": t('products.properties.finish.value')
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
}

/**
 * Get service schema data
 * @param {string} language - 'pl' or 'en'
 * @returns {object} Service schema object
 */
export const getServiceSchemaData = (language) => {
  const schema = getSchemaTranslations(language)
  const t = (key) => getSchemaValue(schema, key)

  const services = [
    {
      "@type": "Service",
      "name": t('services.gates.name'),
      "description": t('services.gates.description'),
      "provider": {
        "@type": "LocalBusiness",
        "name": "Pracownia Kowalstwa Artystycznego - Tadeusz Karny"
      }
    },
    {
      "@type": "Service",
      "name": t('services.railings.name'),
      "description": t('services.railings.description'),
      "provider": {
        "@type": "LocalBusiness",
        "name": "Pracownia Kowalstwa Artystycznego - Tadeusz Karny"
      }
    },
    {
      "@type": "Service",
      "name": t('services.fences.name'),
      "description": t('services.fences.description'),
      "provider": {
        "@type": "LocalBusiness",
        "name": "Pracownia Kowalstwa Artystycznego - Tadeusz Karny"
      }
    }
  ]

  return {
    "@context": "https://schema.org",
    "@graph": services
  }
}

/**
 * Get HowTo schema data
 * @param {string} language - 'pl' or 'en'
 * @param {string} schemaType - 'ordering' or 'maintenance'
 * @param {string} businessName - Business name in the given language
 * @param {string} phoneNumber - Business phone number
 * @param {string} websiteUrl - Website URL
 * @returns {object|null} HowTo schema object or null
 */
export const getHowToSchemaData = (language, schemaType, businessName, phoneNumber, websiteUrl) => {
  const schema = getSchemaTranslations(language)
  const t = (key) => getSchemaValue(schema, key)

  const schemas = {
    ordering: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": t('howTo.ordering.name'),
      "description": t('howTo.ordering.description'),
      "image": `${websiteUrl}/images/anvil_2.webp`,
      "totalTime": "PT4W",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "PLN",
        "value": t('howTo.ordering.estimatedCost')
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": t('howTo.supplies.measurements')
        },
        {
          "@type": "HowToSupply",
          "name": t('howTo.supplies.concept')
        },
        {
          "@type": "HowToSupply",
          "name": t('howTo.supplies.materials')
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": t('howTo.tools.blacksmithing')
        },
        {
          "@type": "HowToTool",
          "name": t('howTo.tools.installation')
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": t('howTo.steps.ordering.step1.name'),
          "text": t('howTo.steps.ordering.step1.text'),
          "url": `${websiteUrl}/contact/`,
          "image": `${websiteUrl}/images/workbench.png`
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": t('howTo.steps.ordering.step2.name'),
          "text": t('howTo.steps.ordering.step2.text'),
          "url": `${websiteUrl}/contact/`,
          "image": `${websiteUrl}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": t('howTo.steps.ordering.step3.name'),
          "text": t('howTo.steps.ordering.step3.text'),
          "image": `${websiteUrl}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": t('howTo.steps.ordering.step4.name'),
          "text": t('howTo.steps.ordering.step4.text'),
          "image": `${websiteUrl}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": t('howTo.steps.ordering.step5.name'),
          "text": t('howTo.steps.ordering.step5.text'),
          "image": `${websiteUrl}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": t('howTo.steps.ordering.step6.name'),
          "text": t('howTo.steps.ordering.step6.text'),
          "image": `${websiteUrl}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 7,
          "name": t('howTo.steps.ordering.step7.name'),
          "text": t('howTo.steps.ordering.step7.text'),
          "url": `${websiteUrl}/contact/`,
          "image": `${websiteUrl}/images/anvil_2.webp`
        }
      ],
      "yield": t('howTo.ordering.yield'),
      "provider": {
        "@type": "LocalBusiness",
        "name": businessName,
        "telephone": phoneNumber,
        "url": websiteUrl
      },
      "potentialAction": {
        "@type": "ContactAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${websiteUrl}/contact/`,
          "inLanguage": language
        },
        "name": t('howTo.ordering.actionName')
      }
    },

    maintenance: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": t('howTo.maintenance.name'),
      "description": t('howTo.maintenance.description'),
      "image": `${websiteUrl}/images/anvil_2.webp`,
      "totalTime": "PT2H",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": t('howTo.supplies.cloth')
        },
        {
          "@type": "HowToSupply",
          "name": t('howTo.supplies.soapyWater')
        },
        {
          "@type": "HowToSupply",
          "name": t('howTo.supplies.antiCorrosionPaint')
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": t('howTo.steps.maintenance.step1.name'),
          "text": t('howTo.steps.maintenance.step1.text')
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": t('howTo.steps.maintenance.step2.name'),
          "text": t('howTo.steps.maintenance.step2.text')
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": t('howTo.steps.maintenance.step3.name'),
          "text": t('howTo.steps.maintenance.step3.text')
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": t('howTo.steps.maintenance.step4.name'),
          "text": t('howTo.steps.maintenance.step4.text')
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": t('howTo.steps.maintenance.step5.name'),
          "text": t('howTo.steps.maintenance.step5.text')
        }
      ],
      "yield": t('howTo.maintenance.yield')
    }
  }

  return schemas[schemaType] || null
}
