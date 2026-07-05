"use client"

import { useCartStore } from "@/features/marketplace/store/cart.store"

export default function OrderSummary() {
  const { cart } = useCartStore()

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0,
  )

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Order Summary
      </h3>

      <div className="mt-6 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between"
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <span className="text-xl font-semibold">
          Total
        </span>

        <span className="text-2xl font-bold">
          ₹{total}
        </span>
      </div>
    </div>
  )
}