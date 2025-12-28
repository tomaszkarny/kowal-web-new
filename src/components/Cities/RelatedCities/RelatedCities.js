import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useActualLanguage } from 'hooks/useActualLanguage'
import cityCalculatorUtils from 'utils/cityDistanceCalculator'
import {
  FORGE_COLORS,
  CityContainer,
  CityTitle,
} from '../styles'
import {
  RelatedSection,
  CitiesGrid,
  CityCard,
  CityName,
  CityInfo,
  Distance,
  Badge,
} from './RelatedCities.styles'

const { calculateDistance } = cityCalculatorUtils

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

  const title = t('cityPage.relatedCities.title')

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
                  {t('cityPage.relatedCities.distanceLabel')}: {Math.round(city.distanceFromCurrent)} km
                </Distance>
              </CityInfo>
              {city.freeDelivery && (
                <Badge>
                  {t('cityPage.relatedCities.freeDeliveryBadge')}
                </Badge>
              )}
            </CityCard>
          ))}
        </CitiesGrid>
      </CityContainer>
    </RelatedSection>
  )
}
