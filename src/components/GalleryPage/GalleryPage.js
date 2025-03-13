import React, { useState, useCallback } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Gallery from 'react-photo-gallery'

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
    <div style={{ padding: '3rem' }}>
      <Gallery photos={galleryPhotos} onClick={openLightbox} margin={4} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={galleryPhotos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  )
}
