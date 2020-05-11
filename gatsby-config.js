const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Tadeusz Karny Kowalstwo Artystyczne',
    description: 'Kowalstwo Artystyczne',
  },

  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

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
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['Merriweather', 'Helvtica', 'Arial', 'serif', 'PT Sans'],
        display: 'swap',
      },
    },
  ],
}
