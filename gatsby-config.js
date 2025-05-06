const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Tadeusz Karny Kowalstwo Artystyczne',
    description: 'Kowalstwo Artystyczne - oferujemy bogate wzornictwo bram, balustrad, ogrodzeń, krat oraz innych elementów ozdobnych',
    siteUrl: 'https://www.kowalstwo-karny.pl',
    image: '/images/logo.jpg',
    author: 'Tadeusz Karny',
    twitterUsername: '',
  },

  plugins: [
    'gatsby-plugin-emotion',
    // Temporarily disabled ESLint to allow development with updated packages
    // 'gatsby-plugin-eslint',
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
        siteUrl: `https://www.kowalstwo-karny.pl`,
        // Fix for doubled language paths
        localeStructure: '{{lng}}/{{ns}}',
        // Set this to false to prevent doubled language codes
        addRedirectPage: false,
        // Create redirects for the root path to the default language
        redirect: true,
        // Force default language as the first loaded
        pathDefaultsToDefaultLanguage: true,
        i18nextOptions: {
          // Configure proper path to translation files to fix the backend warning
          backend: {
            // This tells i18next where to find the translation files
            loadPath: '/locales/{{lng}}/{{ns}}.json',
          },
          interpolation: {
            escapeValue: false
          },
          // Disable suspense to prevent the loading spinner
          react: {
            useSuspense: false
          },
          // Enhanced caching for translations
          cache: {
            enabled: true,
            expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
            cleanupInterval: 60 * 60 * 1000 // 1 hour
          },
          // Performance optimizations
          load: 'languageOnly',
          keySeparator: ".",
          nsSeparator: ":",
          // Preload all translations at startup
          partialBundledLanguages: true,
          ns: ['common', 'about', 'gallery', 'contact'],
          defaultNS: 'common',
          // More aggressive fallbacks for faster loads
          fallbackLng: 'pl',
          // Debug only in development to avoid console spam in production
          debug: process.env.NODE_ENV === 'development',

          // Disable warnings for gallery images
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
    // SEO plugins
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['/**/404', '/**/404.html'],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({site}) => {
          return site.siteMetadata.siteUrl
        },
        serialize: ({site, allSitePage}) => {
          return allSitePage.nodes.map(node => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `daily`,
              priority: 0.7,
              lastmod: new Date().toISOString()
            }
          })
        }
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.kowalstwo-karny.pl',
        sitemap: 'https://www.kowalstwo-karny.pl/sitemap-index.xml',
        resolveEnv: () => process.env.GATSBY_ENV || process.env.NODE_ENV || 'development',
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
            sitemap: 'https://www.kowalstwo-karny.pl/sitemap-index.xml',
            host: 'https://www.kowalstwo-karny.pl'
          }
        }
      }
    },
  ],
}
