import { donations } from "@/features/donation/mock/donation.mock"

export default function DonationHistory() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="text-3xl font-bold">
        Donation History
      </h2>

      <div className="mt-8 space-y-5">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="flex items-center justify-between rounded-2xl bg-muted p-4"
          >
            <div>
              <h3 className="font-semibold">
                {donation.produce}
              </h3>

              <p className="text-sm text-muted-foreground">
                {donation.quantity}
              </p>
            </div>

            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-600">
              {donation.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}