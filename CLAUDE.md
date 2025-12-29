# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Requirements
- **Node.js**: >= 20.10.0
- **npm**: >= 10.0.0

## Commands
- **Install**: `npm install --legacy-peer-deps` (required due to peer dependency conflicts)
- **Build**: `npm run build` or `npm run build:production` (with env vars)
- **Development**: `npm run develop` or `npm run start`
- **Serve built site**: `npm run serve`
- **Clean cache**: `npm run clean`
- **Format code**: `npm run format`
- **Lint**: `npx eslint src/**/*.js`
- **i18n validation**: `npm run i18n:check` (full validation) or `npm run i18n:audit` (key sync check)
- **i18n code generation**: `npm run i18n:generate` (generates TypeScript enums)
- **SEO checks**: `npm run seo:lint` (validates meta tags)
- **Validate sitemap**: `npm run validate:sitemap`
- **Lighthouse**: `npm run lighthouse` (desktop), `npm run lighthouse:mobile` (mobile)
- **Optimize images**: `npm run optimize:images` (compression) or `npm run fix:orientation` (EXIF fixes)

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
- **react-i18next** - Internationalization with 10 namespaces
- **GraphQL** - Data layer for images and content
- **PWA** - Progressive Web App with offline support
- **Netlify** - Hosting and form handling

### Key Architectural Patterns

1. **Page Generation**: City and service pages are programmatically created in `gatsby-node.js` using templates. Each city has distance calculations from workshop location.

2. **i18n Strategy**:
   - Default language: Polish (pl)
   - URL structure: Polish pages at root (`/`), English at `/en/*`
   - Namespaces: common, about, gallery, contact, seo, footer, faq, cities, services (10 total)
   - Translation keys can be typed using generated enums from `src/i18n/`
   - Always update both `locales/pl/*.json` and `locales/en/*.json` when adding keys
   - Use enums in components: `import { CommonKeys } from '../i18n'; t(CommonKeys.siteTitle)`

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

### Critical Build & Deploy Notes

1. **Environment Variables**:
   - `GATSBY_ENV=production` required for production builds
   - `NODE_ENV=production` also required for optimization
   - Both must be set: `GATSBY_ENV=production NODE_ENV=production npm run build`

2. **City Page Generation**:
   - City pages created programmatically in `gatsby-node.js` using `createPages` API
   - Each city requires: id, slug (pl/en), name (pl/en), coordinates, region (pl/en)
   - Distance from workshop location calculated using Haversine formula
   - Workshop location: Hryniewicze 31 (53.0805839, 23.1371503), not Białystok city center

3. **URL Structure**:
   - Polish (default): `/cities/{slug}/` (no `/pl/` prefix)
   - English: `/en/cities/{slug}/`
   - Service pages follow same pattern: `/services/custom-gates/` and `/en/services/custom-gates/`
   - All city slugs use English format for consistency

4. **i18n Workflow**:
   - Translation files must stay in sync between languages
   - Pre-commit hook validates translations before allowing commit
   - Run `npm run i18n:check` before committing translation changes
   - Run `npm run i18n:generate` after adding new keys to generate TypeScript enums

5. **Common Issues**:
   - Cache issues: Run `npm run clean` before rebuilding
   - Translation sync: Both language files must have identical keys
   - City validation: All required fields must be present or build fails
   - Image paths: Images must exist in `src/assets/images/`

6. **Performance Targets** (enforced by Lighthouse CI):
   - Performance Score: > 80 (desktop & mobile)
   - SEO/Accessibility/Best Practices: > 90
   - LCP: < 2.0s (desktop), < 3.0s (mobile)
   - CLS: < 0.1
   - Build fails if scores drop below 90

7. **Build Hooks**:
   - Postbuild automatically runs `scripts/seo/check-images-alt.js` to validate image alt text
   - Pre-commit hook validates translation files via lint-staged
