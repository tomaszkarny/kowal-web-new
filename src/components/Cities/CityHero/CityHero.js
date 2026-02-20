import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroInfo,
  HeroImageWrapper,
  HeroOverlay
} from './CityHero.styles'
import { HeroButton } from './HeroButton'

export function CityHero({ city, language, templateData }) {
  const { t } = useTranslation('cities')

  // GraphQL query for all city hero images
  const data = useStaticQuery(graphql`
    query CityHeroImagesQuery {
      heroBialystok: file(relativePath: { eq: "cities/hero-bialystok.webp" }) {
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
      heroSuwalki: file(relativePath: { eq: "cities/hero-suwalki.webp" }) {
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
      heroWarszawa: file(relativePath: { eq: "cities/hero-warszawa.webp" }) {
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
      heroAugustow: file(relativePath: { eq: "cities/hero-augustow.webp" }) {
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
      heroLomza: file(relativePath: { eq: "cities/hero-lomza.webp" }) {
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
      balu20: file(relativePath: { eq: "gallery/balu20.jpg" }) {
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
      ogrodz11: file(relativePath: { eq: "gallery/ogrodz11.jpg" }) {
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

  // Map heroImage filename to GraphQL query result
  const HERO_IMAGES = {
    'hero-bialystok.webp': data.heroBialystok,
    'hero-suwalki.webp': data.heroSuwalki,
    'hero-warszawa.webp': data.heroWarszawa,
    'hero-augustow.webp': data.heroAugustow,
    'hero-lomza.webp': data.heroLomza,
    'balu20.jpg': data.balu20,
    'ogrodz11.jpg': data.ogrodz11
  }

  const heroTitle = t('cityPage.hero.titleTemplate', templateData)
  const heroSubtitle = t('cityPage.hero.subtitleTemplate', templateData)
  const distanceInfo = t('cityPage.hero.distanceInfo', templateData)
  const ctaText = t('cityPage.hero.ctaButton')
  const heroImageData = city.heroImage ? getImage(HERO_IMAGES[city.heroImage]) : null

  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('city-contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <HeroSection>
      {heroImageData && (
        <HeroImageWrapper>
          <GatsbyImage
            image={heroImageData}
            alt={`${city.name[language]} - kowalstwo artystyczne`}
            style={{ width: '100%', height: '100%' }}
            objectFit="cover"
            objectPosition="center"
          />
        </HeroImageWrapper>
      )}
      <HeroOverlay />
      <HeroContent>
        <HeroTitle>{heroTitle}</HeroTitle>
        <HeroSubtitle>{heroSubtitle}</HeroSubtitle>

        <HeroActions>
          {city.distance > 0 && (
            <HeroInfo>
              {distanceInfo}
            </HeroInfo>
          )}

          <HeroButton onClick={handleContactClick}>
            {ctaText}
          </HeroButton>
        </HeroActions>
      </HeroContent>
    </HeroSection>
  )
}
