import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { Layout } from 'components/Layout/Layout'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { ProductSchema } from 'components/SEO/ProductSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { HowToSchema } from 'components/SEO/HowToSchema'
import { WEBSITE_URL } from 'consts/contactDetails'
import {
  ServiceHero,
  ServiceTypes,
  ServiceFeatures,
  ServiceGallery,
  ServiceContact,
  DesignIcon,
  InstallationIcon,
  WarrantyIcon,
  ExperienceIcon,
} from 'components/Services'

function BramyKuteNaZamowieniePage({ pageContext }) {
  const { t } = useTranslation(['services', 'common'])

  // Gate types data
  const gateTypes = [
    {
      title: t('services:gates.types.doubleLeaf.title'),
      description: t('services:gates.types.doubleLeaf.text'),
      features: [
        t('services:gates.types.doubleLeaf.features.width'),
        t('services:gates.types.doubleLeaf.features.automation'),
        t('services:gates.types.doubleLeaf.features.designs'),
        t('services:gates.types.doubleLeaf.features.wicket'),
      ],
    },
    {
      title: t('services:gates.types.sliding.title'),
      description: t('services:gates.types.sliding.text'),
      features: [
        t('services:gates.types.sliding.features.width'),
        t('services:gates.types.sliding.features.quiet'),
        t('services:gates.types.sliding.features.construction'),
        t('services:gates.types.sliding.features.safety'),
      ],
    },
  ]

  // Gate styles data
  const gateStyles = [
    {
      title: t('services:gates.styles.classic.title'),
      description: t('services:gates.styles.classic.text'),
    },
    {
      title: t('services:gates.styles.modern.title'),
      description: t('services:gates.styles.modern.text'),
    },
    {
      title: t('services:gates.styles.artNouveau.title'),
      description: t('services:gates.styles.artNouveau.text'),
    },
  ]

  // Advantages data
  const advantages = [
    {
      icon: <DesignIcon />,
      title: t('services:gates.advantages.design.title'),
      text: t('services:gates.advantages.design.text'),
    },
    {
      icon: <InstallationIcon />,
      title: t('services:gates.advantages.installation.title'),
      text: t('services:gates.advantages.installation.text'),
    },
    {
      icon: <WarrantyIcon />,
      title: t('services:gates.advantages.warranty.title'),
      text: t('services:gates.advantages.warranty.text'),
    },
    {
      icon: <ExperienceIcon />,
      title: t('services:gates.advantages.experience.title'),
      text: t('services:gates.advantages.experience.text'),
    },
  ]

  return (
    <Layout>
      <ServiceHero
        title={t('services:gates.hero.title')}
        subtitle={t('services:gates.hero.subtitle')}
        ctaText={t('services:gates.hero.cta')}
        variant="gates"
      />

      <ServiceTypes
        title={t('services:gates.types.title')}
        types={gateTypes}
        columns={2}
      />

      <ServiceTypes
        title={t('services:gates.styles.title')}
        types={gateStyles}
        columns={3}
        background="light"
      />

      <ServiceFeatures
        title={t('services:gates.advantages.title')}
        features={advantages}
        columns={4}
      />

      <ServiceGallery
        title={t('services:gates.gallery.title')}
        variant="gates"
        limit={8}
        viewMoreText={t('services:gates.gallery.viewMore')}
        viewMoreHref="/gallery/"
      />

      <ServiceContact
        title={t('services:gates.contact.title')}
        text1={t('services:gates.contact.text1')}
        text2={t('services:gates.contact.text2')}
        hours={t('services:gates.contact.hours')}
        text3={t('services:gates.contact.text3')}
        ctaText={t('services:gates.contact.cta')}
      />
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
        title={
          isEnglish
            ? 'Custom Wrought Iron Gates - Double-Leaf, Sliding | Blacksmith'
            : 'Bramy Kute na Zamówienie - Dwuskrzydłowe, Przesuwne | Kowal'
        }
        description={
          isEnglish
            ? 'Custom wrought iron gates ⭐ Double-leaf and sliding gates. Design, manufacturing, installation throughout Poland. 30 years experience ✓ 5 year warranty ✓ Free quote ☎ +48 604 253 145'
            : 'Bramy kute na zamówienie ⭐ Bramy dwuskrzydłowe i przesuwne. Projekt, wykonanie, montaż w całej Polsce. 30 lat doświadczenia ✓ 5 lat gwarancji ✓ Darmowa wycena ☎ 604 253 145'
        }
        pathname={location.pathname}
        pageType="service"
        language={language}
        noindex={false}
      />

      <ProductSchema language={language} cityName="Białystok" />

      <BreadcrumbSchema
        breadcrumbs={[
          {
            '@type': 'ListItem',
            position: 1,
            name: isEnglish ? 'Home' : 'Strona główna',
            item: WEBSITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEnglish ? 'Services' : 'Usługi',
            item: `${WEBSITE_URL}/uslugi`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isEnglish
              ? 'Custom Wrought Iron Gates'
              : 'Bramy Kute na Zamówienie',
            item: `${WEBSITE_URL}${location.pathname}`,
          },
        ]}
        pathname={location.pathname}
        language={language}
      />

      <HowToSchema language={language} schemaType="ordering" />

      <FAQSchema
        faqData={
          isEnglish
            ? [
                {
                  question: 'How much does a custom wrought iron gate cost?',
                  answer:
                    'The price of a wrought iron gate depends on size, project complexity and chosen design. Each gate is individually priced. We offer free quotes after consultation and on-site measurements.',
                },
                {
                  question: 'How long does it take to make a wrought iron gate?',
                  answer:
                    'Standard completion time for a wrought iron gate is 3-4 weeks from design approval. During summer season the time may extend to 5-6 weeks due to higher order volume.',
                },
                {
                  question: 'Do you install gate automation?',
                  answer:
                    'Yes, we offer complete service - from design through gate manufacturing to installation with automation. We work with renowned manufacturers: Nice, FAAC, BFT.',
                },
                {
                  question: 'What wrought iron gate designs do you offer?',
                  answer:
                    'We offer a wide range of designs: classic, modern, Art Nouveau and custom designs. We can create a gate according to your design or propose our own solutions.',
                },
                {
                  question: 'Do wrought iron gates require maintenance?',
                  answer:
                    'Our gates are hot-dip galvanized and powder coated, which minimizes the need for maintenance. We recommend technical inspection once a year and refreshing the paint coating every 5-7 years.',
                },
              ]
            : [
                {
                  question: 'Ile kosztuje brama kuta na zamówienie?',
                  answer:
                    'Cena bramy kutej zależy od rozmiaru, złożoności projektu i wybranego wzornictwa. Każda brama jest indywidualnie wyceniana. Oferujemy darmową wycenę po konsultacji i pomiarach na miejscu.',
                },
                {
                  question: 'Jak długo trwa wykonanie bramy kutej?',
                  answer:
                    'Standardowy czas realizacji bramy kutej to 3-4 tygodnie od zatwierdzenia projektu. W sezonie letnim czas może się wydłużyć do 5-6 tygodni ze względu na większą ilość zamówień.',
                },
                {
                  question: 'Czy montujecie automatykę do bram?',
                  answer:
                    'Tak, oferujemy kompleksową usługę - od projektu przez wykonanie bramy po montaż wraz z automatyką. Współpracujemy z renomowanymi producentami: Nice, FAAC, BFT.',
                },
                {
                  question: 'Jakie wzory bram kutych oferujecie?',
                  answer:
                    'Oferujemy szeroki wybór wzorów: klasyczne, nowoczesne, secesyjne oraz projekty indywidualne. Możemy wykonać bramę według Twojego projektu lub zaproponować własne rozwiązania.',
                },
                {
                  question: 'Czy bramy kute wymagają konserwacji?',
                  answer:
                    'Nasze bramy są cynkowane ogniowo i malowane proszkowo, co minimalizuje potrzebę konserwacji. Zalecamy przegląd techniczny raz w roku oraz odświeżenie powłoki lakierniczej co 5-7 lat.',
                },
              ]
        }
        pathname={location.pathname}
        language={language}
      />
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
