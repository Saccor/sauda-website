import React from 'react';
import ProductCard from '@/components/common/ProductCard';
import { fetchProducts } from '@/lib/shopify/api';
import type { Product } from '@/types/shopify';
import { GradientButton } from '@/components/ui/gradient-button';
import Link from 'next/link';

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
      <section className="relative w-full py-28 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral text-on-dark shadow-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-error mb-4">Error loading products</h3>
            <p className="mb-6">{error}</p>
            <div className="bg-neutral-light/40 p-4 rounded-lg">
              <p className="font-semibold mb-2">Verification steps:</p>
              <ul className="list-disc pl-5 space-y-2">
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
      <section className="relative w-full py-28 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral text-on-dark shadow-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-warning mb-4">No products available</h3>
            <p className="mb-6">There are currently no products in your Shopify store.</p>
            <a 
              href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/products`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-on-dark px-6 py-2 rounded-full hover:bg-primary-light transition-colors"
            >
              Add Products in Shopify Admin
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-28 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-center text-white">MERCHANDISE</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
          
          <div className="text-center">
            <GradientButton
              asChild
              color="blue"
              className="min-w-[180px]"
            >
              <Link href="/products">
                View Full Store
              </Link>
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchandiseSection; 