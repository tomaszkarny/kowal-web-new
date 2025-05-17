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
          // The backend configuration is handled by gatsby-plugin-react-i18next internally
          // We don't need to specify it manually as it's injected at build time
          ns: ['common', 'seo'],  // Specify namespaces explicitly
          defaultNS: 'common',     // Set the default namespace
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
          // 🔽 NEW SECTION - Configure detection order and disable navigator/localStorage
          detection: {
            order: ['htmlTag', 'path', 'cookie'],
            caches: ['cookie'],   // store language preference only in cookie
            lookupCookie: 'i18next',    // default cookie name used by the plugin
          },
          // Performance optimizations
          load: 'languageOnly',
          keySeparator: ".",
          nsSeparator: ":",
          // Preload all translations at startup
          partialBundledLanguages: true,
          ns: ['common', 'about', 'gallery', 'contact', 'seo'],
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
    // Enhanced sitemap configuration for multilingual support and better SEO
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
        excludes: ['/**/404', '/**/404.html', '/**/dev-404-page'],
        createLinkInHead: true,
        // Define a custom function to resolve the site URL
        resolveSiteUrl: () => 'https://www.kowalstwo-karny.pl',
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
          
          // Generate alternate URLs for language versions
          let plPath = isEnglish ? path.replace('/en', '') : path;
          if (plPath === '') plPath = '/';
          
          let enPath = !isEnglish && path !== '/' ? `/en${path}` : isEnglish ? path : '/en';
          
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
            url: path,
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
