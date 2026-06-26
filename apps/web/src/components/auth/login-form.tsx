"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"

import { loginSchema } from "@/schemas/auth.schema"
import { useAuth } from "@/hooks/use-auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-muted-foreground">
          Login to continue your farming journey.
        </p>
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

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-green-600"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-green-600"
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}