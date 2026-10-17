
import axios from 'axios'

/**
 * KURIO — Cliente HTTP centralizado
 *
 * M16.26.3 — Autenticação simulada
 *
 * O MSW intercepta as requisições /api/*
 * quando os mocks estão habilitados.
 *
 * O token demonstrativo é armazenado
 * em sessionStorage, não em localStorage.
 *
 * Importante:
 * Este mecanismo é exclusivo do desafio.
 * Não representa uma solução de segurança
 * para autenticação em produção.
 */

const AUTH_TOKEN_KEY = 'kurio-auth-token-v1'

export function getAuthToken(): string | null {
  try {
    return sessionStorage.getItem(AUTH_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAuthToken(token: string): void {
  try {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token)
  } catch {
    // O navegador pode bloquear o armazenamento.
  }
}

export function clearAuthToken(): void {
  try {
    sessionStorage.removeItem(AUTH_TOKEN_KEY)
  } catch {
    // Mantemos o funcionamento sem armazenamento.
  }
}

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
})

/**
 * Interceptor de requisições:
 * adiciona o token quando existir.
 */
api.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.set(
      'Authorization',
      `Bearer ${token}`,
    )
  }

  return config
})

/**
 * Interceptor de respostas:
 * remove tokens rejeitados pela API.
 *
 * Uma resposta 401 do login não deve
 * apagar uma sessão existente.
 */
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const requestUrl = error.config?.url ?? ''

      const isLoginRequest =
        requestUrl.includes('/auth/login')

      const isSignupRequest =
        requestUrl.includes('/auth/signup')

      if (
        status === 401 &&
        !isLoginRequest &&
        !isSignupRequest
      ) {
        clearAuthToken()
      }
    }

    return Promise.reject(error)
  },
)
