/**
 * ServiceTypes Component
 * Cards displaying different types/styles of services (gates, fences)
 */

import React from 'react'
import {
  CitySection,
  CityContainer,
  CityTitle,
} from '../../Cities/styles/sharedStyles'
import { FORGE_COLORS } from '../../Cities/styles/forgedIronTheme'
import {
  TypesGrid,
  TypeCard,
  TypeTitle,
  TypeDescription,
  FeaturesList,
  FeatureItem,
} from './ServiceTypes.styles'

/**
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array<{title: string, description: string, features?: string[]}>} props.types - Type items
 * @param {2|3} [props.columns=2] - Number of columns
 * @param {'white'|'light'} [props.background='white'] - Background color
 */
export function ServiceTypes({
  title,
  types,
  columns = 2,
  background = 'white',
}) {
  const bgColor =
    background === 'light' ? FORGE_COLORS.sectionBg : FORGE_COLORS.white

  return (
    <CitySection $bg={bgColor}>
      <CityContainer>
        <CityTitle>{title}</CityTitle>
        <TypesGrid $columns={columns}>
          {types.map((type, index) => (
            <TypeCard key={index}>
              <TypeTitle>{type.title}</TypeTitle>
              <TypeDescription $hasFeatures={type.features?.length > 0}>
                {type.description}
              </TypeDescription>
              {type.features && type.features.length > 0 && (
                <FeaturesList>
                  {type.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex}>{feature}</FeatureItem>
                  ))}
                </FeaturesList>
              )}
            </TypeCard>
          ))}
        </TypesGrid>
      </CityContainer>
    </CitySection>
  )
}
