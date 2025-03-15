import React, { useState, useCallback } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

// Import the modern lightbox library
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { GalleryWrapper } from 'components/common/GalleryWrapper/GalleryWrapper'
import { ContentContainer } from 'components/common/Container/Container.styles'

export const GalleryPage = () => {
  const { t } = useTranslation('gallery')
  const { images } = useStaticQuery(graphql`
    query GalleryQuery {
      images: allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
        edges {
          node {
            id
            childImageSharp {
              gatsbyImageData(width: 1200, formats: [AUTO, WEBP], placeholder: BLURRED)
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

  const galleryPhotos = images.edges.map(photo => {
    const imageData = getImage(photo.node.childImageSharp)
    // Try to find a translation key based on the image name, fall back to the name itself
    const translationKey = `images.${photo.node.name}`
    return {
      src: getSrc(imageData),
      width: photo.node.childImageSharp.original.width,
      height: photo.node.childImageSharp.original.height,
      alt: t(translationKey, photo.node.name),
      title: t(translationKey, photo.node.name),
    }
  })
  
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

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <ContentContainer>
      <GalleryWrapper photos={galleryPhotos} onClick={openLightbox} margin={4} />
      
      {/* Modern Lightbox component that doesn't use deprecated React APIs */}
      <Lightbox
        open={viewerIsOpen}
        close={closeLightbox}
        index={currentImage}
        slides={lightboxPhotos}
        carousel={{ finite: true }}
        render={{
          buttonPrev: currentImage === 0 ? () => null : undefined,
          buttonNext: currentImage === lightboxPhotos.length - 1 ? () => null : undefined,
        }}
      />
    </ContentContainer>
  )
}
