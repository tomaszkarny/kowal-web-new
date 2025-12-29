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
  RelatedServices,
  QualityIcon,
  DesignIcon,
  WarrantyIcon,
} from 'components/Services'

function BalustradyNaZamowieniePage({ pageContext }) {
  const { t } = useTranslation(['services', 'common'])

  // Why choose us features
  const whyFeatures = [
    {
      icon: <QualityIcon />,
      title: t('services:railings.why.quality.title'),
      text: t('services:railings.why.quality.text'),
    },
    {
      icon: <DesignIcon />,
      title: t('services:railings.why.design.title'),
      text: t('services:railings.why.design.text'),
    },
    {
      icon: <WarrantyIcon />,
      title: t('services:railings.why.warranty.title'),
      text: t('services:railings.why.warranty.text'),
    },
  ]

  // Railing types data
  const railingTypes = [
    {
      title: t('services:railings.types.interior.title'),
      description: t('services:railings.types.interior.text'),
    },
    {
      title: t('services:railings.types.exterior.title'),
      description: t('services:railings.types.exterior.text'),
    },
    {
      title: t('services:railings.types.balcony.title'),
      description: t('services:railings.types.balcony.text'),
    },
    {
      title: t('services:railings.types.staircase.title'),
      description: t('services:railings.types.staircase.text'),
    },
  ]

  // Process steps data
  const processSteps = [
    {
      number: 1,
      title: t('services:railings.process.step1.title'),
      description: t('services:railings.process.step1.text'),
    },
    {
      number: 2,
      title: t('services:railings.process.step2.title'),
      description: t('services:railings.process.step2.text'),
    },
    {
      number: 3,
      title: t('services:railings.process.step3.title'),
      description: t('services:railings.process.step3.text'),
    },
    {
      number: 4,
      title: t('services:railings.process.step4.title'),
      description: t('services:railings.process.step4.text'),
    },
    {
      number: 5,
      title: t('services:railings.process.step5.title'),
      description: t('services:railings.process.step5.text'),
    },
  ]

  return (
    <Layout>
      <ServiceHero
        title={t('services:railings.hero.title')}
        subtitle={t('services:railings.hero.subtitle')}
        ctaText={t('services:railings.hero.cta')}
        variant="railings"
      />

      <ServiceFeatures
        title={t('services:railings.why.title')}
        features={whyFeatures}
        columns={3}
      />

      <ServiceTypes
        title={t('services:railings.types.title')}
        types={railingTypes}
        columns={4}
        background="light"
      />

      <ProcessSteps
        title={t('services:railings.process.title')}
        steps={processSteps}
      />

      <ServiceGallery
        title={t('services:railings.gallery.title')}
        variant="railings"
        limit={8}
        viewMoreText={t('services:railings.gallery.viewMore')}
        viewMoreHref="/gallery/"
      />

      <RelatedServices
        sectionTitle={t('services:railings.relatedServices.title')}
        serviceTitle={t('services:railings.relatedServices.gates.title')}
        serviceDescription={t('services:railings.relatedServices.gates.description')}
        servicePath="/services/custom-gates/"
      />

      <ServiceContact
        title={t('services:railings.contact.title')}
        text1={t('services:railings.contact.text1')}
        text2={t('services:railings.contact.text2')}
        hours={t('services:railings.contact.hours')}
        ctaText={t('services:railings.contact.cta')}
      />
    </Layout>
  )
}

export default BalustradyNaZamowieniePage

export function Head({ location, pageContext }) {
  const language = pageContext?.i18n?.language || 'pl'
  const isEnglish = language === 'en'

  return (
    <>
      <EnhancedSEO
        title={
          isEnglish
            ? 'Wrought Iron Railings Bialystok - Custom Made | Karny Blacksmith'
            : 'Balustrady Kute Bialystok - Na Wymiar | Kowalstwo Karny'
        }
        description={
          isEnglish
            ? 'Custom wrought iron railings in Bialystok. Interior and exterior railings. Free quote. Installation included. 25+ years of experience. Call now!'
            : 'Balustrady kute na wymiar w Bialymstoku. Wewnetrzne i zewnetrzne. Darmowa wycena. Montaz w cenie. 25+ lat doswiadczenia. Zadzwon!'
        }
        pathname={location.pathname}
        pageType="service"
        language={language}
        noindex={false}
      />

      <ProductSchema language={language} cityName="Bialystok" />

      <HowToSchema language={language} schemaType="ordering" />

      <BreadcrumbSchema
        breadcrumbs={[
          {
            '@type': 'ListItem',
            position: 1,
            name: isEnglish ? 'Home' : 'Strona glowna',
            item: WEBSITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEnglish ? 'Services' : 'Uslugi',
            item: `${WEBSITE_URL}/uslugi`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isEnglish ? 'Custom Railings' : 'Balustrady na Zamowienie',
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
                  question: 'How much do custom wrought iron railings cost?',
                  answer:
                    'The price of custom railings depends on length, design complexity and installation location. Each railing is individually priced. We offer free quotes after consultation and on-site measurements.',
                },
                {
                  question: 'How long does it take to make custom railings?',
                  answer:
                    'Standard completion time is 2-3 weeks from design approval. For larger projects (whole staircases or balconies) the time may extend to 4-5 weeks.',
                },
                {
                  question: 'Do you install railings throughout Poland?',
                  answer:
                    'Yes, we provide professional installation of all our railings. Our installation team operates throughout Poland, with free transport within 50km of Bialystok.',
                },
                {
                  question: 'What railing styles do you offer?',
                  answer:
                    'We offer a wide range of styles: classic, modern, Art Nouveau, geometric, and custom designs. We create interior stair railings, exterior balcony railings, and terrace railings.',
                },
                {
                  question: 'Are wrought iron railings safe for children?',
                  answer:
                    'Yes, all our railings meet safety standards. We use appropriate spacing between balusters (max 12cm) and proper heights (min 110cm for stairs). We can also add additional child safety elements.',
                },
              ]
            : [
                {
                  question: 'Ile kosztuja balustrady kute na wymiar?',
                  answer:
                    'Cena balustrad kutych zalezy od dlugosci, zlozonosci wzoru i miejsca montazu. Kazda balustrada jest indywidualnie wyceniana. Oferujemy darmowa wycene po konsultacji i pomiarach na miejscu.',
                },
                {
                  question: 'Jak dlugo trwa wykonanie balustrady?',
                  answer:
                    'Standardowy czas realizacji to 2-3 tygodnie od zatwierdzenia projektu. Dla wiekszych projektow (cale klatki schodowe lub balkony) czas moze sie wydluzyc do 4-5 tygodni.',
                },
                {
                  question: 'Czy montujecie balustrady w calej Polsce?',
                  answer:
                    'Tak, zapewniamy profesjonalny montaz wszystkich naszych balustrad. Nasza ekipa montazowa dziala na terenie calej Polski, z bezplatnym transportem do 50km od Bialymstoku.',
                },
                {
                  question: 'Jakie style balustrad oferujecie?',
                  answer:
                    'Oferujemy szeroki wybor stylow: klasyczne, nowoczesne, secesyjne, geometryczne oraz projekty indywidualne. Tworzymy balustrady wewnetrzne do schodow, zewnetrzne balkonowe i tarasowe.',
                },
                {
                  question: 'Czy balustrady kute sa bezpieczne dla dzieci?',
                  answer:
                    'Tak, wszystkie nasze balustrady spelniaja normy bezpieczenstwa. Stosujemy odpowiednie odstepy miedzy tralkami (max 12cm) i wlasciwe wysokosci (min 110cm dla schodow). Mozemy rowniez dodac dodatkowe elementy zabezpieczajace.',
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
