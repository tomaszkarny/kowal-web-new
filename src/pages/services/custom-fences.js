import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
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

function OgrodzeniaNaZamowieniePage({ pageContext }) {
  const { t, i18n } = useTranslation(['services', 'common'])
  const language = pageContext?.i18n?.language || 'pl'
  
  const faqData = [
    {
      question: t('services:fences.faq.q1.question'),
      answer: t('services:fences.faq.q1.answer')
    },
    {
      question: t('services:fences.faq.q2.question'),
      answer: t('services:fences.faq.q2.answer')
    },
    {
      question: t('services:fences.faq.q3.question'),
      answer: t('services:fences.faq.q3.answer')
    },
    {
      question: t('services:fences.faq.q4.question'),
      answer: t('services:fences.faq.q4.answer')
    },
    {
      question: t('services:fences.faq.q5.question'),
      answer: t('services:fences.faq.q5.answer')
    }
  ]

  return (
    <Layout>
      <HeroSection>
        <Container>
          <HeroTitle>{t('services:fences.hero.title')}</HeroTitle>
          <HeroSubtitle>{t('services:fences.hero.subtitle')}</HeroSubtitle>
          <CTAButton href="/contact">{t('services:fences.hero.cta')}</CTAButton>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>{t('services:fences.why.title')}</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🏆</FeatureIcon>
              <FeatureTitle>{t('services:fences.why.quality.title')}</FeatureTitle>
              <FeatureText>
                {t('services:fences.why.quality.text')}
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>✏️</FeatureIcon>
              <FeatureTitle>{t('services:fences.why.design.title')}</FeatureTitle>
              <FeatureText>
                {t('services:fences.why.design.text')}
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>{t('services:fences.why.warranty.title')}</FeatureTitle>
              <FeatureText>
                {t('services:fences.why.warranty.text')}
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>

          <SectionTitle>{t('services:fences.types.title')}</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureTitle>{t('services:fences.types.classic.title')}</FeatureTitle>
              <FeatureText>
                {t('services:fences.types.classic.text')}
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>{t('services:fences.types.modern.title')}</FeatureTitle>
              <FeatureText>
                {t('services:fences.types.modern.text')}
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>{t('services:fences.types.decorative.title')}</FeatureTitle>
              <FeatureText>
                {t('services:fences.types.decorative.text')}
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </ContentSection>

      <ProcessSection>
        <Container>
          <SectionTitle>{t('services:fences.process.title')}</SectionTitle>
          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepTitle>{t('services:fences.process.step1.title')}</StepTitle>
              <StepDescription>
                {t('services:fences.process.step1.text')}
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepTitle>{t('services:fences.process.step2.title')}</StepTitle>
              <StepDescription>
                {t('services:fences.process.step2.text')}
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepTitle>{t('services:fences.process.step3.title')}</StepTitle>
              <StepDescription>
                {t('services:fences.process.step3.text')}
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepTitle>{t('services:fences.process.step4.title')}</StepTitle>
              <StepDescription>
                {t('services:fences.process.step4.text')}
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>5</StepNumber>
              <StepTitle>{t('services:fences.process.step5.title')}</StepTitle>
              <StepDescription>
                {t('services:fences.process.step5.text')}
              </StepDescription>
            </ProcessStep>
          </ProcessSteps>
        </Container>
      </ProcessSection>

      <ContentSection>
        <Container>
          <SectionTitle>{t('services:fences.contact.title')}</SectionTitle>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: COLORS.textSecondary }}>
            <p>{t('services:fences.contact.text1')}</p>
            <p>{t('services:fences.contact.text2')}</p>
            <p style={{ fontSize: '2rem', color: COLORS.primary, fontWeight: 'bold', margin: '2rem 0' }}>
              📞 {PHONE_NUMBER}
            </p>
            <p>{t('services:fences.contact.hours')}</p>
            <CTAButton href="/contact" style={{ marginTop: '2rem' }}>{t('services:fences.contact.cta')}</CTAButton>
          </div>
        </Container>
      </ContentSection>
    </Layout>
  )
}

export default OgrodzeniaNaZamowieniePage

export function Head({ location, pageContext }) {
  const language = pageContext?.i18n?.language || 'pl'
  const isEnglish = language === 'en'
  
  return (
    <>
      <EnhancedSEO
        title={isEnglish ? "Custom Wrought Iron Fences - Blacksmith Białystok | Poland" : "Ogrodzenia na Zamówienie - Kowal Białystok | Cała Polska"}
        description={isEnglish ? "Custom wrought iron fences ⭐ Design and manufacturing of wrought iron fences. Best blacksmith in Poland. 5 year warranty ✓ Free quote ☎ +48 604 253 145" : "Ogrodzenia na zamówienie ⭐ Projektowanie i wykonanie ogrodzeń kutych. Najlepszy kowal w Polsce. 5 lat gwarancji ✓ Darmowa wycena ☎ 604 253 145"}
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
            "name": isEnglish ? "Home" : "Strona główna",
            "item": WEBSITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": isEnglish ? "Services" : "Usługi",
            "item": `${WEBSITE_URL}/uslugi`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": isEnglish ? "Custom Fences" : "Ogrodzenia na Zamówienie",
            "item": `${WEBSITE_URL}${location.pathname}`
          }
        ]}
        pathname={location.pathname}
        language={language}
      />
      
      <FAQSchema 
        faqData={isEnglish ? [
          {
            question: "How much do custom fences cost?",
            answer: "The price of custom fences depends on length, height and design complexity. Each fence is individually priced. We offer free quotes after consultation and on-site measurements."
          },
          {
            question: "How long does it take to make a custom fence?",
            answer: "Standard completion time is 2-4 weeks from design approval. For larger orders (over 50m) the time may extend to 6 weeks."
          },
          {
            question: "Do you offer fence installation?",
            answer: "Yes, we provide professional installation of all our fences. Our installation team operates throughout Poland."
          },
          {
            question: "What fence designs are available?",
            answer: "We offer a wide range of designs: classic, modern, Art Nouveau, geometric, and custom designs according to your ideas."
          },
          {
            question: "Are the fences protected against corrosion?",
            answer: "All our fences are hot-dip galvanized and powder coated, providing corrosion protection for many years. We provide a 5-year warranty."
          }
        ] : [
          {
            question: "Ile kosztują ogrodzenia na zamówienie?",
            answer: "Cena ogrodzeń na zamówienie zależy od długości, wysokości i złożoności wzoru. Każde ogrodzenie jest indywidualnie wyceniane. Oferujemy darmową wycenę po konsultacji i pomiarach na miejscu."
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