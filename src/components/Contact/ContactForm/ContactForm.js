import React, { useState } from 'react'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'
import { buildLanguagePath } from 'consts/languageConfig'

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateFormData(formData) {
  const errors = []

  FORM_INPUTS.forEach(({ name, minLength, maxLength, type }) => {
    const value = (formData.get(name) || '').toString().trim()
    formData.set(name, value)

    if (minLength && value.length < minLength) {
      errors.push(name)
    }

    if (maxLength && value.length > maxLength) {
      errors.push(name)
    }

    if (type === 'email' && value && !EMAIL_REGEX.test(value)) {
      errors.push(name)
    }
  })

  return errors
}

export function ContactForm({ onSubmitSuccess }) {
  const { t } = useTranslation('contact')
  const { language } = useI18next() // Get current language
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const fieldConstraints = FORM_INPUTS.reduce((acc, field) => {
    acc[field.name] = field
    return acc
  }, {})

  // Generate language-aware success page URL
  // Make sure trailing slashes are consistent with your site's configuration
  const successPageUrl = buildLanguagePath('/contact/?success=true', language)

  const handleSubmit = async (event) => {
    // Prevent the default form submission to handle it manually
    event.preventDefault()
    
    // We want to show a submitting state
    setIsSubmitting(true)
    setFormError(null)

    // Get form data
    const form = event.target
    const formData = new FormData(form)

    // Basic client-side validation to protect Netlify endpoint
    const validationErrors = validateFormData(formData)
    if (validationErrors.length) {
      setIsSubmitting(false)
      setFormError(t('form_validation_error', 'Sprawdź poprawność pól (email, długości) i spróbuj ponownie.'))
      return
    }
    
    // Ensure the form-name field is set
    if (!formData.has('form-name')) {
      formData.append('form-name', 'contact')
    }
    
    // In development mode, simulate form submission with success/error scenarios
    // Gatsby doesn't consistently expose process.env.NODE_ENV, so we use a different check
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Development mode detected - simulating form submission')
      
      // For testing errors, uncomment the next line and comment out the success simulation below
      // return simulateFormError()
      
      // Simulate successful submission in development
      setTimeout(() => {
        // First ensure the form is visually reset
        setIsSubmitting(false)
        
        console.log('Form submitted successfully in development environment')
        
        // In development, directly update parent component state if callback provided
        if (typeof onSubmitSuccess === 'function') {
          onSubmitSuccess()
        } else {
          // Fallback to URL navigation if no callback provided
          console.log('Fallback: Redirecting to:', successPageUrl)
          window.location.href = successPageUrl
        }
      }, 1000)
      return
    }

    // In production, handle Netlify form submission with fetch API
    try {
      // Convert FormData to URL-encoded string for Netlify
      const encodedData = new URLSearchParams(formData).toString()
      
      // Submit the form data using fetch API
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`)
        }
        return response
      })
      .then(() => {
        // Success handling - clear the form
        event.target.reset()
        setIsSubmitting(false)
        
        // First try direct callback if available (best UX, no page reload)
        if (typeof onSubmitSuccess === 'function') {
          onSubmitSuccess()
        } else {
          // Otherwise fall back to URL navigation
          // Add a slight delay before navigation to prevent flickering
          setTimeout(() => {
            navigate(successPageUrl)
          }, 100)
        }
      })
      .catch(error => {
        // Error handling
        console.error('Form submission error:', error)
        setIsSubmitting(false)
        setFormError(t('form_error'))
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      setFormError(t('form_error'))
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
        {FORM_INPUTS.map(({ label, type, name, translationKey }) => {
          const constraints = fieldConstraints[name] || {}

          return (
            <React.Fragment key={name}>
              <Label htmlFor={name}>{t(`form_${translationKey || name}`, label)}</Label>

              <Input
                type={type}
                name={name}
                minLength={constraints.minLength}
                maxLength={constraints.maxLength}
                pattern={type === 'email' ? EMAIL_REGEX.source : undefined}
                isTextarea={type === 'textarea'}
                as={type === 'textarea' ? 'textarea' : Input}
                required
              />
            </React.Fragment>
          )
        })}

        {formError && (
          <FormErrorWrapper>
            <FormErrorText>
              {/* Use the translation key for the error message */}
              {t('form_error', 'There was an error submitting the form. Please try again.')}
            </FormErrorText>
            {/* Only show detailed error message in development */}
            {window.location.hostname === 'localhost' && formError !== t('form_error') && (
              <FormErrorMessage>{formError}</FormErrorMessage>
            )}
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
