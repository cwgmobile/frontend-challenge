
import { useQuery } from '@tanstack/react-query'

import { getAuthToken } from '@/services/api'
import { getCurrentUser } from '@/services/auth-service'

/**
 * KURIO — M16.26.7.1
 *
 * Consulta do usuário autenticado.
 *
 * Integração:
 * TanStack Query + Axios + MSW
 *
 * O token é enviado automaticamente
 * pelo interceptor do Axios.
 */
export function useAuthUser() {
  const hasToken = Boolean(getAuthToken())

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getCurrentUser,

    // Não consulta a API sem token.
    enabled: hasToken,

    // Evita repetir consultas imediatamente.
    staleTime: 30_000,

    // Não insiste quando a sessão é inválida.
    retry: false,
  })
}
