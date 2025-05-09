import React from 'react'
import { Global, css } from '@emotion/react'

/**
 * Fonts component that loads Google Fonts
 * This component should be included in the Layout
 */
export const Fonts = () => (
  <Global
    styles={css`
      /* Import Google fonts directly in CSS */
      @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=PT+Sans:wght@400;700&display=swap');

      /* Font display optimization */
      @font-face {
        font-family: 'Merriweather';
        font-display: swap;
      }
      @font-face {
        font-family: 'PT Sans';
        font-display: swap;
      }
    `}
  />
)
