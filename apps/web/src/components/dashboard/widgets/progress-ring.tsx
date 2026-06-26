"use client"

interface Props {
  progress?: number
}

export default function ProgressRing({
  progress = 72,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-xl font-bold text-foreground">
        Monthly Goal
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Farming + Fitness Progress
      </p>

      <div className="mt-8 flex justify-center">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-green-600">
          <span className="text-4xl font-black text-foreground">
            {progress}%
          </span>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        You're close to completing this month's target.
      </p>
    </div>
  )
}