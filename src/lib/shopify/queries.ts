export const MAIN_MENU_QUERY = `#graphql
  query GetMainMenu {
    menu(handle: "main-menu") {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;

export const FOOTER_MENU_QUERY = `#graphql
  query GetFooterMenu {
    menu(handle: "footer") {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;

export const TOUR_DATES_SECTION_QUERY = `#graphql
  query GetTourDatesSection {
    page(handle: "homepage") {
      metafield(namespace: "custom", key: "tour_dates_section") {
        id
        namespace
        key
        value
        type
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                id
                type
                fields {
                  key
                  value
                  type
                  references(first: 10) {
                    edges {
                      node {
                        ... on Metaobject {
                          id
                          type
                          fields {
                            key
                            value
                            type
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FEATURED_ARTIST_SECTION_QUERY = `#graphql
  query GetHomepageFeaturedArtistSection {
    page(handle: "homepage") {
      metafield(namespace: "custom", key: "featuredartistsection") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
              type
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const HERO_SECTION_QUERY = `#graphql
  query GetHeroSection {
    page(handle: "homepage") {
      metafield(namespace: "custom", key: "hero_section") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
              type
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          handle
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`; 