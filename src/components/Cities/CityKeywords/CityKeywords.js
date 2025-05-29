import React from 'react'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'
import { getCitySeoData } from 'data/citiesSeoEnhanced'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  background: '#f8f9fa'
}

const KeywordsSection = styled.section`
  padding: 3rem 0;
  background: white;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h3`
  font-size: 1.8rem;
  color: ${COLORS.dark};
  text-align: center;
  margin-bottom: 2rem;
`

const KeywordsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`

const KeywordTag = styled.span`
  background: ${COLORS.background};
  color: ${COLORS.primary};
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  border: 1px solid ${COLORS.primary}20;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.primary};
    color: white;
    transform: translateY(-2px);
  }
`

const LocalFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: center;
`

const FeatureItem = styled.li`
  color: ${COLORS.textSecondary};
  margin: 0.5rem 0;
  
  &::before {
    content: '✓ ';
    color: ${COLORS.primary};
    font-weight: bold;
  }
`

export function CityKeywords({ city, language }) {
  const seoData = getCitySeoData(city.id)
  
  if (!seoData) return null
  
  const keywords = seoData.seoKeywords?.[language] || []
  const features = seoData.localFeatures?.[language] || []
  
  const title = language === 'pl'
    ? `Usługi kowalskie w ${city.name[language]}`
    : `Blacksmithing services in ${city.name[language]}`
  
  return (
    <KeywordsSection>
      <Container>
        <Title>{title}</Title>
        
        <KeywordsGrid>
          {keywords.map((keyword, index) => (
            <KeywordTag key={index}>{keyword}</KeywordTag>
          ))}
        </KeywordsGrid>
        
        {features.length > 0 && (
          <LocalFeatures>
            {features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </LocalFeatures>
        )}
      </Container>
    </KeywordsSection>
  )
}