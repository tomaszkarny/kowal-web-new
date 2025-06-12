import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import {
  SuccessMessageWrapper,
  SuccessBar,
  SuccessIconContainer,
  SuccessIcon,
  SuccessTitle,
  SuccessMessage,
  SuccessButton
} from './SuccessMessage.styles'

export function FormSuccessMessage({ onSendAnother }) {
  const { t } = useTranslation('contact')

  return (
    <SuccessMessageWrapper>
      <SuccessBar />

      <SuccessIconContainer>
        <SuccessIcon>✓</SuccessIcon>
      </SuccessIconContainer>

      <SuccessTitle>
        {t('form_success_title', 'Thank you!')}
      </SuccessTitle>

      <SuccessMessage>
        {t('form_success_message', 'Your message has been sent successfully. We will get back to you soon.')}
      </SuccessMessage>

      <SuccessButton onClick={onSendAnother}>
        {t('form_send_another', 'Send another message')}
      </SuccessButton>
    </SuccessMessageWrapper>
  )
}
