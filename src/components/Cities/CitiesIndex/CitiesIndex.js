import React, { useMemo } from 'react'
import { Link, useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

import citiesData from 'data/cities'
import cityCalculatorUtils from 'utils/cityDistanceCalculator'
import { getCityPath } from 'utils/cityUtils'
import { getLanguageFromPath } from 'consts/languageConfig'
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

const { CITIES, getFeaturedCities } = citiesData
const { processAllCities } = cityCalculatorUtils

export function CitiesIndex() {
  const { t } = useTranslation('cities')
  const { originalPath } = useI18next()
  
  // Use URL-based language detection instead of hook to avoid cache issues
  const currentPath = originalPath || (typeof window !== 'undefined' ? window.location.pathname : '/')
  const language = getLanguageFromPath(currentPath)
  
  // Process all cities with calculated distances
  const processedCities = useMemo(() => processAllCities(CITIES), [])
  const featuredCities = processedCities.filter(city => city.featured)
  const allCities = processedCities

  const formatNumber = (num) => new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US').format(num)


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
                <CityLink to={getCityPath(city)}>
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
                <CityLink to={getCityPath(city)}>
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