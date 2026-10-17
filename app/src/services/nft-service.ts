
import { api } from './api'
import type { NFT } from '../data/nfts'

/**
 * KURIO — Serviço REST de NFTs
 *
 * Utiliza Axios para consultar os endpoints
 * simulados pelo Mock Service Worker (MSW).
 *
 * M16 — Suporte a filtros, ordenação
 * e paginação pela API REST.
 */

export type NFTSortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'

export type NFTCatalogTab =
  | 'all'
  | 'new'
  | 'trending'

/**
 * Parâmetros aceitos pela API do catálogo.
 *
 * Todos são opcionais para preservar
 * a compatibilidade com consultas existentes.
 */
export interface NFTListParams {
  category?: string
  network?: string
  maxPrice?: number
  sort?: NFTSortOption
  tab?: NFTCatalogTab
  page?: number
  limit?: number
}

/**
 * Filtros efetivamente aplicados pela API.
 */
export interface NFTAppliedFilters {
  category: string | null
  network: string | null
  maxPrice: number
  sort: NFTSortOption
  tab: NFTCatalogTab
}

/**
 * Resposta da listagem paginada.
 */
export interface NFTListResponse {
  data: NFT[]
  total: number
  page: number
  limit: number
  totalPages: number
  filters: NFTAppliedFilters
}

/**
 * Resposta da consulta individual.
 */
interface NFTDetailResponse {
  data: NFT
}

/**
 * Consulta o catálogo de NFTs.
 *
 * Exemplos:
 *
 * fetchNFTs()
 *
 * fetchNFTs({
 *   category: 'Arte digital',
 *   network: 'Ethereum',
 *   sort: 'price-asc',
 *   page: 1,
 *   limit: 3,
 * })
 *
 * Os parâmetros são enviados pelo Axios
 * como query string na requisição GET.
 */
export async function fetchNFTs(
  params: NFTListParams = {},
): Promise<NFTListResponse> {
  const response = await api.get<NFTListResponse>(
    '/nfts',
    {
      params,
    },
  )

  return response.data
}

/**
 * Consulta um NFT pelo identificador.
 *
 * Mantém o comportamento já homologado
 * na página de detalhes.
 *
 * O erro HTTP 404 continua sendo tratado
 * pelo TanStack Query e pela página.
 */
export async function fetchNFTById(
  nftId: string,
): Promise<NFT> {
  const response = await api.get<NFTDetailResponse>(
    `/nfts/${encodeURIComponent(nftId)}`,
  )

  return response.data.data
}
