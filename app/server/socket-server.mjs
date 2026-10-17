
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const PORT = 3001

function getOrderRoom(orderId) {
  return `order:${orderId}`
}

function isValidOrderId(orderId) {
  return (
    typeof orderId === 'string' &&
    orderId.trim().length > 0 &&
    orderId.length <= 128
  )
}

const VALID_STATUSES = new Set([
  'pending',
  'confirmed',
  'rejected',
])

const httpServer = createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    })

    response.end(
      JSON.stringify({
        status: 'ok',
        service: 'kurio-socket-server',
      }),
    )
    return
  }

  response.writeHead(404)
  response.end('Not found')
})

const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(
    `[Socket.IO] Cliente conectado: ${socket.id}`,
  )

  socket.emit('server.connected', {
    message: 'Conectado ao servidor KURIO',
    timestamp: new Date().toISOString(),
  })

  socket.on('order.subscribe', (orderId) => {
    if (!isValidOrderId(orderId)) {
      console.warn(
        `[Socket.IO] Inscrição inválida: ${socket.id}`,
      )
      return
    }

    socket.join(getOrderRoom(orderId))

    console.log(
      `[Socket.IO] ${socket.id} acompanhando pedido ${orderId}`,
    )
  })

  socket.on('order.unsubscribe', (orderId) => {
    if (!isValidOrderId(orderId)) {
      return
    }

    socket.leave(getOrderRoom(orderId))

    console.log(
      `[Socket.IO] ${socket.id} deixou o pedido ${orderId}`,
    )
  })

  /**
   * Evento demonstrativo de atualização de pedido.
   *
   * Somente em desenvolvimento local.
   * Não altera a API ou o localStorage do navegador.
   */
  socket.on('order.demo.update', (payload) => {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    const orderId = payload?.orderId
    const status = payload?.status

    if (
      !isValidOrderId(orderId) ||
      !VALID_STATUSES.has(status)
    ) {
      console.warn(
        '[Socket.IO] Atualização demonstrativa inválida.',
      )
      return
    }

    const event = {
      orderId,
      status,
      updatedAt: new Date().toISOString(),
    }

    io.to(getOrderRoom(orderId)).emit(
     'order.updated',
      event,
    )

    console.log(
      `[Socket.IO] Pedido ${orderId} atualizado para ${status}`,
    )
  })

  socket.on('disconnect', (reason) => {
    console.log(
      `[Socket.IO] Cliente desconectado: ${socket.id} (${reason})`,
    )
  })
})

httpServer.listen(PORT, () => {
  console.log(
    `[KURIO] Socket.IO disponível em http://localhost:${PORT}`,
  )
  console.log(
    `[KURIO] Health: http://localhost:${PORT}/health`,
  )
})
