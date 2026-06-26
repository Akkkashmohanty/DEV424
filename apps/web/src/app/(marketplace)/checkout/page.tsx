import OrderSummary from "@/components/marketplace/checkout/order-summary"
import PaymentButton from "@/components/marketplace/checkout/payment-button"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <OrderSummary />

        <PaymentButton />
      </div>
    </main>
  )
}