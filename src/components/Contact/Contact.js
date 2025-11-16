import React, { useEffect, useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { ContactDetails } from 'components/Contact/ContactDetails/ContactDetails'
import { ContactForm } from 'components/Contact/ContactForm/ContactForm'
import { WrappedGoogleMap } from 'components/Contact/GoogleMap/GoogleMap'
import { GoogleMapsProvider } from 'components/Contact/GoogleMap/GoogleMapsProvider'
import { FormSuccessMessage } from 'components/Contact/SuccessMessage/SuccessMessage'

import { ContainerWrapper } from 'components/Contact/GoogleMap/GoogleMap.styles'
import { ContactWrapper } from 'components/Contact/Contact.styles'

export function Contact() {
  const { t } = useTranslation('contact')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showForm, setShowForm] = useState(true)

  // Handler for direct success callback (used in development mode)
  const handleSubmitSuccess = () => {
    setShowSuccess(true)
    setShowForm(false)
  }

  useEffect(() => {
    // Check for success parameter in URL (used in production mode)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const isSuccess = urlParams.get('success') === 'true'
      
      if (isSuccess) {
        // Set a slight delay to prevent flickering
        setTimeout(() => {
          setShowSuccess(true)
          setShowForm(false)
          // Remove the success parameter from URL without reloading the page
          const newUrl = window.location.pathname
          window.history.replaceState({}, document.title, newUrl)
        }, 150)
      }
    }
  }, [])

  const handleSendAnother = () => {
    setShowSuccess(false)
    setShowForm(true)
  }

  return (
    <>
      <ContactWrapper>
        <ContactDetails />
        {showSuccess ? (
          <FormSuccessMessage onSendAnother={handleSendAnother} />
        ) : (
          <ContactForm onSubmitSuccess={handleSubmitSuccess} />
        )}
      </ContactWrapper>
      <ContainerWrapper>
        <GoogleMapsProvider>
          <WrappedGoogleMap isMarkerShown />
        </GoogleMapsProvider>
      </ContainerWrapper>
    </>
  )
}