/**
 * "Forged Iron" Design System
 *
 * Inspired by the craft of blacksmithing:
 * - Glowing embers and hot metal
 * - Hammered iron surfaces
 * - The warmth of the forge contrasting with cool iron
 */

// Color Palette
export const FORGE_COLORS = {
  // Forge warmth - the glow of hot metal
  ember: '#e85c41',
  emberGlow: '#ff6b4a',
  emberHot: '#ffab40',

  // Iron tones - the finished product
  iron: '#2d2d44',
  ironLight: '#3a3a52',
  ironDark: '#1e1e32',

  // Workshop surfaces
  cardLight: '#faf9f7',
  cardBorder: '#e5e3df',
  sectionBg: '#f5f4f2',
  white: '#ffffff',

  // Text
  textPrimary: '#1a1a2e',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  textOnDark: '#e8e6e3',

  // Utility
  success: '#00b894',
}

// Hammered metal texture - SVG noise pattern
export const hammeredTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

// Common gradients
export const FORGE_GRADIENTS = {
  emberGradient: `linear-gradient(90deg, ${FORGE_COLORS.ember}, ${FORGE_COLORS.emberGlow})`,
  ironGradient: `linear-gradient(180deg, ${FORGE_COLORS.ironLight} 0%, ${FORGE_COLORS.iron} 100%)`,
  ironDarkGradient: `linear-gradient(145deg, ${FORGE_COLORS.ironDark} 0%, ${FORGE_COLORS.iron} 100%)`,
}

// Common shadows
export const FORGE_SHADOWS = {
  card: '0 4px 20px rgba(45, 45, 68, 0.1)',
  cardSubtle: '0 4px 12px rgba(45, 45, 68, 0.08)',
  cardHover: '0 8px 24px rgba(45, 45, 68, 0.12)',
  emberGlow: '0 0 20px rgba(232, 92, 65, 0.3)',
  emberButton: '0 2px 8px rgba(232, 92, 65, 0.3)',
}

// Common transitions - consolidated from 20+ duplications
export const FORGE_TRANSITIONS = {
  default: 'all 0.3s ease',
  fast: 'all 0.2s ease',
  smooth: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  easeInOut: 'all 0.3s ease-in-out',
  transform: 'transform 0.3s ease',
  opacity: 'opacity 0.3s ease',
}

// Hover transforms - consolidated from 25+ duplications
export const FORGE_HOVER = {
  liftSmall: 'translateY(-2px)',
  liftMedium: 'translateY(-3px)',
  liftLarge: 'translateY(-4px)',
  liftXLarge: 'translateY(-5px)',
  scale: 'scale(1.02)',
}

// Media query breakpoints - consolidated from 44+ hardcoded values
export const FORGE_BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
}

// Media query helpers - use as template literals
export const FORGE_MEDIA = {
  mobile: `@media (max-width: ${FORGE_BREAKPOINTS.mobile})`,
  tablet: `@media (max-width: ${FORGE_BREAKPOINTS.tablet})`,
  desktop: `@media (min-width: ${FORGE_BREAKPOINTS.desktop})`,
  wide: `@media (min-width: ${FORGE_BREAKPOINTS.wide})`,
}

// Border radius patterns
export const FORGE_RADIUS = {
  card: '0 0 4px 4px',
  cardWithCorner: '4px 4px 4px 20px',
  button: '4px',
  tag: '4px',
  full: '9999px',
}

// Typography - consolidated font stacks
export const FORGE_TYPOGRAPHY = {
  heading: "'Merriweather', Georgia, serif",
  body: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
}

// Spacing scale - consolidated common gap values
export const FORGE_SPACING = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
}

// Site-wide color aliases - for replacing theme.color.primary across the site
// Use these in components that previously used #525fc4 (blue)
export const SITE_COLORS = {
  // Primary accent - replaces #525fc4
  primary: FORGE_COLORS.ember, // #e85c41
  primaryHover: '#c94a33', // darker ember for hover states
  primaryLight: FORGE_COLORS.emberGlow, // #ff6b4a - for gradients

  // Alpha variants for shadows and overlays
  primaryAlpha: (opacity) => `rgba(232, 92, 65, ${opacity})`,

  // Spread operator to include all forge colors
  ...FORGE_COLORS,
}
