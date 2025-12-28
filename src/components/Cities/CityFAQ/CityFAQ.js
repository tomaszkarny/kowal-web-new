import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { getCityFAQ } from 'data/citiesSeoEnhanced'
import {
  CitySection,
  CityContainer,
  CityTitle,
} from '../styles'
import {
  FAQItem,
  Question,
  Answer,
} from './CityFAQ.styles'

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
