"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { userOnboardingSchema } from "@/schemas/auth.schema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FormValues = z.infer<typeof userOnboardingSchema>

export default function UserOnboardingForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(userOnboardingSchema),
  })

  const onSubmit = async (data: FormValues) => {
    console.log("User Onboarding:", data)

    router.push("/dashboard")
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div>
          <h1 className="text-4xl font-bold text-white">
            User Onboarding
          </h1>

          <p className="mt-2 text-gray-400">
            Tell us about your farming goals.
          </p>
        </div>

        <div>
          <Input
            placeholder="City"
            {...register("city")}
          />

          {errors.city && (
            <p className="mt-2 text-sm text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Balcony Size"
            {...register("balconySize")}
          />

          {errors.balconySize && (
            <p className="mt-2 text-sm text-red-500">
              {errors.balconySize.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Farming Interest"
            {...register("farmingInterest")}
          />

          {errors.farmingInterest && (
            <p className="mt-2 text-sm text-red-500">
              {errors.farmingInterest.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Fitness Goals"
            {...register("fitnessGoals")}
          />

          {errors.fitnessGoals && (
            <p className="mt-2 text-sm text-red-500">
              {errors.fitnessGoals.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </Button>
      </form>
    </div>
  )
}