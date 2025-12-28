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
  ProcessSteps,
  ServiceGallery,
  ServiceContact,
  QualityIcon,
  DesignIcon,
  WarrantyIcon,
} from 'components/Services'

function OgrodzeniaNaZamowieniePage({ pageContext }) {
  const { t } = useTranslation(['services', 'common'])

  // Why choose us features
  const whyFeatures = [
    {
      icon: <QualityIcon />,
      title: t('services:fences.why.quality.title'),
      text: t('services:fences.why.quality.text'),
    },
    {
      icon: <DesignIcon />,
      title: t('services:fences.why.design.title'),
      text: t('services:fences.why.design.text'),
    },
    {
      icon: <WarrantyIcon />,
      title: t('services:fences.why.warranty.title'),
      text: t('services:fences.why.warranty.text'),
    },
  ]

  // Fence types data
  const fenceTypes = [
    {
      title: t('services:fences.types.classic.title'),
      description: t('services:fences.types.classic.text'),
    },
    {
      title: t('services:fences.types.modern.title'),
      description: t('services:fences.types.modern.text'),
    },
    {
      title: t('services:fences.types.decorative.title'),
      description: t('services:fences.types.decorative.text'),
    },
  ]

  // Process steps data
  const processSteps = [
    {
      number: 1,
      title: t('services:fences.process.step1.title'),
      description: t('services:fences.process.step1.text'),
    },
    {
      number: 2,
      title: t('services:fences.process.step2.title'),
      description: t('services:fences.process.step2.text'),
    },
    {
      number: 3,
      title: t('services:fences.process.step3.title'),
      description: t('services:fences.process.step3.text'),
    },
    {
      number: 4,
      title: t('services:fences.process.step4.title'),
      description: t('services:fences.process.step4.text'),
    },
    {
      number: 5,
      title: t('services:fences.process.step5.title'),
      description: t('services:fences.process.step5.text'),
    },
  ]

  return (
    <Layout>
      <ServiceHero
        title={t('services:fences.hero.title')}
        subtitle={t('services:fences.hero.subtitle')}
        ctaText={t('services:fences.hero.cta')}
        variant="fences"
      />

      <ServiceFeatures
        title={t('services:fences.why.title')}
        features={whyFeatures}
        columns={3}
      />

      <ServiceTypes
        title={t('services:fences.types.title')}
        types={fenceTypes}
        columns={3}
        background="light"
      />

      <ProcessSteps
        title={t('services:fences.process.title')}
        steps={processSteps}
      />

      <ServiceGallery
        title={t('services:fences.gallery.title')}
        variant="fences"
        limit={8}
        viewMoreText={t('services:fences.gallery.viewMore')}
        viewMoreHref="/gallery/"
      />

      <ServiceContact
        title={t('services:fences.contact.title')}
        text1={t('services:fences.contact.text1')}
        text2={t('services:fences.contact.text2')}
        hours={t('services:fences.contact.hours')}
        ctaText={t('services:fences.contact.cta')}
      />
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
        title={
          isEnglish
            ? 'Custom Wrought Iron Fences - Blacksmith Białystok | Poland'
            : 'Ogrodzenia na Zamówienie - Kowal Białystok | Cała Polska'
        }
        description={
          isEnglish
            ? 'Custom wrought iron fences ⭐ Design and manufacturing of wrought iron fences. Best blacksmith in Poland. 5 year warranty ✓ Free quote ☎ +48 604 253 145'
            : 'Ogrodzenia na zamówienie ⭐ Projektowanie i wykonanie ogrodzeń kutych. Najlepszy kowal w Polsce. 5 lat gwarancji ✓ Darmowa wycena ☎ 604 253 145'
        }
        pathname={location.pathname}
        pageType="service"
        language={language}
        noindex={false}
      />

      <ProductSchema language={language} cityName="Białystok" />

      <HowToSchema language={language} schemaType="ordering" />

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
            name: isEnglish ? 'Custom Fences' : 'Ogrodzenia na Zamówienie',
            item: `${WEBSITE_URL}${location.pathname}`,
          },
        ]}
        pathname={location.pathname}
        language={language}
      />

      <FAQSchema
        faqData={
          isEnglish
            ? [
                {
                  question: 'How much do custom fences cost?',
                  answer:
                    'The price of custom fences depends on length, height and design complexity. Each fence is individually priced. We offer free quotes after consultation and on-site measurements.',
                },
                {
                  question: 'How long does it take to make a custom fence?',
                  answer:
                    'Standard completion time is 2-4 weeks from design approval. For larger orders (over 50m) the time may extend to 6 weeks.',
                },
                {
                  question: 'Do you offer fence installation?',
                  answer:
                    'Yes, we provide professional installation of all our fences. Our installation team operates throughout Poland.',
                },
                {
                  question: 'What fence designs are available?',
                  answer:
                    'We offer a wide range of designs: classic, modern, Art Nouveau, geometric, and custom designs according to your ideas.',
                },
                {
                  question: 'Are the fences protected against corrosion?',
                  answer:
                    'All our fences are hot-dip galvanized and powder coated, providing corrosion protection for many years. We provide a 5-year warranty.',
                },
              ]
            : [
                {
                  question: 'Ile kosztują ogrodzenia na zamówienie?',
                  answer:
                    'Cena ogrodzeń na zamówienie zależy od długości, wysokości i złożoności wzoru. Każde ogrodzenie jest indywidualnie wyceniane. Oferujemy darmową wycenę po konsultacji i pomiarach na miejscu.',
                },
                {
                  question: 'Jak długo trwa wykonanie ogrodzenia na zamówienie?',
                  answer:
                    'Standardowy czas realizacji to 2-4 tygodnie od zatwierdzenia projektu. Dla większych zamówień (powyżej 50mb) czas może się wydłużyć do 6 tygodni.',
                },
                {
                  question: 'Czy oferujecie montaż ogrodzeń?',
                  answer:
                    'Tak, zapewniamy profesjonalny montaż wszystkich naszych ogrodzeń. Nasza ekipa montażowa działa na terenie całej Polski.',
                },
                {
                  question: 'Jakie wzory ogrodzeń są dostępne?',
                  answer:
                    'Oferujemy szeroki wybór wzorów: klasyczne, nowoczesne, secesyjne, geometryczne oraz projekty indywidualne według Państwa pomysłu.',
                },
                {
                  question: 'Czy ogrodzenia są zabezpieczone przed korozją?',
                  answer:
                    'Wszystkie nasze ogrodzenia są cynkowane ogniowo i malowane proszkowo, co zapewnia ochronę przed korozją na wiele lat. Udzielamy 5-letniej gwarancji.',
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
