"use client"

import Image from "next/image"

import { useCartStore } from "@/features/marketplace/store/cart.store"

interface Props {
  item: any
}

export default function CartItem({
  item,
}: Props) {
  const { removeFromCart } =
    useCartStore()

  return (
    <div className="flex gap-4 rounded-3xl border bg-card p-4">
      <div className="relative h-28 w-28 overflow-hidden rounded-2xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold">
          {item.title}
        </h3>

        <p className="mt-2 text-muted-foreground">
          ₹{item.price}
        </p>

        <button
          onClick={() =>
            removeFromCart(item.id)
          }
          className="mt-4 text-sm text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  )
}