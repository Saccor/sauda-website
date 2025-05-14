'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { shopifyClient } from '@/lib/shopify';

interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage?: {
    url: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface Edge {
  node: Product;
}

interface ShopifyResponse {
  data?: {
    products: {
      edges: Edge[];
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

const PRODUCTS_QUERY = `
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
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

// Format price according to locale and currency
const formatPrice = (amount: string, currencyCode: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
};

const MerchandiseSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Use the createStorefrontClient's API correctly
        const response = await fetch(
          `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
            },
            body: JSON.stringify({ query: PRODUCTS_QUERY }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const result: ShopifyResponse = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        if (result.data?.products.edges) {
          setProducts(result.data.products.edges.map((edge: Edge) => edge.node));
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Handle loading state with a better loading indicator
  if (loading) {
    return (
      <section className="w-full py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Merchandise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-black/60 rounded-lg overflow-hidden animate-pulse shadow-lg">
                <div className="aspect-square bg-gray-800"></div>
                <div className="p-3">
                  <div className="h-6 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Handle error state with a better loading indicator
  if (error) {
    return (
      <section className="w-full py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Merchandise</h2>
          <div className="bg-red-900/40 border border-red-500 rounded-lg p-5 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-bold text-red-400 mb-2">Error loading products</h3>
            <p className="mb-4">{error}</p>
            <div className="bg-black/40 p-3 rounded text-sm">
              <p className="font-semibold mb-2">Verification steps:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check Shopify credentials in .env.local</li>
                <li>Ensure your Shopify store domain is correct</li>
                <li>Verify that your storefront access token is valid</li>
                <li>Confirm your Shopify store has products</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle no products state with a friendly message
  if (products.length === 0) {
    return (
      <section className="w-full py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Merchandise</h2>
          <div className="bg-yellow-900/40 border border-yellow-500 rounded-lg p-5 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-bold text-yellow-400 mb-2">No products available</h3>
            <p>There are currently no products in your Shopify store.</p>
            <div className="mt-4">
              <a 
                href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/products`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black py-2 px-4 rounded font-medium hover:bg-gray-200 transition-colors inline-block"
              >
                Add Products in Shopify Admin
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Merchandise</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-black/60 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-white/10 transition-all duration-300 shadow-lg">
              {product.featuredImage ? (
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.featuredImage.url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    quality={85}
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              
              <div className="p-3">
                <h3 className="font-medium text-base mb-1">{product.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-2">{product.description}</p>
                <p className="text-lg font-bold">
                  {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode || 'USD')}
                </p>
                
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 bg-white text-black py-2 rounded font-medium hover:bg-gray-200 transition-colors text-sm">
                    Add to Cart
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center border border-white rounded hover:bg-white/10 transition-colors text-sm" aria-label="Add to wishlist">
                    <span aria-hidden="true">♡</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="#" 
            className="bg-white text-black py-2 px-6 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block text-base"
          >
            View Full Store
          </a>
        </div>
      </div>
    </section>
  );
};

export default MerchandiseSection; 