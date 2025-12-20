import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import heroOgrodz12 from 'assets/images/gallery/ogrodz12.jpg'
import heroBalu21 from 'assets/images/gallery/balu21.jpg'
import heroOgrodz13 from 'assets/images/gallery/ogrodz13.jpg'
import heroBalu20 from 'assets/images/gallery/balu20.jpg'
import heroOgrodz11 from 'assets/images/gallery/ogrodz11.jpg'

import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroInfo,
  HeroBackground
} from './CityHero.styles'
import { HeroButton } from './HeroButton'

const HERO_IMAGES = {
  'ogrodz12.jpg': heroOgrodz12,
  'balu21.jpg': heroBalu21,
  'ogrodz13.jpg': heroOgrodz13,
  'balu20.jpg': heroBalu20,
  'ogrodz11.jpg': heroOgrodz11
}

export function CityHero({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  const heroTitle = t('cityPage.hero.titleTemplate', templateData)
  const heroSubtitle = t('cityPage.hero.subtitleTemplate', templateData)
  const distanceInfo = t('cityPage.hero.distanceInfo', templateData)
  const ctaText = t('cityPage.hero.ctaButton')
  const heroImageSrc = city.heroImage ? HERO_IMAGES[city.heroImage] : null

  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('city-contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <HeroSection>
      <HeroBackground $image={heroImageSrc} />
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
