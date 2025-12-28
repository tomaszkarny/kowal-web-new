import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import {
  FORGE_COLORS,
  CitySection,
  CityContainer,
  CityTitle,
  CitySubtitle,
  CityInfoBox,
  CityInfoTitle,
  CityTagStatic,
} from '../styles'
import {
  TagsGrid,
  RadiusNote,
} from './CityServiceArea.styles'

export function CityServiceArea({ city, language, templateData }) {
  const { t } = useTranslation('cities')

  const title = t('cityPage.serviceArea.title', templateData)
  const subtitle = t('cityPage.serviceArea.subtitle')
  const neighborhoodsTitle = t('cityPage.serviceArea.neighborhoods')
  const radiusInfo = t('cityPage.serviceArea.radius', templateData)

  const neighborhoods = city.serviceArea.neighborhoods[language] || []

  return (
    <CitySection $bg={FORGE_COLORS.white} style={{ padding: '4rem 0' }}>
      <CityContainer style={{ textAlign: 'center' }}>
        <CityTitle $size="md">{title}</CityTitle>
        <CitySubtitle $mb="2rem">{subtitle}</CitySubtitle>

        <CityInfoBox style={{ margin: '2rem 0' }}>
          <CityInfoTitle>{neighborhoodsTitle}</CityInfoTitle>
          <TagsGrid>
            {neighborhoods.map((neighborhood, index) => (
              <CityTagStatic key={index}>{neighborhood}</CityTagStatic>
            ))}
          </TagsGrid>
          <RadiusNote>{radiusInfo}</RadiusNote>
        </CityInfoBox>
      </CityContainer>
    </CitySection>
  )
}
