"use client"

export default function Error({
  reset,
}: {
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">
        Dashboard crashed
      </h2>

      <button
        onClick={reset}
        className="rounded-xl bg-green-600 px-6 py-3 text-white"
      >
        Retry
      </button>
    </div>
  )
}