import NGOCard from "@/components/donation/cards/ngo-card"

import PickupScheduler from "@/components/donation/pickup/pickup-scheduler"

import DeliveryTracker from "@/components/donation/tracking/delivery-tracker"

import DonationHistory from "@/components/donation/history/donation-history"

import { ngos } from "@/features/donation/mock/donation.mock"

export default function DonationPage() {
  return (
    <main className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Donation Network
        </h1>

        <div className="mt-10 grid gap-8 xl:grid-cols-3">
          <div className="space-y-8 xl:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              {ngos.map((ngo) => (
                <NGOCard
                  key={ngo.id}
                  ngo={ngo}
                />
              ))}
            </div>

            <DonationHistory />
          </div>

          <div className="space-y-8">
            <PickupScheduler />

            <DeliveryTracker />
          </div>
        </div>
      </div>
    </main>
  )
}