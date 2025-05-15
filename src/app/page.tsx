import Main from '../components/Main';

interface FeaturedArtistProps {
  imageUrl: string;
  title: string;
  buttonText: string;
}

export default async function Home() {
  const query = `#graphql
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
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    }
  );
  const result = await response.json();
  const fields = result?.data?.page?.metafield?.reference?.fields || [];
  console.log('Shopify fields:', JSON.stringify(fields, null, 2));
  const getField = (key: string) => fields.find((f: any) => f.key === key)?.value || '';
  const getImage = () => {
    const imgField = fields.find((f: any) => f.key === 'image' && f.reference?.image?.url);
    return imgField ? imgField.reference.image.url : '';
  };

  const featuredArtistProps: FeaturedArtistProps = {
    imageUrl: getImage(),
    title: getField('title'),
    buttonText: getField('button_text'),
  };

  return <Main featuredArtist={featuredArtistProps} />;
}
