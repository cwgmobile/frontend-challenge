
import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Wallet,
} from 'lucide-react'

import { useCart } from '@/hooks/useCart'

const NETWORK_FEE = 0.016

function formatETH(value: number) {
  return `${value.toFixed(3)} ETH`
}

export function CartPage() {
  const navigate = useNavigate()
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeItem,
  } = useCart()

  const [promoCode, setPromoCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')

  const hasItems = items.length > 0
  const networkFee = hasItems ? NETWORK_FEE : 0
  const total = subtotal + networkFee

  // O campo promocional é apenas visual nesta etapa.
  // Não aplicamos descontos sem uma regra comercial definida.
  const handlePromoCode = () => {
    setPromoMessage(
      promoCode.trim()
        ? 'Nenhuma promoção está disponível no momento.'
        : 'Informe um código promocional.',
    )
  }

  return (
    <main className="min-h-screen bg-[#140d0b] px-5 py-10 text-[#f5eee7] sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Navegação contextual */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-9 flex flex-wrap items-center gap-2 text-xs font-semibold"
        >
          <Link
            to="/"
            className="transition-colors hover:text-[#d58c48]"
          >
            Início
          </Link>
          <span className="text-[#8e7563]">/</span>
          <Link
            to="/"
            className="transition-colors hover:text-[#d58c48]"
          >
            Mercado
          </Link>
          <span className="text-[#8e7563]">/</span>
          <span className="text-[#d58c48]">Carrinho</span>
        </nav>

        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-wide sm:text-4xl">
              Meu carrinho
            </h1>
            <p className="mt-3 text-sm text-[#b69a7c]">
              {hasItems
                ? `${itemCount} ${itemCount === 1 ? 'edição selecionada' : 'edições selecionadas'}`
                : 'Seu carrinho está vazio.'}
            </p>
          </div>

          <Link
            to="/"
            hash="catalogo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#d58c48] transition-colors hover:text-[#f5eee7]"
          >
            <ArrowLeft size={16} />
            Continuar explorando
          </Link>
        </div>

        {!hasItems ? (
          /* Estado vazio */
          <section className="rounded-xl border border-[#493024] bg-[#211610] px-6 py-20 text-center">
            <ShoppingBag
              size={52}
              strokeWidth={1.5}
              className="mx-auto text-[#d58c48]"
            />

            <h2 className="mt-6 text-2xl font-bold">
              Seu carrinho está vazio
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#b69a7c]">
              Explore as coleções KURIO e escolha seus NFTs
              favoritos para começar sua coleção digital.
            </p>

            <Link
              to="/"
              hash="catalogo"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#d58c48] px-7 py-3 text-sm font-bold text-[#140d0b] transition-colors hover:bg-[#e4a15e]"
            >
              Explorar NFTs
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          /* Lista de NFTs e resumo da compra */
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_332px] xl:gap-[70px]">
            <section
              aria-label="NFTs no carrinho"
              className="min-w-0"
            >
              {/* Cabeçalho da tabela — desktop */}
              <div className="hidden grid-cols-[minmax(0,1fr)_100px_100px_105px] gap-3 border-b border-[#493024] pb-5 text-xs font-bold uppercase tracking-wider text-[#b69a7c] md:grid">
                <span>NFTs</span>
                <span className="text-center">Preço</span>
                <span className="text-center">Edições</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y divide-[#493024]">
                {items.map(({ nftId, nft, quantity, subtotal: lineTotal }) => (
                  <article
                    key={nftId}
                    className="grid gap-5 py-6 md:grid-cols-[minmax(0,1fr)_100px_100px_105px] md:items-center md:gap-3"
                  >
                    {/* Identificação do NFT */}
                    <div className="flex min-w-0 items-center gap-4">
                      <Link
                        to="/nft/$nftId"
                        params={{ nftId }}
                        aria-label={`Ver detalhes de ${nft.name ?? 'NFT'}`}
                        className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#302016] sm:h-28 sm:w-28"
                      >
                        <img
                          src={nft.image}
                          alt={nft.name ?? 'Arte digital NFT'}
                          className="h-full w-full object-cover"
                          style={{
                            objectPosition: nft.imagePosition ?? 'center',
                            transform: `scale(${nft.imageScale ?? 1})`,
                          }}
                        />
                      </Link>

                      <div className="min-w-0">
                        <Link
                          to="/nft/$nftId"
                          params={{ nftId }}
                          className="block font-bold leading-6 transition-colors hover:text-[#d58c48]"
                        >
                          {nft.name ?? 'NFT'}
                        </Link>

                        <p className="mt-2 text-xs text-[#b69a7c]">
                          {nft.network}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeItem(nftId)}
                          aria-label={`Remover ${nft.name ?? 'NFT'} do carrinho`}
                          className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#c59a80] transition-colors hover:text-[#f5eee7]"
                        >
                          <Trash2 size={14} />
                          Remover
                        </button>
                      </div>
                    </div>

                    {/* Preço unitário */}
                    <div className="flex items-center justify-between gap-3 md:justify-center">
                      <span className="text-xs text-[#b69a7c] md:hidden">
                        Preço
                      </span>
                      <span className="text-sm font-semibold">
                        {formatETH(nft.price ?? 0)}
                      </span>
                    </div>

                    {/* Quantidade */}
                    <div className="flex items-center justify-between gap-3 md:justify-center">
                      <span className="text-xs text-[#b69a7c] md:hidden">
                        Edições
                      </span>

                      <div className="inline-flex items-center rounded-md border border-[#60402e]">
                        <button
                          type="button"
                          aria-label={`Diminuir quantidade de ${nft.name ?? 'NFT'}`}
                          disabled={quantity <= 1}
                          onClick={() =>
                            updateQuantity(nftId, quantity - 1)
                          }
                          className="flex h-9 w-8 items-center justify-center text-[#d58c48] transition-colors hover:bg-[#39251c] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus size={14} />
                        </button>

                        <span
                          aria-live="polite"
                          className="min-w-7 text-center text-sm font-semibold"
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Aumentar quantidade de ${nft.name ?? 'NFT'}`}
                          disabled={quantity >= Number.MAX_SAFE_INTEGER}
                          onClick={() =>
                            updateQuantity(nftId, quantity + 1)
                          }
                          className="flex h-9 w-8 items-center justify-center text-[#d58c48] transition-colors hover:bg-[#39251c] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total por NFT */}
                    <div className="flex items-center justify-between gap-3 md:justify-end">
                      <span className="text-xs text-[#b69a7c] md:hidden">
                        Total
                      </span>
                      <span className="text-sm font-bold text-[#d58c48]">
                        {formatETH(lineTotal)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Resumo da carteira */}
            <aside
              aria-label="Resumo da compra"
              className="rounded-xl border border-[#493024] bg-[#211610] p-6"
            >
              <h2 className="text-xl font-bold">
                Resumo da carteira
              </h2>

              <div className="mt-6 border-b border-[#493024] pb-6">
                <label
                  htmlFor="kurio-promo-code"
                  className="text-sm font-semibold"
                >
                  Código promocional
                </label>

                <div className="mt-3 flex gap-2">
                  <input
                    id="kurio-promo-code"
                    type="text"
                    value={promoCode}
                    onChange={(event) => {
                      setPromoCode(event.target.value)
                      setPromoMessage('')
                    }}
                    placeholder="Digite seu código"
                    className="min-w-0 flex-1 rounded-md border border-[#60402e] bg-[#140d0b] px-3 py-2.5 text-xs text-[#f5eee7] outline-none placeholder:text-[#8e7563] focus:border-[#d58c48]"
                  />

                  <button
                    type="button"
                    onClick={handlePromoCode}
                    className="rounded-md bg-[#d58c48] px-3 py-2 text-xs font-bold text-[#140d0b] transition-colors hover:bg-[#e4a15e]"
                  >
                    Aplicar
                  </button>
                </div>

                {promoMessage && (
                  <p
                    role="status"
                    className="mt-3 text-xs text-[#c59a80]"
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              <dl className="space-y-4 border-b border-[#493024] py-6 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#b69a7c]">Subtotal</dt>
                  <dd className="font-semibold">
                    {formatETH(subtotal)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#b69a7c]">
                    Desconto do lançamento
                  </dt>
                  <dd className="font-semibold">
                    0.000 ETH
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#b69a7c]">
                    Taxa de rede
                    <span className="mt-1 block text-[10px]">
                      Estimativa ilustrativa
                    </span>
                  </dt>
                  <dd className="font-semibold">
                    {formatETH(networkFee)}
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between gap-3 py-6">
                <span className="text-base font-bold">
                  Total estimado
                </span>
                <strong className="text-xl text-[#d58c48]">
                  {formatETH(total)}
                </strong>
              </div>

              <button
                type="button"
                onClick={() => {
                  // Fluxo provisório: a conexão real da carteira
                  // será implementada no módulo correspondente.
                  void navigate({ to: '/checkout' })
                }}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#d58c48] px-4 py-3.5 text-sm font-bold text-[#140d0b] transition-colors hover:bg-[#e4a15e]"
              >
                <Wallet size={18} />
                Conectar e finalizar
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#b69a7c]">
                A conexão da carteira e a confirmação da
                compra serão implementadas nas próximas etapas.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
