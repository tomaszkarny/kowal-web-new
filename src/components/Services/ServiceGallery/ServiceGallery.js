/**
 * ServiceGallery Component
 * Grid gallery showing service realizations with Gatsby images
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
  CitySection,
  CityContainer,
  CityTitle,
} from '../../Cities/styles/sharedStyles'
import { FORGE_COLORS } from '../../Cities/styles/forgedIronTheme'
import {
  GalleryGrid,
  GalleryItem,
  ViewMoreLink,
} from './ServiceGallery.styles'

// Arrow icon for "View more" link
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

/**
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.variant - 'gates' | 'fences'
 * @param {number} [props.limit=8] - Number of images to show
 * @param {string} [props.viewMoreText] - "View more" link text
 * @param {string} [props.viewMoreHref='/gallery/'] - Link to full gallery
 */
export function ServiceGallery({
  title,
  variant,
  limit = 8,
  viewMoreText,
  viewMoreHref = '/gallery/',
}) {
  const data = useStaticQuery(graphql`
    query ServiceGalleryQuery {
      gatesImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativePath: { regex: "/gallery/bramy/" }
        }
        sort: { name: ASC }
        limit: 18
      ) {
        nodes {
          id
          name
          childImageSharp {
            gatsbyImageData(
              width: 400
              height: 300
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              transformOptions: { fit: COVER, cropFocus: CENTER }
            )
          }
        }
      }
      fencesImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativePath: { regex: "/gallery/ogrodz/" }
        }
        sort: { name: ASC }
        limit: 14
      ) {
        nodes {
          id
          name
          childImageSharp {
            gatsbyImageData(
              width: 400
              height: 300
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              transformOptions: { fit: COVER, cropFocus: CENTER }
            )
          }
        }
      }
    }
  `)

  const images = variant === 'gates'
    ? data.gatesImages.nodes.slice(0, limit)
    : data.fencesImages.nodes.slice(0, limit)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <CitySection $bg={FORGE_COLORS.sectionBg}>
      <CityContainer>
        <CityTitle>{title}</CityTitle>
        <GalleryGrid>
          {images.map((image) => {
            const gatsbyImage = getImage(image.childImageSharp)
            if (!gatsbyImage) return null

            return (
              <GalleryItem key={image.id}>
                <GatsbyImage
                  image={gatsbyImage}
                  alt={image.name}
                  style={{ width: '100%', height: '100%' }}
                />
              </GalleryItem>
            )
          })}
        </GalleryGrid>
        {viewMoreText && (
          <div style={{ textAlign: 'center' }}>
            <ViewMoreLink as={Link} to={viewMoreHref}>
              {viewMoreText}
              <ArrowIcon />
            </ViewMoreLink>
          </div>
        )}
      </CityContainer>
    </CitySection>
  )
}
