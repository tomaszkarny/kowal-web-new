import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from 'components/Layout/Layout'
import { Hero } from 'components/Home/Hero/Hero'
import { SectionMain } from 'components/Home/Hero/SectionMain/SectionMain'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { SECTION_IDS } from 'consts/sectionID'
import { BUSINESS_NAME_ML, BUSINESS_DESCRIPTION, WEBSITE_URL } from 'consts/contactDetails' // Switched to BUSINESS_NAME_ML for title

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <SectionMain id={SECTION_IDS.MAIN} />
    </Layout>
  )
}

export default IndexPage

/**
 * Implement Gatsby Head API for the homepage
 * This includes both standard SEO tags and LocalBusiness schema
 */
export const Head = ({ data, location, pageContext }) => {
  // Use pageContext from Gatsby i18n plugin 
  const currentLanguage = pageContext?.i18n?.language || pageContext?.language || 
    (location?.pathname?.startsWith('/en') ? 'en' : 'pl');
  
  // Don't use useTranslation hook in Head - it might not have proper context
  // Instead use direct language-specific titles
  
  // Use direct titles since useTranslation may not work properly in Head
  const title = currentLanguage === 'en'
    ? 'Artistic Blacksmith Białystok | Custom gates, railings & fences – Tadeusz Karny'
    : 'Kowalstwo artystyczne Białystok – bramy, balustrady, ogrodzenia | Tadeusz Karny';

  const description = currentLanguage === 'en'
    ? 'Looking for a blacksmith in Białystok, Poland? Tadeusz Karny crafts bespoke gates, railings and fences – traditional artistic blacksmithing for 30+ years.'
    : 'Kowal Tadeusz Karny oferuje bramy na zamówienie, balustrady i ogrodzenia. Najlepsze kowalstwo artystyczne w Białymstoku i w całej Polsce – 30 lat doświadczenia.';
  
  return (
    <>
      <EnhancedSEO
        title={title}
        description={description}
        pathname={location.pathname}
        pageType="home"
        language={currentLanguage} // Pass the detected language
        noindex={false}
      />
      <LocalBusinessSchema 
        url={WEBSITE_URL}
        title={title}
        description={description}
        pathname={location.pathname}
      />
      <BreadcrumbSchema 
        pathname={location.pathname}
        url={WEBSITE_URL}
      />
    </>
  )
}

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
