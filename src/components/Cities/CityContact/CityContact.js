import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'
import { getNapInfo, GOOGLE_MAPS_URL } from 'consts/contactDetails'
import { buildLanguagePath } from 'consts/languageConfig'
import { useActualLanguage } from 'hooks/useActualLanguage'
import { CityCtaButton } from 'components/Cities/CtaButton'
import {
  FORGE_COLORS,
  CitySection,
  CityContainer,
  CityTitle,
  CitySubtitle,
  CityInfoBox,
  CityInfoTitle,
  CityCard,
} from '../styles'
import {
  ContactGrid,
  InfoItem,
  BusinessHours,
  HoursTitle,
  HoursGrid,
  EmergencyInfo,
} from './CityContact.styles'

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
