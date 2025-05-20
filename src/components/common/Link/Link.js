import React from 'react'
import { Link as GatsbyI18nLink } from 'gatsby-plugin-react-i18next'

import { StyledLink } from 'components/common/Link/Link.styles'

/**
 * Enhanced Link component with proper i18n support
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

  // For external links, use a regular <a> tag
  // For internal links, use the GatsbyI18nLink component
  if (isExternal) {
    return (
      <StyledLink
        as="a" // Using regular <a> tag for external links
        href={to} // This is key - using href instead of to for regular <a> tag
        primary={primary}
        main={main}
        onClick={handleClick}
        name={name}
        customStyles={customStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </StyledLink>
    );
  }
  
  // For internal links we use GatsbyI18nLink which preserves language context
  return (
    <StyledLink
      as={GatsbyI18nLink} // This is crucial - using GatsbyI18nLink!
      to={to}
      primary={primary}
      main={main}
      onClick={handleClick}
      name={name}
      customStyles={customStyles}
      data-gatsby-link="true"
    >
      {text}
    </StyledLink>
  )
}
