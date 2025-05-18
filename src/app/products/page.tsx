import React from "react";
import { fetchProducts } from "@/api/shopify";
import type { Product } from "@/api/shopify";
import ProductsClient from "./ProductsClient";

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

  return <ProductsClient products={products} error={error} />;
};

export default ProductsPage; 