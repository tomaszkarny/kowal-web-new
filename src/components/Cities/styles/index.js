/**
 * City Styles - Barrel Export
 * Import from 'components/Cities/styles' for convenience
 *
 * This module exports the Forged Iron design system used across the site.
 * For replacing blue (#525fc4) with ember, use SITE_COLORS and Ember* components.
 */

// Theme constants
export {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_BREAKPOINTS,
  FORGE_MEDIA,
  FORGE_RADIUS,
  FORGE_TYPOGRAPHY,
  FORGE_SPACING,
  hammeredTexture,
  // Site-wide color aliases (replaces #525fc4)
  SITE_COLORS,
} from './forgedIronTheme'

// Shared styled components
export {
  // Layout
  CitySection,
  CityContainer,
  // Typography
  CityTitle,
  CitySubtitle,
  // Cards
  CityCard,
  CityCardCorner,
  CityCardTitle,
  // Grid
  CityGrid,
  // Tags
  CityTag,
  CityTagStatic,
  // Lists
  CityFeatureItem,
  featureItemStyles,
  // Info boxes
  CityInfoBox,
  CityInfoTitle,
  // Site-wide reusable components (replaces blue components)
  EmberButton,
  EmberButtonOutline,
  EmberLink,
  EmberAccentLine,
  EmberIcon,
  EmberCheckIcon,
  emberPulseKeyframes,
  EmberInput,
  EmberTextarea,
} from './sharedStyles'
