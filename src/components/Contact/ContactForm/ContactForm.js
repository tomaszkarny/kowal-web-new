import React, { useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (event) => {
    // We don't need to prevent default since we want the form to submit naturally to Netlify
    // We just want to show a submitting state
    setIsSubmitting(true)
    setFormError(null)
    
    // The actual form submission will be handled by Netlify automatically
    // This function just handles the UI feedback during submission
    
    // If there's an error during form submission, it will be caught here
    try {
      // We set a timeout to reset the submitting state in case the form navigation takes too long
      // This ensures the UI doesn't get stuck in a submitting state if something goes wrong
      setTimeout(() => {
        setIsSubmitting(false)
      }, 5000)  
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      setFormError(error.message)
      // Prevent the form from submitting if there's an error
      event.preventDefault()
    }
  }

  return (
    <FormWrapper>
      <SectionTitle>{t('writeToUs')}</SectionTitle>
      <StyledForm
        name="contact"
        method="POST"
        data-netlify-honeypot="bot-field"
        data-netlify="true"
        action="/contact/?success=true"
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
