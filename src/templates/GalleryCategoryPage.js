import React, { useState, useCallback, useMemo } from 'react'
import { graphql } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { Layout } from 'components/Layout/Layout'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { GalleryWrapper } from 'components/common/GalleryWrapper/GalleryWrapper'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { detectLanguageForSEO } from 'utils/seoLanguageDetection'
import { WEBSITE_URL } from 'consts/contactDetails'

// Import seo.json translations directly (hooks not available in Head)
import seoTranslationsPL from '../../locales/pl/seo.json'
import seoTranslationsEN from '../../locales/en/seo.json'
import galleryTranslationsPL from '../../locales/pl/gallery.json'
import galleryTranslationsEN from '../../locales/en/gallery.json'

import {
  CategoryPageWrapper,
  CategoryHeading,
  CategoryIntro,
  ImageCountBadge,
  ImageCountWrapper,
  CTASection,
  CTALink,
  FAQSection,
  FAQHeading,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
} from './GalleryCategoryPage.styles'

// Map category id to seo.json key
const SEO_KEY_MAP = {
  gates: 'galleryGates',
  balustrades: 'galleryBalustrades',
  fences: 'galleryFences',
}

// Map category id to service page path
const SERVICE_LINK_MAP = {
  gates: '/services/custom-gates/',
  balustrades: '/services/custom-railings/',
  fences: '/services/custom-fences/',
}

// Gallery category FAQ data per category and language
const GALLERY_FAQ_DATA = {
  pl: {
    gates: [
      {
        question: 'Jakie wzory bram kutych oferujecie?',
        answer:
          'Oferujemy bramy kute w stylu klasycznym z elementami roślinnymi (liście, kwiaty, zwoje), bramy nowoczesne z czystymi liniami geometrycznymi oraz wzory inspirowane secesją. Każda brama może być wykonana według indywidualnego projektu klienta.',
      },
      {
        question: 'Ile kosztuje brama kuta z galerii?',
        answer:
          'Cena bramy kutej zależy od rozmiaru i złożoności wzoru. Orientacyjny zakres to 3000–8000 zł/m². Skontaktuj się z nami, by otrzymać bezpłatną wycenę indywidualną: ☎ 604 253 145.',
      },
      {
        question: 'Czy mogę zamówić bramę na podstawie zdjęcia z galerii?',
        answer:
          'Tak! Każde zdjęcie z galerii może być inspiracją do Twojego projektu. Możemy wykonać bramę identyczną jak na zdjęciu lub zmodyfikować ją według Twoich potrzeb. Zapraszamy na bezpłatną konsultację.',
      },
    ],
    balustrades: [
      {
        question: 'Jakie balustrady kute są najpopularniejsze?',
        answer:
          'Najchętniej wybierane są balustrady schodowe wewnętrzne o klasycznych wzorach z elementami roślinnymi, balustrady balkonowe z delikatnymi zwojami oraz tarasowe w stylu nowoczesnym. Każda balustrada jest wykonywana na wymiar.',
      },
      {
        question: 'Czy balustrady z galerii można wykonać w innym rozmiarze?',
        answer:
          'Oczywiście. Wszystkie nasze balustrady są wykonywane na indywidualny wymiar. Wzór z galerii możemy dostosować do Twoich schodów, balkonu lub tarasu – wystarczy podać wymiary miejsca montażu.',
      },
      {
        question: 'Ile kosztuje balustrada kuta?',
        answer:
          'Cena balustrady kutej zależy od długości, wzoru i zastosowania (wewnętrzna/zewnętrzna). Balustrady schodowe zaczynają się od ok. 500 zł/mb, a bardziej ozdobne modele od 800 zł/mb. Wycena bezpłatna: ☎ 604 253 145.',
      },
    ],
    fences: [
      {
        question: 'Jakie ogrodzenia kute oferujecie?',
        answer:
          'Wykonujemy ogrodzenia kute w stylu artystycznym, klasycznym i nowoczesnym – zarówno ogrodzenia posesyjne z przęsłami, jak i panele ogrodzeniowe ze słupkami murowanymi. Wszystkie ogrodzenia produkowane są z ocynkowanej stali z 5-letnią gwarancją.',
      },
      {
        question: 'Jak zamówić ogrodzenie kute na wymiar?',
        answer:
          'Proces zamówienia: kontakt telefoniczny → bezpłatna wizja lokalna i pomiary → indywidualny projekt → wycena → produkcja (3–6 tygodni) → montaż. Zadzwoń: ☎ 604 253 145.',
      },
      {
        question: 'Czy montujecie ogrodzenia w całej Polsce?',
        answer:
          'Tak, realizujemy montaż ogrodzeń kutych na terenie całej Polski. Dysponujemy własnym transportem i wykwalifikowaną ekipą montażową. Koszt montażu jest ustalany indywidualnie w zależności od lokalizacji.',
      },
    ],
  },
  en: {
    gates: [
      {
        question: 'What wrought iron gate designs do you offer?',
        answer:
          "We offer wrought iron gates in classic styles with floral elements (leaves, flowers, scrolls), modern gates with clean geometric lines, and Art Nouveau-inspired designs. Each gate can be made to the client's individual design.",
      },
      {
        question: 'How much does a wrought iron gate from the gallery cost?',
        answer:
          'The price of a wrought iron gate depends on size and design complexity. The indicative range is 3,000–8,000 PLN/m². Contact us for a free individual quote: ☎ +48 604 253 145.',
      },
      {
        question: 'Can I order a gate based on a photo from the gallery?',
        answer:
          'Yes! Any gallery photo can be the inspiration for your project. We can make a gate identical to the photo or modify it to your needs. We invite you for a free consultation.',
      },
    ],
    balustrades: [
      {
        question: 'What wrought iron railings are most popular?',
        answer:
          'The most popular are interior stair railings with classic floral designs, balcony railings with delicate scrolls, and modern-style terrace railings. Every railing is made to individual measurements.',
      },
      {
        question: 'Can railings from the gallery be made in a different size?',
        answer:
          'Of course. All our railings are custom-made. Any gallery design can be adapted to fit your staircase, balcony, or terrace – just provide the measurements of the installation area.',
      },
      {
        question: 'How much does a wrought iron railing cost?',
        answer:
          'The price depends on length, design, and application (interior/exterior). Stair railings start from approximately 500 PLN/m, and more decorative models from 800 PLN/m. Free quote: ☎ +48 604 253 145.',
      },
    ],
    fences: [
      {
        question: 'What wrought iron fences do you offer?',
        answer:
          'We make artistic, classic, and modern wrought iron fences – both property perimeter fences with panels and fencing with masonry pillars. All fences are made from galvanized steel with a 5-year warranty.',
      },
      {
        question: 'How do I order a custom wrought iron fence?',
        answer:
          'The ordering process: phone contact → free on-site visit and measurements → individual design → quote → production (3–6 weeks) → installation. Call: ☎ +48 604 253 145.',
      },
      {
        question: 'Do you install fences throughout Poland?',
        answer:
          'Yes, we install wrought iron fences throughout Poland. We have our own transport and a qualified installation team. Installation costs are determined individually depending on location.',
      },
    ],
  },
}

function filterImagesByCategory(images, category, imagePrefix, imageDir) {
  return images.edges
    .filter(({ node }) => {
      const dir = node.relativeDirectory || ''
      const name = node.name || ''
      return (
        dir.includes(`gallery/${imageDir}`) ||
        name.toLowerCase().startsWith(imagePrefix.toLowerCase())
      )
    })
    .map(({ node }) => {
      const imageData = getImage(node.childImageSharp)
      return {
        src: getSrc(imageData),
        width: node.childImageSharp.original.width,
        height: node.childImageSharp.original.height,
        alt: node.name,
        title: node.name,
      }
    })
    .filter(photo => photo.src)
}

function GalleryCategoryPageTemplate({ data, pageContext }) {
  const { category, imagePrefix, imageDir, language } = pageContext
  const { t } = useTranslation('gallery')

  const galleryTranslations =
    language === 'en' ? galleryTranslationsEN : galleryTranslationsPL
  const categoryData = galleryTranslations.categoryPages?.[category] || {}

  const filteredPhotos = useMemo(
    () =>
      filterImagesByCategory(
        data.images,
        category,
        imagePrefix || category,
        imageDir || category
      ),
    [data.images, category, imagePrefix, imageDir]
  )

  const lightboxPhotos = filteredPhotos.map(photo => ({
    src: photo.src,
    alt: photo.alt,
    title: photo.title,
  }))

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setViewerIsOpen(false)
    setTimeout(() => setCurrentImage(0), 300)
  }, [])

  const faqItems =
    GALLERY_FAQ_DATA[language]?.[category] ||
    GALLERY_FAQ_DATA.pl[category] ||
    []

  const serviceLink =
    language === 'en'
      ? `/en${SERVICE_LINK_MAP[category]}`
      : SERVICE_LINK_MAP[category]

  const galleryLink = language === 'en' ? '/en/gallery/' : '/gallery/'

  const h1 = categoryData.h1 || ''
  const intro = categoryData.intro || ''
  const ctaService = categoryData.ctaService || ''
  const ctaGallery = categoryData.ctaGallery || t('backToGallery', 'Galeria')
  const imageCount = categoryData.imageCount || `${filteredPhotos.length}`

  return (
    <Layout>
      <StyledSection>
        <CategoryPageWrapper>
          <CategoryHeading>{h1}</CategoryHeading>
          <CategoryIntro>{intro}</CategoryIntro>

          <ImageCountWrapper>
            <ImageCountBadge>{imageCount}</ImageCountBadge>
          </ImageCountWrapper>

          {filteredPhotos.length > 0 ? (
            <GalleryWrapper
              photos={filteredPhotos}
              onClick={openLightbox}
              margin={4}
            />
          ) : null}

          <Lightbox
            open={viewerIsOpen}
            close={closeLightbox}
            index={currentImage}
            slides={lightboxPhotos}
            carousel={{ finite: true }}
            on={{
              view: ({ index }) => setCurrentImage(index),
            }}
          />

          <CTASection>
            <CTALink href={serviceLink}>{ctaService}</CTALink>
            <CTALink href={galleryLink}>{ctaGallery}</CTALink>
          </CTASection>

          {faqItems.length > 0 && (
            <FAQSection>
              <FAQHeading>
                {language === 'en' ? 'Frequently Asked Questions' : 'Często zadawane pytania'}
              </FAQHeading>
              {faqItems.map(item => (
                <FAQItem key={item.question}>
                  <FAQQuestion>{item.question}</FAQQuestion>
                  <FAQAnswer>{item.answer}</FAQAnswer>
                </FAQItem>
              ))}
            </FAQSection>
          )}
        </CategoryPageWrapper>
      </StyledSection>
    </Layout>
  )
}

export function Head({ location, pageContext }) {
  const language = detectLanguageForSEO(pageContext, location)
  const { category } = pageContext

  const seoKey = SEO_KEY_MAP[category]
  const seoTranslations = language === 'en' ? seoTranslationsEN : seoTranslationsPL
  const seoData = seoTranslations[seoKey] || {}

  const faqItems =
    GALLERY_FAQ_DATA[language]?.[category] ||
    GALLERY_FAQ_DATA.pl[category] ||
    []

  return (
    <>
      <EnhancedSEO
        title={seoData.title || ''}
        description={seoData.description || ''}
        pathname={location.pathname}
        pageType="gallery"
        language={language}
        noindex={false}
      />
      <BreadcrumbSchema
        pathname={location.pathname}
        url={`${WEBSITE_URL}${location.pathname}`}
        language={language}
      />
      <FAQSchema
        faqData={faqItems}
        pathname={location.pathname}
        language={language}
      />
    </>
  )
}

export default GalleryCategoryPageTemplate

export const query = graphql`
  query GalleryCategoryQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    images: allFile(filter: { relativeDirectory: { regex: "/gallery\\/.*$/" } }) {
      edges {
        node {
          id
          relativeDirectory
          name
          childImageSharp {
            gatsbyImageData(
              width: 800
              height: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              transformOptions: { cropFocus: CENTER, fit: COVER }
              quality: 85
              breakpoints: [400, 600, 800, 1200]
            )
            original {
              width
              height
            }
          }
        }
      }
    }
  }
`
