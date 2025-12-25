import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

import citiesData from 'data/cities'
import cityCalculatorUtils from 'utils/cityDistanceCalculator'
import { getCityPath } from 'utils/cityUtils'
import { getLanguageFromPath } from 'consts/languageConfig'
import {
  CitiesHeroSection,
  HeroImageWrapper,
  HeroOverlay,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  IndexSection,
  IndexContainer,
  CitiesGrid,
  CityCard,
  CityName,
  CityRegion,
  CityStats,
  StatItem,
  CityLink,
  FeaturedSection,
  AllCitiesSection,
  SectionTitle,
  SectionDivider,
  ForgeBadge,
  StatsGrid,
  StatBox
} from './CitiesIndex.styles'
import {
  DistanceIcon,
  TimeIcon,
  RadiusIcon,
  PopulationIcon
} from './StatIcons'

const { CITIES } = citiesData
const { processAllCities } = cityCalculatorUtils

export function CitiesIndex() {
  const { t } = useTranslation('cities')
  const { originalPath } = useI18next()

  // GraphQL query for hero image
  const { heroImage } = useStaticQuery(graphql`
    query CitiesHeroImageQuery {
      heroImage: file(relativePath: { eq: "cities/cities-hero-balcony.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            height: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 85
            transformOptions: {
              cropFocus: CENTER
              fit: COVER
            }
          )
        }
      }
    }
  `)

  const heroImageData = getImage(heroImage)

  // Use URL-based language detection instead of hook to avoid cache issues
  const currentPath =
    originalPath ||
    (typeof window !== 'undefined' ? window.location.pathname : '/')
  const language = getLanguageFromPath(currentPath)

  // Process all cities with calculated distances
  const processedCities = useMemo(() => processAllCities(CITIES), [])
  const featuredCities = processedCities.filter(city => city.featured)
  const allCities = processedCities

  const formatNumber = num =>
    new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US').format(num)

  // Get label text based on language using translation
  const getStatLabel = (key) => t(`citiesList.statLabels.${key}`)

  return (
    <>
      <CitiesHeroSection>
        {heroImageData && (
          <HeroImageWrapper>
            <GatsbyImage
              image={heroImageData}
              alt=""
              style={{ width: '100%', height: '100%' }}
              objectFit="cover"
              objectPosition="center 30%"
            />
          </HeroImageWrapper>
        )}
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>{t('page.heading')}</HeroTitle>
          <HeroSubtitle>{t('page.subheading')}</HeroSubtitle>
        </HeroContent>
      </CitiesHeroSection>

      <IndexSection>
        <IndexContainer>
          <FeaturedSection>
            <SectionTitle>{t('citiesList.featured')}</SectionTitle>
            <CitiesGrid>
              {featuredCities.map((city, index) => (
                <CityCard key={city.id} $featured $index={index}>
                  <ForgeBadge />
                  <CityName $featured>{city.name[language]}</CityName>
                  <CityRegion $featured>{city.region[language]}</CityRegion>
                  <StatsGrid $featured>
                    <StatBox $featured>
                      <PopulationIcon />
                      <span>{formatNumber(city.population)}</span>
                      <small>{getStatLabel('population')}</small>
                    </StatBox>
                    <StatBox $featured>
                      <DistanceIcon />
                      <span>{city.distance} km</span>
                      <small>{getStatLabel('distance')}</small>
                    </StatBox>
                    <StatBox $featured>
                      <TimeIcon />
                      <span>{city.travelTime[language]}</span>
                      <small>{getStatLabel('travelTime')}</small>
                    </StatBox>
                    <StatBox $featured>
                      <RadiusIcon />
                      <span>{city.serviceArea.radius} km</span>
                      <small>{getStatLabel('radius')}</small>
                    </StatBox>
                  </StatsGrid>
                  <CityLink to={getCityPath(city)} $featured>
                    {t('citiesList.viewCity')}
                  </CityLink>
                </CityCard>
              ))}
            </CitiesGrid>
          </FeaturedSection>

          <SectionDivider />

          <AllCitiesSection>
            <SectionTitle>{t('citiesList.all')}</SectionTitle>
            <CitiesGrid>
              {allCities.map((city, index) => (
                <CityCard key={city.id} $index={index}>
                  <CityName>{city.name[language]}</CityName>
                  <CityRegion>{city.region[language]}</CityRegion>
                  <CityStats>
                    <StatItem>
                      <DistanceIcon />
                      {t('citiesList.distance', {
                        distance: city.distance
                      })}
                    </StatItem>
                    <StatItem>
                      <TimeIcon />
                      {t('citiesList.travelTime', {
                        travelTime: city.travelTime[language]
                      })}
                    </StatItem>
                    <StatItem>
                      <RadiusIcon />
                      {t('citiesList.serviceRadius', {
                        radius: city.serviceArea.radius
                      })}
                    </StatItem>
                  </CityStats>
                  <CityLink to={getCityPath(city)}>
                    {t('citiesList.viewCity')}
                  </CityLink>
                </CityCard>
              ))}
            </CitiesGrid>
          </AllCitiesSection>
        </IndexContainer>
      </IndexSection>
    </>
  )
}
