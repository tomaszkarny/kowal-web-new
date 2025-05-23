import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Contact } from 'components/Contact/Contact'
import { Layout } from 'components/Layout/Layout'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { BUSINESS_NAME_ML, BUSINESS_DESCRIPTION_ML, WEBSITE_URL } from 'consts/contactDetails'; // Switched to BUSINESS_NAME_ML and BUSINESS_DESCRIPTION_ML

const ContactPage = () => {
  return (
    <Layout>
      <Contact />
    </Layout>
  )
}

export default ContactPage

/**
 * Implement Gatsby Head API for the contact page
 * This includes both standard SEO tags and LocalBusiness schema
 * The contact page is especially important for local business schema
 */
export const Head = ({ data, location, pageContext }) => { // Added pageContext
  const { t } = useTranslation('seo')
  const { language } = pageContext; // Language from pageContext
  const pageNameKey = 'contact.title';
  const translatedPageName = t(pageNameKey);

  const pageNameFallback = language === 'en' ? 'Contact' : 'Kontakt';
  const pageName = translatedPageName && translatedPageName !== pageNameKey ? translatedPageName : pageNameFallback;

  const siteName = language === 'en' ? BUSINESS_NAME_ML.en : BUSINESS_NAME_ML.pl; // This line is no longer directly used for title construction here
  const title = pageName; // Pass only the specific page name to EnhancedSEO

  // Use BUSINESS_DESCRIPTION_ML for multilingual description fallback components
  const businessDesc = language === 'en' ? BUSINESS_DESCRIPTION_ML.en : BUSINESS_DESCRIPTION_ML.pl;
  const descriptionFallback = language === 'en'
    ? `Contact ${siteName} for custom blacksmith work. ${businessDesc}`
    : `Skontaktuj się z ${siteName} w sprawie indywidualnych wyrobów kowalskich. ${businessDesc}`;
  const description = t('contact.description', descriptionFallback)
  
  return (
    <>
      <EnhancedSEO
        title={title}
        description={description}
        pathname={location.pathname}
        pageType="contact" // Added pageType
        noindex={false}
      />
      <LocalBusinessSchema 
        url={`${WEBSITE_URL}${location.pathname}`}
        title={title}
        description={description}
        pathname={location.pathname}
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
