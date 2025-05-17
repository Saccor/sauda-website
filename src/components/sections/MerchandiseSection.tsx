import React from 'react';
import ProductCard from '@/components/common/ProductCard';
import { fetchProducts } from '@/api/shopify';
import type { Product } from '@/api/shopify';

// Format price according to locale and currency
const formatPrice = (amount: string, currencyCode: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
};

const MerchandiseSection = async () => {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const { products: productsData } = await fetchProducts();
    products = productsData.edges.map((edge) => edge.node);
  } catch (err) {
    console.error('Error fetching products:', err);
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  // Handle error state
  if (error) {
    return (
      <section className="w-full py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">MERCHANDISE</h2>
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

  // Handle no products state
  if (products.length === 0) {
    return (
      <section className="w-full py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">MERCHANDISE</h2>
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
        <h2 className="text-3xl font-bold mb-6 text-center">MERCHANDISE</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.featuredImage?.url || 'https://placehold.co/282x282'}
              title={product.title}
              price={formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode || 'USD')}
              iconUrl={undefined}
              product={product}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`}
            target="_blank"
            rel="noopener noreferrer"
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