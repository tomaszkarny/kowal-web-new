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
import faqTranslationsPL from '../../locales/pl/faq.json'
import faqTranslationsEN from '../../locales/en/faq.json'

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
    .filter((photo) => photo.src)
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

  const lightboxPhotos = filteredPhotos.map((photo) => ({
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

  const faqTranslations =
    language === 'en' ? faqTranslationsEN : faqTranslationsPL
  const faqItems = faqTranslations.galleryCategories?.[category] || []

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
            <CTALink to={serviceLink}>{ctaService}</CTALink>
            <CTALink to={galleryLink}>{ctaGallery}</CTALink>
          </CTASection>

          {faqItems.length > 0 && (
            <FAQSection>
              <FAQHeading>
                {language === 'en'
                  ? 'Frequently Asked Questions'
                  : 'Często zadawane pytania'}
              </FAQHeading>
              {faqItems.map((item) => (
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
  const seoTranslations =
    language === 'en' ? seoTranslationsEN : seoTranslationsPL
  const seoData = seoTranslations[seoKey] || {}

  const faqTranslations =
    language === 'en' ? faqTranslationsEN : faqTranslationsPL
  const faqItems = faqTranslations.galleryCategories?.[category] || []

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
    images: allFile(
      filter: { relativeDirectory: { regex: "/^gallery(/.+)?$/" } }
    ) {
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
