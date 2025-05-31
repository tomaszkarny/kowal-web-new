/**
 * Gatsby Node API implementation
 * 
 * This file provides customizations for the Gatsby build process.
 * Includes city page generation and other build-time modifications.
 */

const path = require('path')
const { CITIES, getAllCitySlugs } = require('./src/data/cities')
const { processCityData } = require('./src/utils/cityDistanceCalculator')

// Simple example to demonstrate the file exists and is properly configured
exports.onPreInit = () => {
  console.log('Gatsby Node APIs are working!');
};

// Create city pages programmatically
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  
  // Create pages for each city
  const cityTemplate = path.resolve('./src/templates/CityPage.js')
  
  CITIES.forEach(city => {
    // Process city data to calculate distances and travel times
    const processedCity = processCityData(city)
    
    // Polish city page - create both with and without /pl/ prefix
    const plPathBase = `/cities/${city.slug.pl}/`
    const plPathWithPrefix = `/pl/cities/${city.slug.pl}/`
    
    // Create base Polish page (without /pl/ prefix)
    console.log(`[gatsby-node] Creating Polish city page: ${plPathBase}`)
    createPage({
      path: plPathBase,
      component: cityTemplate,
      context: {
        city: processedCity,
        language: 'pl',
        cityId: city.id,
        i18n: {
          language: 'pl',
          languages: ['pl', 'en'],
          defaultLanguage: 'pl',
          generateDefaultLanguagePage: true,
          routed: false,
          originalPath: plPathBase,
          path: plPathBase
        }
      }
    })
    
    // Create Polish page with /pl/ prefix
    console.log(`[gatsby-node] Creating Polish city page with prefix: ${plPathWithPrefix}`)
    createPage({
      path: plPathWithPrefix,
      component: cityTemplate,
      context: {
        city: processedCity,
        language: 'pl',
        cityId: city.id,
        i18n: {
          language: 'pl',
          languages: ['pl', 'en'],
          defaultLanguage: 'pl',
          generateDefaultLanguagePage: true,
          routed: true,
          originalPath: plPathBase,
          path: plPathWithPrefix
        }
      }
    })
    
    // English city page
    const enPath = `/en/cities/${city.slug.en}/`
    console.log(`[gatsby-node] Creating English city page: ${enPath}`)
    
    createPage({
      path: enPath,
      component: cityTemplate,
      context: {
        city: processedCity,
        language: 'en',
        cityId: city.id,
        i18n: {
          language: 'en',
          languages: ['pl', 'en'],
          defaultLanguage: 'pl',
          generateDefaultLanguagePage: true,
          routed: true,
          originalPath: `/cities/${city.slug.pl}/`,
          path: enPath
        }
      }
    })
  })
  
  reporter.info(`Created ${CITIES.length * 3} city pages (${CITIES.length * 2} Polish + ${CITIES.length} English)`)
  
  // Create English service pages with English URLs
  const servicePages = [
    {
      plPath: '/services/custom-fences/',
      enPath: '/en/services/custom-fences/',
      component: path.resolve('./src/pages/services/custom-fences.js')
    },
    {
      plPath: '/services/custom-gates/',
      enPath: '/en/services/custom-gates/',
      component: path.resolve('./src/pages/services/custom-gates.js')
    }
  ]
  
  servicePages.forEach(({ plPath, enPath, component }) => {
    // Create Polish version (without /pl/ prefix)
    console.log(`[gatsby-node] Creating Polish service page: ${plPath}`)
    createPage({
      path: plPath,
      component: component,
      context: {
        language: 'pl',
        i18n: {
          language: 'pl',
          languages: ['pl', 'en'],
          defaultLanguage: 'pl',
          generateDefaultLanguagePage: true,
          routed: false,
          originalPath: plPath,
          path: plPath
        }
      }
    })
    
    // Create Polish version with /pl/ prefix
    const plPathWithPrefix = `/pl${plPath}`
    console.log(`[gatsby-node] Creating Polish service page with prefix: ${plPathWithPrefix}`)
    createPage({
      path: plPathWithPrefix,
      component: component,
      context: {
        language: 'pl',
        i18n: {
          language: 'pl',
          languages: ['pl', 'en'],
          defaultLanguage: 'pl',
          generateDefaultLanguagePage: true,
          routed: true,
          originalPath: plPath,
          path: plPathWithPrefix
        }
      }
    })
    
    // Create English version
    console.log(`[gatsby-node] Creating English service page: ${enPath}`)
    createPage({
      path: enPath,
      component: component,
      context: {
        language: 'en',
        i18n: {
          language: 'en',
          languages: ['pl', 'en'],
          defaultLanguage: 'pl',
          generateDefaultLanguagePage: true,
          routed: true,
          originalPath: plPath,
          path: enPath
        }
      }
    })
  })
};

// Add debugging for page creation
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Log page creation and context for debugging
  console.log(`[gatsby-node] Creating page: ${page.path}`);
  console.log(`[gatsby-node] Page context:`, JSON.stringify(page.context, null, 2));
  
  // Check if language is in pageContext
  if (page.context && page.context.language) {
    console.log(`[gatsby-node] Language detected in pageContext: ${page.context.language}`);
  } else {
    console.log(`[gatsby-node] WARNING: No language in pageContext for ${page.path}`);
  }

  // Ensure EN pages are created properly
  if (page.path.startsWith('/en/')) {
    console.log(`[gatsby-node] EN page created: ${page.path}`);
  }
};

// Debug build completion
exports.onPostBuild = ({ reporter }) => {
  reporter.info('Build completed successfully');
  console.log('All pages should now be available, including /en/* routes');
};

// Removed conflicting redirect - now handled by netlify.toml
// exports.createPages = ({ actions }) => {
//   const { createRedirect } = actions;
//   
//   // Redirect root page to Polish version - MOVED TO NETLIFY.TOML
//   createRedirect({
//     fromPath: `/`,
//     toPath: `/pl/`,
//     redirectInBrowser: true,
//     isPermanent: false, // Use 302 redirect for flexibility
//   });
// };

// We can re-implement lastModified dates for pages in the future
// using a more compatible approach with gatsby-plugin-sitemap

