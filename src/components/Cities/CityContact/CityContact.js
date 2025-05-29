import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'
import { getNapInfo } from 'consts/contactDetails'

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

export function CityContact({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  const title = t('cityPage.contact.title', templateData)
  const subtitle = t('cityPage.contact.subtitle')
  
  // Get real contact information
  const napInfo = getNapInfo(language)
  
  const contactInfo = {
    workshop: t('cityPage.contact.info.workshop'),
    workshopAddress: napInfo.address.full,
    phone: napInfo.phoneFormatted,
    serviceArea: t('cityPage.contact.info.serviceArea'),
    travelTime: t('cityPage.contact.info.travelTime', templateData),
    freeDelivery: t('cityPage.contact.info.freeDelivery', templateData)
  }
  
  const handleContactClick = () => {
    navigate(language === 'pl' ? '/contact' : '/en/contact')
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
              <strong>{language === 'pl' ? 'Adres:' : 'Address:'}</strong><br/>
              {contactInfo.workshopAddress}
            </InfoItem>
            <InfoItem>
              <strong>{language === 'pl' ? 'Telefon:' : 'Phone:'}</strong><br/>
              <a href={`tel:${napInfo.phone.replace(/\s/g, '')}`} style={{ color: COLORS.primary, textDecoration: 'none' }}>
                {contactInfo.phone}
              </a>
            </InfoItem>
            <InfoItem>
              <strong>{contactInfo.serviceArea}</strong><br/>
              {city.name[language]} {language === 'pl' ? 'i okolice' : 'and surroundings'}
            </InfoItem>
            <InfoItem>
              {contactInfo.travelTime}
            </InfoItem>
            {city.freeDelivery && (
              <InfoItem style={{ color: COLORS.success, fontWeight: '600' }}>
                ✅ {language === 'pl' ? 'Bezpłatny transport' : 'Free delivery'}
              </InfoItem>
            )}
          </ContactInfo>
          
          <ContactForm>
            <InfoTitle>
              {language === 'pl' ? 'Formularz kontaktowy' : 'Contact form'}
            </InfoTitle>
            <p style={{ color: COLORS.textSecondary, marginBottom: '1.5rem' }}>
              {language === 'pl' 
                ? `Skontaktuj się z nami, aby omówić projekt w ${templateData.city}`
                : `Contact us to discuss your project in ${templateData.city}`
              }
            </p>
            <Button onClick={handleContactClick}>
              {language === 'pl' ? 'Przejdź do formularza' : 'Go to contact form'}
            </Button>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  )
}