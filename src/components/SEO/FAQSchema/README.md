# FAQSchema Component

A reusable React component for adding FAQ structured data (JSON-LD) to pages following Google's FAQ schema guidelines.

## Usage

### Basic Usage

```jsx
import { FAQSchema } from 'components/SEO/FAQSchema'

const MyPage = ({ location }) => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer custom blacksmithing services including gates, fences, and decorative elements."
    },
    {
      question: "Do you provide installation?",
      answer: "Yes, we provide professional installation for all our products."
    }
  ]

  return (
    <>
      <FAQSchema faqData={faqs} pathname={location.pathname} />
      {/* Rest of your page content */}
    </>
  )
}
```

### With Translations

```jsx
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FAQSchema } from 'components/SEO/FAQSchema'

const MyPage = ({ location }) => {
  const { t } = useTranslation('common')
  
  const faqs = [
    {
      question: t('faq.services.question'),
      answer: t('faq.services.answer')
    }
  ]

  return <FAQSchema faqData={faqs} pathname={location.pathname} />
}
```

### Using FAQ Builder Utilities

```jsx
import { FAQSchema, createFAQList } from 'components/SEO/FAQSchema'

const MyPage = ({ location }) => {
  const faqs = createFAQList([
    ["What are your hours?", "Monday-Friday 8:00 AM - 5:00 PM"],
    ["Do you offer warranties?", "Yes, all our work comes with a 5-year warranty"]
  ])

  return <FAQSchema faqData={faqs} pathname={location.pathname} />
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| faqData | Array | Yes | Array of FAQ objects with `question` and `answer` properties |
| pathname | String | No | Current page path (used to generate full URL) |
| url | String | No | Full URL of the page (overrides pathname-based URL) |

## FAQ Data Structure

Each FAQ item should have the following structure:

```javascript
{
  question: "Your question here?",
  answer: "Your answer here."
}
```

## Helper Functions

### createFAQItem(question, answer)
Creates a single FAQ item.

### createFAQList(faqs)
Creates multiple FAQ items from an array of [question, answer] pairs.

### validateFAQData(faqData)
Validates that FAQ data is properly structured.

### sanitizeFAQText(text)
Removes HTML tags and normalizes whitespace.

### processFAQData(faqData)
Processes and sanitizes an array of FAQ items.

## Best Practices

1. **Keep answers concise**: Google recommends clear, direct answers.
2. **Use proper grammar**: Both questions and answers should be well-formatted.
3. **Avoid HTML in content**: The schema sanitizes HTML tags automatically.
4. **Minimum 2 FAQs**: Pages should have at least 2 FAQ items.
5. **Relevant content**: FAQs should be relevant to the page content.

## Integration Example

```jsx
// In your page component
import React from 'react'
import { graphql } from 'gatsby'
import { FAQSchema } from 'components/SEO/FAQSchema'
import Layout from 'components/Layout/Layout'

const AboutPage = ({ location, data }) => {
  // Your FAQ data - could come from GraphQL, frontmatter, or be hardcoded
  const faqs = data.site.siteMetadata.aboutFAQs || [
    {
      question: "How long have you been in business?",
      answer: "We have been crafting custom metalwork since 1990."
    }
  ]

  return (
    <Layout>
      <FAQSchema faqData={faqs} pathname={location.pathname} />
      {/* Page content */}
    </Layout>
  )
}

export default AboutPage
```

## Testing

To test your FAQ schema implementation:

1. Use Google's [Rich Results Test](https://search.google.com/test/rich-results)
2. Check the browser console for any schema errors
3. View page source to ensure JSON-LD is properly formatted