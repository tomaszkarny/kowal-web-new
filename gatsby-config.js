const path = require('path')
const { SITE_DOMAIN, SITEMAP_URL } = require('./gatsby-config-utils')

module.exports = {
  
  siteMetadata: {
    // English values act as a universal fallback when translation is missing
    title: 'Tadeusz Karny Artistic Blacksmith',
    description: 'Artistic blacksmithing – bespoke gates, railings, fences and decorative ironwork.',
    siteUrl: SITE_DOMAIN, // Using centralized domain constant
    image: '/images/logo.jpg',
    author: 'Tadeusz Karny',
    twitterUsername: '',
  },

  plugins: [
    'gatsby-plugin-emotion',
    // Re-enabled ESLint for code quality
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`pl`, `en`],
        defaultLanguage: `pl`,
        siteUrl: SITE_DOMAIN,
        // Fix for doubled language paths
        localeStructure: '{{lng}}/{{ns}}',
        generateDefaultLanguagePage: true, // Generate Polish homepage  
        pathDefaultsToDefaultLanguage: false, // Polish homepage at /pl/ not /
        addRedirectPage: false,
        redirect: false,         // Disable client-side redirects that might interfere
        i18nextOptions: {
          // ===== NAMESPACES =====
          // Single source of truth for all translation namespaces
          ns: ['common', 'about', 'gallery', 'contact', 'seo', 'footer', 'faq'],
          defaultNS: 'common',
          
          // ===== LANGUAGE DETECTION =====
          // Language detection: first look at the URL path, then fall back to the <html lang> attr
          // Disable ALL client-side caches to avoid sticky language issues
          detection: {
            order: ['path', 'htmlTag'],
            caches: [],
          },
          
          // ===== CORE I18NEXT CONFIGURATION =====
          interpolation: {
            escapeValue: false
          },
          load: 'languageOnly',
          keySeparator: ".",
          nsSeparator: ":",
          fallbackLng: 'pl',
          
          // ===== REACT INTEGRATION =====
          react: {
            useSuspense: false
          },
          
          // ===== DEBUGGING & ERROR HANDLING =====
          // Debug only in development
          debug: process.env.NODE_ENV === 'development',
          
          // Disable missing key warnings for gallery images
          saveMissing: false,
          missingKeyHandler: (lng, ns, key) => {
            // Ignore warnings for gallery image keys
            if (key.includes('gallery images')) {
              return;
            }


            // For other keys, log warnings in development mode only
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Missing translation key: ${key}`);
            }
          }
        }
      }
    },

    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        components: path.join(__dirname, 'src/components'),
        consts: path.join(__dirname, 'src/consts'),
        common: path.join(__dirname, 'src/common'),
        utils: path.join(__dirname, 'src/utils'),
        Layout: path.join(__dirname, 'src/components/Layout'),
        assets: path.join(__dirname, 'src/assets'),
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src/assets/images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: path.join(__dirname, `locales`),
      },
    },
    
    // PWA Manifest - MUST be before gatsby-plugin-offline
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pracownia Kowalstwa Artystycznego - Tadeusz Karny`,
        short_name: `Kowalstwo Karny`,
        description: `Kowalstwo artystyczne w Białymstoku - bramy kute, balustrady, ogrodzenia`,
        lang: `pl`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#525fc4`,
        display: `standalone`,
        icon: `src/assets/images/anvil_2.webp`, // Using anvil as icon - square image
        icons: [
          {
            src: `/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `/icon-128x128.png`,
            sizes: `128x128`,
            type: `image/png`,
          },
          {
            src: `/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/icon-152x152.png`,
            sizes: `152x152`,
            type: `image/png`,
          },
          {
            src: `/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: `/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
        // Localization for multiple languages
        localize: [
          {
            start_url: `/en/`,
            lang: `en`,
            name: `Tadeusz Karny Artistic Blacksmith`,
            short_name: `Karny Blacksmith`,
            description: `Artistic blacksmithing in Białystok - wrought iron gates, railings, fences`,
          },
        ],
        cache_busting_mode: 'none', // Important for offline plugin
        crossOrigin: `use-credentials`,
        legacy: true, // Add legacy icons for older devices
        theme_color_in_head: true, // Add theme-color meta tag
      },
    },
    
    // Offline plugin - MUST be after manifest
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          `/`,
          `/en/`,
          `/gallery/`,
          `/en/gallery/`,
          `/about/`,
          `/en/about/`,
          `/contact/`,
          `/en/contact/`,
          `/faq/`,
          `/en/faq/`,
        ],
        workboxConfig: {
          globPatterns: ['**/*.{js,css,html,json,jpg,png,webp,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https?:.*\/static\//,
              handler: 'CacheFirst',
            },
            {
              urlPattern: /^https?:.*\.(jpg|jpeg|png|webp|svg|gif|tiff|js|css|woff|woff2)$/,
              handler: 'StaleWhileRevalidate',
            },
          ],
        },
      },
    },
    
    // Enhanced sitemap configuration for multilingual support and better SEO
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
        excludes: ['/**/404', '/**/404.html', '/**/dev-404-page'],
        createLinkInHead: true,
        // Define a custom function to resolve the site URL
        resolveSiteUrl: () => SITE_DOMAIN,
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        serialize: ({ path }) => {
          // Get current date in ISO format for lastmod
          const lastmod = new Date().toISOString();
          
          // Is this an English page?
          const isEnglish = path.startsWith('/en');
          
          // Ensure all paths have trailing slashes for consistency
          const ensureTrailingSlash = (urlPath) => {
            if (urlPath === '/') return urlPath;
            return urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
          };
          
          // Apply trailing slash to the current path
          const pathWithSlash = ensureTrailingSlash(path);
          
          // Generate alternate URLs for language versions with consistent trailing slashes
          let plPath = isEnglish ? ensureTrailingSlash(pathWithSlash.replace('/en', '')) : pathWithSlash;
          if (plPath === '') plPath = '/';
          
          let enPath = !isEnglish && pathWithSlash !== '/' ? ensureTrailingSlash(`/en${pathWithSlash}`) : isEnglish ? pathWithSlash : '/en/';
          
          // Determine page type and set priority accordingly
          let priority = 0.5; // Default priority
          let changefreq = 'monthly'; // Default change frequency
          
          if (path === '/' || path === '/en/') {
            // Homepage gets highest priority
            priority = 1.0;
            changefreq = 'weekly';
          } else if (path.includes('/gallery')) {
            // Gallery pages get high priority
            priority = 0.8;
            changefreq = 'weekly';
          } else if (path.includes('/about')) {
            // About page gets medium-high priority
            priority = 0.7;
            changefreq = 'monthly';
          } else if (path.includes('/contact')) {
            // Contact page gets medium priority
            priority = 0.6;
            changefreq = 'monthly';
          }
          
          return {
            url: pathWithSlash,
            lastmod: lastmod,
            changefreq: changefreq,
            priority: priority,
            links: [
              {
                lang: 'pl',
                url: plPath,
                rel: 'alternate'
              },
              {
                lang: 'en',
                url: enPath,
                rel: 'alternate'
              },
            ],
          };
        }
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: SITE_DOMAIN,
        sitemap: SITEMAP_URL,
        // Fix environment detection - prioritize GATSBY_ENV for production builds
        resolveEnv: () => {
          // If GATSBY_ENV is explicitly set, use it
          if (process.env.GATSBY_ENV) {
            return process.env.GATSBY_ENV;
          }
          // For Netlify and other production builds, check for common production indicators
          if (process.env.NETLIFY || process.env.CONTEXT === 'production' || process.env.NODE_ENV === 'production') {
            return 'production';
          }
          // Default to development
          return 'development';
        },
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
            sitemap: SITEMAP_URL,
            host: SITE_DOMAIN
          }
        }
      }
    },
  ],
}
