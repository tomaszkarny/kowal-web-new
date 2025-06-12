import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FAQSchema } from './FAQSchema'
import { createFAQList } from './FAQBuilder'

/**
 * Example component showing how to use FAQSchema with translations
 * This can be used as a template for implementing FAQs on different pages
 */
export function FAQExample({ pathname }) {
  const { t } = useTranslation('common')
  
  // Example 1: Simple FAQ data structure
  const simpleFAQs = [
    {
      question: t('faq.q1', 'What types of metalwork do you specialize in?'),
      answer: t('faq.a1', 'We specialize in custom gates, fences, balustrades, and decorative elements.')
    },
    {
      question: t('faq.q2', 'Do you work with both residential and commercial clients?'),
      answer: t('faq.a2', 'Yes, we work with both residential and commercial clients.')
    }
  ]
  
  // Example 2: Using the FAQBuilder helper
  const builderFAQs = createFAQList([
    [
      t('faq.q3', 'What is your typical project timeline?'),
      t('faq.a3', 'Project timelines vary based on complexity, typically 2-6 weeks.')
    ],
    [
      t('faq.q4', 'Do you provide custom design services?'),
      t('faq.a4', 'Yes, we offer complete custom design services for all projects.')
    ]
  ])
  
  // Example 3: Dynamic FAQs based on page
  const getPageSpecificFAQs = () => {
    if (pathname?.includes('/gallery')) {
      return [
        {
          question: t('faq.gallery.q1', 'Can I request a custom design based on gallery items?'),
          answer: t('faq.gallery.a1', 'Absolutely! Any item in our gallery can be customized to your specifications.')
        }
      ]
    }
    
    if (pathname?.includes('/contact')) {
      return [
        {
          question: t('faq.contact.q1', 'What are your business hours?'),
          answer: t('faq.contact.a1', 'We are open Monday-Friday 8:00 AM - 5:00 PM.')
        }
      ]
    }
    
    return []
  }
  
  // Combine all FAQs
  const allFAQs = [
    ...simpleFAQs,
    ...builderFAQs,
    ...getPageSpecificFAQs()
  ]
  
  return <FAQSchema faqData={allFAQs} pathname={pathname} />
}

export default FAQExample