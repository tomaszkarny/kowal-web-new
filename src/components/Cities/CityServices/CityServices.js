import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { 
  ServicesSection,
  ServicesContainer,
  ServicesHeader,
  ServicesTitle,
  ServicesSubtitle,
  DeliveryInfo,
  DeliveryItem,
  ServicesGrid,
  ServiceCard,
  ServiceTitle,
  ServiceDescription
} from './CityServices.styles'

export function CityServices({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  const servicesTitle = t('cityPage.services.title', templateData)
  const servicesSubtitle = t('cityPage.services.subtitle')
  const services = t('cityPage.services.items', { returnObjects: true })
  
  const deliveryInfo = {
    title: t('cityPage.services.delivery.title'),
    free: t('cityPage.services.delivery.free', templateData),
    paid: t('cityPage.services.delivery.paid', templateData),
    time: t('cityPage.services.delivery.time', templateData)
  }

  const isFreeDelivery = city.freeDelivery

  return (
    <ServicesSection>
      <ServicesContainer>
        <ServicesHeader>
          <ServicesTitle>{servicesTitle}</ServicesTitle>
          <ServicesSubtitle>{servicesSubtitle}</ServicesSubtitle>
        </ServicesHeader>

        <DeliveryInfo>
          <h3>{deliveryInfo.title}</h3>
          <DeliveryItem isHighlighted={isFreeDelivery}>
            {isFreeDelivery ? deliveryInfo.free : deliveryInfo.paid}
          </DeliveryItem>
          <DeliveryItem>
            {deliveryInfo.time}
          </DeliveryItem>
        </DeliveryInfo>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription 
                dangerouslySetInnerHTML={{ 
                  __html: service.description.replace('{{city}}', templateData.city)
                }}
              />
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContainer>
    </ServicesSection>
  )
}