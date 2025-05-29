import React, { lazy, Suspense } from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Layout } from 'components/Layout/Layout'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { getCityFAQ } from 'data/citiesSeoEnhanced'
import citiesData from 'data/cities'
const cities = citiesData.CITIES || citiesData.default || citiesData

// Above-the-fold components loaded immediately
import { CityHero } from 'components/Cities/CityHero'
import { CityServices } from 'components/Cities/CityServices'

// Below-the-fold components loaded lazily
const CityValueProposition = lazy(() => import('components/Cities/CityValueProposition').then(module => ({ default: module.CityValueProposition })))
const CityKeywords = lazy(() => import('components/Cities/CityKeywords').then(module => ({ default: module.CityKeywords })))
const RelatedCities = lazy(() => import('components/Cities/RelatedCities').then(module => ({ default: module.RelatedCities })))
const CityServiceArea = lazy(() => import('components/Cities/CityServiceArea').then(module => ({ default: module.CityServiceArea })))
const CityAbout = lazy(() => import('components/Cities/CityAbout').then(module => ({ default: module.CityAbout })))
const CityContact = lazy(() => import('components/Cities/CityContact').then(module => ({ default: module.CityContact })))
const CityFAQ = lazy(() => import('components/Cities/CityFAQ').then(module => ({ default: module.CityFAQ })))

import { 
  WEBSITE_URL, 
  PHONE_NUMBER,
  ADDRESS_ML,
  GOOGLE_MAP_DIRECTIONS,
  BUSINESS_NAME_ML
} from 'consts/contactDetails'

/**
 * Template dla stron miast
 * Tworzone dynamicznie w gatsby-node.js
 */
function CityPageTemplate({ pageContext }) {
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


  // Simple loading component
  const LoadingComponent = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ color: '#6c757d' }}>...</div>
    </div>
  )

  return (
    <Layout>
      <CityHero city={city} language={language} templateData={templateData} />
      <CityServices city={city} language={language} templateData={templateData} />
      
      <Suspense fallback={<LoadingComponent />}>
        <CityValueProposition city={city} language={language} templateData={templateData} />
      </Suspense>
      
      <Suspense fallback={<LoadingComponent />}>
        <CityServiceArea city={city} language={language} templateData={templateData} />
      </Suspense>
      
      <Suspense fallback={<LoadingComponent />}>
        <CityAbout city={city} language={language} templateData={templateData} />
      </Suspense>
      
      <Suspense fallback={<LoadingComponent />}>
        <CityKeywords city={city} language={language} />
      </Suspense>
      
      <Suspense fallback={<LoadingComponent />}>
        <CityContact city={city} language={language} templateData={templateData} />
      </Suspense>
      
      <Suspense fallback={<LoadingComponent />}>
        <CityFAQ city={city} language={language} templateData={templateData} />
      </Suspense>
      
      <Suspense fallback={<LoadingComponent />}>
        <RelatedCities currentCity={city} allCities={cities} language={language} />
      </Suspense>
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
    "name": `${BUSINESS_NAME_ML[language]} - ${city.name[language]}`,
    "description": pageDescription,
    "url": `${WEBSITE_URL}${location.pathname}`,
    "telephone": PHONE_NUMBER,
    "image": [
      `${WEBSITE_URL}/icons/icon-512x512.png`,
      `${WEBSITE_URL}/icons/icon-192x192.png`
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ADDRESS_ML[language].street,
      "addressLocality": ADDRESS_ML[language].city,
      "postalCode": ADDRESS_ML[language].postalCode,
      "addressCountry": ADDRESS_ML[language].countryCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": GOOGLE_MAP_DIRECTIONS.lat,
      "longitude": GOOGLE_MAP_DIRECTIONS.lng
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
    "openingHours": "Mo-Fr 07:30-16:00, Sa 09:00-13:00",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:30",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00", 
        "closes": "13:00"
      }
    ],
    "paymentAccepted": ["Cash", "Bank Transfer"],
    "currenciesAccepted": "PLN",
    "hasMap": `https://maps.google.com/?q=${GOOGLE_MAP_DIRECTIONS.lat},${GOOGLE_MAP_DIRECTIONS.lng}`,
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'pl' ? "Bramy kute na wymiar" : "Custom wrought iron gates"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": language === 'pl' ? "Balustrady wewnętrzne i zewnętrzne" : "Interior and exterior railings"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": language === 'pl' ? "Ogrodzenia kute" : "Wrought iron fences"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'pl' ? "Naprawy i konserwacja" : "Repairs and maintenance",
          "description": language === 'pl' ? "Usługi awaryjne 24/7 w promieniu 50km" : "24/7 emergency service within 50km radius"
        }
      }
    ],
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint", 
        "urlTemplate": `${WEBSITE_URL}/${language === 'pl' ? '' : 'en/'}contact`,
        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
      }
    }
  }
  
  // Service schema dla lepszego SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": language === 'pl' ? "Kowalstwo artystyczne" : "Artistic blacksmithing",
    "description": language === 'pl' 
      ? `Profesjonalne usługi kowalskie w ${city.name[language]} i okolicach. Projektowanie i wykonanie bram kutych, balustrad i ogrodzeń.`
      : `Professional blacksmithing services in ${city.name[language]} and surrounding areas. Design and creation of wrought iron gates, railings and fences.`,
    "provider": {
      "@id": `${WEBSITE_URL}${location.pathname}#localbusiness`
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": city.coordinates.lat,
        "longitude": city.coordinates.lng
      },
      "geoRadius": `${city.serviceArea.radius}000`
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'pl' ? "Katalog usług" : "Service catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": language === 'pl' ? "Bramy kute" : "Wrought iron gates",
          "description": language === 'pl' 
            ? "Projektowanie i wykonanie bram kutych na zamówienie"
            : "Custom design and creation of wrought iron gates"
        },
        {
          "@type": "Offer", 
          "name": language === 'pl' ? "Balustrady" : "Railings",
          "description": language === 'pl'
            ? "Balustrady wewnętrzne i zewnętrzne"
            : "Interior and exterior railings"
        },
        {
          "@type": "Offer",
          "name": language === 'pl' ? "Ogrodzenia kute" : "Wrought iron fences",
          "description": language === 'pl'
            ? "Ogrodzenia kute według indywidualnego projektu"
            : "Custom wrought iron fences"
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PLN",
      "priceRange": "$$"
    }
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
  
  // FAQ Schema for better SEO
  const faqItems = getCityFAQ(city.name[language], language)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

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
      
      {/* Meta tags for local SEO */}
      <meta property="place:location:latitude" content={city.coordinates.lat.toString()} />
      <meta property="place:location:longitude" content={city.coordinates.lng.toString()} />
      <meta property="business:contact_data:locality" content={city.name[language]} />
      <meta property="business:contact_data:region" content={city.region[language]} />
      <meta property="business:contact_data:country_name" content={language === 'pl' ? 'Polska' : 'Poland'} />
      
      {/* Additional geo meta tags for better local SEO */}
      <meta name="geo.region" content="PL" />
      <meta name="geo.placename" content={city.name[language]} />
      <meta name="geo.position" content={`${city.coordinates.lat};${city.coordinates.lng}`} />
      <meta name="ICBM" content={`${city.coordinates.lat}, ${city.coordinates.lng}`} />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Mobile optimization */}
      <meta name="theme-color" content="#B8860B" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Local Business Schema dla miasta */}
      <script type="application/ld+json">
        {JSON.stringify({...localBusinessSchema, "@id": `${WEBSITE_URL}${location.pathname}#localbusiness`})}
      </script>
      
      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
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