import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { fetchProducts } from "@/api/shopify";
import type { Product } from "@/api/shopify";

// Format price according to locale and currency
const formatPrice = (amount: string, currencyCode: string = 'SEK') => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
};

const ProductsPage = async () => {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const { products: productsData } = await fetchProducts();
    products = productsData.edges.map((edge) => edge.node);
  } catch (err) {
    console.error('Error fetching products:', err);
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  return (
    <main className="min-h-screen bg-[#0a1833] text-white pt-32 pb-16 px-4 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">Products</h1>
        {error ? (
          <div className="bg-red-900/40 border border-red-500 rounded-lg p-5 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-bold text-red-400 mb-2">Error loading products</h3>
            <p className="mb-4">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6 justify-center">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.featuredImage?.url || 'https://placehold.co/282x282'}
                title={product.title}
                price={formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode || 'SEK')}
                iconUrl={undefined}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductsPage; 