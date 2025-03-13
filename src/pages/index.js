import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Layout } from 'components/Layout/Layout'
import { Hero } from 'components/Home/Hero/Hero'

import { SECTION_IDS } from 'consts/sectionID'

const IndexPage = () => {
  return (
    <Layout>
      <Hero id={SECTION_IDS.MAIN} />
    </Layout>
  )
}

export default IndexPage

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
