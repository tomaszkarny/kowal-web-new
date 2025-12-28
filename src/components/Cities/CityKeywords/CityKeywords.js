import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { getCitySeoData } from 'data/citiesSeoEnhanced'
import {
  FORGE_COLORS,
  CitySection,
  CityContainer,
  CityTitle,
  CityTag,
} from '../styles'
import {
  KeywordsGrid,
  LocalFeatures,
  FeatureItem,
} from './CityKeywords.styles'

export function CityKeywords({ city, language }) {
  const { t } = useTranslation('cities')
  const seoData = getCitySeoData(city.id)

  if (!seoData) return null

  const keywords = seoData.seoKeywords?.[language] || []
  const features = seoData.localFeatures?.[language] || []

  const title = t('cityPage.keywords.titleTemplate', { city: city.name[language] })

  return (
    <CitySection $bg={FORGE_COLORS.white} style={{ padding: '3rem 0' }}>
      <CityContainer>
        <CityTitle $size="md" $mb="2rem">
          {title}
        </CityTitle>

        <KeywordsGrid>
          {keywords.map((keyword, index) => (
            <CityTag key={index}>{keyword}</CityTag>
          ))}
        </KeywordsGrid>

        {features.length > 0 && (
          <LocalFeatures>
            {features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </LocalFeatures>
        )}
      </CityContainer>
    </CitySection>
  )
}
