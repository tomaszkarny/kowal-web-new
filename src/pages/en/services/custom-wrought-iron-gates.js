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

function CustomWroughtIronGatesPage() {
  return (
    <Layout>
      <HeroSection>
        <Container>
          <HeroTitle>Custom Wrought Iron Gates</HeroTitle>
          <HeroSubtitle>Exclusive driveway gates - design, manufacturing, installation</HeroSubtitle>
          <CTAButton href="/en/contact">Request a Quote</CTAButton>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>Types of Wrought Iron Gates</SectionTitle>
          <GateTypesGrid>
            <GateTypeCard>
              <GateTypeTitle>Double-Leaf Gates</GateTypeTitle>
              <GateTypeDescription>
                Classic solution for elegant properties. 
                Double-leaf gates combine functionality with beauty.
              </GateTypeDescription>
              <GateFeatures>
                <FeatureItem>Width up to 6 meters</FeatureItem>
                <FeatureItem>Nice or FAAC automation</FeatureItem>
                <FeatureItem>Various designs</FeatureItem>
                <FeatureItem>Option to add wicket gate</FeatureItem>
              </GateFeatures>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>Sliding Gates</GateTypeTitle>
              <GateTypeDescription>
                Ideal solution for narrow driveways. 
                Space saving and ease of use.
              </GateTypeDescription>
              <GateFeatures>
                <FeatureItem>Width up to 8 meters</FeatureItem>
                <FeatureItem>Quiet automation operation</FeatureItem>
                <FeatureItem>Self-supporting construction</FeatureItem>
                <FeatureItem>Safety photocells</FeatureItem>
              </GateFeatures>
            </GateTypeCard>
          </GateTypesGrid>

          <SectionTitle>Styles and Designs</SectionTitle>
          <GateTypesGrid>
            <GateTypeCard>
              <GateTypeTitle>Classic Style</GateTypeTitle>
              <GateTypeDescription>
                Timeless elegance with traditional blacksmithing elements. 
                Perfect for historic and classic buildings.
              </GateTypeDescription>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>Modern Style</GateTypeTitle>
              <GateTypeDescription>
                Minimalist forms, geometric patterns. 
                Excellent for contemporary architecture.
              </GateTypeDescription>
            </GateTypeCard>
            <GateTypeCard>
              <GateTypeTitle>Art Nouveau Style</GateTypeTitle>
              <GateTypeDescription>
                Rich decorations, plant motifs and organic shapes. 
                For lovers of art and unique design.
              </GateTypeDescription>
            </GateTypeCard>
          </GateTypesGrid>
        </Container>
      </ContentSection>

      <AdvantagesSection>
        <Container>
          <SectionTitle>Why Choose Our Gates?</SectionTitle>
          <AdvantagesGrid>
            <AdvantageCard>
              <AdvantageIcon>🎨</AdvantageIcon>
              <AdvantageTitle>Individual Design</AdvantageTitle>
              <AdvantageText>
                Each gate is designed specifically for you
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🔧</AdvantageIcon>
              <AdvantageTitle>Professional Installation</AdvantageTitle>
              <AdvantageText>
                Experienced installation team throughout Poland
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🛡️</AdvantageIcon>
              <AdvantageTitle>5 Year Warranty</AdvantageTitle>
              <AdvantageText>
                Quality assurance confirmed by long warranty
              </AdvantageText>
            </AdvantageCard>
            <AdvantageCard>
              <AdvantageIcon>🏆</AdvantageIcon>
              <AdvantageTitle>30 Years of Experience</AdvantageTitle>
              <AdvantageText>
                Hundreds of satisfied customers throughout Poland
              </AdvantageText>
            </AdvantageCard>
          </AdvantagesGrid>
        </Container>
      </AdvantagesSection>

      <ContentSection>
        <Container>
          <SectionTitle>Contact Us</SectionTitle>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: COLORS.textSecondary }}>
            <p>We invite you to contact us to discuss your project details.</p>
            <p>Each gate is individually priced depending on size, design and equipment.</p>
            <p style={{ fontSize: '2rem', color: COLORS.primary, fontWeight: 'bold', margin: '2rem 0' }}>
              📞 {PHONE_NUMBER}
            </p>
            <p>Working hours: Mon-Fri 7:30-16:00, Sat 9:00-15:00</p>
            <p style={{ marginTop: '1rem' }}>We serve all of Poland!</p>
            <CTAButton href="/en/contact" style={{ marginTop: '2rem' }}>Fill Out Form</CTAButton>
          </div>
        </Container>
      </ContentSection>
    </Layout>
  )
}

export default CustomWroughtIronGatesPage

export function Head({ location }) {
  const language = 'en'
  
  const faqData = [
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
  ]
  
  return (
    <>
      <EnhancedSEO
        title="Custom Wrought Iron Gates - Double-Leaf, Sliding | Blacksmith"
        description="Custom wrought iron gates ⭐ Double-leaf and sliding gates. Design, manufacturing, installation throughout Poland. 30 years experience ✓ 5 year warranty ✓ Free quote ☎ +48 604 253 145"
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
            "name": "Home",
            "item": `${WEBSITE_URL}/en`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": `${WEBSITE_URL}/en/services`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Custom Wrought Iron Gates",
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