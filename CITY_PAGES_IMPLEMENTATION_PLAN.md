# Local City Pages Implementation Plan for SEO

## Executive Summary
This plan outlines the implementation of local city pages for the artistic blacksmithing website to improve local SEO visibility across Poland. The implementation will leverage existing Gatsby infrastructure while introducing programmatic page generation for multiple cities.

## Current Architecture Analysis

### 1. **Routing Structure**
- **Current State**: Static pages in `/src/pages/` with i18n support via `gatsby-plugin-react-i18next`
- **Language Handling**: Automatic URL prefixing (`/pl/` and `/en/`)
- **Page Creation**: Currently using file-based routing, no programmatic generation in `gatsby-node.js`

### 2. **i18n Implementation**
- **Plugin**: `gatsby-plugin-react-i18next` with Polish (default) and English
- **Translation Structure**: JSON files in `/locales/{lang}/` with namespaces
- **Key Features**:
  - Automatic language detection from URL path
  - GraphQL query injection for translations
  - Consistent language handling across components

### 3. **SEO Components**
- **EnhancedSEO**: Main SEO component with language awareness
- **LocalBusinessSchema**: Structured data for business information
- **FAQSchema**: FAQ structured data with language support
- **BreadcrumbSchema**: Breadcrumb navigation structured data

### 4. **Data Architecture**
- **Contact Details**: Centralized in `/src/consts/contactDetails.js` with multilingual support
- **Translation System**: Hardcoded SEO translations in `seoLanguageDetection.js` + JSON locale files

## Implementation Strategy

### Phase 1: Data Structure Setup

#### 1.1 City Data Source
Create `/src/data/cities.js`:
```javascript
export const CITIES_DATA = [
  {
    id: 'warszawa',
    name: {
      pl: 'Warszawa',
      en: 'Warsaw'
    },
    region: {
      pl: 'Mazowieckie',
      en: 'Masovian'
    },
    population: 1793579,
    distance: 200, // km from Białystok
    coordinates: { lat: 52.2297, lng: 21.0122 },
    priority: 1, // for sitemap
    serviceRadius: 50, // km
    nearbyAreas: {
      pl: ['Piaseczno', 'Pruszków', 'Legionowo'],
      en: ['Piaseczno', 'Pruszków', 'Legionowo']
    }
  },
  // ... more cities
]
```

#### 1.2 City-Specific Content Templates
Create translation templates in locales:
- `/locales/pl/cities.json`
- `/locales/en/cities.json`

Structure:
```json
{
  "cityPage": {
    "title": "Kowal {{city}} - Bramy Kute, Balustrady | Tadeusz Karny",
    "description": "Profesjonalny kowal {{city}} ⭐ Bramy kute, balustrady, ogrodzenia na zamówienie. Dojazd i montaż. 30 lat doświadczenia ☎ 604 253 145",
    "hero": {
      "title": "Kowalstwo Artystyczne w {{city}}",
      "subtitle": "Profesjonalne usługi kowalskie z dojazdem"
    },
    "sections": {
      "services": "Nasze Usługi w {{city}}",
      "serviceArea": "Obsługiwane Obszary",
      "whyUs": "Dlaczego Wybrać Nas",
      "contact": "Skontaktuj się z Nami"
    }
  }
}
```

### Phase 2: Programmatic Page Generation

#### 2.1 Update gatsby-node.js
```javascript
const { CITIES_DATA } = require('./src/data/cities')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const cityPageTemplate = path.resolve('./src/templates/city-page.js')
  
  // Create city pages for each language
  const languages = ['pl', 'en']
  
  CITIES_DATA.forEach(city => {
    languages.forEach(lang => {
      const path = lang === 'pl' 
        ? `/miasta/${city.id}/`
        : `/en/cities/${city.id}/`
      
      createPage({
        path,
        component: cityPageTemplate,
        context: {
          cityId: city.id,
          cityData: city,
          language: lang,
          i18n: {
            language: lang,
            languages,
            defaultLanguage: 'pl',
            originalPath: path
          }
        }
      })
    })
  })
}
```

#### 2.2 Create City Page Template
`/src/templates/city-page.js`:
```javascript
import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from 'components/Layout/Layout'
import { CityHero } from 'components/CityPages/CityHero'
import { CityServices } from 'components/CityPages/CityServices'
import { ServiceArea } from 'components/CityPages/ServiceArea'
import { CityTestimonials } from 'components/CityPages/CityTestimonials'
import { CityContact } from 'components/CityPages/CityContact'

export default function CityPageTemplate({ pageContext, data }) {
  const { cityData, language } = pageContext
  
  return (
    <Layout>
      <CityHero city={cityData} />
      <CityServices city={cityData} />
      <ServiceArea city={cityData} />
      <CityTestimonials city={cityData} />
      <CityContact city={cityData} />
    </Layout>
  )
}

export const Head = ({ pageContext, location }) => {
  const { cityData, language } = pageContext
  
  return (
    <>
      <CityPageSEO 
        city={cityData}
        language={language}
        pathname={location.pathname}
      />
      <LocalBusinessCitySchema 
        city={cityData}
        language={language}
      />
      <ServiceAreaSchema
        city={cityData}
        language={language}
      />
    </>
  )
}

// GraphQL query for translations
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
```

### Phase 3: SEO Components for City Pages

#### 3.1 City-Specific SEO Component
Create `/src/components/SEO/CityPageSEO.js`:
```javascript
import React from 'react'
import { EnhancedSEO } from './EnhancedSEO'
import { BUSINESS_NAME_ML, PHONE_NUMBER } from 'consts/contactDetails'

export const CityPageSEO = ({ city, language, pathname }) => {
  const businessName = BUSINESS_NAME_ML[language]
  const cityName = city.name[language]
  
  // Dynamic title and description
  const title = language === 'pl'
    ? `Kowal ${cityName} - Bramy Kute, Balustrady | ${businessName}`
    : `Blacksmith ${cityName} - Wrought Iron Gates, Railings | ${businessName}`
    
  const description = language === 'pl'
    ? `Profesjonalny kowal ${cityName} ⭐ Bramy kute, balustrady, ogrodzenia na zamówienie. Dojazd i montaż. 30 lat doświadczenia ☎ ${PHONE_NUMBER}`
    : `Professional blacksmith ${cityName} ⭐ Custom wrought iron gates, railings, fences. Travel & installation. 30 years experience ☎ ${PHONE_NUMBER}`
  
  return (
    <EnhancedSEO
      title={title}
      description={description}
      pathname={pathname}
      pageType="localService"
      language={language}
      appendSiteTitle={false}
    />
  )
}
```

#### 3.2 Service Area Schema
Create `/src/components/SEO/ServiceAreaSchema.js`:
```javascript
export const ServiceAreaSchema = ({ city, language }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": language === 'pl' ? "Kowalstwo Artystyczne" : "Artistic Blacksmithing",
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${WEBSITE_URL}#localbusiness`
    },
    "areaServed": {
      "@type": "City",
      "name": city.name[language],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": city.coordinates.lat,
        "longitude": city.coordinates.lng
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'pl' ? "Usługi Kowalskie" : "Blacksmithing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'pl' ? "Bramy Kute" : "Wrought Iron Gates"
          }
        }
        // ... more services
      ]
    }
  }
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Phase 4: Navigation Integration

#### 4.1 City Pages Navigation
Add city links to footer or create a dedicated cities page:

Create `/src/pages/miasta.js` (Polish) and `/src/pages/cities.js` (redirect to English):
```javascript
import React from 'react'
import { Link } from 'gatsby'
import { CITIES_DATA } from 'data/cities'

export default function CitiesIndexPage() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  
  return (
    <Layout>
      <StyledSection>
        <Container>
          <SectionTitle>{t('cities:ourLocations')}</SectionTitle>
          <CitiesGrid>
            {CITIES_DATA.map(city => (
              <CityCard key={city.id}>
                <Link to={currentLang === 'pl' 
                  ? `/miasta/${city.id}/`
                  : `/en/cities/${city.id}/`
                }>
                  <h3>{city.name[currentLang]}</h3>
                  <p>{city.region[currentLang]}</p>
                </Link>
              </CityCard>
            ))}
          </CitiesGrid>
        </Container>
      </StyledSection>
    </Layout>
  )
}
```

### Phase 5: Content Strategy

#### 5.1 City-Specific Content Components
1. **Hero Section**: Dynamic headline with city name
2. **Services Section**: Same services but localized descriptions
3. **Service Area Map**: Show service radius around the city
4. **Local Testimonials**: Filter testimonials by region
5. **Travel Information**: Distance from main workshop, travel fees
6. **Local Gallery**: Showcase projects in that region

#### 5.2 Dynamic Content Generation
Use template literals in translations to inject city-specific data:
```javascript
// In component
const heroTitle = t('cities:cityPage.hero.title', { city: cityName })
```

### Phase 6: Sitemap & SEO Optimization

#### 6.1 Update Sitemap Configuration
Modify `gatsby-config.js` sitemap plugin:
```javascript
serialize: ({ path }) => {
  // Detect city pages
  const isCityPage = path.includes('/miasta/') || path.includes('/cities/')
  
  let priority = 0.5
  if (isCityPage) {
    // Get city priority from path
    const cityId = path.split('/').filter(Boolean).pop()
    const city = CITIES_DATA.find(c => c.id === cityId)
    priority = city ? (0.6 + (city.priority * 0.1)) : 0.6
  }
  
  return {
    url: path,
    changefreq: isCityPage ? 'monthly' : 'weekly',
    priority,
    // ... rest of config
  }
}
```

### Phase 7: Performance Considerations

1. **Lazy Load City Data**: Only load detailed city data on city pages
2. **Image Optimization**: Use shared hero images with city name overlays
3. **Build Time**: Monitor build time as city pages scale
4. **CDN Strategy**: Ensure proper caching for city pages

### Phase 8: Implementation Checklist

- [ ] Create city data structure (`/src/data/cities.js`)
- [ ] Add city translations to locale files
- [ ] Update `gatsby-node.js` for programmatic page creation
- [ ] Create city page template (`/src/templates/city-page.js`)
- [ ] Build city-specific components
- [ ] Create city-specific SEO components
- [ ] Add ServiceArea schema
- [ ] Create cities index page
- [ ] Update sitemap configuration
- [ ] Add city pages to navigation
- [ ] Test all language versions
- [ ] Verify structured data
- [ ] Monitor Core Web Vitals

### Best Practices for Local SEO

1. **Unique Content**: Each city page must have unique, valuable content
2. **Local Keywords**: Include "kowal [miasto]" and related terms naturally
3. **Service Radius**: Clearly indicate service areas and travel availability
4. **Local Schema**: Implement proper LocalBusiness and Service schemas
5. **Internal Linking**: Link from main pages to relevant city pages
6. **Mobile Optimization**: Ensure excellent mobile experience
7. **Page Speed**: Keep pages fast despite additional content
8. **Regular Updates**: Keep city information current

### Scalability Considerations

1. **Start Small**: Begin with 5-10 major cities
2. **Monitor Performance**: Track rankings and traffic
3. **Iterate Content**: Refine templates based on performance
4. **Gradual Expansion**: Add more cities based on demand
5. **Automate Updates**: Use data files for easy maintenance

## Conclusion

This implementation plan provides a robust foundation for local city pages that:
- Integrates seamlessly with existing Gatsby architecture
- Maintains bilingual support
- Follows SEO best practices
- Scales efficiently
- Provides genuine value to local searchers

The phased approach allows for iterative development and testing while maintaining site performance and user experience.