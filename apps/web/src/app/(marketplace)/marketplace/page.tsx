import { products } from "@/features/marketplace/mock/products.mock"

import ProductCard from "@/components/marketplace/cards/product-card"
import ProductFilters from "@/components/marketplace/filters/product-filters"

export default function MarketplacePage() {
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
          {products.map((product) => (
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