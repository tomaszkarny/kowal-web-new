/**
 * Site Theme Configuration
 *
 * Primary color changed from blue (#525fc4) to ember (#e85c41)
 * to match the Forged Iron design system used in Cities.
 */
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_SHADOWS,
} from '../components/Cities/styles/forgedIronTheme'

export const THEME = {
  color: {
    // Primary - now uses ember from Forged Iron system (was #525fc4)
    primary: FORGE_COLORS.ember, // #e85c41
    primaryHover: '#c94a33', // darker ember for hover
    primaryLight: FORGE_COLORS.emberGlow, // #ff6b4a

    // Existing colors (unchanged)
    main: '#f5f5f5',
    dark: '#171727',
    darkBlue: '#0a1331',
    darkGray: '#5d5f65',
    error: '#F21430',
    gray: '#4b4b4b',
    light: '#f8f8f8',
    silver: '#C2C2C2',
    dustyGray: '#A1A2A0',
    lightBlue: '#21273d',
    lightGray: '#efefef',
    shadow: '0px 2px 10px 2px rgba(231, 234, 242, 1)',
    success: FORGE_COLORS.success, // #00b894
    white: '#ffffff',
    bluewood: '#283C46',
    mirage: '#1D2D35',

    // Forge colors available for direct use
    ember: FORGE_COLORS.ember,
    emberGlow: FORGE_COLORS.emberGlow,
    iron: FORGE_COLORS.iron,
  },
  breakpoints: {
    small: 576,
    tablet: 768,
    medium: 992,
    large: 1170,
  },
  shadows: {
    default: '0px 2px 10px 2px rgba(231, 234, 242, 1)',
    ember: FORGE_SHADOWS.emberButton,
    emberGlow: FORGE_SHADOWS.emberGlow,
  },
  gradients: FORGE_GRADIENTS,
}
