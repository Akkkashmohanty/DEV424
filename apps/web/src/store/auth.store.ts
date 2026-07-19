import { create } from "zustand"
import { persist } from "zustand/middleware"

import { User } from "@/types/auth.types"

interface AuthState {
  user: User | null

  accessToken: string | null

  isAuthenticated: boolean

  role: string | null

  setAuth: (
    user: User,
    accessToken: string,
  ) => void

  setUser: (
    user: User,
  ) => void

  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      isAuthenticated: false,

      role: null,

      setAuth: (
        user,
        accessToken,
      ) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
          role: user.role,
        }),

      setUser: (
        user,
      ) =>
        set({
          user,
          role: user.role,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          role: null,
        }),
    }),
    {
      name: "farmgym-auth",
    },
  ),
)