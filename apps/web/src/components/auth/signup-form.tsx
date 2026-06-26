"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { signupSchema } from "@/schemas/auth.schema"
import { useAuth } from "@/hooks/use-auth"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const { signup } = useAuth()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (
    data: FormValues,
  ) => {
    await signup(
      data.full_name,
      data.email,
      data.password,
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <h1 className="text-4xl font-bold">
          Create Account
        </h1>
      </div>

      <div>
        <Input
          placeholder="Full Name"
          {...register("full_name")}
        />

        {errors.full_name && (
          <p className="mt-2 text-sm text-red-500">
            {errors.full_name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Email"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Creating account..."
          : "Create Account"}
      </Button>
    </form>
  )
}