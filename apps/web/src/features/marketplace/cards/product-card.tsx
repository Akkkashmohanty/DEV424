"use client"

import Image from "next/image"
import Link from "next/link"

import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Product } from "@/features/marketplace/types/product.types"

import { useCartStore } from "@/features/marketplace/store/cart.store"
import { useWishlistStore } from "@/features/marketplace/store/wishlist.store"

interface Props {
  product: Product
}

export default function ProductCard({
  product,
}: Props) {
  const { addToCart } = useCartStore()

  const { addToWishlist } =
    useWishlistStore()

  return (
    <div className="group overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/marketplace/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={
              product.image_url ??
              "/images/product-placeholder.png"
            }
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm text-muted-foreground">
          {product.category}
        </p>

        <h3 className="mt-2 line-clamp-2 text-xl font-semibold">
          {product.name}
        </h3>

        <div className="mt-3">
          <span className="text-sm text-muted-foreground">
            Stock: {product.stock}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-bold">
            ₹{product.price}
          </p>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                addToWishlist(product)
              }
            >
              <Heart className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-green-600 hover:bg-green-700"
              onClick={() =>
                addToCart(product)
              }
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}