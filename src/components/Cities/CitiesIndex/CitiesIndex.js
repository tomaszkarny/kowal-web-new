import React, { useMemo } from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import citiesData from 'data/cities'
const { CITIES, getFeaturedCities } = citiesData
import { processAllCities } from 'utils/cityDistanceCalculator'
import { getCityPath } from 'utils/cityUtils'
import {
  IndexSection,
  IndexContainer,
  IndexHeader,
  IndexTitle,
  IndexSubtitle,
  CitiesGrid,
  CityCard,
  CityName,
  CityInfo,
  CityStats,
  CityLink,
  FeaturedSection,
  AllCitiesSection,
  SectionTitle
} from './CitiesIndex.styles'

export function CitiesIndex() {
  const { t, i18n } = useTranslation('cities')
  const language = i18n.language
  
  // Process all cities with calculated distances
  const processedCities = useMemo(() => processAllCities(CITIES), [])
  const featuredCities = processedCities.filter(city => city.featured)
  const allCities = processedCities

  const formatNumber = (num) => {
    return new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US').format(num)
  }


  return (
    <IndexSection>
      <IndexContainer>
        <IndexHeader>
          <IndexTitle>{t('page.heading')}</IndexTitle>
          <IndexSubtitle>{t('page.subheading')}</IndexSubtitle>
        </IndexHeader>

        <FeaturedSection>
          <SectionTitle>{t('citiesList.featured')}</SectionTitle>
          <CitiesGrid>
            {featuredCities.map(city => (
              <CityCard key={city.id} featured>
                <CityName>{city.name[language]}</CityName>
                <CityInfo>
                  <div>{city.region[language]}</div>
                  <CityStats>
                    <div>{t('citiesList.population', { 
                      population: formatNumber(city.population) 
                    })}</div>
                    <div>{t('citiesList.distance', { 
                      distance: city.distance 
                    })}</div>
                    <div>{t('citiesList.travelTime', { 
                      travelTime: city.travelTime[language] 
                    })}</div>
                    <div>{t('citiesList.serviceRadius', { 
                      radius: city.serviceArea.radius 
                    })}</div>
                  </CityStats>
                </CityInfo>
                <CityLink to={getCityPath(city, language)}>
                  {t('citiesList.viewCity')}
                </CityLink>
              </CityCard>
            ))}
          </CitiesGrid>
        </FeaturedSection>

        <AllCitiesSection>
          <SectionTitle>{t('citiesList.all')}</SectionTitle>
          <CitiesGrid>
            {allCities.map(city => (
              <CityCard key={city.id}>
                <CityName>{city.name[language]}</CityName>
                <CityInfo>
                  <div>{city.region[language]}</div>
                  <CityStats>
                    <div>{t('citiesList.distance', { 
                      distance: city.distance 
                    })}</div>
                    <div>{t('citiesList.travelTime', { 
                      travelTime: city.travelTime[language] 
                    })}</div>
                    <div>{t('citiesList.serviceRadius', { 
                      radius: city.serviceArea.radius 
                    })}</div>
                  </CityStats>
                </CityInfo>
                <CityLink to={getCityPath(city, language)}>
                  {t('citiesList.viewCity')}
                </CityLink>
              </CityCard>
            ))}
          </CitiesGrid>
        </AllCitiesSection>
      </IndexContainer>
    </IndexSection>
  )
}