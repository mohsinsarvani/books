module.exports = {
  siteMetadata: {
    title: 'Books',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Sbardian Books',
        short_name: 'sbardian-books',
        start_url: '/',
        background_color: '#606d80',
        theme_color: '#606d80',
        display: 'minimal-ui',
        display: 'standalone',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `./src/data/images/`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 75,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'ImagesJson',
        imagePath: 'url',
        name: 'siteImage',
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: 'xothad89',
        dataset: 'books',
      },
    },
    'gatsby-plugin-offline',
  ],
};
