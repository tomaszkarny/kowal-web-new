import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { getCityFAQ } from 'data/citiesSeoEnhanced'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_RADIUS,
  CitySection,
  CityContainer,
  CityTitle,
} from '../styles'

// FAQ-specific components using shared theme
const FAQItem = styled.div`
  background: ${FORGE_COLORS.white};
  margin-bottom: 1.5rem;
  border-radius: ${FORGE_RADIUS.cardWithCorner};
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(45, 45, 68, 0.08);
`

const Question = styled.h3`
  background: ${FORGE_GRADIENTS.ironGradient};
  color: ${FORGE_COLORS.white};
  margin: 0;
  padding: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
`

const Answer = styled.div`
  padding: 1.5rem;
  line-height: 1.6;
  color: ${FORGE_COLORS.textSecondary};
`

export function CityFAQ({ city, language, templateData }) {
  const { t } = useTranslation('cities')

  const title = t('cityPage.faq.title', templateData)

  // Get default FAQ items from translations
  const defaultFaqItems = t('cityPage.faq.items', { returnObjects: true })

  // Get enhanced FAQ items for this specific city
  const enhancedFaqItems = getCityFAQ(city.name[language], language)

  // Combine both FAQ sources
  const faqItems = [...defaultFaqItems, ...enhancedFaqItems]

  // Function to process answer templates
  const processAnswer = answer => {
    let processed = answer

    // Handle {{#if isFreeDelivery}} conditional
    const ifRegex =
      /\{\{#if isFreeDelivery\}\}(.*?)\{\{else\}\}(.*?)\{\{\/if\}\}/s
    const match = processed.match(ifRegex)

    if (match) {
      const [, trueCase, falseCase] = match
      processed = templateData.isFreeDelivery ? trueCase : falseCase
    }

    // Replace template variables
    processed = processed
      .replace(/\{\{city\}\}/g, templateData.city)
      .replace(/\{\{travelTime\}\}/g, templateData.travelTime)
      .replace(/\{\{radius\}\}/g, templateData.radius)
      .replace(/\{\{distance\}\}/g, templateData.distance)

    return processed
  }

  return (
    <CitySection>
      <CityContainer $maxWidth="800px">
        <CityTitle $size="lg" $mb="3rem">
          {title}
        </CityTitle>
        {faqItems.map((item, index) => (
          <FAQItem key={index}>
            <Question>
              {item.question.replace(/\{\{city\}\}/g, templateData.city)}
            </Question>
            <Answer>{processAnswer(item.answer)}</Answer>
          </FAQItem>
        ))}
      </CityContainer>
    </CitySection>
  )
}
