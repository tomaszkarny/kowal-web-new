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
  background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.dark} 100%);
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

const GateTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
`

const GateTypeCard = styled.div`
  background: ${COLORS.background};
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`

const GateTypeTitle = styled.h3`
  font-size: 1.8rem;
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  font-weight: bold;
`

const GateTypeDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const GateFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`

const FeatureItem = styled.li`
  color: ${COLORS.textSecondary};
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${COLORS.primary};
    font-weight: bold;
  }
`

const AdvantagesSection = styled.section`
  padding: 4rem 0;
  background: ${COLORS.background};
`

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const AdvantageCard = styled.div`
  text-align: center;
`

const AdvantageIcon = styled.div`
  font-size: 3rem;
  color: ${COLORS.primary};
  margin-bottom: 1rem;
`

const AdvantageTitle = styled.h4`
  font-size: 1.3rem;
  color: ${COLORS.dark};
  margin-bottom: 0.5rem;
`

const AdvantageText = styled.p`
  color: ${COLORS.textSecondary};
  font-size: 0.95rem;
`


function BramyKuteNaZamowieniePage() {
  return (
    <Layout>
      <HeroSection>
        <Container>
          <HeroTitle>Bramy Kute na Zamówienie</HeroTitle>
          <HeroSubtitle>Ekskluzywne bramy wjazdowe - projekt, wykonanie, montaż</HeroSubtitle>
          <CTAButton href="/contact">Zapytaj o Wycenę</CTAButton>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>Rodzaje Bram Kutych</SectionTitle>
          <GateTypesGrid>
            <GateTypeCard>
              <GateTypeTitle>Bramy Dwuskrzydłowe</GateTypeTitle>
              <GateTypeDescription>
                Klasyczne rozwiązanie dla eleganckich posesji. 
                Bramy dwuskrzydłowe łączą funkcjonalność z pięknem.
              </GateTypeDescription>
              <GateFeatures>
                <FeatureItem>Szerokość do 6 metrów</FeatureItem>
                <FeatureItem>Automatyka Nice lub FAAC</FeatureItem>
                <FeatureItem>Różnorodne wzory</FeatureItem>
                <FeatureItem>Możliwość dodania furtki</FeatureItem>
              </GateFeatures>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>Bramy Przesuwne</GateTypeTitle>
              <GateTypeDescription>
                Idealne rozwiązanie dla wąskich podjazdów. 
                Oszczędność miejsca i wygoda użytkowania.
              </GateTypeDescription>
              <GateFeatures>
                <FeatureItem>Szerokość do 8 metrów</FeatureItem>
                <FeatureItem>Cicha praca automatyki</FeatureItem>
                <FeatureItem>Samonośna konstrukcja</FeatureItem>
                <FeatureItem>Fotokomórki bezpieczeństwa</FeatureItem>
              </GateFeatures>
            </GateTypeCard>
          </GateTypesGrid>

          <SectionTitle>Style i Wzory</SectionTitle>
          <GateTypesGrid>
            <GateTypeCard>
              <GateTypeTitle>Styl Klasyczny</GateTypeTitle>
              <GateTypeDescription>
                Ponadczasowa elegancja z elementami tradycyjnego kowalstwa. 
                Idealne do zabytkowych i klasycznych budynków.
              </GateTypeDescription>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>Styl Nowoczesny</GateTypeTitle>
              <GateTypeDescription>
                Minimalistyczne formy, geometryczne wzory. 
                Doskonałe do współczesnej architektury.
              </GateTypeDescription>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>Styl Secesyjny</GateTypeTitle>
              <GateTypeDescription>
                Bogate zdobienia, motywy roślinne i organiczne kształty. 
                Dla miłośników sztuki i wyjątkowego designu.
              </GateTypeDescription>
            </GateTypeCard>
          </GateTypesGrid>
        </Container>
      </ContentSection>

      <AdvantagesSection>
        <Container>
          <SectionTitle>Dlaczego Warto Wybrać Nasze Bramy?</SectionTitle>
          <AdvantagesGrid>
            <AdvantageCard>
              <AdvantageIcon>🎨</AdvantageIcon>
              <AdvantageTitle>Indywidualny Projekt</AdvantageTitle>
              <AdvantageText>
                Każda brama projektowana jest specjalnie dla Ciebie
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🔧</AdvantageIcon>
              <AdvantageTitle>Profesjonalny Montaż</AdvantageTitle>
              <AdvantageText>
                Doświadczona ekipa montażowa w całej Polsce
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🛡️</AdvantageIcon>
              <AdvantageTitle>5 Lat Gwarancji</AdvantageTitle>
              <AdvantageText>
                Pewność jakości potwierdzona długą gwarancją
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🏆</AdvantageIcon>
              <AdvantageTitle>30 Lat Doświadczenia</AdvantageTitle>
              <AdvantageText>
                Setki zadowolonych klientów w całej Polsce
              </AdvantageText>
            </AdvantageCard>
          </AdvantagesGrid>
        </Container>
      </AdvantagesSection>

      <ContentSection>
        <Container>
          <SectionTitle>Skontaktuj się z Nami</SectionTitle>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: COLORS.textSecondary }}>
            <p>Zapraszamy do kontaktu w celu omówienia szczegółów Twojego projektu.</p>
            <p>Każda brama jest wyceniana indywidualnie w zależności od rozmiaru, wzoru i wyposażenia.</p>
            <p style={{ fontSize: '2rem', color: COLORS.primary, fontWeight: 'bold', margin: '2rem 0' }}>
              📞 {PHONE_NUMBER}
            </p>
            <p>Pracujemy: Pon-Pt 7:30-16:00, Sob 9:00-15:00</p>
            <p style={{ marginTop: '1rem' }}>Obsługujemy całą Polskę!</p>
            <CTAButton href="/contact" style={{ marginTop: '2rem' }}>Wypełnij Formularz</CTAButton>
          </div>
        </Container>
      </ContentSection>
    </Layout>
  )
}

export default BramyKuteNaZamowieniePage

export function Head({ location }) {
  const language = 'pl'
  
  const faqData = [
    {
      question: "Ile kosztuje brama kuta na zamówienie?",
      answer: "Cena bramy kutej zależy od rozmiaru, złożoności projektu oraz wybranego wzoru. Każda brama jest wyceniana indywidualnie. Oferujemy darmową wycenę po konsultacji i pomiarach na miejscu."
    },
    {
      question: "Jak długo trwa wykonanie bramy kutej?",
      answer: "Standardowy czas realizacji bramy kutej to 3-4 tygodnie od zatwierdzenia projektu. W sezonie letnim czas może się wydłużyć do 5-6 tygodni ze względu na większą ilość zamówień."
    },
    {
      question: "Czy montujecie automatykę do bram?",
      answer: "Tak, oferujemy kompleksową usługę - od projektu przez wykonanie bramy po montaż wraz z automatyką. Współpracujemy z renomowanymi producentami: Nice, FAAC, BFT."
    },
    {
      question: "Jakie wzory bram kutych oferujecie?",
      answer: "Oferujemy szeroki wybór wzorów: klasyczne, nowoczesne, secesyjne oraz projekty indywidualne. Możemy wykonać bramę według Państwa projektu lub zaproponować własne rozwiązania."
    },
    {
      question: "Czy bramy kute wymagają konserwacji?",
      answer: "Nasze bramy są cynkowane ogniowo i malowane proszkowo, co minimalizuje potrzebę konserwacji. Zalecamy przegląd techniczny raz w roku oraz odświeżanie powłoki malarskiej co 5-7 lat."
    }
  ]
  
  return (
    <>
      <EnhancedSEO
        title="Bramy Kute na Zamówienie - Dwuskrzydłowe, Przesuwne | Kowal"
        description="Bramy kute na zamówienie ⭐ Bramy dwuskrzydłowe i przesuwne. Projekt, wykonanie, montaż w całej Polsce. 30 lat doświadczenia ✓ Gwarancja 5 lat ✓ Darmowa wycena ☎ 604 253 145"
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
            "name": "Bramy Kute na Zamówienie",
            "item": `${WEBSITE_URL}${location.pathname}`
          }
        ]}
        pathname={location.pathname}
        language={language}
      />
      
      <FAQSchema 
        faqData={faqData}
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