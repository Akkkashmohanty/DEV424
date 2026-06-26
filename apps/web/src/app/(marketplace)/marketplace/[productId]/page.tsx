import Image from "next/image"

import { products } from "@/features/marketplace/mock/products.mock"

import ReviewsSection from "@/components/marketplace/reviews/reviews-section"
import ProductCard from "@/components/marketplace/cards/product-card"

interface Props {
  params: Promise<{
    productId: string
  }>
}

export default async function ProductPage({
  params,
}: Props) {
  const { productId } = await params

  const product = products.find(
    (item) => item.id === productId,
  )

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full bg-green-500/10 px-4 py-2 text-xs font-bold text-green-600">
              {product.category}
            </span>

            <h1 className="mt-4 text-5xl font-bold">
              {product.title}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <span className="text-4xl font-bold text-green-600">
                ₹{product.price}
              </span>

              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-semibold text-yellow-600">
                ⭐ {product.rating}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700">
                Add To Cart
              </button>

              <button className="rounded-2xl border border-border px-8 py-3 font-semibold transition hover:bg-muted">
                Buy Now
              </button>
            </div>

            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <p>Seller: {product.seller}</p>
              <p>Stock Available: {product.stock}</p>
              <p>{product.reviews} Reviews</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ReviewsSection />
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold">
            Related Products
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products
              .filter((item) => item.id !== product.id)
              .map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}