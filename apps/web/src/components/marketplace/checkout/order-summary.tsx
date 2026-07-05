"use client"

import { useState } from "react"

import { useCartStore } from "@/features/marketplace/store/cart.store"

import {
  ShieldCheck,
  ShoppingBag,
  Ticket,
} from "lucide-react"

export default function OrderSummary() {
  const { cart } = useCartStore()

  const [promo, setPromo] = useState("")

  const [discount, setDiscount] = useState(0)

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0,
  )

  const shipping =
    subtotal > 1000 || subtotal === 0
      ? 0
      : 99

  const tax = Math.round(
    subtotal * 0.18,
  )

  const total =
    subtotal +
    shipping +
    tax -
    discount

  const applyPromo = (
    e: React.FormEvent,
  ) => {
    e.preventDefault()

    if (
      promo.trim().toUpperCase() ===
      "FARMGREEN10"
    ) {
      setDiscount(
        Math.round(subtotal * 0.1),
      )
    }
  }

  return (
    <div className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-emerald-600" />

        <h3 className="text-lg font-bold">
          Order Summary
        </h3>
      </div>

      <div className="space-y-3">
        {cart.length === 0 ? (
          <div className="py-2 text-xs text-muted-foreground">
            Your cart is empty.
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-xs text-muted-foreground"
            >
              <span>
                {item.name}{" "}
                <strong className="text-foreground">
                  ×{item.quantity}
                </strong>
              </span>

              <span className="font-bold text-foreground">
                ₹
                {item.price *
                  item.quantity}
              </span>
            </div>
          ))
        )}
      </div>

      <hr className="border-border/50" />

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span className="font-semibold">
            ₹{subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            Shipping
          </span>

          <span className="font-semibold">
            {shipping === 0
              ? "FREE"
              : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST (18%)</span>

          <span className="font-semibold">
            ₹{tax}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between font-bold text-emerald-600">
            <span>
              Promo Discount
            </span>

            <span>
              -₹{discount}
            </span>
          </div>
        )}

        <hr className="border-border/50" />

        <div className="flex justify-between pt-1 text-sm font-black">
          <span>Total</span>

          <span className="text-emerald-600">
            ₹{total}
          </span>
        </div>
      </div>

      <form
        onSubmit={applyPromo}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={promo}
            onChange={(e) =>
              setPromo(
                e.target.value,
              )
            }
            placeholder="Promo Code"
            className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl border border-border px-4 text-xs font-semibold hover:bg-muted"
        >
          Apply
        </button>
      </form>

      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3 text-[10px] text-muted-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />

        <span>
          Secure encrypted
          checkout.
        </span>
      </div>
    </div>
  )
}