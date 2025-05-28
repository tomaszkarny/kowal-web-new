import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray
}

const FAQSection = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.dark};
  margin-bottom: 3rem;
  text-align: center;
`

const FAQItem = styled.div`
  background: white;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Question = styled.h3`
  background: ${COLORS.primary};
  color: white;
  margin: 0;
  padding: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
`

const Answer = styled.div`
  padding: 1.5rem;
  line-height: 1.6;
  color: ${COLORS.textSecondary};
`

export function CityFAQ({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  const title = t('cityPage.faq.title', templateData)
  const faqItems = t('cityPage.faq.items', { returnObjects: true })

  // Function to process answer templates
  const processAnswer = (answer) => {
    let processed = answer
    
    // Handle {{#if isFreeDelivery}} conditional
    const ifRegex = /\{\{#if isFreeDelivery\}\}(.*?)\{\{else\}\}(.*?)\{\{\/if\}\}/s
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
    <FAQSection>
      <Container>
        <Title>{title}</Title>
        {faqItems.map((item, index) => (
          <FAQItem key={index}>
            <Question>
              {item.question.replace(/\{\{city\}\}/g, templateData.city)}
            </Question>
            <Answer>
              {processAnswer(item.answer)}
            </Answer>
          </FAQItem>
        ))}
      </Container>
    </FAQSection>
  )
}