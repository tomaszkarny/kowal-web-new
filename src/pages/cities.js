import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Layout } from 'components/Layout/Layout'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { CitiesIndex } from 'components/Cities/CitiesIndex'

import { WEBSITE_URL } from 'consts/contactDetails'
import citiesData from 'data/cities'
import { getCityPath } from 'utils/cityUtils'

const cities = citiesData.CITIES || citiesData.default || citiesData

function CitiesPage() {
  return (
    <Layout>
      <CitiesIndex />
    </Layout>
  )
}

export function Head({ location, pageContext }) {
  // Detect language from path or pageContext
  const language = pageContext?.language || (location.pathname.startsWith('/en/') ? 'en' : 'pl')
  
  // Dynamic translations for Head component
  const title = language === 'pl' 
    ? 'Obszar działania - Miasta obsługiwane przez Kowalstwo Karny'
    : 'Service Area - Cities served by Karny Blacksmithing'
    
  const description = language === 'pl'
    ? 'Obsługujemy miasta w województwach podlaskim i mazowieckim. Białystok, Warszawa, Suwałki, Augustów, Łomża - sprawdź nasz obszar działania.'
    : 'We serve cities in Podlaskie and Masovian voivodeships. Białystok, Warsaw, Suwałki, Augustów, Łomża - check our service area.'
  
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
      "item": `${WEBSITE_URL}${location.pathname}`
    }
  ]

  return (
    <>
      <EnhancedSEO
        title={title}
        description={description}
        pathname={location.pathname}
        pageType="cities"
        language={language}
        noindex={false}
      />
      
      <BreadcrumbSchema 
        breadcrumbs={breadcrumbs}
        pathname={location.pathname}
        language={language}
      />
      
      {/* CollectionPage Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": language === 'pl' ? "Miasta obsługiwane przez Kowalstwo Karny" : "Cities served by Karny Blacksmithing",
          "description": description,
          "url": `${WEBSITE_URL}${location.pathname}`,
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs
          },
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": cities.length,
            "itemListElement": cities.map((city, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `${WEBSITE_URL}${getCityPath(city)}`,
              "name": city.name[language],
              "item": {
                "@type": "City",
                "name": city.name[language],
                "description": language === 'pl' 
                  ? `Profesjonalne usługi kowalskie w ${city.name[language]}, ${city.region[language]}. ${city.distance}km od naszego warsztatu.`
                  : `Professional blacksmithing services in ${city.name[language]}, ${city.region[language]}. ${city.distance}km from our workshop.`,
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": city.coordinates.lat,
                  "longitude": city.coordinates.lng
                },
                "containedInPlace": {
                  "@type": "AdministrativeArea",
                  "name": city.region[language]
                }
              }
            }))
          }
        })}
      </script>
    </>
  )
}

export default CitiesPage

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