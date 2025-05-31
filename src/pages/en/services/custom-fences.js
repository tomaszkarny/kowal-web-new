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

function CustomFencesPage() {
  const faqData = [
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
  ]

  return (
    <Layout>
      <HeroSection>
        <Container>
          <HeroTitle>Custom Wrought Iron Fences</HeroTitle>
          <HeroSubtitle>We design and create exclusive wrought iron fences</HeroSubtitle>
          <CTAButton href="/en/contact">Get Free Quote</CTAButton>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>Why Choose Our Fences?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🏆</FeatureIcon>
              <FeatureTitle>Highest Quality</FeatureTitle>
              <FeatureText>
                We use only the best steel and proven blacksmithing techniques. 
                Each fence is carefully crafted and protected against corrosion.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>✏️</FeatureIcon>
              <FeatureTitle>Individual Designs</FeatureTitle>
              <FeatureText>
                We create fences according to your needs and taste. 
                From classic patterns to modern, minimalist forms.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>5 Year Warranty</FeatureTitle>
              <FeatureText>
                We are confident in the quality of our fences, which is why 
                we provide a 5-year warranty on all completed work.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>

          <SectionTitle>Types of Fences</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureTitle>Classic Fences</FeatureTitle>
              <FeatureText>
                Elegant patterns inspired by traditional blacksmithing. 
                Perfect for historic buildings and classic residences.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Modern Fences</FeatureTitle>
              <FeatureText>
                Minimalist, geometric forms for contemporary architecture. 
                Clean lines and functionality.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Decorative Fences</FeatureTitle>
              <FeatureText>
                Richly decorated fences with plant, animal or abstract motifs.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </ContentSection>

      <ProcessSection>
        <Container>
          <SectionTitle>How to Order a Fence?</SectionTitle>
          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepTitle>Contact & Consultation</StepTitle>
              <StepDescription>
                Contact us by phone or form. 
                We'll discuss your needs and propose solutions.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepTitle>Measurements & Quote</StepTitle>
              <StepDescription>
                We'll visit the site, take precise measurements 
                and prepare a detailed quote.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepTitle>Design & Approval</StepTitle>
              <StepDescription>
                We'll prepare the fence design. After your approval 
                we begin production.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepTitle>Production</StepTitle>
              <StepDescription>
                In our workshop we create the fence according 
                to the approved design.
              </StepDescription>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>5</StepNumber>
              <StepTitle>Installation</StepTitle>
              <StepDescription>
                Our installation team will install the fence 
                on your property.
              </StepDescription>
            </ProcessStep>
          </ProcessSteps>
        </Container>
      </ProcessSection>

      <ContentSection>
        <Container>
          <SectionTitle>Contact Us</SectionTitle>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: COLORS.textSecondary }}>
            <p>We invite you to contact us to discuss your project details.</p>
            <p>We'll prepare an individual quote tailored to your needs.</p>
            <p style={{ fontSize: '2rem', color: COLORS.primary, fontWeight: 'bold', margin: '2rem 0' }}>
              📞 {PHONE_NUMBER}
            </p>
            <p>Working hours: Mon-Fri 7:30-16:00, Sat 9:00-15:00</p>
            <CTAButton href="/en/contact" style={{ marginTop: '2rem' }}>Contact Form</CTAButton>
          </div>
        </Container>
      </ContentSection>
    </Layout>
  )
}

export default CustomFencesPage

export function Head({ location }) {
  const language = 'en'
  
  return (
    <>
      <EnhancedSEO
        title="Custom Wrought Iron Fences - Blacksmith Białystok | Poland"
        description="Custom wrought iron fences ⭐ Design and manufacturing of wrought iron fences. Best blacksmith in Poland. 5 year warranty ✓ Free quote ☎ +48 604 253 145"
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
            "name": "Custom Fences",
            "item": `${WEBSITE_URL}${location.pathname}`
          }
        ]}
        pathname={location.pathname}
        language={language}
      />
      
      <FAQSchema 
        faqData={[
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