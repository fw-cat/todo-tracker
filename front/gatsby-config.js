/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `HABIT TRAKER`,
    siteUrl: `https://flog-tracker.netlify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HABIT TRAKER`,
        short_name: `HABIT TRAKER`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: "src/images/icon.png",
        icons: [
          {
            src: `src/images/icon.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    }
  ],
}
