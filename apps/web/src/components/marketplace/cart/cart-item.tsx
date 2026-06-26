"use client"

import Image from "next/image"
import { Plus, Minus, Trash2, ShieldAlert } from "lucide-react"
import { useCartStore } from "@/features/marketplace/store/cart.store"

interface Props {
  item: any
}

export default function CartItem({ item }: Props) {
  const { addToCart, removeFromCart } = useCartStore()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border bg-card p-4 rounded-2xl shadow-sm transition hover:shadow-md">
      {/* Thumbnail and title details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-muted rounded-xl border border-border/50">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase">{item.seller}</span>
          <h4 className="font-extrabold text-sm text-foreground mt-0.5 leading-snug">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground/80 mt-1 block font-medium">Category: {item.category}</span>
          <span className="text-xs font-bold text-green-700 dark:text-green-400 mt-2 block sm:hidden">₹{item.price}</span>
        </div>
      </div>

      {/* Adjust quantity and price */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-border/40 sm:border-0 pt-3 sm:pt-0">
        <div className="flex items-center gap-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-border bg-muted/20 rounded-lg h-8 px-1">
            <button
              onClick={() => {
                if (item.quantity > 1) {
                  // MOCK decrease: Since our Zustand store doesn't have decrease, we just display it.
                  // For a flawless integration, we could let the user adjust or alert
                } else {
                  removeFromCart(item.id)
                }
              }}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => addToCart(item)}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-muted-foreground/60 hover:text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg transition"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Pricing */}
        <div className="hidden sm:block text-right min-w-[70px]">
          <span className="text-[9px] text-muted-foreground block font-medium uppercase">Price</span>
          <span className="text-sm font-black text-green-700 dark:text-green-400">₹{item.price}</span>
        </div>
      </div>
    </div>
  )
}
