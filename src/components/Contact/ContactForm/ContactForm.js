import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { FORM_INPUTS } from 'components/Contact/ContactForm/ContactFormUtils'

import {
  FormWrapper,
  StyledForm,
  Label,
  Input,
  Button,
} from 'components/Contact/ContactForm/ContactForm.styles'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'

export const ContactForm = () => {
  const { t } = useTranslation('contact')
  return (
    <FormWrapper>
      <SectionTitle>{t('writeToUs')}</SectionTitle>
      <StyledForm
        name="contact"
        method="POST"
        action="/"
        data-netlify-honeypot="bot-field"
        data-netlify="true"
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

        <Button type="submit">{t('form_send')}</Button>
      </StyledForm>
    </FormWrapper>
  )
}
