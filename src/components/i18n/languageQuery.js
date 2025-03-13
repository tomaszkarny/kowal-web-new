import { graphql } from 'gatsby'

// This is a reusable GraphQL fragment for the i18n language data
// Include this in your page queries to enable i18n functionality
export const query = graphql`
  fragment LanguageQuery on Query {
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
