"use client"

interface Props {
  progress: number
}

export default function ProgressRing({
  progress,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-xl font-bold">
        Completion Rate
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Based on completed farming tasks
      </p>

      <div className="mt-8 flex justify-center">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-emerald-600">
          <span className="text-4xl font-black">
            {progress}%
          </span>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Keep completing tasks to reach 100%.
      </p>
    </div>
  )
}