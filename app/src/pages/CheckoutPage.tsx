
import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import {
  createOrder,
  type CreateOrderInput,
  type OrderNetwork,
  type OrderWalletType,
} from '@/services/order-service'

/**
 * M16.27.4 — Checkout funcional do KURIO.
 *
 * Registra pedidos demonstrativos via REST/MSW.
 * Não realiza transações blockchain ou pagamentos reais.
 */

interface CollectorForm {
  displayName: string
  username: string
  profileName: string
  email: string
  walletAddress: string
  network: OrderNetwork | ''
  walletType: OrderWalletType | ''
}

const INITIAL_FORM: CollectorForm = {
  displayName: '',
  username: '',
  profileName: '',
  email: '',
  walletAddress: '',
  network: '',
  walletType: '',
}

const FIELD_CLASS =
  'mt-2 w-full rounded border border-[#3f2319] bg-[#1d1410] px-3 py-3 text-sm text-[#f5eee7] outline-none transition-colors placeholder:text-[#927866] focus:border-[#d58c48]'

function formatEth(value: number) {
  return `${value.toFixed(3)} ETH`
}

function isValidWalletAddress(
  network: OrderNetwork,
  address: string,
): boolean {
  const trimmed = address.trim()

  if (network === 'Solana') {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(
      trimmed,
    )
  }

  return /^0x[a-fA-F0-9]{40}$/.test(trimmed)
}

function getRequestError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data

    if (
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
    ) {
      return data.message
    }

    if (!error.response) {
      return 'Não foi possível conectar à API simulada. Tente novamente.'
    }
  }

  return 'Não foi possível registrar o pedido. Tente novamente.'
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, itemCount, subtotal } = useCart()

  const [form, setForm] = useState<CollectorForm>(
    INITIAL_FORM,
  )
  const [notice, setNotice] = useState('')

  /**
   * Mantém a mesma chave se a requisição falhar.
   * Uma nova chave é criada quando o comprador
   * modifica o formulário.
   */
  const idempotencyKeyRef = useRef<string | null>(
    null,
  )

  /**
   * Bloqueio imediato contra dois cliques antes
   * da atualização visual do React.
   */
  const submittingRef = useRef(false)

  const orderMutation = useMutation({
    mutationFn: createOrder,
  })

  // Taxa ilustrativa, não uma cotação blockchain.
  const estimatedFee =
    items.length > 0 ? 0.016 : 0

  const total = subtotal + estimatedFee

  function updateField<K extends keyof CollectorForm>(
    field: K,
    value: CollectorForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    idempotencyKeyRef.current = null
    setNotice('')
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (
      submittingRef.current ||
      orderMutation.isPending
    ) {
      return
    }

    if (items.length === 0) {
      setNotice(
        'Adicione NFTs ao carrinho antes de continuar.',
      )
      return
    }

    if (!form.network || !form.walletType) {
      setNotice(
        'Selecione uma rede e um tipo de carteira.',
      )
      return
    }

    if (
      !isValidWalletAddress(
        form.network,
        form.walletAddress,
      )
    ) {
      setNotice(
        form.network === 'Solana'
          ? 'Informe um endereço Solana válido.'
          : 'Informe um endereço de carteira válido, iniciado por 0x e com 42 caracteres.',
      )
      return
    }

    const idempotencyKey =
      idempotencyKeyRef.current ??
      crypto.randomUUID()

    idempotencyKeyRef.current = idempotencyKey

    const payload: CreateOrderInput = {
      idempotencyKey,
      collector: {
        displayName: form.displayName.trim(),
        username: form.username.trim(),
        profileName: form.profileName.trim(),
        email: form.email.trim(),
        walletAddress:
          form.walletAddress.trim(),
        network: form.network,
        walletType: form.walletType,
      },
      items: items.map((item) => ({
        nftId: item.nftId,
        quantity: item.quantity,
      })),
    }

    submittingRef.current = true
    setNotice('')

    try {
      const order =
        await orderMutation.mutateAsync(payload)

      /**
       * O pedido foi REGISTRADO, não pago.
       * Guardamos o identificador para a próxima
       * etapa da página de confirmação.
       */
      sessionStorage.setItem(
        'kurio-last-order-id-v1',
        order.id,
      )

      await navigate({
        to: '/confirmation',
      })
    } catch (error) {
      setNotice(getRequestError(error))
    } finally {
      submittingRef.current = false
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[65vh] bg-[#140d0b] px-5 py-20 text-[#f5eee7] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">
            Checkout
          </h1>

          <div className="mt-10 rounded-lg border border-[#39251c] bg-[#241612] p-10 text-center">
            <Wallet
              aria-hidden="true"
              className="mx-auto mb-5 text-[#d58c48]"
              size={42}
            />

            <h2 className="text-xl font-bold">
              Seu carrinho está vazio
            </h2>

            <p className="mt-3 text-sm text-[#cbb8a8]">
              Escolha um NFT para iniciar sua compra.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex rounded-md bg-[#d58c48] px-6 py-3 text-sm font-bold text-[#140d0b] transition-colors hover:bg-[#e9a565]"
            >
              Explorar NFTs
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#140d0b] px-5 py-12 text-[#f5eee7] sm:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Navegação do checkout"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            to="/"
            className="hover:text-[#d58c48]"
          >
            Início
          </Link>

          <span className="text-[#927866]">
            /
          </span>

          <Link
            to="/cart"
            className="hover:text-[#d58c48]"
          >
            Carrinho
          </Link>

          <span className="text-[#927866]">
            /
          </span>

          <span className="font-bold text-[#d58c48]">
            Pagamento
          </span>
        </nav>

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d58c48]">
              Finalização da compra
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Pagamento
            </h1>
          </div>

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-[#cbb8a8] transition-colors hover:text-[#d58c48]"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />
            Voltar ao carrinho
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]"
        >
          <section
            aria-labelledby="collector-title"
            className="min-w-0"
          >
            <h2
              id="collector-title"
              className="mb-6 text-lg font-bold"
            >
              Perfil do colecionador
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                Nome de exibição{' '}
                <span className="text-[#f0805f]">
                  *
                </span>

                <input
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="nickname"
                  value={form.displayName}
                  onChange={(event) =>
                    updateField(
                      'displayName',
                      event.target.value,
                    )
                  }
                  placeholder="Como deseja ser identificado"
                  className={FIELD_CLASS}
                />
              </label>

              <label className="block text-sm">
                Nome de usuário{' '}
                <span className="text-[#f0805f]">
                  *
                </span>

                <input
                  type="text"
                  required
                  maxLength={40}
                  value={form.username}
                  onChange={(event) =>
                    updateField(
                      'username',
                      event.target.value,
                    )
                  }
                  placeholder="Seu usuário"
                  className={FIELD_CLASS}
                />
              </label>

              <label className="block text-sm">
                Rede{' '}
                <span className="text-[#f0805f]">
                  *
                </span>

                <select
                  required
                  value={form.network}
                  onChange={(event) => {
                    const network =
                      event.target
                        .value as CollectorForm['network']

                    setForm((current) => ({
                      ...current,
                      network,
                      walletAddress: '',
                    }))

                    idempotencyKeyRef.current =
                      null
                    setNotice('')
                  }}
                  className={FIELD_CLASS}
                >
                  <option value="">
                    Selecione uma rede
                  </option>
                  <option value="Ethereum">
                    Ethereum
                  </option>
                  <option value="Polygon">
                    Polygon
                  </option>
                  <option value="Solana">
                    Solana
                  </option>
                </select>
              </label>

              <label className="block text-sm">
                Nome do perfil{' '}
                <span className="text-[#f0805f]">
                  *
                </span>

                <input
                  type="text"
                  required
                  maxLength={80}
                  value={form.profileName}
                  onChange={(event) =>
                    updateField(
                      'profileName',
                      event.target.value,
                    )
                  }
                  placeholder="Nome do seu perfil"
                  className={FIELD_CLASS}
                />
              </label>

              <label className="block text-sm sm:col-span-2">
                Endereço da carteira{' '}
                <span className="text-[#f0805f]">
                  *
                </span>

                <input
                  type="text"
                  required
                  spellCheck={false}
                  autoComplete="off"
                  value={form.walletAddress}
                  onChange={(event) =>
                    updateField(
                      'walletAddress',
                      event.target.value,
                    )
                  }
                  placeholder={
                    form.network === 'Solana'
                      ? 'Endereço da carteira Solana'
                      : 'Endereço 0x da carteira'
                  }
                  className={FIELD_CLASS}
                />
              </label>

              <label className="block text-sm">
                Tipo de carteira{' '}
                <span className="text-[#f0805f]">
                  *
                </span>

                <select
                  required
                  value={form.walletType}
                  onChange={(event) =>
                    updateField(
                      'walletType',
                      event.target
                        .value as CollectorForm['walletType'],
                    )
                  }
                  className={FIELD_CLASS}
                >
                  <option value="">
                    Selecione uma carteira
                  </option>
                  <option value="MetaMask">
                    MetaMask
                  </option>
                  <option value="WalletConnect">
                    WalletConnect
                  </option>
                  <option value="Coinbase Wallet">
                    Coinbase Wallet
                  </option>
                </select>
              </label>

              <label className="block text-sm">
                E-mail{' '}
                <span className="text-[#f0805f]">
                  *
                </span>

                <input
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      'email',
                      event.target.value,
                    )
                  }
                  placeholder="seu@email.com"
                  className={FIELD_CLASS}
                />
              </label>
            </div>

            <section
              aria-labelledby="wallet-title"
              className="mt-10"
            >
              <h2
                id="wallet-title"
                className="mb-4 text-lg font-bold"
              >
                Carteira e rede
              </h2>

              <div className="grid gap-3 sm:grid-cols-3">
                {(
                  [
                    'WalletConnect',
                    'MetaMask',
                    'Coinbase Wallet',
                  ] as const
                ).map((wallet) => {
                  const selected =
                    form.walletType === wallet

                  return (
                    <button
                      key={wallet}
                      type="button"
                      disabled={
                        orderMutation.isPending
                      }
                      aria-pressed={selected}
                      onClick={() =>
                        updateField(
                          'walletType',
                          wallet,
                        )
                      }
                      className={`flex min-h-20 items-center justify-between gap-2 rounded-md border p-4 text-left text-sm transition-colors ${
                        selected
                          ? 'border-[#d58c48] bg-[#39251c]'
                          : 'border-[#3f2319] bg-[#241612] hover:border-[#94613e]'
                      } disabled:opacity-60`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Wallet
                          size={20}
                          className="shrink-0 text-[#d58c48]"
                          aria-hidden="true"
                        />

                        <span className="break-words">
                          {wallet}
                        </span>
                      </span>

                      {selected && (
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-[#d58c48]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              <p className="mt-3 text-xs leading-5 text-[#a98d79]">
                A seleção identifica a preferência
                de carteira. Nenhuma conexão
                blockchain é iniciada nesta versão.
              </p>
            </section>
          </section>

          <aside
            aria-labelledby="summary-title"
            className="min-w-0 rounded-lg border border-[#39251c] bg-[#241612] p-5 sm:p-6"
          >
            <h2
              id="summary-title"
              className="mb-2 text-lg font-bold"
            >
              Resumo da compra
            </h2>

            <p className="mb-6 text-xs text-[#a98d79]">
              {itemCount}{' '}
              {itemCount === 1
                ? 'edição selecionada'
                : 'edições selecionadas'}
            </p>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.nftId}
                  className="flex min-w-0 items-center gap-3 border-b border-[#39251c] pb-4"
                >
                  <img
                    src={item.nft.image}
                    alt={`Arte do NFT ${item.nft.name}`}
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                    style={{
                      objectPosition:
                        item.nft.imagePosition ??
                        'center',
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-bold">
                      {item.nft.name}
                    </p>

                    <p className="mt-1 text-xs text-[#a98d79]">
                      Quantidade: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-right text-sm font-bold text-[#d58c48]">
                    {formatEth(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#cbb8a8]">
                  Subtotal
                </span>
                <strong>
                  {formatEth(subtotal)}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#cbb8a8]">
                  Desconto
                </span>
                <span>0.000 ETH</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#cbb8a8]">
                  Taxa ilustrativa
                </span>
                <span>
                  {formatEth(estimatedFee)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-[#60402e] pt-5">
                <span className="text-base font-bold">
                  Total
                </span>

                <strong className="text-xl text-[#d58c48]">
                  {formatEth(total)}
                </strong>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-md border border-[#60402e] bg-[#1d1410] p-4">
              <ShieldCheck
                size={19}
                className="shrink-0 text-[#d58c48]"
                aria-hidden="true"
              />

              <p className="text-xs leading-5 text-[#cbb8a8]">
                Ambiente demonstrativo. Nenhuma
                transação, assinatura ou cobrança
                será realizada.
              </p>
            </div>

            {notice && (
              <p
                role="alert"
                aria-live="polite"
                className="mt-5 rounded-md border border-[#94613e] bg-[#39251c] p-3 text-xs leading-5 text-[#f5eee7]"
              >
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={
                orderMutation.isPending
              }
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#d58c48] px-5 py-4 text-sm font-bold text-[#140d0b] transition-colors hover:bg-[#e9a565] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard
                size={18}
                aria-hidden="true"
              />

              {orderMutation.isPending
                ? 'Registrando pedido...'
                : 'Registrar pedido demonstrativo'}
            </button>

            <button
              type="button"
              disabled={
                orderMutation.isPending
              }
              onClick={() =>
                navigate({ to: '/cart' })
              }
              className="mt-4 w-full text-center text-xs font-medium text-[#cbb8a8] transition-colors hover:text-[#d58c48] disabled:opacity-60"
            >
              Revisar carrinho
            </button>
          </aside>
        </form>
      </div>
    </main>
  )
}
