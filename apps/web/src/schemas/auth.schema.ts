import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signupSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    },
  )

export const userOnboardingSchema = z.object({
  city: z.string().min(2),
  balconySize: z.string().min(1),
  farmingInterest: z.string().min(2),
  fitnessGoals: z.string().min(2),
})

export const farmerOnboardingSchema = z.object({
  farmingExpertise: z.string().min(2),
  state: z.string().min(2),
  language: z.string().min(2),
  marketplaceSeller: z.boolean(),
  videoCreator: z.boolean(),
})