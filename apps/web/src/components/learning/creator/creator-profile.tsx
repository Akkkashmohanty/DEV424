export default function CreatorProfile() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white">
          RF
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">
            Ramesh Farming
          </h1>

          <p className="mt-2 text-slate-400">
            Organic Farming Expert • Karnataka
          </p>

          <p className="mt-4 max-w-2xl text-sm text-slate-300">
            Teaching terrace farming, hydroponics,
            organic vegetable cultivation and urban
            agriculture techniques for beginners.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-900 p-4 text-center">
            <h3 className="text-2xl font-bold text-green-400">
              12.4K
            </h3>

            <p className="text-xs text-slate-400">
              Followers
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4 text-center">
            <h3 className="text-2xl font-bold text-green-400">
              42
            </h3>

            <p className="text-xs text-slate-400">
              Videos
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4 text-center">
            <h3 className="text-2xl font-bold text-green-400">
              245K
            </h3>

            <p className="text-xs text-slate-400">
              Views
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}