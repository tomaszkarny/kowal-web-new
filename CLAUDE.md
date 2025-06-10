# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Build**: `npm run build` or `npm run build:production` (with env vars)
- **Development**: `npm run develop` or `npm run start`
- **Serve built site**: `npm run serve`
- **Clean cache**: `npm run clean`
- **Format code**: `npm run format`
- **Lint**: `npx eslint src/**/*.js`
- **i18n validation**: `npm run i18n:check` (validates translations)
- **i18n code generation**: `npm run i18n:generate` (generates TypeScript enums)
- **SEO checks**: `npm run seo:lint` (validates meta tags)
- **Validate sitemap**: `npm run validate:sitemap`
- **Lighthouse**: `npm run lighthouse` (performance testing)

## Code Style Guidelines
- **Formatting**: Prettier config - single quotes, no semicolons, 2-space indentation, trailing commas (ES5)
- **Linting**: Airbnb ESLint config with custom overrides (prop-types disabled, prefer-default-export disabled)
- **Component Structure**: React functional components with named exports
- **Styling**: Emotion (CSS-in-JS) with separate `.styles.js` files
- **Imports**: Group by: React, Gatsby/libraries, components, styles, constants
- **File Organization**: Components in folders with `ComponentName.js` and `ComponentName.styles.js`
- **Naming**: PascalCase for components, camelCase for functions/variables
- **i18n**: react-i18next with JSON locale files, TypeScript enum support
- **Error Handling**: Handle errors explicitly in async operations

## Project Architecture

This is a multilingual (PL/EN) Gatsby static site for an artistic blacksmithing company, featuring:

### Core Technologies
- **Gatsby v5** - Static site generation with React
- **Emotion** - CSS-in-JS styling with theme support
- **react-i18next** - Internationalization with 9 namespaces
- **GraphQL** - Data layer for images and content
- **PWA** - Progressive Web App with offline support

### Key Architectural Patterns

1. **Page Generation**: City pages are programmatically created in `gatsby-node.js` using templates. Each city has distance calculations to nearby areas.

2. **i18n Strategy**: 
   - Default language: Polish (pl)
   - URL structure: `/pl/*` for Polish, `/en/*` for English
   - Namespaces: common, about, gallery, contact, seo, footer, faq, cities, services
   - Translation keys can be typed using generated enums

3. **SEO Implementation**:
   - Enhanced SEO component with structured data (LocalBusiness, Service, FAQ schemas)
   - City-specific SEO with local business markup
   - Multilingual sitemap with proper hreflang tags
   - Dynamic meta tags based on page content

4. **Component Patterns**:
   - Container components handle data/logic
   - Presentational components in separate files
   - Styles isolated in `.styles.js` files using Emotion
   - Heavy use of React.memo for performance

5. **Performance Optimizations**:
   - Gatsby Image for optimized image loading
   - Code splitting at route level
   - PWA with offline caching strategy
   - Lazy loading for gallery images
   - Web Vitals monitoring

6. **Data Management**:
   - City data centralized in `src/data/cities.js`
   - Distance calculations in `src/utils/cityDistanceCalculator.js`
   - Translation files in `locales/[lang]/*.json`
   - Site metadata in `gatsby-config.js`