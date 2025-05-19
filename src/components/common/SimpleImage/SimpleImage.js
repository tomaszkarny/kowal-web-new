import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders a simple image with optimized attributes for SEO and performance
 * @param {Object} props - Component props
 * @param {string|Object} props.src - Image source URL or import object
 * @param {string} props.alt - Alt text for the image
 * @param {number} props.width - Optional width attribute
 * @param {number} props.height - Optional height attribute
 */
export const SimpleImage = ({ src, alt = '', width, height, ...rest }) => {
  // If import statyczny zawiera wymiary (webpack), wykorzystaj je
  const meta = typeof src === 'object' && src !== null ? src : {}

  return (
    <img
      src={typeof src === 'string' ? src : meta.src || ''}
      alt={alt}
      width={width || meta.width}
      height={height || meta.height}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  )
}

SimpleImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

export default SimpleImage
