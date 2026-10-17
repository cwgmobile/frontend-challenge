
import { useNavigate, useSearch } from '@tanstack/react-router'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { NFTCard } from '@/components/marketplace/NFTCard'
import { FeaturedNFT } from '@/components/marketplace/FeaturedNFT'
import { useNFTs } from '@/hooks/useNFTs'

import type {
  NFTCatalogTab,
  NFTSortOption,
} from '@/services/nft-service'

/**
 * KURIO — Catálogo de NFTs
 *
 * M16 — Filtros sincronizados com a URL.
 * TanStack Router + TanStack Query + Axios + MSW.
 *
 * Correção: preservar a posição de rolagem
 * durante filtros, ordenação e paginação.
 */

const MIN_PRICE = 0.02
const MAX_PRICE = 12.3
const PRICE_STEP = 0.01
const ITEMS_PER_PAGE = 6

const catalogTabs: {
  id: NFTCatalogTab
  label: string
}[] = [
  { id: 'all', label: 'Todos os NFTs' },
  { id: 'new', label: 'Novos lançamentos' },
  { id: 'trending', label: 'Em alta' },
]

const categoryNames = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Colecionáveis',
  'Generativa',
  'Jogos',
  'Assinaturas',
  'Utilidade',
]

const networkNames = [
  'Ethereum',
  'Polygon',
  'Solana',
]

function formatPrice(price: number) {
  return price.toFixed(2).replace('.', ',')
}

function PendingNFTCard({ image }: { image: string }) {
  return (
    <article
      aria-label="Arte NFT com informações pendentes"
      className="group min-w-0"
    >
      <div
        className="bg-[#261913] bg-cover bg-center bg-no-repeat p-[3px] pb-3"
        style={{
          backgroundImage: "url('/images/nft-card-bg.png')",
        }}
      >
        <div className="aspect-square overflow-hidden rounded-xl">
          <img
            src={image}
            alt="Arte digital de macaco dourado com fones de ouvido"
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs font-medium text-[#a98d79]">
          Informações em breve
        </p>
      </div>
    </article>
  )
}

export function NFTCatalog() {
  const search = useSearch({ from: '/' })
  const navigate = useNavigate({ from: '/' })

  const activeTab = search.tab ?? 'all'
  const sortOption = search.sort ?? 'default'
  const selectedCategory = search.category ?? null
  const selectedNetwork = search.network ?? null
  const maxPrice = search.maxPrice ?? MAX_PRICE
  const currentPage = search.page ?? 1

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useNFTs({
    category: search.category,
    network: search.network,
    maxPrice: search.maxPrice,
    sort: search.sort,
    tab: search.tab,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  })

  // Consulta separada para contagens gerais.
  const { data: catalogOverview } = useNFTs({
    limit: 100,
  })

  const allNfts = catalogOverview?.data ?? []

  const categories = categoryNames.map((name) => ({
    name,
    count: allNfts.filter(
      (nft) => nft.category === name,
    ).length,
  }))

  const networks = networkNames.map((name) => ({
    name,
    count: allNfts.filter(
      (nft) => nft.network === name,
    ).length,
  }))

  // Os resultados já vêm filtrados e paginados da API.
  const paginatedNfts = data?.data ?? []
  const total = data?.total ?? 0
  const totalPages = data?.totalPages ?? 1
  const safeCurrentPage = data?.page ?? currentPage

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  )

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedNetwork !== null ||
    maxPrice < MAX_PRICE

  /**
   * Todas as navegações abaixo preservam
   * a rolagem com resetScroll: false.
   */

  function handleCategorySelect(category: string) {
    const nextCategory =
      selectedCategory === category
        ? undefined
        : category

    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        category: nextCategory,
        page: undefined,
      }),
      resetScroll: false,
    })
  }

  function handleNetworkSelect(network: string) {
    const nextNetwork =
      selectedNetwork === network
        ? undefined
        : network

    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        network: nextNetwork,
        page: undefined,
      }),
      resetScroll: false,
    })
  }

  function handlePriceChange(price: number) {
    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        maxPrice:
          price >= MAX_PRICE ? undefined : price,
        page: undefined,
      }),
      replace: true,
      resetScroll: false,
    })
  }

  function handleTabChange(tab: NFTCatalogTab) {
    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        tab: tab === 'all' ? undefined : tab,
        page: undefined,
      }),
      resetScroll: false,
    })
  }

  function handleSortChange(option: NFTSortOption) {
    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        sort:
          option === 'default' ? undefined : option,
        page: undefined,
      }),
      resetScroll: false,
    })
  }

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return

    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        page: page === 1 ? undefined : page,
      }),
      resetScroll: false,
    })
  }

  function clearAllFilters() {
    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        category: undefined,
        network: undefined,
        maxPrice: undefined,
        page: undefined,
      }),
      resetScroll: false,
    })
  }

  function clearCategory() {
    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        category: undefined,
        page: undefined,
      }),
      resetScroll: false,
    })
  }

  function clearNetwork() {
    void navigate({
      to: '/',
      search: (previous) => ({
        ...previous,
        network: undefined,
        page: undefined,
      }),
      resetScroll: false,
    })
  }

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-title"
      className="bg-[#140d0b] px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#d58c48]">
            Explore o Marketplace
          </p>

          <h2
            id="catalog-title"
            className="text-2xl font-bold uppercase text-[#f5eee7] sm:text-3xl"
          >
            Descubra NFTs
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[310px_minmax(0,1fr)]">
          {/* Barra lateral */}
          <aside
            aria-label="Filtros do catálogo"
            className="min-w-0 self-start"
          >
            <h3 className="mb-6 text-base font-bold text-[#f5eee7]">
              Coleções
            </h3>

            {/* Categorias */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#d58c48]">
                Categorias
              </h4>

              <ul className="space-y-3">
                {categories.map((category) => {
                  const isSelected =
                    selectedCategory === category.name

                  return (
                    <li key={category.name}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          handleCategorySelect(category.name)
                        }
                        className={`flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#39251c] font-semibold text-[#d58c48]'
                            : 'text-[#cbb8a8] hover:bg-[#261913] hover:text-[#f5eee7]'
                        }`}
                      >
                        <span>{category.name}</span>

                        <span
                          className={
                            isSelected
                              ? 'text-[#d58c48]'
                              : 'text-[#8e7563]'
                          }
                        >
                          {category.count}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {selectedCategory !== null && (
                <button
                  type="button"
                  onClick={clearCategory}
                  className="mt-4 text-xs font-medium text-[#d58c48] underline-offset-4 hover:underline"
                >
                  Limpar categoria
                </button>
              )}
            </div>

            {/* Faixa de preço */}
            <div className="mt-7 border-t border-[#39251c] pt-6">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#d58c48]">
                Faixa de preço
              </h4>

              <label
                htmlFor="nft-max-price"
                className="mb-3 block text-xs text-[#cbb8a8]"
              >
                Preço máximo:{' '}
                <strong className="text-[#d58c48]">
                  {formatPrice(maxPrice)} ETH
                </strong>
              </label>

              <input
                id="nft-max-price"
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={(event) =>
                  handlePriceChange(Number(event.target.value))
                }
                aria-label="Preço máximo em ETH"
                aria-valuetext={`${formatPrice(maxPrice)} ETH`}
                className="w-full cursor-pointer accent-[#d58c48]"
              />

              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-[#cbb8a8]">
                <span>{formatPrice(MIN_PRICE)} ETH</span>
                <span>{formatPrice(MAX_PRICE)} ETH</span>
              </div>

              {maxPrice < MAX_PRICE && (
                <button
                  type="button"
                  onClick={() => handlePriceChange(MAX_PRICE)}
                  className="mt-4 text-xs font-medium text-[#d58c48] underline-offset-4 hover:underline"
                >
                  Limpar preço
                </button>
              )}
            </div>

            {/* Redes */}
            <div className="mt-7 border-t border-[#39251c] pt-6">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#d58c48]">
                Rede
              </h4>

              <ul className="space-y-3">
                {networks.map((network) => {
                  const isSelected =
                    selectedNetwork === network.name

                  return (
                    <li key={network.name}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          handleNetworkSelect(network.name)
                        }
                        className={`flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#39251c] font-semibold text-[#d58c48]'
                            : 'text-[#cbb8a8] hover:bg-[#261913] hover:text-[#f5eee7]'
                        }`}
                      >
                        <span>{network.name}</span>

                        <span
                          className={
                            isSelected
                              ? 'text-[#d58c48]'
                              : 'text-[#8e7563]'
                          }
                        >
                          {network.count}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {selectedNetwork !== null && (
                <button
                  type="button"
                  onClick={clearNetwork}
                  className="mt-4 text-xs font-medium text-[#d58c48] underline-offset-4 hover:underline"
                >
                  Limpar rede
                </button>
              )}
            </div>

            {/* Limpar filtros */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-7 w-full rounded-md border border-[#60402e] px-4 py-2 text-xs font-semibold text-[#f5eee7] transition-colors hover:border-[#d58c48] hover:text-[#d58c48]"
              >
                Limpar todos os filtros
              </button>
            )}

            <div className="mt-8">
              <FeaturedNFT />
            </div>
          </aside>

          {/* Resultados */}
          <div className="min-w-0">
            {/* Abas e ordenação */}
            <div className="mb-6 flex flex-col gap-5 border-b border-[#39251c] pb-4 xl:flex-row xl:items-center xl:justify-between">
              <div
                role="tablist"
                aria-label="Coleções de NFTs"
                className="flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                {catalogTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`catalog-tab-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    aria-controls="catalog-panel"
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative pb-3 text-xs font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'text-[#f5eee7]'
                        : 'text-[#a98d79] hover:text-[#f5eee7]'
                    }`}
                  >
                    {tab.label}

                    {activeTab === tab.id && (
                      <span
                        aria-hidden="true"
                        className="absolute right-0 bottom-[-17px] left-0 h-[2px] bg-[#d58c48]"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="nft-sort"
                  className="whitespace-nowrap text-xs text-[#a98d79]"
                >
                  Ordenar por
                </label>

                <div className="relative">
                  <select
                    id="nft-sort"
                    value={sortOption}
                    onChange={(event) =>
                      handleSortChange(
                        event.target.value as NFTSortOption,
                      )
                    }
                    className="min-w-36 appearance-none rounded-md border border-[#60402e] bg-[#1d1410] py-2 pr-9 pl-3 text-xs text-[#f5eee7] outline-none focus:border-[#d58c48]"
                  >
                    <option value="default">Padrão</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                  </select>

                  <ChevronDown
                    aria-hidden="true"
                    size={14}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#d58c48]"
                  />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div
              id="catalog-panel"
              role="tabpanel"
              aria-labelledby={`catalog-tab-${activeTab}`}
              tabIndex={0}
            >
              {isPending ? (
                <div
                  role="status"
                  aria-label="Carregando NFTs"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="aspect-square rounded-xl bg-[#39251c]" />
                      <div className="mt-4 h-4 w-3/4 rounded bg-[#39251c]" />
                      <div className="mt-3 h-3 w-1/3 rounded bg-[#39251c]" />
                    </div>
                  ))}

                  <span className="sr-only">
                    Carregando catálogo de NFTs...
                  </span>
                </div>
              ) : isError ? (
                <div
                  role="alert"
                  className="rounded-lg border border-[#60402e] bg-[#1d1410] px-6 py-12 text-center"
                >
                  <p className="text-sm font-semibold text-[#f5eee7]">
                    Não foi possível carregar os NFTs.
                  </p>

                  <p className="mt-2 text-xs text-[#a98d79]">
                    {error instanceof Error
                      ? error.message
                      : 'Ocorreu uma falha ao consultar o catálogo.'}
                  </p>

                  <button
                    type="button"
                    onClick={() => void refetch()}
                    className="mt-5 rounded-md bg-[#d58c48] px-5 py-2 text-xs font-semibold text-[#140d0b]"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : paginatedNfts.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedNfts.map((nft) =>
                    nft.price !== null &&
                    nft.name !== null ? (
                      <NFTCard
                        key={nft.id}
                        id={nft.id}
                        name={nft.name}
                        price={nft.price}
                        oldPrice={nft.oldPrice}
                        image={nft.image}
                        imageScale={nft.imageScale}
                        imagePosition={nft.imagePosition}
                      />
                    ) : (
                      <PendingNFTCard
                        key={nft.id}
                        image={nft.image}
                      />
                    ),
                  )}
                </div>
              ) : (
                <div className="rounded-lg border border-[#39251c] bg-[#1d1410] px-6 py-12 text-center">
                  <p className="text-sm font-medium text-[#f5eee7]">
                    {activeTab !== 'all'
                      ? 'Coleção em preparação'
                      : 'Nenhum NFT encontrado'}
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#a98d79]">
                    {activeTab !== 'all'
                      ? 'Os NFTs desta coleção serão exibidos quando os dados estiverem disponíveis.'
                      : 'Não existem NFTs cadastrados para os filtros selecionados.'}
                  </p>
                </div>
              )}
            </div>

            {/* Paginação */}
            {!isPending && !isError && total > 0 && (
              <nav
                aria-label="Paginação dos NFTs"
                className="mt-10 flex flex-col items-center gap-4"
              >
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    aria-label="Página anterior"
                    disabled={safeCurrentPage === 1}
                    onClick={() =>
                      goToPage(safeCurrentPage - 1)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#60402e] text-[#f5eee7] transition-colors hover:border-[#d58c48] hover:text-[#d58c48] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronLeft aria-hidden="true" size={16} />
                  </button>

                  {pageNumbers.map((page) => {
                    const isActive = page === safeCurrentPage

                    return (
                      <button
                        key={page}
                        type="button"
                        aria-label={`Página ${page}`}
                        aria-current={
                          isActive ? 'page' : undefined
                        }
                        onClick={() => goToPage(page)}
                        className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-xs font-semibold transition-colors ${
                          isActive
                            ? 'border-[#d58c48] bg-[#d58c48] text-[#140d0b]'
                            : 'border-[#60402e] text-[#cbb8a8] hover:border-[#d58c48] hover:text-[#d58c48]'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}

                  <button
                    type="button"
                    aria-label="Próxima página"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() =>
                      goToPage(safeCurrentPage + 1)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#60402e] text-[#f5eee7] transition-colors hover:border-[#d58c48] hover:text-[#d58c48] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronRight aria-hidden="true" size={16} />
                  </button>
                </div>

                <p
                  aria-live="polite"
                  className="text-xs text-[#a98d79]"
                >
                  Página {safeCurrentPage} de {totalPages}
                  {' · '}
                  {total}{' '}
                  {total === 1
                    ? 'posição encontrada'
                    : 'posições encontradas'}
                </p>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
