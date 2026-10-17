
import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Clock3,
  ExternalLink,
  Info,
  Wallet,
} from 'lucide-react'

import { getNFTById } from '@/data/nfts'
import {
  getOrderById,
  type Order,
  type OrderStatus,
} from '@/services/order-service'
import { socket } from '@/services/socket-service'

const LAST_ORDER_STORAGE_KEY = 'kurio-last-order-id-v1'

function formatEth(value: number): string {
  return `${value.toFixed(3)} ETH`
}

function getLastOrderId(): string | null {
  try {
    return sessionStorage.getItem(LAST_ORDER_STORAGE_KEY)
  } catch {
    return null
  }
}

function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'confirmed':
      return 'Confirmado no sistema'
    case 'rejected':
      return 'Rejeitado'
    default:
      return 'Pendente'
  }
}

function getStatusTitle(status: OrderStatus): string {
  switch (status) {
    case 'confirmed':
      return 'Pedido confirmado no sistema'
    case 'rejected':
      return 'Pedido rejeitado'
    default:
      return 'Pedido registrado — aguardando confirmação'
  }
}

function getStatusDescription(status: OrderStatus): string {
  switch (status) {
    case 'confirmed':
      return (
        'O sistema demonstrativo marcou este pedido ' +
        'como confirmado. Isso não comprova pagamento ' +
        'ou transferência de NFTs na blockchain.'
      )

    case 'rejected':
      return (
        'O pedido foi rejeitado no ambiente ' +
        'demonstrativo. Nenhuma cobrança foi realizada.'
      )

    default:
      return (
        'Seu pedido foi registrado no ambiente ' +
        'demonstrativo e está pendente. Nenhum ' +
        'pagamento foi realizado e nenhum NFT foi transferido.'
      )
  }
}

function OrderDetails({ order }: { order: Order }) {
  return (
    <>
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_55px_100px] gap-2 border-b border-[#70482e] pb-3 text-xs font-bold sm:grid-cols-[minmax(0,1fr)_70px_110px] sm:text-sm">
        <span>NFTs</span>
        <span className="text-center">Edições</span>
        <span className="text-right">Subtotal</span>
      </div>

      <div className="space-y-5">
        {order.items.map((item) => {
          const nft = getNFTById(item.nftId)

          return (
            <div
              key={item.nftId}
              className="grid grid-cols-[minmax(0,1fr)_55px_100px] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_70px_110px]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden bg-[#39251d] sm:h-[70px] sm:w-[70px]">
                  {nft?.image ? (
                    <img
                      src={nft.image}
                      alt={
                        nft.name ??
                        item.name ??
                        'Imagem do NFT'
                      }
                      className="h-full w-full object-cover"
                      style={{
                        objectPosition:
                          nft.imagePosition ?? 'center',
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Wallet
                        size={24}
                        className="text-[#d28a4c]"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="break-words text-xs font-semibold sm:text-sm">
                    {item.name}
                  </p>

                  <p className="mt-1 break-all text-[11px] text-[#cfb28c]">
                    ID: {item.nftId}
                  </p>
                </div>
              </div>

              <span className="text-center text-xs text-[#cfb28c] sm:text-sm">
                x {item.quantity}
              </span>

              <span className="text-right text-xs font-medium sm:text-sm">
                {formatEth(item.subtotal)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-8 space-y-3 border-t border-[#70482e] pt-5">
        <div className="flex justify-between gap-4 text-sm text-[#cfb28c]">
          <span>Subtotal</span>
          <span>{formatEth(order.subtotal)}</span>
        </div>

        <div className="flex justify-between gap-4 text-sm text-[#cfb28c]">
          <span>Taxa de rede (estimativa)</span>
          <span>{formatEth(order.estimatedFee)}</span>
        </div>

        <div className="flex justify-between gap-4 pt-2 text-base font-bold">
          <span>Total estimado</span>
          <span className="text-[#d28a4c]">
            {formatEth(order.total)}
          </span>
        </div>
      </div>
    </>
  )
}

/**
 * KURIO — M16.28.8
 *
 * Confirmação baseada no pedido persistido pela API MSW.
 * Acompanha o pedido pelo protocolo Socket.IO.
 *
 * O evento order.updated invalida a consulta TanStack Query.
 * A API REST permanece como fonte dos dados do pedido.
 * Nenhuma transação blockchain é realizada.
 */
export function ConfirmationPage() {
  const queryClient = useQueryClient()
  const orderId = getLastOrderId()

  const orderQuery = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: Boolean(orderId),
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    if (!orderId) {
      return
    }

    const subscribeToOrder = () => {
      socket.emit('order.subscribe', orderId)
    }

    const handleOrderUpdated = (event: {
      orderId: string
      status: OrderStatus
      updatedAt: string
    }) => {
      if (event.orderId !== orderId) {
        return
      }

      void queryClient.invalidateQueries({
        queryKey: ['orders', orderId],
      })
    }

    socket.on('connect', subscribeToOrder)
    socket.on('order.updated', handleOrderUpdated)

    if (socket.connected) {
      subscribeToOrder()
    } else {
      socket.connect()
    }

    return () => {
      if (socket.connected) {
        socket.emit('order.unsubscribe', orderId)
      }

      socket.off('connect', subscribeToOrder)
      socket.off('order.updated', handleOrderUpdated)
      socket.disconnect()
    }
  }, [orderId, queryClient])

  const order = orderQuery.data

  const status: OrderStatus =
    order?.status ?? 'pending'

  const hasOrder = Boolean(order)

  const isLoading =
    Boolean(orderId) && orderQuery.isPending

  const hasError =
    Boolean(orderId) && orderQuery.isError

  return (
    <main className="min-h-[70vh] bg-[#160f0d] px-4 py-12 text-[#f5f1eb] sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Navegação */}
        <div className="mb-8">
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 text-sm text-[#cfb28c] transition-colors hover:text-[#d28a4c]"
          >
            <ArrowLeft
              size={17}
              aria-hidden="true"
            />
            Voltar ao pagamento
          </Link>
        </div>

        {/* Painel principal */}
        <div className="mx-auto w-full max-w-[578px] overflow-hidden border border-[#70482e] bg-[#241612] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          {/* Cabeçalho */}
          <header className="flex flex-col items-center gap-4 px-5 py-8 text-center sm:px-9">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d28a4c]/40 bg-[#d28a4c]/10">
              <Clock3
                className="text-[#d28a4c]"
                size={42}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>

            <h1 className="text-lg font-bold text-[#f5f1eb] sm:text-xl">
              {isLoading
                ? 'Carregando pedido...'
                : hasOrder
                  ? getStatusTitle(status)
                  : 'Detalhes do pedido'}
            </h1>

            <p className="max-w-[420px] text-sm leading-6 text-[#cfb28c]">
              {isLoading
                ? 'Consultando os dados do pedido demonstrativo.'
                : hasOrder
                  ? getStatusDescription(status)
                  : 'Consulte os detalhes de um pedido registrado no KURIO.'}
            </p>
          </header>

          {/* Informações do pedido */}
          <section
            aria-label="Informações do pedido"
            className="grid grid-cols-2 gap-5 border-y border-[#d28a4c] px-6 py-6 sm:grid-cols-4 sm:gap-3 sm:px-9"
          >
            <div>
              <p className="mb-2 text-xs font-bold text-[#cfb28c]">
                ID do pedido
              </p>

              <p
                className="break-all text-xs text-[#f5f1eb]"
                title={order?.id}
              >
                {order?.id ?? '—'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-[#cfb28c]">
                Status
              </p>

              <p className="text-sm text-[#f5f1eb]">
                {hasOrder
                  ? getStatusLabel(status)
                  : '—'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-[#cfb28c]">
                Total estimado
              </p>

              <p className="text-sm text-[#f5f1eb]">
                {order
                  ? formatEth(order.total)
                  : '—'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-[#cfb28c]">
                Carteira informada
              </p>

              <p
                className="break-all text-xs text-[#f5f1eb]"
                title={order?.collector.walletAddress}
              >
                {order
                  ? `${order.collector.walletAddress.slice(
                      0,
                      6,
                    )}...${order.collector.walletAddress.slice(
                      -4,
                    )}`
                  : '—'}
              </p>
            </div>
          </section>

          {/* Detalhes do pedido */}
          <section className="px-5 py-7 sm:px-11">
            <h2 className="mb-6 text-base font-bold">
              Detalhes do pedido
            </h2>

            {isLoading ? (
              <div
                role="status"
                className="rounded-md border border-[#70482e] bg-[#1b120f] px-5 py-8 text-center text-sm text-[#cfb28c]"
              >
                Carregando os dados do pedido...
              </div>
            ) : hasError ? (
              <div
                role="alert"
                className="rounded-md border border-[#70482e] bg-[#1b120f] px-5 py-8 text-center"
              >
                <p className="mb-3 font-semibold">
                  Não foi possível consultar o pedido
                </p>

                <p className="mb-5 text-sm leading-6 text-[#cfb28c]">
                  O pedido pode não existir ou a API
                  simulada pode estar indisponível.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    void orderQuery.refetch()
                  }}
                  className="border border-[#d28a4c] px-5 py-3 text-sm font-semibold text-[#d28a4c] transition-colors hover:bg-[#d28a4c]/10"
                >
                  Tentar novamente
                </button>
              </div>
            ) : order ? (
              <OrderDetails order={order} />
            ) : (
              <div className="rounded-md border border-[#70482e] bg-[#1b120f] px-5 py-8 text-center">
                <Wallet
                  size={32}
                  className="mx-auto mb-4 text-[#d28a4c]"
                  aria-hidden="true"
                />

                <p className="mb-2 font-semibold">
                  Nenhum pedido disponível
                </p>

                <p className="text-sm leading-6 text-[#cfb28c]">
                  Registre um pedido pelo checkout
                  para visualizar seus detalhes
                  nesta página.
                </p>
              </div>
            )}

            {/* Aviso sobre a integração */}
            <div className="mt-8 border-t border-[#70482e] pt-6">
              <div className="rounded-md border border-[#d28a4c]/30 bg-[#d28a4c]/5 p-4">
                <div className="flex items-start gap-3">
                  <Info
                    size={20}
                    className="mt-0.5 shrink-0 text-[#d28a4c]"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="mb-2 text-sm font-semibold">
                      Confirmação blockchain ainda indisponível
                    </p>

                    <p className="text-xs leading-6 text-[#cfb28c] sm:text-sm">
                      Este pedido existe apenas no
                      ambiente demonstrativo. O ID
                      apresentado é o identificador
                      interno do pedido, não um hash
                      de transação. A confirmação
                      blockchain dependerá da conexão
                      da carteira, assinatura da
                      transação e validação pela rede.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/checkout"
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 border border-[#d28a4c] px-4 text-center text-sm font-semibold text-[#d28a4c] transition-colors hover:bg-[#d28a4c]/10"
                >
                  <ArrowLeft
                    size={16}
                    aria-hidden="true"
                  />
                  Voltar ao pagamento
                </Link>

                <Link
                  to="/"
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-[#d28a4c] px-4 text-center text-sm font-semibold text-[#160f0d] transition-colors hover:bg-[#e2a56e]"
                >
                  Explorar NFTs
                  <ExternalLink
                    size={16}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
