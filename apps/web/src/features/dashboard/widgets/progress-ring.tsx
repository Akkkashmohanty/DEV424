"use client"

import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function ProgressRing() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-xl font-semibold">
        Monthly Goal
      </h3>

      <div className="mx-auto mt-8 h-44 w-44">
        <CircularProgressbar
          value={72}
          text="72%"
        />
      </div>
    </div>
  )
}