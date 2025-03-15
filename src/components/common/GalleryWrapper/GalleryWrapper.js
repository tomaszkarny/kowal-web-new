import React from 'react'
import Gallery from 'react-photo-gallery'

/**
 * Wrapper component for react-photo-gallery to suppress defaultProps warning
 * This handles the warning: "Support for defaultProps will be removed from memo components"
 * by setting all default prop values directly in the component.
 */
export const GalleryWrapper = (props) => {
  // Define all default values here instead of relying on defaultProps
  const {
    photos,
    onClick,
    margin = 2,  // Set default margin
    targetRowHeight = 300,  // Default from react-photo-gallery
    columns = 1,  // Default from react-photo-gallery
    direction = 'row',  // Default from react-photo-gallery
    renderImage = undefined  // Default from react-photo-gallery
  } = props;

  return (
    <Gallery
      photos={photos}
      onClick={onClick}
      margin={margin}
      targetRowHeight={targetRowHeight}
      columns={columns}
      direction={direction}
      renderImage={renderImage}
    />
  )
}
