import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Layout } from 'components/Layout/Layout'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { ProductSchema } from 'components/SEO/ProductSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { THEME } from 'consts/theme'
import { WEBSITE_URL, PHONE_NUMBER } from 'consts/contactDetails'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  background: '#f8f9fa',
  white: '#ffffff'
}

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.primary} 100%);
  color: ${COLORS.white};
  padding: 5rem 0;
  text-align: center;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const CTAButton = styled.a`
  display: inline-block;
  background: ${COLORS.white};
  color: ${COLORS.primary};
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`

const ContentSection = styled.section`
  padding: 4rem 0;
  background: ${COLORS.white};
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.dark};
  text-align: center;
  margin-bottom: 3rem;
  font-weight: bold;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${COLORS.primary};
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
`

const FeatureText = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
`

const ProcessSection = styled.section`
  padding: 4rem 0;
  background: ${COLORS.background};
`

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const ProcessStep = styled.div`
  text-align: center;
  position: relative;
`

const StepNumber = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  background: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 60px;
  margin-bottom: 1rem;
`

const StepTitle = styled.h4`
  font-size: 1.2rem;
  color: ${COLORS.dark};
  margin-bottom: 0.5rem;
`

const StepDescription = styled.p`
  color: ${COLORS.textSecondary};
  font-size: 0.95rem;
`

function OgrodzeniaNaZamowieniePage() {
  const faqData = [
    {
      question: "Ile kosztują ogrodzenia na zamówienie?",
      answer: "Cena ogrodzeń na zamówienie zależy od długości, wysokości i złożoności wzoru. Podstawowe ogrodzenia kute zaczynają się od 250 zł/mb, bardziej ozdobne od 400-800 zł/mb. Oferujemy darmową wycenę."
    },
    {
      question: "Jak długo trwa wykonanie ogrodzenia na zamówienie?",
      answer: "Standardowy czas realizacji to 2-4 tygodnie od zatwierdzenia projektu. Dla większych zamówień (powyżej 50mb) czas może się wydłużyć do 6 tygodni."
    },
    {
      question: "Czy oferujecie montaż ogrodzeń?",
      answer: "Tak, zapewniamy profesjonalny montaż wszystkich naszych ogrodzeń. Nasza ekipa montażowa działa na terenie całej Polski."
    },
    {
      question: "Jakie wzory ogrodzeń są dostępne?",
      answer: "Oferujemy szeroki wybór wzorów: klasyczne, nowoczesne, secesyjne, geometryczne oraz projekty indywidualne według Państwa pomysłu."
    },
    {
      question: "Czy ogrodzenia są zabezpieczone przed korozją?",
      answer: "Wszystkie nasze ogrodzenia są cynkowane ogniowo i malowane proszkowo, co zapewnia ochronę przed korozją na wiele lat. Udzielamy 5-letniej gwarancji."
    }
  ]

  return (
    <Layout>
      <HeroSection>
        <Container>
          <HeroTitle>Ogrodzenia na Zamówienie</HeroTitle>
          <HeroSubtitle>Projektujemy i wykonujemy ekskluzywne ogrodzenia kute</HeroSubtitle>
          <CTAButton href="/contact">Zamów Darmową Wycenę</CTAButton>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>Dlaczego Nasze Ogrodzenia?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🏆</FeatureIcon>
              <FeatureTitle>Najwyższa Jakość</FeatureTitle>
              <FeatureText>
                Używamy tylko najlepszej stali i sprawdzonych technik kowalskich. 
                Każde ogrodzenie jest starannie wykonane i zabezpieczone antykorozyjnie.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>✏️</FeatureIcon>
              <FeatureTitle>Indywidualne Projekty</FeatureTitle>
              <FeatureText>
                Tworzymy ogrodzenia według Twoich potrzeb i gustu. 
                Od klasycznych wzorów po nowoczesne, minimalistyczne formy.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>5 Lat Gwarancji</FeatureTitle>
              <FeatureText>
                Jesteśmy pewni jakości naszych ogrodzeń, dlatego udzielamy 
                5-letniej gwarancji na wszystkie wykonane prace.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>

          <SectionTitle>Rodzaje Ogrodzeń</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureTitle>Ogrodzenia Klasyczne</FeatureTitle>
              <FeatureText>
                Eleganckie wzory inspirowane tradycyjnym kowalstwem. 
                Idealne do zabytkowych budynków i klasycznych rezydencji.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Ogrodzenia Nowoczesne</FeatureTitle>
              <FeatureText>
                Minimalistyczne, geometryczne formy dla współczesnej architektury. 
                Proste linie i funkcjonalność.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Ogrodzenia Ozdobne</FeatureTitle>
              <FeatureText>
                Bogato zdobione ogrodzenia z motywami roślinnymi, 
                zwierzęcymi lub abstrakcyjnymi wzorami.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </ContentSection>

      <ProcessSection>
        <Container>
          <SectionTitle>Jak Zamawiać Ogrodzenie?</SectionTitle>
          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepTitle>Kontakt i Konsultacja</StepTitle>
              <StepDescription>
                Skontaktuj się z nami telefonicznie lub przez formularz. 
                Omówimy Twoje potrzeby i zaproponujemy rozwiązania.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepTitle>Pomiary i Wycena</StepTitle>
              <StepDescription>
                Przyjedziemy na miejsce, wykonamy dokładne pomiary 
                i przygotujemy szczegółową wycenę.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepTitle>Projekt i Akceptacja</StepTitle>
              <StepDescription>
                Przygotujemy projekt ogrodzenia. Po Twojej akceptacji 
                rozpoczynamy produkcję.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepTitle>Produkcja</StepTitle>
              <StepDescription>
                W naszym warsztacie wykonujemy ogrodzenie zgodnie 
                z zatwierdzonym projektem.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>5</StepNumber>
              <StepTitle>Montaż</StepTitle>
              <StepDescription>
                Nasza ekipa montażowa zainstaluje ogrodzenie 
                na Twojej posesji.
              </StepDescription>
            </ProcessStep>
          </ProcessSteps>
        </Container>
      </ProcessSection>

      <ContentSection>
        <Container>
          <SectionTitle>Skontaktuj się z Nami</SectionTitle>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: COLORS.textSecondary }}>
            <p>Zapraszamy do kontaktu w celu omówienia szczegółów Twojego projektu.</p>
            <p>Przygotujemy indywidualną wycenę dostosowaną do Twoich potrzeb.</p>
            <p style={{ fontSize: '2rem', color: COLORS.primary, fontWeight: 'bold', margin: '2rem 0' }}>
              📞 {PHONE_NUMBER}
            </p>
            <p>Pracujemy: Pon-Pt 7:30-16:00, Sob 9:00-15:00</p>
            <CTAButton href="/contact" style={{ marginTop: '2rem' }}>Formularz Kontaktowy</CTAButton>
          </div>
        </Container>
      </ContentSection>
    </Layout>
  )
}

export default OgrodzeniaNaZamowieniePage

export function Head({ location }) {
  const language = 'pl'
  
  return (
    <>
      <EnhancedSEO
        title="Ogrodzenia na Zamówienie - Kowal Białystok | Cała Polska"
        description="Ogrodzenia na zamówienie ⭐ Projektowanie i wykonanie ogrodzeń kutych. Najlepszy kowal w Polsce. 5 lat gwarancji ✓ Darmowa wycena ☎ 604 253 145"
        pathname={location.pathname}
        pageType="service"
        language={language}
        noindex={false}
      />
      
      <ProductSchema 
        language={language}
        cityName="Białystok"
      />
      
      <BreadcrumbSchema 
        breadcrumbs={[
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Strona główna",
            "item": WEBSITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Usługi",
            "item": `${WEBSITE_URL}/uslugi`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Ogrodzenia na Zamówienie",
            "item": `${WEBSITE_URL}${location.pathname}`
          }
        ]}
        pathname={location.pathname}
        language={language}
      />
      
      <FAQSchema 
        faqData={[
          {
            question: "Ile kosztują ogrodzenia na zamówienie?",
            answer: "Cena ogrodzeń na zamówienie zależy od długości, wysokości i złożoności wzoru. Podstawowe ogrodzenia kute zaczynają się od 250 zł/mb, bardziej ozdobne od 400-800 zł/mb. Oferujemy darmową wycenę."
          },
          {
            question: "Jak długo trwa wykonanie ogrodzenia na zamówienie?",
            answer: "Standardowy czas realizacji to 2-4 tygodnie od zatwierdzenia projektu. Dla większych zamówień (powyżej 50mb) czas może się wydłużyć do 6 tygodni."
          },
          {
            question: "Czy oferujecie montaż ogrodzeń?",
            answer: "Tak, zapewniamy profesjonalny montaż wszystkich naszych ogrodzeń. Nasza ekipa montażowa działa na terenie całej Polski."
          },
          {
            question: "Jakie wzory ogrodzeń są dostępne?",
            answer: "Oferujemy szeroki wybór wzorów: klasyczne, nowoczesne, secesyjne, geometryczne oraz projekty indywidualne według Państwa pomysłu."
          },
          {
            question: "Czy ogrodzenia są zabezpieczone przed korozją?",
            answer: "Wszystkie nasze ogrodzenia są cynkowane ogniowo i malowane proszkowo, co zapewnia ochronę przed korozją na wiele lat. Udzielamy 5-letniej gwarancji."
          }
        ]}
        pathname={location.pathname}
        language={language}
      />
    </>
  )
}

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`