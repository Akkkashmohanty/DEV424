"use client"

import { Sprout } from "lucide-react"

import { Progress } from "@/components/ui/progress"

import { useCropLifecycle } from "../hooks/use-planner"

export default function CropLifecycleCard() {
    const {
        data = [],
        isLoading,
        isError,
    } = useCropLifecycle()

    return (
        <div className="rounded-3xl border bg-card p-6">
            <div className="mb-6 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-green-600" />

                <h3 className="text-xl font-semibold">
                    Crop Lifecycle
                </h3>
            </div>

            {isLoading && (
                <p className="text-muted-foreground">
                    Loading...
                </p>
            )}

            {isError && (
                <p className="text-red-500">
                    Failed to load lifecycle.
                </p>
            )}

            {!isLoading &&
                !isError &&
                data.length === 0 && (
                    <p className="text-muted-foreground">
                        No crops available.
                    </p>
                )}

            <div className="space-y-6">
                {data.map((crop) => (
                    <div key={crop.crop_name}>
                        <div className="mb-2 flex justify-between">
                            <span className="font-medium">
                                {crop.crop_name}
                            </span>

                            <span className="text-sm text-muted-foreground">
                                {crop.progress}%
                            </span>
                        </div>

                        <Progress value={crop.progress} />

                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                            <span>{crop.planting_date}</span>
                            <span>{crop.expected_harvest_date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}