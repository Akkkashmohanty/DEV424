"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { farmerOnboardingSchema } from "@/schemas/auth.schema"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormValues = z.infer<typeof farmerOnboardingSchema>

export default function FarmerOnboardingForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(farmerOnboardingSchema),
  })

  const onSubmit = async (data: FormValues) => {
    console.log("Farmer Onboarding:", data)

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
            Farmer Onboarding
          </h1>

          <p className="mt-2 text-gray-400">
            Configure your farmer profile.
          </p>
        </div>

        <div>
          <Input
            placeholder="Farming Expertise"
            {...register("farmingExpertise")}
          />

          {errors.farmingExpertise && (
            <p className="mt-2 text-sm text-red-500">
              {errors.farmingExpertise.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="State"
            {...register("state")}
          />

          {errors.state && (
            <p className="mt-2 text-sm text-red-500">
              {errors.state.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Language"
            {...register("language")}
          />

          {errors.language && (
            <p className="mt-2 text-sm text-red-500">
              {errors.language.message}
            </p>
          )}
        </div>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            {...register("marketplaceSeller")}
          />

          Marketplace Seller
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            {...register("videoCreator")}
          />

          Video Creator
        </label>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? "Saving..." : "Complete Setup"}
        </Button>
      </form>
    </div>
  )
}