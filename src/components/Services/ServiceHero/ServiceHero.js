/**
 * ServiceHero Component
 * Hero section with background image for service pages
 */

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby-plugin-react-i18next'
import { CityCtaButton } from '../../Cities/CtaButton'
import {
  HeroSection,
  HeroContainer,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroImageWrapper,
  HeroOverlay,
} from './ServiceHero.styles'

export function ServiceHero({
  title,
  subtitle,
  ctaText,
  ctaHref = '/contact/',
  variant = 'gates',
}) {
  // GraphQL query for service hero images
  const data = useStaticQuery(graphql`
    query ServiceHeroImagesQuery {
      heroGates: file(relativePath: { eq: "cities/hero-gates.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            height: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 85
            transformOptions: {
              cropFocus: CENTER
              fit: COVER
            }
          )
        }
      }
      heroFences: file(relativePath: { eq: "cities/hero-fences.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            height: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 85
            transformOptions: {
              cropFocus: CENTER
              fit: COVER
            }
          )
        }
      }
    }
  `)

  // Map variant to hero image
  const HERO_IMAGES = {
    gates: data.heroGates,
    fences: data.heroFences,
  }

  const heroImageData = getImage(HERO_IMAGES[variant])

  return (
    <HeroSection $variant={variant}>
      {heroImageData && (
        <HeroImageWrapper>
          <GatsbyImage
            image={heroImageData}
            alt=""
            style={{ width: '100%', height: '100%' }}
            objectFit="cover"
            objectPosition="center"
          />
        </HeroImageWrapper>
      )}
      <HeroOverlay />
      <HeroContainer>
        <HeroTitle>{title}</HeroTitle>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
        <HeroActions>
          <CityCtaButton as={Link} to={ctaHref} variant="light">
            {ctaText}
          </CityCtaButton>
        </HeroActions>
      </HeroContainer>
    </HeroSection>
  )
}
