import React, { useState, useCallback, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

// Import the modern lightbox library
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { GalleryWrapper } from 'components/common/GalleryWrapper/GalleryWrapper'
import { ContentContainer } from 'components/common/Container/Container.styles'
import {
  GalleryFilterContainer,
  GalleryHeading,
  FilterLabel,
  FilterButtonGroup,
  FilterButton,
  EmptyStateMessage,
} from './GalleryPage.styles'

export function GalleryPage() {
  const { t } = useTranslation('gallery')
  const { images } = useStaticQuery(graphql`
    query GalleryQuery {
      images: allFile(filter: { relativeDirectory: { regex: "/gallery\\/.*$/" } }) {
        edges {
          node {
            id
            relativeDirectory
            childImageSharp {
              gatsbyImageData(
                width: 800
                height: 600
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                transformOptions: { 
                  cropFocus: CENTER
                  fit: COVER 
                }
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

  // Extract unique categories from the image paths
  const categories = useMemo(() => {
    // Get all directories from the images
    const dirs = images.edges.map(edge => {
      const relDir = edge.node.relativeDirectory;
      // Extract the category from paths like 'gallery/balustrades/exterior'
      const match = relDir.match(/gallery\/(\w+)(?:\/\w+)?/);
      return match ? match[1] : null;
    }).filter(Boolean);
    
    // Get unique categories and sort alphabetically
    return ['all', ...new Set(dirs)].sort();
  }, [images]);

  // State for the currently selected category and subcategory
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  // Process the gallery photos with category information
  const allGalleryPhotos = useMemo(() => images.edges.map(photo => {
      const imageData = getImage(photo.node.childImageSharp);
      // Try to find a translation key based on the image name, fall back to the name itself
      const translationKey = `images.${photo.node.name}`;
      
      // Extract category from the relative directory
      const relDir = photo.node.relativeDirectory;
      const categoryMatch = relDir.match(/gallery\/(\w+)(?:\/\w+)?/);
      const category = categoryMatch ? categoryMatch[1] : 'other';
      
      return {
        src: getSrc(imageData),
        width: photo.node.childImageSharp.original.width,
        height: photo.node.childImageSharp.original.height,
        alt: t(translationKey, photo.node.name),
        title: t(translationKey, photo.node.name),
        category,
        relativeDirectory: relDir, // Keep the full relative directory for subcategory filtering
      };
    }), [images, t]);
  
  // Filter photos based on the active category and subcategory
  const galleryPhotos = useMemo(() => {
    // Show all photos
    if (activeCategory === 'all') {
      return allGalleryPhotos;
    }
    
    // Handle special subcategory cases
    if (activeCategory === 'balustrades-interior') {
      return allGalleryPhotos.filter(photo => {
        // Match interior balustrades by looking at the directory
        const isInteriorBalustrade = photo.relativeDirectory && 
          photo.relativeDirectory.includes('balustrades/interior');
        return isInteriorBalustrade;
      });
    }
    
    if (activeCategory === 'balustrades-exterior') {
      return allGalleryPhotos.filter(photo => {
        // Match exterior balustrades by looking at the directory
        const isExteriorBalustrade = photo.relativeDirectory && 
          photo.relativeDirectory.includes('balustrades/exterior');
        return isExteriorBalustrade;
      });
    }
    
    // Default: filter by main category
    return allGalleryPhotos.filter(photo => photo.category === activeCategory);
  }, [allGalleryPhotos, activeCategory, activeSubcategory])
  
  // Format photos for lightbox which has a slightly different format
  const lightboxPhotos = galleryPhotos.map(photo => ({
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
    // Delay resetting currentImage to prevent flickering
    setTimeout(() => setCurrentImage(0), 300)
  }, [])

  return (
    <ContentContainer>
      <GalleryFilterContainer>
        <GalleryHeading>{t('title')}</GalleryHeading>
        <FilterLabel>{t('filter')}</FilterLabel>
        
        {/* Primary category filter buttons */}
        <FilterButtonGroup>
          <FilterButton 
            key="all"
            index={0}
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
          >
            {/* Use translated value from translation files */}
            {t('categories.all')}
          </FilterButton>
          
          {/* Only show balustrades directly */}
          <FilterButton 
            key="balustrades"
            index={1}
            active={activeCategory === 'balustrades'}
            onClick={() => setActiveCategory('balustrades')}
            aria-pressed={activeCategory === 'balustrades'}
            title={t('descriptions.balustrades')}
          >
            {t('categories.balustrades')}
          </FilterButton>

          {/* Direct interior balustrades button */}
          <FilterButton 
            key="balustrades-interior"
            index={2}
            active={activeCategory === 'balustrades-interior'}
            onClick={() => setActiveCategory('balustrades-interior')}
            aria-pressed={activeCategory === 'balustrades-interior'}
            title={t('descriptions.balustrades_interior')}
          >
            {t('subcategories.balustrades.interior')}
          </FilterButton>

          {/* Direct exterior balustrades button */}
          <FilterButton 
            key="balustrades-exterior"
            index={3}
            active={activeCategory === 'balustrades-exterior'}
            onClick={() => setActiveCategory('balustrades-exterior')}
            aria-pressed={activeCategory === 'balustrades-exterior'}
            title={t('descriptions.balustrades_exterior')}
          >
            {t('subcategories.balustrades.exterior')}
          </FilterButton>

          {/* Gates button */}
          <FilterButton 
            key="gates"
            index={4}
            active={activeCategory === 'gates'}
            onClick={() => setActiveCategory('gates')}
            aria-pressed={activeCategory === 'gates'}
            title={t('descriptions.gates')}
          >
            {t('categories.gates')}
          </FilterButton>
          
          {/* Fences button */}
          <FilterButton 
            key="fences"
            index={5}
            active={activeCategory === 'fences'}
            onClick={() => setActiveCategory('fences')}
            aria-pressed={activeCategory === 'fences'}
            title={t('descriptions.fences')}
          >
            {t('categories.fences')}
          </FilterButton>
          
          {/* Decorative Elements button */}
          <FilterButton 
            key="decorative_elements"
            index={6}
            active={activeCategory === 'decorative_elements'}
            onClick={() => setActiveCategory('decorative_elements')}
            aria-pressed={activeCategory === 'decorative_elements'}
            title={t('descriptions.decorative_elements')}
          >
            {t('categories.decorative_elements')}
          </FilterButton>
        </FilterButtonGroup>
        
        {/* No subcategory section as per request */}
      </GalleryFilterContainer>

      {galleryPhotos.length > 0 ? (
        <GalleryWrapper 
          photos={galleryPhotos.map(({ relativeDirectory, ...rest }) => rest)} 
          onClick={openLightbox} 
          margin={4} 
        />
      ) : (
        <EmptyStateMessage>{t('emptyState', 'No images found in this category')}</EmptyStateMessage>
      )}
      
      {/* Modern Lightbox component that doesn't use deprecated React APIs */}
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
    </ContentContainer>
  )
}
