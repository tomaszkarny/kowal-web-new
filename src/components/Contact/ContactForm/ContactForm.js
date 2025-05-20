import React, { useState } from 'react'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'

import { FORM_INPUTS } from 'components/Contact/ContactForm/ContactFormUtils'

import {
  FormWrapper,
  StyledForm,
  Label,
  Input,
  Button,
  FormErrorWrapper,
  FormErrorText,
  FormErrorMessage
} from 'components/Contact/ContactForm/ContactForm.styles'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'

export const ContactForm = () => {
  const { t } = useTranslation('contact')
  const { language } = useI18next() // Get current language
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  // Generate language-aware success page URL
  const successPageUrl = language === 'en' ? '/en/contact/?success=true' : '/contact/?success=true'

  const handleSubmit = async (event) => {
    // We want to show a submitting state
    setIsSubmitting(true)
    setFormError(null)

    // Check if we're in development mode
    if (process.env.NODE_ENV === 'development') {
      // In development, prevent the default form submission and simulate success
      event.preventDefault()

      // Get form data for logging (optional)
      const formData = new FormData(event.target)
      const formValues = {}
      formData.forEach((value, key) => {
        if (key !== 'bot-field' && key !== 'form-name') {
          formValues[key] = value
        }
      })
      console.log('Development mode form submission:', formValues)

      // Simulate a successful submission after a delay
      setTimeout(() => {
        setIsSubmitting(false)
        // Use gatsby navigate instead of window.location for proper language handling
        navigate(successPageUrl)
      }, 1500)
      return
    }

    // In production, let Netlify handle the form submission naturally
    // This function just handles the UI feedback during submission
    try {
      // Modified for explicit form submission with language-aware redirect
      event.preventDefault()
      const form = event.target
      const formData = new FormData(form)
      
      // Use fetch to submit the form data to Netlify
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        // Success! Use navigate for language-aware redirect
        setIsSubmitting(false)
        navigate(successPageUrl)
      })
      .catch(error => {
        // Handle errors
        console.error('Form submission error:', error)
        setIsSubmitting(false)
        setFormError(error.message || 'There was an error submitting the form')
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      setFormError(error.message)
    }
  }

  return (
    <FormWrapper>
      <SectionTitle>{t('writeToUs')}</SectionTitle>
      {/* Using language-aware URL in the form action */}
      <StyledForm
        name="contact"
        method="POST"
        data-netlify-honeypot="bot-field"
        data-netlify="true"
        action={successPageUrl}
        onSubmit={handleSubmit}
      >
        {/* This hidden input is required for Netlify forms */}
        <input type="hidden" name="form-name" value="contact" />
        {/* Honeypot field to catch bots */}
        <p hidden>
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        {FORM_INPUTS.map(({ label, type, name, translationKey }) => (
          <React.Fragment key={name}>
            <Label htmlFor={name}>{t(`form_${translationKey || name}`, label)}</Label>

            <Input
              type={type}
              name={name}
              isTextarea={type === 'textarea'}
              as={type === 'textarea' ? 'textarea' : Input}
              required
            />
          </React.Fragment>
        ))}

        {formError && (
          <FormErrorWrapper>
            <FormErrorText>{t('form_error', 'There was an error submitting the form. Please try again.')}</FormErrorText>
            <FormErrorMessage>{formError}</FormErrorMessage>
          </FormErrorWrapper>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('form_sending', 'Sending...') : t('form_send')}
        </Button>
      </StyledForm>
    </FormWrapper>
  )
}