import React, { useEffect, useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { ContactDetails } from 'components/Contact/ContactDetails/ContactDetails'
import { ContactForm } from 'components/Contact/ContactForm/ContactForm'
import { WrappedGoogleMap } from 'components/Contact/GoogleMap/GoogleMap'
import { GoogleMapsProvider } from 'components/Contact/GoogleMap/GoogleMapsProvider'
import { FormSuccessMessage } from 'components/Contact/SuccessMessage/SuccessMessage'

import { ContainerWrapper } from 'components/Contact/GoogleMap/GoogleMap.styles'
import { ContactWrapper } from 'components/Contact/Contact.styles'

export const Contact = () => {
  const { t } = useTranslation('contact')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    // Check for success parameter in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('success') === 'true') {
        setShowSuccess(true)
        setShowForm(false)
        // Remove the success parameter from URL without reloading the page
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
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
          <ContactForm />
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