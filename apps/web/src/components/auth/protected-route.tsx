"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const { isAuthenticated } = useAuthStore()

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push("/login")
    }
  }, [hydrated, isAuthenticated, router])

  if (!hydrated) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}