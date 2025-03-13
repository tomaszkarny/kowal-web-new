import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Contact } from 'components/Contact/Contact'

import { Layout } from 'components/Layout/Layout'

const ContactPage = () => {
  return (
    <Layout>
      <Contact />
    </Layout>
  )
}

export default ContactPage

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
