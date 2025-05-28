import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  border: THEME.color.lightGray
}

const ServiceAreaSection = styled.section`
  padding: 4rem 0;
  background: white;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`

const Title = styled.h2`
  font-size: 2.2rem;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${COLORS.textSecondary};
  margin-bottom: 2rem;
`

const NeighborhoodsList = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
`

const NeighborhoodsTitle = styled.h3`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
`

const NeighborhoodsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`

const NeighborhoodTag = styled.span`
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid ${COLORS.border};
`

export function CityServiceArea({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  const title = t('cityPage.serviceArea.title', templateData)
  const subtitle = t('cityPage.serviceArea.subtitle')
  const neighborhoodsTitle = t('cityPage.serviceArea.neighborhoods')
  const radiusInfo = t('cityPage.serviceArea.radius', templateData)
  
  const neighborhoods = city.serviceArea.neighborhoods[language] || []

  return (
    <ServiceAreaSection>
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        
        <NeighborhoodsList>
          <NeighborhoodsTitle>{neighborhoodsTitle}</NeighborhoodsTitle>
          <NeighborhoodsGrid>
            {neighborhoods.map((neighborhood, index) => (
              <NeighborhoodTag key={index}>
                {neighborhood}
              </NeighborhoodTag>
            ))}
          </NeighborhoodsGrid>
          <p style={{ marginTop: '1.5rem', color: COLORS.textSecondary }}>
            {radiusInfo}
          </p>
        </NeighborhoodsList>
      </Container>
    </ServiceAreaSection>
  )
}