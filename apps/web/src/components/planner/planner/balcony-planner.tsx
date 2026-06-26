"use client"

import { useState } from "react"
import { LayoutGrid, Sprout, Sun, Info, Trash2, CheckCircle2 } from "lucide-react"

interface GridSlot {
  id: string
  name: string
  crop: string
  sunHours: number
  moisture: number
  status: "Planted" | "Empty"
}

const initialSlots: GridSlot[] = [
  { id: "A1", name: "Slot A1 (West)", crop: "Cherry Tomatoes", sunHours: 6, moisture: 82, status: "Planted" },
  { id: "A2", name: "Slot A2 (West)", crop: "Baby Spinach", sunHours: 4, moisture: 64, status: "Planted" },
  { id: "B1", name: "Slot B1 (North)", crop: "Organic Chili", sunHours: 5, moisture: 78, status: "Planted" },
  { id: "B2", name: "Slot B2 (North)", crop: "Empty", sunHours: 3, moisture: 0, status: "Empty" },
  { id: "C1", name: "Slot C1 (East)", crop: "Curry Leaves", sunHours: 5, moisture: 90, status: "Planted" },
  { id: "C2", name: "Slot C2 (East)", crop: "Empty", sunHours: 4, moisture: 0, status: "Empty" },
]

const availableCrops = ["Spinach", "Tomatoes", "Chili", "Mint", "Basil", "Coriander"]

export default function BalconyPlanner() {
  const [slots, setSlots] = useState<GridSlot[]>(initialSlots)
  const [selectedSlot, setSelectedSlot] = useState<GridSlot | null>(null)
  const [plantingCrop, setPlantingCrop] = useState("")

  const selectSlot = (slot: GridSlot) => {
    setSelectedSlot(slot)
    setPlantingCrop(slot.crop === "Empty" ? "Spinach" : slot.crop)
  }

  const plantCrop = () => {
    if (!selectedSlot) return
    setSlots(
      slots.map((s) =>
        s.id === selectedSlot.id
          ? {
            ...s,
            crop: plantingCrop,
            status: plantingCrop === "Empty" ? "Empty" : "Planted",
            moisture: plantingCrop === "Empty" ? 0 : 80,
          }
          : s
      )
    )
    setSelectedSlot(null)
  }

  const removeCrop = (id: string) => {
    setSlots(
      slots.map((s) =>
        s.id === id
          ? {
            ...s,
            crop: "Empty",
            status: "Empty",
            moisture: 0,
          }
          : s
      )
    )
    setSelectedSlot(null)
  }

  const occupiedCount = slots.filter((s) => s.status === "Planted").length
  const efficiency = Math.round((occupiedCount / slots.length) * 100)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight">Balcony Layout Planner</h3>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <LayoutGrid className="h-3.5 w-3.5" />
          Grid: 3x2 Setup
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Balcony Grid Layout Visual */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 border border-border/60 bg-muted/15 rounded-2xl p-4 min-h-[300px]">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id
            const isEmpty = slot.status === "Empty"

            return (
              <button
                key={slot.id}
                onClick={() => selectSlot(slot)}
                className={`flex flex-col justify-between p-4 border rounded-xl text-left transition-all ${isSelected
                  ? "border-green-600 ring-1 ring-green-600 bg-green-500/[0.03]"
                  : isEmpty
                    ? "border-dashed border-border hover:border-muted-foreground/40 bg-card/40"
                    : "border-border hover:border-green-600 bg-card hover:shadow-sm"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{slot.id}</span>
                  {!isEmpty && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-green-500/10 text-green-700">
                      <Sprout className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <h4 className="font-bold text-xs text-foreground leading-snug">{slot.name}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {isEmpty ? "Click to plant" : slot.crop}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between w-full text-[9px] text-muted-foreground/80 border-t border-border/40 pt-2">
                  <span className="flex items-center gap-0.5">
                    <Sun className="h-3 w-3 text-amber-500" />
                    {slot.sunHours} hrs
                  </span>
                  {!isEmpty && <span>Moisture: {slot.moisture}%</span>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Slot Inspector / Controller Panel */}
        <div className="flex flex-col justify-between border border-border/60 bg-muted/20 p-5 rounded-2xl">
          {selectedSlot ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground">INSPECTING SLOT</span>
                <h4 className="font-extrabold text-sm text-foreground mt-1">{selectedSlot.name}</h4>
              </div>

              {selectedSlot.status === "Planted" ? (
                <div className="space-y-3">
                  <div className="bg-card border border-border/50 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Planted crop:</span>
                      <span className="font-bold text-foreground">{selectedSlot.crop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunlight duration:</span>
                      <span className="font-bold text-foreground">{selectedSlot.sunHours} hrs/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Soil hydration:</span>
                      <span className="font-bold text-blue-600">{selectedSlot.moisture}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeCrop(selectedSlot.id)}
                    className="w-full flex items-center justify-center gap-1.5 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-600 rounded-xl py-2 font-bold text-xs transition"
                  >
                    <Trash2 className="h-4 w-4" />
                    Harvest / Remove Crop
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-xs text-muted-foreground block font-medium">Select Crop to Plant:</span>
                  <select
                    value={plantingCrop}
                    onChange={(e) => setPlantingCrop(e.target.value)}
                    className="w-full h-9 border border-border bg-background rounded-xl px-2 text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
                  >
                    {availableCrops.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={plantCrop}
                    className="w-full flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 font-bold text-xs transition"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Plant Crop Now
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground">GRID METRICS</span>
                <h4 className="font-extrabold text-sm text-foreground mt-1">Spatial Utilization</h4>
              </div>

              <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold text-green-600">{efficiency}%</div>
                <p className="text-[11px] text-muted-foreground mt-1">Layout Space Efficiency</p>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: `${efficiency}%` }} />
                </div>
              </div>

              <div className="flex gap-2 items-start text-[10px] text-muted-foreground leading-normal mt-2">
                <Info className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                <span>Click on any slot to edit crop status, check sunlight parameters, or plant seedlings.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
