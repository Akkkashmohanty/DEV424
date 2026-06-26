"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/features/marketplace/store/cart.store"
import { Tag, ShieldCheck, ShoppingBag, Ticket } from "lucide-react"

export default function OrderSummary() {
  const { cart } = useCartStore()
  const [promo, setPromo] = useState("")
  const [discount, setDiscount] = useState(0)

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 99
  const tax = Math.round(subtotal * 0.18) // 18% GST standard
  const total = subtotal + shipping + tax - discount

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promo.trim().toUpperCase() === "FARMGREEN10") {
      setDiscount(Math.round(subtotal * 0.1)) // 10% off
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <ShoppingBag className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-bold tracking-tight">Order Summary</h3>
      </div>

      {/* Cart items preview listing */}
      <div className="space-y-3">
        {cart.length === 0 ? (
          <div className="text-xs text-muted-foreground py-2">Your cart is empty.</div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between text-xs text-muted-foreground">
              <span>
                {item.title} <strong className="text-foreground">x{item.quantity}</strong>
              </span>
              <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      <hr className="border-border/50" />

      {/* Costs distribution */}
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-semibold text-foreground">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping (Free above ₹1000)</span>
          <span className="font-semibold text-foreground">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated GST (18%)</span>
          <span className="font-semibold text-foreground">₹{tax}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-bold">
            <span>Promo Discount (10%)</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <hr className="border-border/50 my-2" />
        <div className="flex justify-between text-sm font-black text-foreground pt-1">
          <span>Total Balance</span>
          <span className="text-green-700 dark:text-green-400">₹{total}</span>
        </div>
      </div>

      {/* Coupon form */}
      <form onSubmit={applyPromo} className="flex gap-2">
        <div className="relative flex-1">
          <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80" />
          <input
            type="text"
            placeholder="Promo Code (FARMGREEN10)"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>
        <button
          type="submit"
          className="bg-muted hover:bg-muted-foreground/10 text-foreground border border-border rounded-xl h-9 px-3 font-bold text-xs transition"
        >
          Apply
        </button>
      </form>

      {/* Security note */}
      <div className="rounded-xl bg-green-500/[0.02] border border-green-500/10 p-3 flex gap-2 items-center text-[10px] text-muted-foreground">
        <ShieldCheck className="h-4.5 w-4.5 text-green-600 shrink-0" />
        <span>100% Encrypted Transactions. Secure Payments verified by AgriGym networks.</span>
      </div>
    </div>
  )
}
