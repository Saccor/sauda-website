import { ProductsSection } from "@/components/sections/ProductsSection";
import { fetchProducts } from "@/lib/shopify/api";
import type { Product } from "@/types/shopify";

export default async function ProductsPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const { products: productsData } = await fetchProducts();
    products = productsData.edges.map((edge) => edge.node);
  } catch (err) {
    console.error('Error fetching products:', err);
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  return <ProductsSection products={products} error={error} />;
} 