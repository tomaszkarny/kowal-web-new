import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import { Layout } from 'components/Layout/Layout'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { ProductSchema } from 'components/SEO/ProductSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { HowToSchema } from 'components/SEO/HowToSchema'
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


function BramyKuteNaZamowieniePage({ pageContext }) {
  const { t, i18n } = useTranslation(['services', 'common'])
  const language = pageContext?.i18n?.language || 'pl'
  
  const faqData = [
    {
      question: t('services:gates.faq.q1.question'),
      answer: t('services:gates.faq.q1.answer')
    },
    {
      question: t('services:gates.faq.q2.question'),
      answer: t('services:gates.faq.q2.answer')
    },
    {
      question: t('services:gates.faq.q3.question'),
      answer: t('services:gates.faq.q3.answer')
    },
    {
      question: t('services:gates.faq.q4.question'),
      answer: t('services:gates.faq.q4.answer')
    },
    {
      question: t('services:gates.faq.q5.question'),
      answer: t('services:gates.faq.q5.answer')
    }
  ]

  return (
    <Layout>
      <HeroSection>
        <Container>
          <HeroTitle>{t('services:gates.hero.title')}</HeroTitle>
          <HeroSubtitle>{t('services:gates.hero.subtitle')}</HeroSubtitle>
          <CTAButton href="/contact">{t('services:gates.hero.cta')}</CTAButton>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>{t('services:gates.types.title')}</SectionTitle>
          <GateTypesGrid>
            <GateTypeCard>
              <GateTypeTitle>{t('services:gates.types.doubleLeaf.title')}</GateTypeTitle>
              <GateTypeDescription>
                {t('services:gates.types.doubleLeaf.text')}
              </GateTypeDescription>
              <GateFeatures>
                <FeatureItem>{t('services:gates.types.doubleLeaf.features.width')}</FeatureItem>
                <FeatureItem>{t('services:gates.types.doubleLeaf.features.automation')}</FeatureItem>
                <FeatureItem>{t('services:gates.types.doubleLeaf.features.designs')}</FeatureItem>
                <FeatureItem>{t('services:gates.types.doubleLeaf.features.wicket')}</FeatureItem>
              </GateFeatures>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>{t('services:gates.types.sliding.title')}</GateTypeTitle>
              <GateTypeDescription>
                {t('services:gates.types.sliding.text')}
              </GateTypeDescription>
              <GateFeatures>
                <FeatureItem>{t('services:gates.types.sliding.features.width')}</FeatureItem>
                <FeatureItem>{t('services:gates.types.sliding.features.quiet')}</FeatureItem>
                <FeatureItem>{t('services:gates.types.sliding.features.construction')}</FeatureItem>
                <FeatureItem>{t('services:gates.types.sliding.features.safety')}</FeatureItem>
              </GateFeatures>
            </GateTypeCard>
          </GateTypesGrid>

          <SectionTitle>{t('services:gates.styles.title')}</SectionTitle>
          <GateTypesGrid>
            <GateTypeCard>
              <GateTypeTitle>{t('services:gates.styles.classic.title')}</GateTypeTitle>
              <GateTypeDescription>
                {t('services:gates.styles.classic.text')}
              </GateTypeDescription>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>{t('services:gates.styles.modern.title')}</GateTypeTitle>
              <GateTypeDescription>
                {t('services:gates.styles.modern.text')}
              </GateTypeDescription>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>{t('services:gates.styles.artNouveau.title')}</GateTypeTitle>
              <GateTypeDescription>
                {t('services:gates.styles.artNouveau.text')}
              </GateTypeDescription>
            </GateTypeCard>
          </GateTypesGrid>
        </Container>
      </ContentSection>

      <AdvantagesSection>
        <Container>
          <SectionTitle>{t('services:gates.advantages.title')}</SectionTitle>
          <AdvantagesGrid>
            <AdvantageCard>
              <AdvantageIcon>🎨</AdvantageIcon>
              <AdvantageTitle>{t('services:gates.advantages.design.title')}</AdvantageTitle>
              <AdvantageText>
                {t('services:gates.advantages.design.text')}
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🔧</AdvantageIcon>
              <AdvantageTitle>{t('services:gates.advantages.installation.title')}</AdvantageTitle>
              <AdvantageText>
                {t('services:gates.advantages.installation.text')}
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🛡️</AdvantageIcon>
              <AdvantageTitle>{t('services:gates.advantages.warranty.title')}</AdvantageTitle>
              <AdvantageText>
                {t('services:gates.advantages.warranty.text')}
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🏆</AdvantageIcon>
              <AdvantageTitle>{t('services:gates.advantages.experience.title')}</AdvantageTitle>
              <AdvantageText>
                {t('services:gates.advantages.experience.text')}
              </AdvantageText>
            </AdvantageCard>
          </AdvantagesGrid>
        </Container>
      </AdvantagesSection>

      <ContentSection>
        <Container>
          <SectionTitle>{t('services:gates.contact.title')}</SectionTitle>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: COLORS.textSecondary }}>
            <p>{t('services:gates.contact.text1')}</p>
            <p>{t('services:gates.contact.text2')}</p>
            <p style={{ fontSize: '2rem', color: COLORS.primary, fontWeight: 'bold', margin: '2rem 0' }}>
              📞 {PHONE_NUMBER}
            </p>
            <p>{t('services:gates.contact.hours')}</p>
            <p style={{ marginTop: '1rem' }}>{t('services:gates.contact.text3')}</p>
            <CTAButton href="/contact" style={{ marginTop: '2rem' }}>{t('services:gates.contact.cta')}</CTAButton>
          </div>
        </Container>
      </ContentSection>
    </Layout>
  )
}

export default BramyKuteNaZamowieniePage

export function Head({ location, pageContext }) {
  const language = pageContext?.i18n?.language || 'pl'
  const isEnglish = language === 'en'
  
  return (
    <>
      <EnhancedSEO
        title={isEnglish ? "Custom Wrought Iron Gates - Double-Leaf, Sliding | Blacksmith" : "Bramy Kute na Zamówienie - Dwuskrzydłowe, Przesuwne | Kowal"}
        description={isEnglish ? "Custom wrought iron gates ⭐ Double-leaf and sliding gates. Design, manufacturing, installation throughout Poland. 30 years experience ✓ 5 year warranty ✓ Free quote ☎ +48 604 253 145" : "Bramy kute na zamówienie ⭐ Bramy dwuskrzydłowe i przesuwne. Projekt, wykonanie, montaż w całej Polsce. 30 lat doświadczenia ✓ 5 lat gwarancji ✓ Darmowa wycena ☎ 604 253 145"}
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
            "name": isEnglish ? "Custom Wrought Iron Gates" : "Bramy Kute na Zamówienie",
            "item": `${WEBSITE_URL}${location.pathname}`
          }
        ]}
        pathname={location.pathname}
        language={language}
      />
      
      <HowToSchema
        language={language}
        schemaType="ordering"
      />
      
      <FAQSchema 
        faqData={isEnglish ? [
          {
            question: "How much does a custom wrought iron gate cost?",
            answer: "The price of a wrought iron gate depends on size, project complexity and chosen design. Each gate is individually priced. We offer free quotes after consultation and on-site measurements."
          },
          {
            question: "How long does it take to make a wrought iron gate?",
            answer: "Standard completion time for a wrought iron gate is 3-4 weeks from design approval. During summer season the time may extend to 5-6 weeks due to higher order volume."
          },
          {
            question: "Do you install gate automation?",
            answer: "Yes, we offer complete service - from design through gate manufacturing to installation with automation. We work with renowned manufacturers: Nice, FAAC, BFT."
          },
          {
            question: "What wrought iron gate designs do you offer?",
            answer: "We offer a wide range of designs: classic, modern, Art Nouveau and custom designs. We can create a gate according to your design or propose our own solutions."
          },
          {
            question: "Do wrought iron gates require maintenance?",
            answer: "Our gates are hot-dip galvanized and powder coated, which minimizes the need for maintenance. We recommend technical inspection once a year and refreshing the paint coating every 5-7 years."
          }
        ] : [
          {
            question: "Ile kosztuje brama kuta na zamówienie?",
            answer: "Cena bramy kutej zależy od rozmiaru, złożoności projektu i wybranego wzornictwa. Każda brama jest indywidualnie wyceniana. Oferujemy darmową wycenę po konsultacji i pomiarach na miejscu."
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
            answer: "Oferujemy szeroki wybór wzorów: klasyczne, nowoczesne, secesyjne oraz projekty indywidualne. Możemy wykonać bramę według Twojego projektu lub zaproponować własne rozwiązania."
          },
          {
            question: "Czy bramy kute wymagają konserwacji?",
            answer: "Nasze bramy są cynkowane ogniowo i malowane proszkowo, co minimalizuje potrzebę konserwacji. Zalecamy przegląd techniczny raz w roku oraz odświeżenie powłoki lakierniczej co 5-7 lat."
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