import React from 'react'
import styled from '@emotion/styled'
import { getCitySeoData } from 'data/citiesSeoEnhanced'
import {
  FORGE_COLORS,
  CitySection,
  CityContainer,
  CityTitle,
  CityTag,
} from '../styles'

const KeywordsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`

const LocalFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: center;
`

const FeatureItem = styled.li`
  color: ${FORGE_COLORS.textSecondary};
  margin: 0.5rem 0;

  &::before {
    content: '\u2713 ';
    color: ${FORGE_COLORS.ember};
    font-weight: bold;
  }
`

export function CityKeywords({ city, language }) {
  const seoData = getCitySeoData(city.id)

  if (!seoData) return null

  const keywords = seoData.seoKeywords?.[language] || []
  const features = seoData.localFeatures?.[language] || []

  const title =
    language === 'pl'
      ? `Usługi kowalskie w ${city.name[language]}`
      : `Blacksmithing services in ${city.name[language]}`

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
