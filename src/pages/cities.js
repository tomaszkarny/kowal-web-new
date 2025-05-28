import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Layout } from 'components/Layout/Layout'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { CitiesIndex } from 'components/Cities/CitiesIndex'

import { WEBSITE_URL } from 'consts/contactDetails'

function CitiesPage() {
  return (
    <Layout>
      <CitiesIndex />
    </Layout>
  )
}

export function Head({ location }) {
  // Hardcoded translations for Head component
  const title = 'Service Area - Cities served by Karny Blacksmithing'
  const description = 'We serve cities in Podlaskie and Masovian voivodeships. Białystok, Warsaw, Suwałki, Augustów, Łomża - check our service area.'
  
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${WEBSITE_URL}/en`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Cities",
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
        language="en"
        noindex={false}
      />
      
      <BreadcrumbSchema 
        breadcrumbs={breadcrumbs}
        pathname={location.pathname}
        language="en"
      />
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