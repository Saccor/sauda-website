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
            }
          }
        }
      }
    }
  }
`;

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

  // Handle loading state
  if (loading) {
    return (
      <div className="w-full py-16 bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-xl font-bold">Loading products...</h2>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-full py-16 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-400">Error loading products</h2>
          <p className="mt-2">{error}</p>
          <p className="mt-2">Please check your Shopify credentials in .env.local</p>
        </div>
      </div>
    );
  }

  // Handle no products state
  if (products.length === 0) {
    return (
      <div className="w-full py-16 bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-xl font-bold">No products available</h2>
      </div>
    );
  }

  return (
    <section className="w-full py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Merchandise</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-black/60 rounded-lg overflow-hidden group">
              {product.featuredImage ? (
                <div className="aspect-square relative">
                  <Image
                    src={product.featuredImage.url}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{product.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{product.description}</p>
                <p className="text-xl font-bold">${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}</p>
                
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-white text-black py-2 rounded font-medium hover:bg-gray-200 transition-colors">
                    Add to Cart
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center border border-white rounded hover:bg-white/10 transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="#" 
            className="bg-white text-black py-2 px-6 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block"
          >
            View Full Store
          </a>
        </div>
      </div>
    </section>
  );
};

export default MerchandiseSection; 