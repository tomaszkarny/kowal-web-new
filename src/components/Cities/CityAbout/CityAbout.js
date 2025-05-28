import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray
}

const AboutSection = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.dark};
  margin-bottom: 3rem;
  text-align: center;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const FeatureTitle = styled.h3`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`

const FeatureDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
`

export function CityAbout({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  const title = t('cityPage.about.title', templateData)
  const features = [
    {
      title: t('cityPage.about.experience.title'),
      description: t('cityPage.about.experience.description', templateData)
    },
    {
      title: t('cityPage.about.quality.title'),
      description: t('cityPage.about.quality.description')
    },
    {
      title: t('cityPage.about.local.title'),
      description: t('cityPage.about.local.description', templateData)
    },
    {
      title: t('cityPage.about.warranty.title'),
      description: t('cityPage.about.warranty.description')
    }
  ]

  return (
    <AboutSection>
      <Container>
        <Title>{title}</Title>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </AboutSection>
  )
}