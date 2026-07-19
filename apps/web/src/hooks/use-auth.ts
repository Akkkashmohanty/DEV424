"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

export function useAuth() {
  const router = useRouter()

  const {
    setAuth,
    logout,
    user,
    isAuthenticated,
  } = useAuthStore()

  const login = async (
    email: string,
    password: string,
  ) => {
    try {
      const tokenResponse =
        await authService.login({
          email,
          password,
        })

      localStorage.setItem(
        "farmgym-temp-token",
        tokenResponse.access_token,
      )

      useAuthStore.setState({
        accessToken: tokenResponse.access_token,
      })

      const currentUser =
        await authService.me()

      setAuth(
        currentUser,
        tokenResponse.access_token,
      )

      toast.success(
        `Welcome ${currentUser.full_name}!`,
      )

      router.push("/dashboard")
    } catch {
      toast.error(
        "Invalid email or password",
      )
    }
  }

  const signup = async (
    full_name: string,
    email: string,
    password: string,
  ) => {
    try {
      await authService.register({
        full_name,
        email,
        password,
      })

      toast.success(
        "Account created successfully",
      )

      router.push("/login")
    } catch {
      toast.error(
        "Registration failed",
      )
    }
  }

  return {
    login,
    signup,
    logout,
    user,
    isAuthenticated,
  }
}