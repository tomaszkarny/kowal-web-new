import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Layout } from 'components/Layout/Layout'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'

// City page specific components (będziemy tworzyć)
import { CityHero } from 'components/Cities/CityHero'
import { CityServices } from 'components/Cities/CityServices'
import { CityServiceArea } from 'components/Cities/CityServiceArea'
import { CityAbout } from 'components/Cities/CityAbout'
import { CityContact } from 'components/Cities/CityContact'
import { CityFAQ } from 'components/Cities/CityFAQ'

import { WEBSITE_URL } from 'consts/contactDetails'

/**
 * Template dla stron miast
 * Tworzone dynamicznie w gatsby-node.js
 */
function CityPageTemplate({ data, pageContext }) {
  const { city, language } = pageContext
  const { t } = useTranslation('cities')
  
  // Przygotowanie danych dla szablonów tłumaczeń
  const templateData = {
    city: city.name[language],
    region: city.region[language],
    distance: city.distance,
    travelTime: city.travelTime[language],
    radius: city.serviceArea.radius,
    isFreeDelivery: city.freeDelivery
  }

  // Generowanie tytułu i opisu z szablonów
  const pageTitle = t('cityPage.titleTemplate', templateData)
  const pageDescription = t('cityPage.descriptionTemplate', templateData)
  
  // URL strony
  const citySlug = language === 'pl' ? city.slug.pl : city.slug.en
  const pathname = language === 'pl' 
    ? `/cities/${citySlug}/`
    : `/en/cities/${citySlug}/`

  return (
    <Layout>
      <CityHero city={city} language={language} templateData={templateData} />
      <CityServices city={city} language={language} templateData={templateData} />
      <CityServiceArea city={city} language={language} templateData={templateData} />
      <CityAbout city={city} language={language} templateData={templateData} />
      <CityContact city={city} language={language} templateData={templateData} />
      <CityFAQ city={city} language={language} templateData={templateData} />
    </Layout>
  )
}

/**
 * Head component for SEO
 */
export function Head({ pageContext, location }) {
  const { city, language } = pageContext
  
  // Use hardcoded translations instead of useTranslation hook in Head
  const titleTemplate = language === 'pl' 
    ? 'Kowal {{city}} - Bramy Kute, Balustrady | Tadeusz Karny'
    : 'Blacksmith {{city}} - Wrought Iron Gates, Railings | Tadeusz Karny'
    
  const descriptionTemplate = language === 'pl'
    ? 'Profesjonalne kowalstwo artystyczne w {{city}}. Wykonujemy bramy kute, balustrady i ogrodzenia. {{travelTime}} z naszego warsztatu w Białymstoku.'
    : 'Professional artistic blacksmithing in {{city}}. We create wrought iron gates, railings and fences. {{travelTime}} from our workshop in Białystok.'
  
  const templateData = {
    city: city.name[language],
    region: city.region[language],
    distance: city.distance,
    travelTime: city.travelTime[language],
    radius: city.serviceArea.radius
  }

  const pageTitle = titleTemplate
    .replace('{{city}}', templateData.city)
  
  const pageDescription = descriptionTemplate
    .replace('{{city}}', templateData.city)
    .replace('{{travelTime}}', templateData.travelTime)
  
  // Schema.org dla LocalBusiness z obszarem działania
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Kowalstwo Artystyczne Tadeusz Karny - ${city.name[language]}`,
    "description": pageDescription,
    "url": `${WEBSITE_URL}${location.pathname}`,
    "telephone": "+48123456789", // TODO: dodać prawdziwy numer
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Przykładowa 123",
      "addressLocality": "Białystok",
      "postalCode": "15-000",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.1325,
      "longitude": 23.1688
    },
    "areaServed": [
      {
        "@type": "City",
        "name": city.name[language],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": city.coordinates.lat,
          "longitude": city.coordinates.lng
        }
      },
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": city.coordinates.lat,
          "longitude": city.coordinates.lng
        },
        "geoRadius": `${city.serviceArea.radius}000` // w metrach
      }
    ],
    "serviceType": [
      language === 'pl' ? "Bramy kute" : "Wrought iron gates",
      language === 'pl' ? "Balustrady" : "Railings", 
      language === 'pl' ? "Ogrodzenia kute" : "Wrought iron fences"
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-16:00"
  }

  // Breadcrumbs
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": language === 'pl' ? "Strona główna" : "Home",
      "item": language === 'pl' ? WEBSITE_URL : `${WEBSITE_URL}/en`
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": language === 'pl' ? "Miasta" : "Cities",
      "item": language === 'pl' ? `${WEBSITE_URL}/miasta` : `${WEBSITE_URL}/en/cities`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": city.name[language],
      "item": `${WEBSITE_URL}${location.pathname}`
    }
  ]

  return (
    <>
      <EnhancedSEO
        title={pageTitle}
        description={pageDescription}
        pathname={location.pathname}
        pageType="city"
        language={language}
        noindex={false}
      />
      
      {/* Local Business Schema dla miasta */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema 
        breadcrumbs={breadcrumbs}
        pathname={location.pathname}
        language={language}
      />
    </>
  )
}

export default CityPageTemplate

// GraphQL query dla danych i18n
export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`