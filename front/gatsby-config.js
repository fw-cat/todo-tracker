/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `KERO TRAKER`,
    siteUrl: `https://kero-tracker.netlify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `KERO TRAKER`,
        short_name: `KERO TRAKER`,
        start_url: `/`,
        background_color: `#38599b`,
        theme_color: `#38599b`,
        display: `standalone`,
        icon: "src/images/icon.png",
        icons: [
          {
            src: `src/images/icon.png`,
            sizes: `1024x1024`,
            type: `image/png`,
          },
        ],
      },
    }
  ],
}
