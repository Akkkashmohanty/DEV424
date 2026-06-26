"use client"

import CartItem from "@/components/marketplace/cart/cart-item"
import OrderSummary from "@/components/marketplace/checkout/order-summary"

import { useCartStore } from "@/features/marketplace/store/cart.store"

export default function CartPage() {
  const { cart } = useCartStore()

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <OrderSummary />
      </div>
    </main>
  )
}