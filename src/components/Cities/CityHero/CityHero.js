import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { 
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroInfo,
  HeroButton,
  HeroBackground
} from './CityHero.styles'

export function CityHero({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  const heroTitle = t('cityPage.hero.titleTemplate', templateData)
  const heroSubtitle = t('cityPage.hero.subtitleTemplate', templateData)
  const distanceInfo = t('cityPage.hero.distanceInfo', templateData)
  const ctaText = t('cityPage.hero.ctaButton')

  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('city-contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <HeroSection>
      <HeroBackground />
      <HeroContent>
        <HeroTitle>{heroTitle}</HeroTitle>
        <HeroSubtitle>{heroSubtitle}</HeroSubtitle>
        
        {city.distance > 0 && (
          <HeroInfo>
            {distanceInfo}
          </HeroInfo>
        )}
        
        <HeroButton onClick={handleContactClick}>
          {ctaText}
        </HeroButton>
      </HeroContent>
    </HeroSection>
  )
}