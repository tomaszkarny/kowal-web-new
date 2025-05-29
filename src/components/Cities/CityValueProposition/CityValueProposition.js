import React from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { THEME } from 'consts/theme'
import { FREE_DELIVERY_RADIUS } from 'utils/cityDistanceCalculator'

const Section = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${THEME.color.dark.replace(';', '')};
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${THEME.color.darkGray};
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${THEME.color.primary}20;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 32px;
    height: 32px;
    fill: ${THEME.color.primary};
  }
`

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${THEME.color.dark.replace(';', '')};
  margin-bottom: 1rem;
`

const CardContent = styled.div`
  color: ${THEME.color.darkGray};
  line-height: 1.8;
`

const ProcessSection = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
`

const ProcessTitle = styled.h3`
  font-size: 1.8rem;
  color: ${THEME.color.dark.replace(';', '')};
  text-align: center;
  margin-bottom: 3rem;
`

const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`

const ProcessStep = styled.div`
  text-align: center;
  flex: 1;
  position: relative;
  
  &:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -30px;
    top: 30px;
    font-size: 2rem;
    color: ${THEME.color.primary};
    
    @media (max-width: 768px) {
      content: '↓';
      right: auto;
      top: auto;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: ${THEME.color.primary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
`

const StepTitle = styled.h4`
  font-size: 1.2rem;
  color: ${THEME.color.dark.replace(';', '')};
  margin-bottom: 0.5rem;
`

const StepDescription = styled.p`
  font-size: 0.9rem;
  color: ${THEME.color.darkGray};
  max-width: 150px;
  margin: 0 auto;
`

const GuaranteesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`

const GuaranteeItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  &::before {
    content: '✓';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: #00b894;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const DeliveryInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1rem;
`

const DeliveryItem = styled.div`
  flex: 1;
  min-width: 200px;
  
  strong {
    color: ${THEME.color.primary};
    display: block;
    margin-bottom: 0.25rem;
  }
`

export function CityValueProposition({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  
  // Calculate delivery cost
  const isFreeDelivery = city.distance <= FREE_DELIVERY_RADIUS
  const deliveryCost = isFreeDelivery ? 0 : Math.round((city.distance - FREE_DELIVERY_RADIUS) * 2.5)
  
  const deliveryIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M19 7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S8 3.34 8 5H5c-1.1 0-2 .9-2 2 0 .55.22 1.05.59 1.42L9 13.83V22h6v-8.17l5.42-5.41c.36-.37.58-.87.58-1.42zM11 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 15h-2v-5h2v5zm1.17-7H9.83L5.23 7.4c-.06-.06-.13-.17-.15-.21-.05-.11-.08-.24-.08-.19h14c0 .05-.03.08-.08.19-.02.04-.09.15-.15.21L14.17 12z"/>
    </svg>
  )
  
  const processIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )
  
  const qualityIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  )
  
  const radiusIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
  
  const title = language === 'pl'
    ? `Dlaczego warto wybrać nas w ${city.name[language]}`
    : `Why choose us in ${city.name[language]}`
  
  const subtitle = language === 'pl'
    ? 'Profesjonalne usługi kowalskie z gwarancją jakości'
    : 'Professional blacksmithing services with quality guarantee'
  
  return (
    <Section>
      <Container>
        <SectionTitle>{title}</SectionTitle>
        <SectionSubtitle>{subtitle}</SectionSubtitle>
        
        <Grid>
          <Card>
            <CardIcon>{deliveryIcon}</CardIcon>
            <CardTitle>
              {language === 'pl' ? 'Dostawa i montaż' : 'Delivery and installation'}
            </CardTitle>
            <CardContent>
              <DeliveryInfo>
                <DeliveryItem>
                  <strong>{language === 'pl' ? 'Koszt dostawy:' : 'Delivery cost:'}</strong>
                  {isFreeDelivery 
                    ? (language === 'pl' ? 'GRATIS' : 'FREE') 
                    : `${deliveryCost} zł`}
                </DeliveryItem>
                <DeliveryItem>
                  <strong>{language === 'pl' ? 'Czas dojazdu:' : 'Travel time:'}</strong>
                  {city.travelTime[language]}
                </DeliveryItem>
              </DeliveryInfo>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                {language === 'pl' 
                  ? `Darmowa dostawa w promieniu ${FREE_DELIVERY_RADIUS} km. Powyżej - 2,5 zł/km.`
                  : `Free delivery within ${FREE_DELIVERY_RADIUS} km. Beyond - 2.5 PLN/km.`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardIcon>{qualityIcon}</CardIcon>
            <CardTitle>
              {language === 'pl' ? 'Gwarancja jakości' : 'Quality guarantee'}
            </CardTitle>
            <CardContent>
              <GuaranteesList>
                <GuaranteeItem>
                  {language === 'pl' ? '5 lat gwarancji' : '5-year warranty'}
                </GuaranteeItem>
                <GuaranteeItem>
                  {language === 'pl' ? 'Stal premium' : 'Premium steel'}
                </GuaranteeItem>
                <GuaranteeItem>
                  {language === 'pl' ? 'Certyfikaty jakości' : 'Quality certificates'}
                </GuaranteeItem>
                <GuaranteeItem>
                  {language === 'pl' ? 'Profesjonalne wykonanie' : 'Professional craftsmanship'}
                </GuaranteeItem>
              </GuaranteesList>
            </CardContent>
          </Card>
          
          <Card>
            <CardIcon>{radiusIcon}</CardIcon>
            <CardTitle>
              {language === 'pl' ? 'Zasięg obsługi' : 'Service area'}
            </CardTitle>
            <CardContent>
              <p>
                {language === 'pl' 
                  ? `Obsługujemy obszar w promieniu ${city.serviceArea.radius} km od ${city.name[language]}.`
                  : `We serve an area within ${city.serviceArea.radius} km radius from ${city.name[language]}.`}
              </p>
              <p style={{ marginTop: '1rem' }}>
                {language === 'pl'
                  ? 'Wszystkie dzielnice i okoliczne miejscowości.'
                  : 'All districts and surrounding localities.'}
              </p>
            </CardContent>
          </Card>
        </Grid>
        
        <ProcessSection>
          <ProcessTitle>
            {language === 'pl' ? 'Proces realizacji' : 'Implementation process'}
          </ProcessTitle>
          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepTitle>{language === 'pl' ? 'Konsultacja' : 'Consultation'}</StepTitle>
              <StepDescription>
                {language === 'pl' 
                  ? 'Bezpłatna wycena i doradztwo'
                  : 'Free quote and consultation'}
              </StepDescription>
            </ProcessStep>
            
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepTitle>{language === 'pl' ? 'Projekt' : 'Design'}</StepTitle>
              <StepDescription>
                {language === 'pl'
                  ? 'Indywidualny projekt i wizualizacja'
                  : 'Custom design and visualization'}
              </StepDescription>
            </ProcessStep>
            
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepTitle>{language === 'pl' ? 'Produkcja' : 'Production'}</StepTitle>
              <StepDescription>
                {language === 'pl'
                  ? 'Wykonanie w naszym warsztacie'
                  : 'Manufacturing in our workshop'}
              </StepDescription>
            </ProcessStep>
            
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepTitle>{language === 'pl' ? 'Montaż' : 'Installation'}</StepTitle>
              <StepDescription>
                {language === 'pl'
                  ? 'Profesjonalny montaż u klienta'
                  : 'Professional on-site installation'}
              </StepDescription>
            </ProcessStep>
          </ProcessSteps>
        </ProcessSection>
        
        <Card>
          <CardIcon>{processIcon}</CardIcon>
          <CardTitle>
            {language === 'pl' ? 'Dlaczego my?' : 'Why us?'}
          </CardTitle>
          <CardContent>
            <GuaranteesList>
              <GuaranteeItem>
                {language === 'pl' 
                  ? 'Materiały najwyższej jakości - stal S235, S355'
                  : 'Highest quality materials - S235, S355 steel'}
              </GuaranteeItem>
              <GuaranteeItem>
                {language === 'pl'
                  ? '30 lat doświadczenia w kowalstwie artystycznym'
                  : '30 years of experience in artistic blacksmithing'}
              </GuaranteeItem>
              <GuaranteeItem>
                {language === 'pl'
                  ? 'Bezpłatna wycena i projekt koncepcyjny'
                  : 'Free quote and conceptual design'}
              </GuaranteeItem>
              <GuaranteeItem>
                {language === 'pl'
                  ? 'Kompleksowa dokumentacja techniczna'
                  : 'Comprehensive technical documentation'}
              </GuaranteeItem>
              <GuaranteeItem>
                {language === 'pl'
                  ? 'Serwis pogwarancyjny i konserwacja'
                  : 'Post-warranty service and maintenance'}
              </GuaranteeItem>
              <GuaranteeItem>
                {language === 'pl'
                  ? 'Terminowość i profesjonalizm'
                  : 'Timeliness and professionalism'}
              </GuaranteeItem>
            </GuaranteesList>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}