"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgotPasswordSchema } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"

import AuthLayout from "@/components/auth/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async () => {}

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold">
          Forgot Password
        </h1>

        <Input
          placeholder="Email Address"
          {...register("email")}
        />

        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isSubmitting}
        >
          Send Reset Link
        </Button>
      </form>
    </AuthLayout>
  )
}