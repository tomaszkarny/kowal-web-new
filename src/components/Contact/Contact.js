import React, { useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { ContactDetails } from 'components/Contact/ContactDetails/ContactDetails'
import { ContactForm } from 'components/Contact/ContactForm/ContactForm'
import { WrappedGoogleMap } from 'components/Contact/GoogleMap/GoogleMap'
import { GoogleMapsProvider } from 'components/Contact/GoogleMap/GoogleMapsProvider'
import { FormSuccessMessage } from 'components/Contact/SuccessMessage/SuccessMessage'

import { ContainerWrapper } from 'components/Contact/GoogleMap/GoogleMap.styles'
import { ContactWrapper } from 'components/Contact/Contact.styles'

const MapPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 500px;
  background-color: #f0f0f0;
  color: #666;
  font-size: 1.1rem;
  border-radius: 4px;
`

export function Contact() {
  const { t } = useTranslation('contact')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [mapVisible, setMapVisible] = useState(false)
  const mapRef = useRef(null)

  // Handler for direct success callback (used in development mode)
  const handleSubmitSuccess = () => {
    setShowSuccess(true)
    setShowForm(false)
  }

  // Lazy load Google Maps
  useEffect(() => {
    if (!mapRef.current) return
    if (!('IntersectionObserver' in window)) {
      setMapVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(mapRef.current)
    return () => observer.disconnect()
  }, [])

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
      <div ref={mapRef}>
        <ContainerWrapper>
          {mapVisible ? (
            <GoogleMapsProvider>
              <WrappedGoogleMap isMarkerShown />
            </GoogleMapsProvider>
          ) : (
            <MapPlaceholder>
              {t('mapLoading', 'Ładowanie mapy...')}
            </MapPlaceholder>
          )}
        </ContainerWrapper>
      </div>
    </>
  )
}
