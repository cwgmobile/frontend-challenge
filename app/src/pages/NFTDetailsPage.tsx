
import { useState } from 'react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import {
  Heart,
  Mail,
  Minus,
  Plus,
  Search,
  Share2,
  Star,
} from 'lucide-react'
import axios from 'axios'

import { useNFTById } from '@/hooks/useNFTs'
import { useCart } from '@/hooks/useCart'
import { NFTInformationTabs } from '@/components/nft-details/NFTInformationTabs'
import { RelatedNFTs } from '@/components/nft-details/RelatedNFTs'
import type { NFT } from '@/data/nfts'

/**
 * KURIO — M16
 * Página de detalhes integrada à API simulada.
 *
 * TanStack Query → Axios → MSW.
 * Preserva o layout e as funcionalidades anteriores.
 */

const emeraldDetails = {
  description:
    'Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.',
  edition: ['1/1', '1/10', '1/50', 'ABERTA'],
  tokenId: '#0042',
  collection: 'Kurio Apes',
  attributes: 'Óculos, Esmeralda, Raro',
  rating: 19,
}

function NFTErrorState({
  title,
  message,
  onRetry,
}: {
  title: string
  message: string
  onRetry?: () => void
}) {
  return (
    <main className="min-h-[50vh] bg-[#140d0b] px-5 py-20 text-center text-[#f5eee7]">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-4 text-sm text-[#a98d79]">
          {message}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {typeof onRetry === 'function' && (
            <button
              type="button"
              onClick={() => onRetry()}
              className="rounded-md border border-[#d58c48] px-6 py-3 text-sm font-bold text-[#d58c48] transition-colors hover:bg-[#39251c]"
            >
              Tentar novamente
            </button>
          )}

          <Link
            to="/"
            className="inline-block rounded-md bg-[#d58c48] px-6 py-3 text-sm font-bold text-[#140d0b]"
          >
            Voltar ao marketplace
          </Link>
        </div>
      </div>
    </main>
  )
}


function NFTDetailsContent({ nft }: { nft: NFT }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const isEmeraldApe = nft.id === 'emerald-ape-042'
  const galleryImages = Array.from(
    { length: 4 },
    () => nft.image,
  )

  function handleBuy() {
    if (nft.price === null) return

    addItem(nft.id, quantity)
    void navigate({ to: '/cart' })
  }

  return (
    <main className="min-h-screen bg-[#140d0b] px-5 py-10 text-[#f5eee7] sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Navegação contextual */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-5 flex items-center gap-2 text-xs font-semibold"
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
        </nav>

        {/* Galeria e informações principais */}
        <section className="grid items-start gap-8 lg:grid-cols-2">
          <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] gap-4 sm:grid-cols-[88px_minmax(0,1fr)]">
            {/* Miniaturas */}
            <div className="flex flex-col gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Visualizar imagem ${index + 1}`}
                  aria-pressed={activeImage === index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                    activeImage === index
                      ? 'border-[#d58c48]'
                      : 'border-transparent hover:border-[#60402e]'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Imagem principal */}
            <div className="relative flex aspect-square min-w-0 items-center justify-center overflow-hidden rounded-md bg-[#261913] p-3 sm:p-5">
              <img
                src={galleryImages[activeImage]}
                alt={
                  nft.name
                    ? `Arte digital ${nft.name}`
                    : 'Arte digital NFT'
                }
                className="h-full w-full rounded-xl object-cover"
                style={{
                  objectPosition:
                    nft.imagePosition ?? 'center',
                  transform: `scale(${nft.imageScale ?? 1})`,
                }}
              />

              <a
                href={galleryImages[activeImage]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir imagem em tamanho original"
                className="absolute right-4 top-4 rounded-full bg-[#140d0b]/75 p-2 text-[#f5eee7] transition-colors hover:text-[#d58c48]"
              >
                <Search size={19} />
              </a>
            </div>
          </div>

          {/* Dados do NFT */}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">
              {nft.name ?? 'NFT — Informações em breve'}
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#39251c] pb-4">
              <p className="text-xl font-bold text-[#d58c48]">
                {nft.price !== null
                  ? `${nft.price.toFixed(2)} ETH`
                  : 'Preço indisponível'}
              </p>

              {isEmeraldApe && (
                <div className="flex items-center gap-2 text-xs">
                  <span
                    aria-label="Avaliação ilustrativa de cinco estrelas"
                    className="flex text-[#d58c48]"
                  >
                    {Array.from(
                      { length: 5 },
                      (_, index) => (
                        <Star
                          key={index}
                          size={13}
                          fill="currentColor"
                        />
                      ),
                    )}
                  </span>

                  <span className="text-[#cbb8a8]">
                    {emeraldDetails.rating} avaliações de colecionadores
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <h2 className="font-bold text-[#f5eee7]">
                Sobre este NFT:
              </h2>

              <p className="leading-7 text-[#b69a7c]">
                {isEmeraldApe
                  ? emeraldDetails.description
                  : 'Informações adicionais desta obra ainda não estão disponíveis.'}
              </p>

              {isEmeraldApe && (
                <>
                  <h3 className="font-bold text-[#f5eee7]">
                    Edição:
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {emeraldDetails.edition.map(
                      (edition) => (
                        <span
                          key={edition}
                          className="rounded-full border border-[#60402e] px-2 py-1 text-[11px] text-[#d58c48]"
                        >
                          {edition}
                        </span>
                      ),
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Quantidade e ações */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
              <div
                aria-label="Quantidade"
                className="flex items-center gap-4"
              >
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  disabled={quantity === 1}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1),
                    )
                  }
                  className="flex h-10 w-9 items-center justify-center rounded-full bg-[#d58c48] text-[#140d0b] disabled:opacity-50"
                >
                  <Minus size={18} />
                </button>

                <span
                  aria-live="polite"
                  className="min-w-4 text-center text-base font-semibold"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(
                        Number.MAX_SAFE_INTEGER,
                        current + 1,
                      ),
                    )
                  }
                  className="flex h-10 w-9 items-center justify-center rounded-full bg-[#d58c48] text-[#140d0b]"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={nft.price === null}
                  onClick={handleBuy}
                  className="rounded-md bg-[#d58c48] px-8 py-3 text-xs font-bold uppercase text-[#140d0b] transition-colors hover:bg-[#e4a15e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Comprar
                </button>

                <button
                  type="button"
                  aria-pressed={isFavorite}
                  onClick={() =>
                    setIsFavorite((current) => !current)
                  }
                  className="flex items-center gap-2 rounded-md border border-[#a76b35] px-4 py-3 text-xs font-semibold text-[#d58c48] transition-colors hover:bg-[#39251c]"
                >
                  <Heart
                    size={15}
                    fill={
                      isFavorite
                        ? 'currentColor'
                        : 'none'
                    }
                  />

                  {isFavorite
                    ? 'Favoritado'
                    : 'Favoritar'}
                </button>
              </div>
            </div>

            {/* Metadados */}
            <dl className="mt-6 space-y-2 text-xs text-[#b69a7c]">
              {isEmeraldApe && (
                <div className="flex gap-2">
                  <dt>ID do token:</dt>
                  <dd>{emeraldDetails.tokenId}</dd>
                </div>
              )}

              <div className="flex gap-2">
                <dt>Rede:</dt>
                <dd>{nft.network}</dd>
              </div>

              <div className="flex gap-2">
                <dt>Categoria:</dt>
                <dd>{nft.category}</dd>
              </div>

              {isEmeraldApe && (
                <>
                  <div className="flex gap-2">
                    <dt>Coleção:</dt>
                    <dd>{emeraldDetails.collection}</dd>
                  </div>

                  <div className="flex gap-2">
                    <dt>Atributos:</dt>
                    <dd>{emeraldDetails.attributes}</dd>
                  </div>
                </>
              )}
            </dl>

            {/* Compartilhamento */}
            <div className="mt-5 flex items-center gap-3 text-xs">
              <span className="font-semibold">
                Compartilhar este NFT:
              </span>

              <button
                type="button"
                aria-label="Compartilhar NFT"
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: nft.name ?? 'NFT KURIO',
                        url: window.location.href,
                      })
                    } catch {
                      // Cancelamento não exige aviso.
                    }
                  } else if (navigator.clipboard) {
                    try {
                      await navigator.clipboard.writeText(
                        window.location.href,
                      )
                    } catch {
                      // A cópia pode estar indisponível.
                    }
                  }
                }}
                className="text-[#f5eee7] hover:text-[#d58c48]"
              >
                <Share2 size={15} />
              </button>

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  nft.name ?? 'NFT KURIO',
                )}&body=${encodeURIComponent(
                  typeof window !== 'undefined'
                    ? window.location.href
                    : '',
                )}`}
                aria-label="Compartilhar por e-mail"
                className="hover:text-[#d58c48]"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Informações complementares */}
        <NFTInformationTabs
          nftId={nft.id}
          nftName={nft.name}
          network={nft.network}
        />

        {/* Outras obras */}
        <RelatedNFTs currentNFTId={nft.id} />
      </div>
    </main>
  )
}

export function NFTDetailsPage() {
  const { nftId } = useParams({
    from: '/nft/$nftId',
  })

  const {
    data: nft,
    isPending,
    isError,
    error,
  } = useNFTById(nftId)

  if (isPending) {
    return (
      <main
        role="status"
        className="min-h-[60vh] bg-[#140d0b] px-5 py-16 text-[#f5eee7] sm:px-8"
      >
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-8 h-4 w-40 rounded bg-[#39251c]" />

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-xl bg-[#39251c]" />

            <div className="space-y-5">
              <div className="h-8 w-3/4 rounded bg-[#39251c]" />
              <div className="h-6 w-1/3 rounded bg-[#39251c]" />
              <div className="h-4 w-full rounded bg-[#39251c]" />
              <div className="h-4 w-5/6 rounded bg-[#39251c]" />
              <div className="h-10 w-40 rounded bg-[#39251c]" />
            </div>
          </div>
        </div>

        <span className="sr-only">
          Carregando detalhes do NFT...
        </span>
      </main>
    )
  }

  if (isError) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404
    ) {
      return (
        <NFTErrorState
          title="NFT não encontrado"
          message="Não encontramos uma obra com esse identificador."
        />
      )
    }

    return (
      <NFTErrorState
        title="Erro ao carregar NFT"
        message="Não foi possível consultar os detalhes desta obra. Verifique a conexão e tente novamente."
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (!nft) {
    return (
      <NFTErrorState
        title="NFT indisponível"
        message="Os dados desta obra não estão disponíveis."
        onRetry={() => {
          window.location.reload()
        }}
      />
    )
  }

  return <NFTDetailsContent key={nft.id} nft={nft} />
}
