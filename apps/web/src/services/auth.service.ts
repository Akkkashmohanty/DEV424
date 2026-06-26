import { api } from "@/lib/axios/client"

import {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  User,
} from "@/types/auth.types"

export const authService = {
  async register(
    payload: RegisterRequest,
  ) {
    const response = await api.post<User>(
      "/auth/register",
      payload,
    )

    return response.data
  },

  async login(
    payload: LoginRequest,
  ) {
    const response = await api.post<TokenResponse>(
      "/auth/login",
      payload,
    )

    return response.data
  },

  async me() {
    const response = await api.get<User>(
      "/auth/me",
    )

    return response.data
  },
}