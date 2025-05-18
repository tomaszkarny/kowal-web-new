import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { About } from 'components/About/About'
import { Layout } from 'components/Layout/Layout'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { BUSINESS_NAME_ML, WEBSITE_URL } from 'consts/contactDetails'; // Switched to BUSINESS_NAME_ML

const AboutPage = () => {
  return (
    <Layout>
      <About />
    </Layout>
  )
}

export default AboutPage

/**
 * Implement Gatsby Head API for the about page
 * This includes both standard SEO tags and BreadcrumbList schema
 */
export const Head = ({ data, location, pageContext }) => { // Added pageContext
  // Use the seo namespace for titles and descriptions
  const { t } = useTranslation('seo')
  const { language } = pageContext; // Language from pageContext
  
  const pageNameKey = 'about.title';
  const translatedPageName = t(pageNameKey);

  // Fallback for the page name itself, if translation is missing for 'about.title'
  const pageNameFallback = language === 'en' ? 'About Us' : 'O nas';
  const pageName = translatedPageName && translatedPageName !== pageNameKey ? translatedPageName : pageNameFallback;

  const siteName = language === 'en' ? BUSINESS_NAME_ML.en : BUSINESS_NAME_ML.pl; // This line is no longer directly used for title construction here
  const title = pageName; // Pass only the specific page name to EnhancedSEO

  const descriptionFallback = language === 'en'
    ? 'Learn about our artistic blacksmithing workshop specializing in high-quality custom metalwork.'
    : 'Poznaj naszą pracownię kowalstwa artystycznego specjalizującą się w wysokiej jakości wyrobach metalowych.';
  const description = t('about.description', descriptionFallback)
  
  return (
    <>
      <EnhancedSEO
        title={title}
        description={description}
        pathname={location.pathname}
        pageType="about" // Added pageType
      />
      <BreadcrumbSchema 
        pathname={location.pathname}
        url={`${WEBSITE_URL}${location.pathname}`}
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
