"use client"

import { Star, ShoppingCart } from "lucide-react"
import { Product } from "@/features/marketplace/types/product.types"
import { useCartStore } from "@/features/marketplace/store/cart.store"
import { toast } from "sonner"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart(product)

    toast.success(`${product.title} added to cart!`, {
      description: "Manage quantities in your shopping cart.",
    })
  }

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase text-white backdrop-blur-md">
          {product.category}
        </span>

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-border bg-background/90 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-500" />
          <span>{product.rating}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="block text-[10px] font-bold uppercase text-muted-foreground">
            {product.seller}
          </span>

          <h4 className="mt-1 text-sm font-extrabold leading-snug text-foreground transition-colors group-hover:text-green-600">
            {product.title}
          </h4>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
          <div>
            <span className="block text-[9px] font-medium uppercase text-muted-foreground">
              Price
            </span>

            <span className="text-lg font-black text-green-700 dark:text-green-400">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-green-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-green-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}