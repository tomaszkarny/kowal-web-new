import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import { getNapInfo, GOOGLE_MAPS_URL } from 'consts/contactDetails'
import { buildLanguagePath } from 'consts/languageConfig'
import { useActualLanguage } from 'hooks/useActualLanguage'
import { CityCtaButton } from 'components/Cities/CtaButton'
import {
  FORGE_COLORS,
  FORGE_RADIUS,
  CitySection,
  CityContainer,
  CityTitle,
  CitySubtitle,
  CityInfoBox,
  CityInfoTitle,
  CityCard,
} from '../styles'

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const InfoItem = styled.div`
  margin: 1rem 0;
  line-height: 1.6;

  strong {
    color: ${FORGE_COLORS.iron};
  }

  a {
    color: ${FORGE_COLORS.ember};
    text-decoration: none;
    border-bottom: 1px dotted ${FORGE_COLORS.ember};
  }
`

const RatingSection = styled.div`
  background: ${FORGE_COLORS.success}10;
  border: 1px solid ${FORGE_COLORS.success}30;
  padding: 1.5rem;
  border-radius: ${FORGE_RADIUS.tag};
  margin-bottom: 1.5rem;
  text-align: center;
`

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;

  span {
    color: #ffd700;
    font-size: 1.5rem;
  }
`

const BusinessHours = styled.div`
  background: ${FORGE_COLORS.white};
  padding: 1.5rem;
  border-radius: ${FORGE_RADIUS.tag};
  margin-top: 1.5rem;
  border: 1px solid ${FORGE_COLORS.cardBorder};
`

const HoursTitle = styled.h4`
  color: ${FORGE_COLORS.iron};
  margin-bottom: 1rem;
  font-size: 1.1rem;
`

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  font-size: 0.95rem;

  strong {
    color: ${FORGE_COLORS.iron};
  }
`

const EmergencyInfo = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 1rem;
  border-radius: ${FORGE_RADIUS.tag};
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    fill: ${FORGE_COLORS.ember};
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${FORGE_COLORS.iron};
  }
`

export function CityContact({ city, language, templateData, pathname }) {
  const { t } = useTranslation('cities')
  const actualLanguage = useActualLanguage(pathname)

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
    freeDelivery: t('cityPage.contact.info.freeDelivery', templateData),
  }

  const handleContactClick = () => {
    const contactPath = buildLanguagePath('/contact/', actualLanguage)
    navigate(contactPath)
  }

  return (
    <CitySection $bg={FORGE_COLORS.white} id="city-contact">
      <CityContainer>
        <CityTitle $size="lg">{title}</CityTitle>
        <CitySubtitle>{subtitle}</CitySubtitle>

        <ContactGrid>
          <CityInfoBox>
            <CityInfoTitle>{contactInfo.workshop}</CityInfoTitle>
            <InfoItem>
              <strong>
                {t('cityPage.contact.labels.address')}
              </strong>
              <br />
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactInfo.workshopAddress}
              </a>
            </InfoItem>
            <InfoItem>
              <strong>
                {t('cityPage.contact.labels.phone')}
              </strong>
              <br />
              <a href={`tel:${napInfo.phone.replace(/\s/g, '')}`}>
                {contactInfo.phone}
              </a>
            </InfoItem>
            <InfoItem>
              <strong>{contactInfo.serviceArea}</strong>
              <br />
              {city.name[actualLanguage]}{' '}
              {t('cityPage.contact.labels.surroundings')}
            </InfoItem>
            <InfoItem>{contactInfo.travelTime}</InfoItem>
            {city.freeDelivery && (
              <InfoItem style={{ color: FORGE_COLORS.success, fontWeight: '600' }}>
                {t('cityPage.contact.freeTransport')}
              </InfoItem>
            )}

            <BusinessHours>
              <HoursTitle>
                {t('cityPage.contact.businessHours.title')}
              </HoursTitle>
              <HoursGrid>
                <strong>{t('cityPage.contact.businessHours.monFri')}</strong>
                <span>7:30 - 16:00</span>
                <strong>{t('cityPage.contact.businessHours.saturday')}</strong>
                <span>9:00 - 15:00</span>
                <strong>
                  {t('cityPage.contact.businessHours.sunday')}
                </strong>
                <span>{t('cityPage.contact.businessHours.closed')}</span>
              </HoursGrid>
            </BusinessHours>

            <EmergencyInfo>
              <svg viewBox="0 0 24 24">
                <path d="M10 3h4v2h-4V3m0 18h4v-2h-4v2m2-16c1.11 0 2 .89 2 2s-.89 2-2 2-2-.89-2-2 .89-2 2-2m0 4c1.11 0 2 .89 2 2s-.89 2-2 2-2-.89-2-2 .89-2 2-2m0 4c1.11 0 2 .89 2 2s-.89 2-2 2-2-.89-2-2 .89-2 2-2z" />
              </svg>
              <p>
                {t('cityPage.contact.emergencyRepairs')}
              </p>
            </EmergencyInfo>
          </CityInfoBox>

          <CityCard>
            <CityInfoTitle>
              {t('cityPage.contact.formSection.title')}
            </CityInfoTitle>
            <p style={{ color: FORGE_COLORS.textSecondary, marginBottom: '1.5rem' }}>
              {t('cityPage.contact.formSection.description', templateData)}
            </p>
            <CityCtaButton onClick={handleContactClick}>
              {t('cityPage.contact.formSection.buttonText')}
            </CityCtaButton>
          </CityCard>
        </ContactGrid>
      </CityContainer>
    </CitySection>
  )
}
