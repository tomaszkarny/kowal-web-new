import { graphql } from 'gatsby';

/**
 * GraphQL query template for specialty images
 * Note: This is not directly used with useStaticQuery but used as a template
 * for the inline query in the InteractiveSpecialties component
 */
export const specialtyImagesQueryTemplate = `
  query {
    gates: file(relativePath: { eq: "gallery/bramy1.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        original {
          src
          width
          height
        }
      }
    }
    railings: file(relativePath: { eq: "gallery/balu1.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        original {
          src
          width
          height
        }
      }
    }
    fences: file(relativePath: { eq: "gallery/ogrodz1.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        original {
          src
          width
          height
        }
      }
    }
    gratings: file(relativePath: { eq: "gallery/elo5.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        original {
          src
          width
          height
        }
      }
    }
    decorative: file(relativePath: { eq: "gallery/elo1.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        original {
          src
          width
          height
        }
      }
    }
  }
`;