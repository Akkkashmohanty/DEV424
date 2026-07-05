"use client"

import ProductCard from "@/components/marketplace/cards/product-card"
import ProductFilters from "@/components/marketplace/filters/product-filters"

import { useProducts } from "@/features/marketplace/hooks/use-products"

export default function MarketplacePage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useProducts()

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">
          Loading products...
        </p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-red-600">
          Failed to load products.
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Farming Marketplace
        </h1>

        <div className="mt-8">
          <ProductFilters />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  )
}