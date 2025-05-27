// PWA Plugin configuration to be added to gatsby-config.js

const pwaPlugins = [
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
      icon: `src/assets/images/anvil_2.webp`, // This will be automatically processed
      icons: [
        {
          src: `/icons/icon-72x72.png`,
          sizes: `72x72`,
          type: `image/png`,
        },
        {
          src: `/icons/icon-96x96.png`,
          sizes: `96x96`,
          type: `image/png`,
        },
        {
          src: `/icons/icon-128x128.png`,
          sizes: `128x128`,
          type: `image/png`,
        },
        {
          src: `/icons/icon-144x144.png`,
          sizes: `144x144`,
          type: `image/png`,
        },
        {
          src: `/icons/icon-152x152.png`,
          sizes: `152x152`,
          type: `image/png`,
        },
        {
          src: `/icons/icon-192x192.png`,
          sizes: `192x192`,
          type: `image/png`,
        },
        {
          src: `/icons/icon-384x384.png`,
          sizes: `384x384`,
          type: `image/png`,
        },
        {
          src: `/icons/icon-512x512.png`,
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
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https?:.*\.(jpg|jpeg|png|webp|svg|gif|tiff|js|css|woff|woff2)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
    },
  },
];

module.exports = pwaPlugins;