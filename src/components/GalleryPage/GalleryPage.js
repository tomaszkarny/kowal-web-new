import React, { useState, useCallback, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { fadeInScale, slideUp, springScale } from 'components/common/animations/animations'

// Import the modern lightbox library
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { GalleryWrapper } from 'components/common/GalleryWrapper/GalleryWrapper'
import { ContentContainer } from 'components/common/Container/Container.styles'
import { THEME } from 'consts/theme'

// Styled components for the filter UI
const GalleryFilterContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeInScale} 0.6s ease-out forwards;
  
  @media (max-width: ${THEME.breakpoints.tablet}px) {
    margin-bottom: 1.5rem;
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const GalleryHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${THEME.color.darkBlue};
`

const FilterLabel = styled.p`
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: ${THEME.color.darkGray};
`

const FilterButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${THEME.breakpoints.small}px) {
    gap: 0.3rem;
    margin-bottom: 1rem;
  }
`

const FilterButton = styled.button`
  background: ${props => props.active ? THEME.color.primary : THEME.color.light};
  color: ${props => props.active ? THEME.color.white : THEME.color.darkGray};
  border: 1px solid ${props => props.active ? THEME.color.primary : THEME.color.silver};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: center;
  min-width: 100px; /* Ensure buttons maintain minimum width for shorter text */
  white-space: normal; /* Allow wrapping for extra long translations */
  hyphens: auto; /* Enable hyphenation for long words in Polish */
  
  /* Simple transitions for smooth effects */
  transition: background-color 0.3s ease,
              color 0.2s ease,
              border-color 0.2s ease,
              box-shadow 0.3s ease,
              transform 0.2s ease;
  
  /* Active state styles */
  ${props => props.active && css`
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(82, 95, 196, 0.3);
  `}
  
  &:hover, &:focus {
    background: ${props => props.active ? THEME.color.primary : THEME.color.lightGray};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    outline: none;
    transform: translateY(-2px);
  }
  
  &:focus-visible {
    outline: 2px solid ${THEME.color.primary};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(82, 95, 196, 0.2);
  }
  
  @media (max-width: ${THEME.breakpoints.tablet}px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    min-width: 90px;
  }
  
  @media (max-width: ${THEME.breakpoints.small}px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.8rem;
    min-width: 80px;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const SubcategoryFilterGroup = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${THEME.color.lightGray};
`

const SubcategoryLabel = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${THEME.color.darkGray};
  font-style: italic;
`

const SubcategoryButton = styled(FilterButton)`
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  background: ${THEME.color.lightGray};
  border-color: ${THEME.color.silver};
  min-width: 90px; /* Smaller minimum width for subcategory buttons */
  
  &:hover, &:focus {
    background: ${THEME.color.silver};
    color: ${THEME.color.darkBlue};
  }
  
  @media (max-width: ${THEME.breakpoints.tablet}px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
    min-width: 80px;
  }
  
  @media (max-width: ${THEME.breakpoints.small}px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    min-width: 70px;
  }
`

const EmptyStateMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${THEME.color.light};
  border-radius: 4px;
  color: ${THEME.color.darkGray};
  font-size: 1.1rem;
`

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
