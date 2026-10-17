
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Diagnóstico das requisições recebidas pelo MSW.
worker.events.on('request:start', ({ request }) => {
  if (new URL(request.url).pathname.startsWith('/api/')) {
    console.info(
      '[KURIO MSW] Requisição recebida:',
      request.method,
      new URL(request.url).pathname,
    )
  }
})

worker.events.on('request:match', ({ request }) => {
  if (new URL(request.url).pathname.startsWith('/api/')) {
    console.info(
      '[KURIO MSW] Handler encontrado:',
      request.method,
      new URL(request.url).pathname,
    )
  }
})
