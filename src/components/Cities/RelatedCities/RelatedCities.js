import React from 'react'
import styled from '@emotion/styled'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import { getCityPath } from 'utils/cityUtils'
import { getLanguageFromPath } from 'consts/languageConfig'
import cityCalculatorUtils from 'utils/cityDistanceCalculator'
import { THEME } from 'consts/theme'

const { calculateDistance } = cityCalculatorUtils

const Section = styled.section`
  padding: 3rem 0;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h3`
  font-size: 1.5rem;
  color: ${THEME.color.dark.replace(';', '')};
  text-align: center;
  margin-bottom: 2rem;
`

const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CityCard = styled(Link)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: ${THEME.color.dark.replace(';', '')};
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${THEME.color.primary};
  }
`

const CityName = styled.h4`
  font-size: 1.2rem;
  color: ${THEME.color.primary};
  margin-bottom: 0.5rem;
`

const CityInfo = styled.div`
  color: ${THEME.color.darkGray};
  font-size: 0.9rem;
  line-height: 1.6;
`

const Distance = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-weight: 500;
`

const Badge = styled.span`
  display: inline-block;
  background: ${THEME.color.primary}20;
  color: ${THEME.color.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-top: 0.75rem;
  align-self: flex-start;
`

export function RelatedCities({ currentCity, allCities, language, pathname }) {
  const { t } = useTranslation('cities')
  
  // Get current path for language detection - use pathname prop during SSR
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : (pathname || '/')
  // Use URL-based language detection instead of prop
  const actualLanguage = getLanguageFromPath(currentPath)
  
  // Calculate distances and sort by proximity
  const nearbyCities = allCities
    .filter(city => city.id !== currentCity.id)
    .map(city => ({
      ...city,
      distanceFromCurrent: calculateDistance(
        currentCity.coordinates.lat,
        currentCity.coordinates.lng,
        city.coordinates.lat,
        city.coordinates.lng
      )
    }))
    .sort((a, b) => a.distanceFromCurrent - b.distanceFromCurrent)
    .slice(0, 3)
  
  const title = actualLanguage === 'pl' 
    ? 'Obsługujemy również' 
    : 'We also serve'
  
  return (
    <Section>
      <Container>
        <Title>{title}</Title>
        <CitiesGrid>
          {nearbyCities.map(city => (
            <CityCard 
              key={city.id} 
              to={`/cities/${city.slug.en}/`}
            >
              <CityName>{city.name[actualLanguage]}</CityName>
              <CityInfo>
                {city.region[actualLanguage]}
                <Distance>
                  {actualLanguage === 'pl' ? 'Odległość' : 'Distance'}: {Math.round(city.distanceFromCurrent)} km
                </Distance>
              </CityInfo>
              {city.freeDelivery && (
                <Badge>
                  {actualLanguage === 'pl' ? 'Darmowa dostawa' : 'Free delivery'}
                </Badge>
              )}
            </CityCard>
          ))}
        </CitiesGrid>
      </Container>
    </Section>
  )
}