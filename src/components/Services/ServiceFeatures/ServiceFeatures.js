/**
 * ServiceFeatures Component
 * Grid of feature cards with icons for advantages/why sections
 */

import React from 'react'
import {
  CitySection,
  CityContainer,
  CityTitle,
} from '../../Cities/styles/sharedStyles'
import { FORGE_COLORS } from '../../Cities/styles/forgedIronTheme'
import {
  FeaturesGrid,
  FeatureCard,
  IconWrapper,
  FeatureTitle,
  FeatureText,
} from './ServiceFeatures.styles'

/**
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array<{icon: React.ReactNode, title: string, text: string}>} props.features - Feature items
 * @param {3|4} [props.columns=3] - Number of columns
 * @param {'light'|'dark'} [props.background='light'] - Background color
 */
export function ServiceFeatures({
  title,
  features,
  columns = 3,
  background = 'light',
}) {
  const isDark = background === 'dark'
  const bgColor = isDark ? FORGE_COLORS.ironDark : FORGE_COLORS.sectionBg

  return (
    <CitySection $bg={bgColor}>
      <CityContainer>
        <CityTitle>{title}</CityTitle>
        <FeaturesGrid $columns={columns}>
          {features.map((feature, index) => (
            <FeatureCard key={index} $dark={isDark}>
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle $dark={isDark}>{feature.title}</FeatureTitle>
              <FeatureText $dark={isDark}>{feature.text}</FeatureText>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </CityContainer>
    </CitySection>
  )
}
