import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import {
  HeroWrapper,
  HeroInner,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  StatsRow,
  StatBadge,
  StatNumber,
  StatLabel,
  HeroDecoration,
  ForgePattern,
  GalleryHeroImage,
} from './GalleryHero.styles'

export function GalleryHero() {
  const { t } = useTranslation(['gallery', 'common'])

  const data = useStaticQuery(graphql`
    query GalleryHeroImage {
      heroImage: file(relativePath: { eq: "gallery/gates/gate_1.JPG" }) {
        childImageSharp {
          gatsbyImageData(
            width: 480
            height: 360
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 80
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
    }
  `)

  const heroImage = getImage(data.heroImage)

  const stats = [
    {
      number: t('hero.stats.gates', '200+'),
      label: t('hero.stats.gatesLabel', 'Gates'),
    },
    {
      number: t('hero.stats.railings', '300+'),
      label: t('hero.stats.railingsLabel', 'Railings'),
    },
    {
      number: t('hero.stats.fences', '150+'),
      label: t('hero.stats.fencesLabel', 'Fences'),
    },
  ]

  return (
    <HeroWrapper>
      <HeroInner>
        <HeroContent>
          <HeroTitle>{t('common:gallery_title', 'Gallery of Wrought Iron Gates, Railings & Fences')}</HeroTitle>
          <HeroSubtitle>
            {t(
              'hero.subtitle',
              'Over 30 years of hand-forging expertise — gates, railings, fences and decorative elements'
            )}
          </HeroSubtitle>
          <StatsRow>
            {stats.map(({ number, label }) => (
              <StatBadge key={label}>
                <StatNumber>{number}</StatNumber>
                <StatLabel>{label}</StatLabel>
              </StatBadge>
            ))}
          </StatsRow>
        </HeroContent>

        <HeroDecoration aria-hidden="true">
          <ForgePattern>
            {heroImage && (
              <GalleryHeroImage>
                <GatsbyImage
                  image={heroImage}
                  alt=""
                  loading="eager"
                />
              </GalleryHeroImage>
            )}
          </ForgePattern>
        </HeroDecoration>
      </HeroInner>
    </HeroWrapper>
  )
}
