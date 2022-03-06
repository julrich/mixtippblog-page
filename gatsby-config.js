require("dotenv").config({
  path: `.env`,
})

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// TODO add metadata and images, also see all the TBDs
module.exports = {
  siteMetadata: {
    lang: "en",
    title: "mixtipp blog - Rezepte aus dem Thermomix",
    titleTemplate: "%s // mixtipp",
    description:
      "TBD",
    keywords: "TBD",
    url: "https://mixtippblog.de",
    siteUrl: "https://mixtippblog.de",
    image: "/images/OG-Image.png",
    cardImage: "/images/kickstartDS_TwitterCard.png",
    twitterUsername: "",
    email: "info@mixtippblog.de",
  },

  plugins: [
    { resolve: `gatsby-plugin-react-helmet`, options: {} },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mixtipp`,
        short_name: `mixtipp`,
        description: `TBD`,
        icon: `static/favicon/android-chrome-512x512.png`,
        lang: `de`,
        start_url: `/`,
        background_color: `#F28D65`,
        theme_color: `#F28D65`,
        display: `browser`,
      },
    },
    {
      resolve: `@kickstartds/gatsby-theme-kickstartds`,
      options: {
        contentPath: "content",
        urlSegment: "/",
        gqlPath: "dist",
        netlifyConfigPath: "dist"
      }
    },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-netlify-cms`, options: {} },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-wordpress`, options: {} },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_GTAG_TRACKINGID,
        ],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        includeInDevelopment: false,
        id: process.env.HOTJAR_ID,
        sv: process.env.HOTJAR_SV,
      },
    },
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`],
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `
        {
          allKickstartDsContentPage {
            edges {
              node {
                id
                slug
                created_at: created
                updated_at: updated
              }
            }
          }
          allKickstartDsBlogPage {
            edges {
              node {
                id
                slug
                created_at: created
                updated_at: updated
                feature_image: imageUrl
              }
            }
          }
        }`,
        output: "/sitemap.xml",
        mapping: {
          allKickstartDsNetlifyCmsPage: {
            sitemap: `pages`,
          },
          allKickstartDsWordpressPage: {
            sitemap: `posts`,
          },
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allKickstartDsBlogPage } }) => {
              return allKickstartDsBlogPage.edges.map(edge => {
                return Object.assign({}, {
                  title: edge.node.title,
                  description: edge.node.description,
                  date: edge.node.updated,
                  url: `${site.siteMetadata.siteUrl}/${edge.node.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${edge.node.slug}`,
                  custom_elements: [{ "content:encoded": edge.node.excerpt }],
                })
              })
            },
            query: `
              {
                allKickstartDsBlogPage(
                  sort: { order: DESC, fields: [updated] },
                ) {
                  edges {
                    node {
                      title
                      description
                      updated
                      slug
                      excerpt
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "mixtipp Blog RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
    { resolve: `gatsby-plugin-netlify`, options: {} },
  ],
}
