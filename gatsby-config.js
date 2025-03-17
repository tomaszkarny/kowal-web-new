const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Tadeusz Karny Kowalstwo Artystyczne',
    description: 'Kowalstwo Artystyczne',
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
        siteUrl: `https://example.com`,
        // Fix for doubled language paths
        localeStructure: '{{lng}}/{{ns}}',
        // Set this to false to prevent doubled language codes
        addRedirectPage: false,
        // Create redirects for the root path to the default language
        redirect: true,
        // Force default language as the first loaded
        pathDefaultsToDefaultLanguage: true,
        i18nextOptions: {
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
          keySeparator: false,
          nsSeparator: false,
          // Preload all translations at startup
          partialBundledLanguages: true,
          ns: ['common', 'about', 'gallery', 'contact'],
          defaultNS: 'common',
          // More aggressive fallbacks for faster loads
          fallbackLng: 'pl',
          // Debug only in development to avoid console spam in production
          debug: process.env.NODE_ENV === 'development'
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
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['Merriweather', 'Helvtica', 'Arial', 'serif', 'PT Sans'],
        display: 'swap',
      },
    },
  ],
}
