import React from 'react'
import styled from '@emotion/styled'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import { useActualLanguage } from 'hooks/useActualLanguage'
import cityCalculatorUtils from 'utils/cityDistanceCalculator'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_SHADOWS,
  FORGE_SPACING,
  CitySection,
  CityContainer,
  CityTitle,
  CityGrid,
} from '../styles'

const { calculateDistance } = cityCalculatorUtils

// Compact section for related cities
const RelatedSection = styled(CitySection)`
  padding: 3rem 0;
  border-top: 1px solid ${FORGE_COLORS.cardBorder};
`

// Use shared CityGrid with smaller gap for compact layout
const CitiesGrid = styled(CityGrid)`
  gap: ${FORGE_SPACING.lg};
`

const CityCard = styled(Link)`
  background: ${FORGE_COLORS.cardLight};
  border-radius: 0 0 4px 4px;
  padding: ${FORGE_SPACING.lg};
  text-decoration: none;
  color: ${FORGE_COLORS.iron};
  border: 1px solid ${FORGE_COLORS.cardBorder};
  border-top: 3px solid ${FORGE_COLORS.iron};
  transition: ${FORGE_TRANSITIONS.default};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: ${FORGE_HOVER.liftMedium};
    box-shadow: ${FORGE_SHADOWS.cardHover};
    border-top-color: ${FORGE_COLORS.ember};
  }
`

const CityName = styled.h4`
  font-size: 1.2rem;
  color: ${FORGE_COLORS.ember};
  margin-bottom: 0.5rem;
`

const CityInfo = styled.div`
  color: ${FORGE_COLORS.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
`

const Distance = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-weight: 500;
  color: ${FORGE_COLORS.iron};
`

const Badge = styled.span`
  display: inline-block;
  background: ${FORGE_GRADIENTS.emberGradient};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 0.75rem;
  align-self: flex-start;
`

export function RelatedCities({ currentCity, allCities, language, pathname }) {
  const { t } = useTranslation('cities')
  const actualLanguage = useActualLanguage(pathname)
  
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
    <RelatedSection $bg={FORGE_COLORS.sectionBg}>
      <CityContainer>
        <CityTitle $size="md" $mb="2rem">{title}</CityTitle>
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
      </CityContainer>
    </RelatedSection>
  )
}