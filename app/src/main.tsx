
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { CartProvider } from './contexts/CartContext'
import { router } from './routes/router'
import './index.css'

/**
 * KURIO — Inicialização da aplicação
 *
 * Preserva:
 * - TanStack Router
 * - TanStack Query
 * - CartProvider
 *
 * Ativa o MSW antes de renderizar o React.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function renderApp() {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    throw new Error('Elemento #root não encontrado.')
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}

async function startApp() {
  const enableMocks =
    import.meta.env.VITE_ENABLE_MOCKS === 'true' ||
    (
      import.meta.env.DEV &&
      import.meta.env.VITE_ENABLE_MOCKS !== 'false'
    )

  if (enableMocks) {
    const { worker } = await import('./mocks/browser')

    await worker.start()

    console.info('[KURIO] MSW iniciado com sucesso.')
  }

  renderApp()
}

startApp().catch((error: unknown) => {
  console.error(
    '[KURIO] Falha ao iniciar a aplicação:',
    error,
  )
})
