export type UserRole =
  | "USER"
  | "FARMER"
  | "SELLER"
  | "CREATOR"
  | "ADMIN"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  full_name: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  role: UserRole
}

export interface User {
  id: number
  email: string
  full_name: string
  role: UserRole
  xp_points: number
  level: number
  streak_days: number
  created_at: string
}