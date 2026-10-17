
import { api } from './api'

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface AuthSession {
  token: string
  user: AuthUser
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  data: AuthSession
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    credentials,
  )

  return response.data.data
}

export async function signup(
  data: SignupData,
): Promise<AuthSession> {
  const response = await api.post<AuthResponse>(
    '/auth/signup',
    data,
  )

  return response.data.data
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api.get<{ data: AuthUser }>(
    '/auth/me',
  )

  return response.data.data
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}
