import React from 'react'

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
  return (
    <FormWrapper>
      <SectionTitle>Napisz do nas. </SectionTitle>
      <StyledForm
        name="contact"
        method="POST"
        data-netlify-honeypot="bot-field"
        data-netlify="true"
        netlify
        hidden
      >
        <input type="hidden" name="contact" value="contact" />
        {FORM_INPUTS.map(({ label, type, name }) => (
          <>
            <Label htmlFor={name}>{label}</Label>

            <Input
              type={type}
              name={name}
              isTextarea={type === 'textarea'}
              as={type === 'textarea' ? 'textarea' : Input}
              required
            />
          </>
        ))}

        <Button type="submit">Wyślij</Button>
      </StyledForm>
    </FormWrapper>
  )
}
