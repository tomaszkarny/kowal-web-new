import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'
import { getNapInfo, GOOGLE_MAPS_URL } from 'consts/contactDetails'
import { getLanguageFromPath } from 'consts/languageConfig'

const COLORS = {
  primary: THEME.color.primary,
  secondary: '#6c5ce7',
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  border: THEME.color.lightGray,
  success: '#00b894'
}

const ContactSection = styled.section`
  padding: 5rem 0;
  background: white;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-bottom: 3rem;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ContactInfo = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
`

const InfoTitle = styled.h3`
  color: ${COLORS.primary};
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`

const InfoItem = styled.div`
  margin: 1rem 0;
  line-height: 1.6;
  
  strong {
    color: ${COLORS.dark};
  }
`

const ContactForm = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
`

const Button = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${COLORS.secondary};
  }
`

const RatingSection = styled.div`
  background: ${COLORS.success}10;
  border: 1px solid ${COLORS.success}30;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
`

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  
  span {
    color: #FFD700;
    font-size: 1.5rem;
  }
`

const RatingText = styled.p`
  color: ${COLORS.dark};
  font-size: 0.9rem;
  margin: 0;
`

const BusinessHours = styled.div`
  background: #f0f4f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
`

const HoursTitle = styled.h4`
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  font-size: 1.1rem;
`

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  font-size: 0.95rem;
  
  strong {
    color: ${COLORS.dark};
  }
`

const EmergencyInfo = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    fill: #f39c12;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${COLORS.dark};
  }
`

export function CityContact({ city, language, templateData, pathname }) {
  const { t } = useTranslation('cities')
  
  // Get current path for language detection - use pathname prop during SSR
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : (pathname || '/')
  // Use URL-based language detection instead of prop
  const actualLanguage = getLanguageFromPath(currentPath)
  
  const title = t('cityPage.contact.title', templateData)
  const subtitle = t('cityPage.contact.subtitle')
  
  // Get real contact information
  const napInfo = getNapInfo(actualLanguage)
  
  const contactInfo = {
    workshop: t('cityPage.contact.info.workshop'),
    workshopAddress: napInfo.address.full,
    phone: napInfo.phoneFormatted,
    serviceArea: t('cityPage.contact.info.serviceArea'),
    travelTime: t('cityPage.contact.info.travelTime', templateData),
    freeDelivery: t('cityPage.contact.info.freeDelivery', templateData)
  }
  
  const handleContactClick = () => {
    const contactPath = actualLanguage === 'en' ? '/en/contact/' : '/contact/'
    navigate(contactPath)
  }

  return (
    <ContactSection id="city-contact">
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        
        <ContactGrid>
          <ContactInfo>
            <InfoTitle>{contactInfo.workshop}</InfoTitle>
            <InfoItem>
              <strong>{actualLanguage === 'pl' ? 'Adres:' : 'Address:'}</strong><br/>
              <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: COLORS.primary, 
                  textDecoration: 'none',
                  borderBottom: `1px dotted ${COLORS.primary}`
                }}
              >
                {contactInfo.workshopAddress}
              </a>
            </InfoItem>
            <InfoItem>
              <strong>{actualLanguage === 'pl' ? 'Telefon:' : 'Phone:'}</strong><br/>
              <a href={`tel:${napInfo.phone.replace(/\s/g, '')}`} style={{ color: COLORS.primary, textDecoration: 'none' }}>
                {contactInfo.phone}
              </a>
            </InfoItem>
            <InfoItem>
              <strong>{contactInfo.serviceArea}</strong><br/>
              {city.name[actualLanguage]} {actualLanguage === 'pl' ? 'i okolice' : 'and surroundings'}
            </InfoItem>
            <InfoItem>
              {contactInfo.travelTime}
            </InfoItem>
            {city.freeDelivery && (
              <InfoItem style={{ color: COLORS.success, fontWeight: '600' }}>
                ✅ {actualLanguage === 'pl' ? 'Bezpłatny transport' : 'Free delivery'}
              </InfoItem>
            )}
            
            <BusinessHours>
              <HoursTitle>{actualLanguage === 'pl' ? 'Godziny otwarcia:' : 'Business hours:'}</HoursTitle>
              <HoursGrid>
                <strong>{actualLanguage === 'pl' ? 'Pon-Pt:' : 'Mon-Fri:'}</strong>
                <span>7:30 - 16:00</span>
                <strong>{actualLanguage === 'pl' ? 'Sobota:' : 'Saturday:'}</strong>
                <span>9:00 - 15:00</span>
                <strong>{actualLanguage === 'pl' ? 'Niedziela:' : 'Sunday:'}</strong>
                <span>{actualLanguage === 'pl' ? 'Zamknięte' : 'Closed'}</span>
              </HoursGrid>
            </BusinessHours>
            
            <EmergencyInfo>
              <svg viewBox="0 0 24 24">
                <path d="M10 3h4v2h-4V3m0 18h4v-2h-4v2m2-16c1.11 0 2 .89 2 2s-.89 2-2 2-2-.89-2-2 .89-2 2-2m0 4c1.11 0 2 .89 2 2s-.89 2-2 2-2-.89-2-2 .89-2 2-2m0 4c1.11 0 2 .89 2 2s-.89 2-2 2-2-.89-2-2 .89-2 2-2z"/>
              </svg>
              <p>
                {actualLanguage === 'pl' 
                  ? 'Naprawy awaryjne 24/7 w promieniu 50km' 
                  : '24/7 emergency repairs within 50km radius'}
              </p>
            </EmergencyInfo>
          </ContactInfo>
          
          <ContactForm>
            <InfoTitle>
              {actualLanguage === 'pl' ? 'Formularz kontaktowy' : 'Contact form'}
            </InfoTitle>
            <p style={{ color: COLORS.textSecondary, marginBottom: '1.5rem' }}>
              {actualLanguage === 'pl' 
                ? `Skontaktuj się z nami, aby omówić projekt w ${templateData.city}`
                : `Contact us to discuss your project in ${templateData.city}`
              }
            </p>
            <Button onClick={handleContactClick}>
              {actualLanguage === 'pl' ? 'Przejdź do formularza' : 'Go to contact form'}
            </Button>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  )
}