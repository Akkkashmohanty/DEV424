"use client"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentButton() {
  const handlePayment = async () => {
    const options = {
      key: process.env
        .NEXT_PUBLIC_RAZORPAY_KEY,

      amount: 1000,

      currency: "INR",

      name: "FarmGym",

      description: "Marketplace Purchase",

      handler: function () {
        alert("Payment successful")
      },
    }

    const razorpay =
      new window.Razorpay(options)

    razorpay.open()
  }

  return (
    <button
      onClick={handlePayment}
      className="w-full rounded-2xl bg-green-600 py-4 text-lg font-medium text-white"
    >
      Pay With Razorpay
    </button>
  )
}