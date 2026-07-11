import React, { useState, useCallback, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

// Lightbox
import Lightbox from 'yet-another-react-lightbox'
// eslint-disable-next-line import/no-unresolved
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
// eslint-disable-next-line import/no-unresolved
import Captions from 'yet-another-react-lightbox/plugins/captions'
// eslint-disable-next-line import/no-unresolved
import Counter from 'yet-another-react-lightbox/plugins/counter'
// eslint-disable-next-line import/no-unresolved
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
// eslint-disable-next-line import/no-unresolved
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/styles.css'
// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/plugins/thumbnails.css'
// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/plugins/captions.css'
// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/plugins/counter.css'

import { ContentContainer } from 'components/common/Container/Container.styles'
import { PageDescription } from 'components/common/PageDescription'
import { MasonryGallery } from './MasonryGallery'
import { GalleryHero } from './GalleryHero'
import { GalleryFilterBar } from './GalleryFilterBar'
import {
  EmptyStateMessage,
  GalleryGridSection,
} from './GalleryPage.styles'
import {
  CategorySectionWrapper,
  CategorySectionTitle,
  CategoryGrid,
  CategoryCard,
  CategoryName,
  CategoryDescription,
  CategoryCount,
} from './GalleryCategorySection.styles'

// Map filename prefixes to categories for flat images (e.g. bramy1.jpg → gates)
const PREFIX_TO_CATEGORY = {
  bramy: 'gates',
  balu: 'balustrades',
  ogrodz: 'fences',
  elo: 'decorative_elements',
}

// SEO internal links to category subpages — preserved for crawlability
const SEO_CATEGORIES = [
  { key: 'gates', path: '/gallery/wrought-iron-gates/' },
  { key: 'balustrades', path: '/gallery/wrought-iron-railings/' },
  { key: 'fences', path: '/gallery/wrought-iron-fences/' },
]

export function GalleryPage() {
  const { t, i18n } = useTranslation('gallery')
  const langPrefix = i18n.language === 'en' ? '/en' : ''

  const { images } = useStaticQuery(graphql`
    query GalleryQuery {
      images: allFile(filter: { relativeDirectory: { regex: "/^gallery(\\/.+)?$/" } }) {
        edges {
          node {
            id
            relativeDirectory
            childImageSharp {
              gatsbyImageData(
                width: 800
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                quality: 85
                breakpoints: [400, 600, 800, 1200]
              )
              original {
                width
                height
              }
            }
            name
          }
        }
      }
    }
  `)

  // Extract unique primary categories from image paths
  const categories = useMemo(() => {
    const dirs = images.edges.map(edge => {
      const relDir = edge.node.relativeDirectory
      const match = relDir.match(/gallery\/(\w+)(?:\/\w+)?/)
      if (match) return match[1]
      const name = edge.node.name || ''
      const prefix = Object.keys(PREFIX_TO_CATEGORY).find(p =>
        name.toLowerCase().startsWith(p)
      )
      return prefix ? PREFIX_TO_CATEGORY[prefix] : null
    }).filter(Boolean)

    return ['all', ...new Set(dirs)].sort()
  }, [images])

  // Active category + transition state
  const [activeCategory, setActiveCategory] = useState('all')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleCategoryChange = useCallback(newCategory => {
    if (newCategory === activeCategory) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveCategory(newCategory)
      setIsTransitioning(false)
    }, 200)
  }, [activeCategory])

  // Process the gallery photos with category information
  const allGalleryPhotos = useMemo(() => images.edges.map(photo => {
    const translationKey = `images.${photo.node.name}`
    const relDir = photo.node.relativeDirectory
    const categoryMatch = relDir.match(/gallery\/(\w+)(?:\/\w+)?/)
    // eslint-disable-next-line prefer-destructuring
    let category = categoryMatch ? categoryMatch[1] : 'other'
    if (!categoryMatch) {
      const name = photo.node.name || ''
      const prefix = Object.keys(PREFIX_TO_CATEGORY).find(p =>
        name.toLowerCase().startsWith(p)
      )
      if (prefix) category = PREFIX_TO_CATEGORY[prefix]
    }

    return {
      node: photo.node,
      alt: t(translationKey, photo.node.name),
      title: t(translationKey, photo.node.name),
      category,
      relativeDirectory: relDir,
    }
  }), [images, t])

  // Filter photos based on active category
  const galleryPhotos = useMemo(() => {
    if (activeCategory === 'all') return allGalleryPhotos

    if (activeCategory === 'balustrades-interior') {
      return allGalleryPhotos.filter(photo =>
        photo.relativeDirectory &&
        photo.relativeDirectory.includes('balustrades/interior')
      )
    }

    if (activeCategory === 'balustrades-exterior') {
      return allGalleryPhotos.filter(photo =>
        photo.relativeDirectory &&
        photo.relativeDirectory.includes('balustrades/exterior')
      )
    }

    return allGalleryPhotos.filter(photo => photo.category === activeCategory)
  }, [allGalleryPhotos, activeCategory])

  // Compute image counts for each pill
  const imageCounts = useMemo(() => {
    const counts = { all: allGalleryPhotos.length }
    categories.forEach(cat => {
      if (cat === 'all') return
      counts[cat] = allGalleryPhotos.filter(p => p.category === cat).length
    })
    counts['balustrades-interior'] = allGalleryPhotos.filter(p =>
      p.relativeDirectory && p.relativeDirectory.includes('balustrades/interior')
    ).length
    counts['balustrades-exterior'] = allGalleryPhotos.filter(p =>
      p.relativeDirectory && p.relativeDirectory.includes('balustrades/exterior')
    ).length
    return counts
  }, [allGalleryPhotos, categories])

  // Format photos for lightbox — resolve full-size src from the node
  const lightboxPhotos = galleryPhotos.map(photo => ({
    src: getSrc(getImage(photo.node.childImageSharp)),
    alt: photo.alt,
    title: photo.title,
    description: photo.alt, // Use alt as description for captions plugin
  }))

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback(index => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setViewerIsOpen(false)
    setTimeout(() => setCurrentImage(0), 300)
  }, [])

  return (
    <>
      <GalleryHero />

      <ContentContainer>
        <PageDescription>
          {t('intro.description')}
        </PageDescription>
      </ContentContainer>

      <CategorySectionWrapper aria-label={t('categorySection.title', 'Browse by Category')}>
        <CategorySectionTitle>
          {t('categorySection.title', 'Browse by Category')}
        </CategorySectionTitle>
        <CategoryGrid>
          {SEO_CATEGORIES.map(({ key, path }) => (
            <CategoryCard key={key} to={`${langPrefix}${path}`}>
              <CategoryName>
                {t(`categorySection.${key}.name`, key)}
              </CategoryName>
              <CategoryDescription>
                {t(`categorySection.${key}.description`, '')}
              </CategoryDescription>
              <CategoryCount>
                {t(`categorySection.${key}.count`, '')}
              </CategoryCount>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategorySectionWrapper>

      <GalleryFilterBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        imageCounts={imageCounts}
      />

      <GalleryGridSection isTransitioning={isTransitioning}>
        <ContentContainer>
          {galleryPhotos.length > 0 ? (
            <MasonryGallery
              images={galleryPhotos}
              onImageClick={openLightbox}
            />
          ) : (
            <EmptyStateMessage>
              {t('emptyState', 'No images found in this category')}
            </EmptyStateMessage>
          )}
        </ContentContainer>
      </GalleryGridSection>

      <Lightbox
        open={viewerIsOpen}
        close={closeLightbox}
        index={currentImage}
        slides={lightboxPhotos}
        plugins={[Thumbnails, Captions, Counter, Zoom, Fullscreen]}
        carousel={{ finite: true }}
        thumbnails={{
          position: 'bottom',
          width: 100,
          height: 80,
          border: 0,
          borderRadius: 4,
          padding: 4,
          gap: 8,
          showToggle: false,
        }}
        captions={{ showToggle: false, descriptionTextAlign: 'center' }}
        zoom={{ maxZoomPixelRatio: 3 }}
        on={{
          view: ({ index }) => setCurrentImage(index),
        }}
      />
    </>
  )
}
