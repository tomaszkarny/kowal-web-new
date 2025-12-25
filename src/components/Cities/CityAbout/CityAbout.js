import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  CitySection,
  CityContainer,
  CityTitle,
  CityGrid,
  CityCard,
  CityCardTitle,
} from '../styles'

// Local override for centered card text
const FeatureCard = styled(CityCard)`
  text-align: center;
`

const FeatureDescription = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.6;
`

export function CityAbout({ city, language, templateData }) {
  const { t } = useTranslation('cities')

  const title = t('cityPage.about.title', templateData)
  const features = [
    {
      title: t('cityPage.about.experience.title'),
      description: t('cityPage.about.experience.description', templateData),
    },
    {
      title: t('cityPage.about.quality.title'),
      description: t('cityPage.about.quality.description'),
    },
    {
      title: t('cityPage.about.local.title'),
      description: t('cityPage.about.local.description', templateData),
    },
    {
      title: t('cityPage.about.warranty.title'),
      description: t('cityPage.about.warranty.description'),
    },
  ]

  return (
    <CitySection>
      <CityContainer>
        <CityTitle $size="lg" $mb="3rem">
          {title}
        </CityTitle>
        <CityGrid $minWidth="250px">
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <CityCardTitle>{feature.title}</CityCardTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </CityGrid>
      </CityContainer>
    </CitySection>
  )
}
