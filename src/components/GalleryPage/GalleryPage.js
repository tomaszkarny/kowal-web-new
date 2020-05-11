import React, { useState, useCallback } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { graphql, useStaticQuery } from 'gatsby'

import Gallery from 'react-photo-gallery'

export const GalleryPage = () => {
  const { images } = useStaticQuery(graphql`
    query GalleryQuery {
      images: allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
        edges {
          node {
            id
            sharp: childImageSharp {
              fluid(maxWidth: 1200) {
                srcWebp
                presentationWidth
                presentationHeight
                sizes
                srcSetWebp
                originalName
                originalName
              }
            }
          }
        }
      }
    }
  `)

  const galleryPhotos = images.edges.map(photo => ({
    src: photo.node.sharp.fluid.srcWebp,
    width: photo.node.sharp.fluid.presentationWidth,
    height: photo.node.sharp.fluid.presentationHeight,
    sizes: photo.node.sharp.fluid.sizes,
    srcSet: photo.node.sharp.fluid.srcSetWebp,
    alt: photo.node.sharp.fluid.originalName,
    title: photo.node.sharp.fluid.originalName,
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
    <div style={{ padding: '3rem' }}>
      <Gallery photos={galleryPhotos} onClick={openLightbox} />
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
