import React from 'react'
import { StructuredDataScript } from 'components/common/StructuredDataScript'

/**
 * Component for adding FAQ structured data to pages
 * Simplifies the process of adding schema.org FAQPage markup
 * 
 * @param {Object} props - Component props
 * @param {Array} props.faqData - Array of FAQ items with question and answer
 * @param {string} props.url - The URL of the current page (defaults to website URL)
 * @param {string} props.pathname - Current page path
 * @param {string} props.language - Language code (pl or en)
 * 
 * @example
 * const faqs = [
 *   {
 *     question: "What services do you offer?",
 *     answer: "We offer custom blacksmithing services including gates, fences, balustrades, and decorative elements."
 *   },
 *   {
 *     question: "Do you provide installation services?",
 *     answer: "Yes, we provide professional installation services for all our products."
 *   }
 * ]
 * 
 * <FAQSchema faqData={faqs} pathname={location.pathname} />
 */
export function FAQSchema({
  faqData = [],
  url,
  pathname,
  language = 'pl'
}) {
  // Validate FAQ data
  if (!faqData || !Array.isArray(faqData) || faqData.length === 0) {
    return null
  }

  // Ensure all FAQ items have required fields
  const validFAQs = faqData.filter(
    item => item.question && item.answer && 
    typeof item.question === 'string' && 
    typeof item.answer === 'string'
  )

  if (validFAQs.length === 0) {
    return null
  }

  // Build the schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFAQs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return <StructuredDataScript schema={schema} id="faq-schema" />
}

export default FAQSchema