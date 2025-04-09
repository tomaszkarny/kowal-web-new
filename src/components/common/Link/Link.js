import React from 'react'

import { StyledLink } from 'components/common/Link/Link.styles'

/**
 * Enhanced Link component
 * Uses Gatsby's built-in prefetching which is better than manual prefetching
 * @param {string} text - The text to display in the link
 * @param {boolean} primary - Whether this is a primary link (affects styling)
 * @param {string} to - The destination URL
 * @param {boolean} main - Whether this is a main link (affects width on tablet+)
 * @param {function} onClick - Optional click handler
 * @param {string} name - Optional name attribute
 * @param {string} customStyles - Optional custom CSS styles as template literal
 */
export const Link = ({ text, primary, to, main, onClick, name, customStyles }) => {
  // Custom click handler
  const handleClick = (e) => {
    // If there's a custom onClick handler, call it
    if (onClick) {
      onClick(e);
    }
  };

  // Check if external link
  const isExternal = to && (to.startsWith('http') || to.startsWith('mailto') || to.startsWith('tel'));

  return (
    <StyledLink
      to={to}
      primary={primary}
      main={main}
      onClick={handleClick}
      name={name}
      customStyles={customStyles}
      data-gatsby-link="true"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {text}
    </StyledLink>
  )
}
