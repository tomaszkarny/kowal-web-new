import React from 'react'
import { CityContainer, CityTitle, FORGE_COLORS } from '../../Cities/styles'
import {
  RelatedSection,
  CardContainer,
  CardTitle,
  CardDescription,
  CTALink,
} from './RelatedServices.styles'

/**
 * RelatedServices Component
 * Cross-links between service pages for better SEO and navigation
 *
 * @param {Object} props
 * @param {string} props.sectionTitle - Section heading (e.g., "See also")
 * @param {string} props.serviceTitle - Service name (e.g., "Custom Fences")
 * @param {string} props.serviceDescription - Brief description
 * @param {string} props.servicePath - URL path (e.g., "/services/custom-fences/")
 * @param {string} [props.ctaText] - Button text (defaults to serviceTitle with arrow)
 * @param {string} [props.language] - Current page language ('pl' or 'en')
 */
export function RelatedServices({
  sectionTitle,
  serviceTitle,
  serviceDescription,
  servicePath,
  ctaText,
  language,
}) {
  const localizedPath = language === 'en' && !servicePath.startsWith('/en/')
    ? `/en${servicePath}`
    : servicePath;

  return (
    <RelatedSection $bg={FORGE_COLORS.sectionBg}>
      <CityContainer>
        <CityTitle $size="md" $mb="1.5rem">
          {sectionTitle}
        </CityTitle>
        <CardContainer>
          <CardTitle>{serviceTitle}</CardTitle>
          <CardDescription>{serviceDescription}</CardDescription>
          <CTALink to={localizedPath}>
            {ctaText || serviceTitle} &rarr;
          </CTALink>
        </CardContainer>
      </CityContainer>
    </RelatedSection>
  )
}
