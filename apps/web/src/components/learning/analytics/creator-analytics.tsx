export default function CreatorAnalytics() {
  return (
    <div className="space-y-8">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">
            Total Views
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-400">
            245K
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">
            Subscribers
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-400">
            12.4K
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">
            Earnings
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-400">
            ₹24,500
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">
            Watch Time
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-400">
            1.2K hrs
          </h2>
        </div>

      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-2xl font-bold text-white">
          Recent Uploads
        </h2>

        <div className="mt-6 space-y-4">

          <div className="rounded-2xl bg-slate-900 p-4">
            Terrace Tomato Farming Guide
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            Hydroponics For Beginners
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            Organic Compost Making
          </div>

        </div>
      </div>

    </div>
  )
}