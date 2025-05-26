/**
 * Utility functions for building FAQ data structures
 * These helpers ensure consistent FAQ formatting across the site
 */

/**
 * Creates a single FAQ item
 * @param {string} question - The question text
 * @param {string} answer - The answer text
 * @returns {Object} FAQ item object
 */
export const createFAQItem = (question, answer) => ({
  question,
  answer
})

/**
 * Creates multiple FAQ items from an array of question/answer pairs
 * @param {Array} faqs - Array of [question, answer] pairs
 * @returns {Array} Array of FAQ item objects
 * 
 * @example
 * const faqs = createFAQList([
 *   ["What services do you offer?", "We offer custom blacksmithing..."],
 *   ["Do you provide installation?", "Yes, we provide professional..."]
 * ])
 */
export const createFAQList = (faqs) => {
  if (!Array.isArray(faqs)) {
    return []
  }
  
  return faqs
    .filter(faq => Array.isArray(faq) && faq.length >= 2)
    .map(([question, answer]) => createFAQItem(question, answer))
}

/**
 * Validates FAQ data structure
 * @param {Array} faqData - Array of FAQ items to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateFAQData = (faqData) => {
  if (!Array.isArray(faqData) || faqData.length === 0) {
    return false
  }
  
  return faqData.every(
    item => 
      item && 
      typeof item.question === 'string' && 
      item.question.trim().length > 0 &&
      typeof item.answer === 'string' && 
      item.answer.trim().length > 0
  )
}

/**
 * Sanitizes FAQ content by removing HTML tags and trimming whitespace
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeFAQText = (text) => {
  if (typeof text !== 'string') {
    return ''
  }
  
  // Remove HTML tags
  const withoutTags = text.replace(/<[^>]*>/g, '')
  
  // Replace multiple spaces with single space and trim
  return withoutTags.replace(/\s+/g, ' ').trim()
}

/**
 * Processes and sanitizes an array of FAQ items
 * @param {Array} faqData - Raw FAQ data
 * @returns {Array} Processed FAQ data
 */
export const processFAQData = (faqData) => {
  if (!Array.isArray(faqData)) {
    return []
  }
  
  return faqData
    .filter(item => item && item.question && item.answer)
    .map(item => ({
      question: sanitizeFAQText(item.question),
      answer: sanitizeFAQText(item.answer)
    }))
    .filter(item => item.question && item.answer)
}