
import { useQuery } from '@tanstack/react-query'

import {
  fetchNFTs,
  fetchNFTById,
} from '../services/nft-service'

import type {
  NFTListParams,
} from '../services/nft-service'

/**
 * KURIO — Hooks de consulta de NFTs
 *
 * Integração:
 * TanStack Query + Axios + MSW
 */

/**
 * Consulta a listagem de NFTs.
 *
 * Cada combinação de filtros possui
 * sua própria chave de cache.
 *
 * O parâmetro é opcional para manter
 * compatibilidade com o catálogo atual.
 */
export function useNFTs(
  params: NFTListParams = {},
) {
  return useQuery({
    queryKey: ['nfts', 'list', params],
    queryFn: () => fetchNFTs(params),
  })
}

/**
 * Consulta os detalhes de um NFT.
 *
 * Mantém a integração já homologada
 * com a página de detalhes.
 */
export function useNFTById(nftId: string) {
  return useQuery({
    queryKey: ['nfts', nftId],
    queryFn: () => fetchNFTById(nftId),
    enabled: nftId.trim().length > 0,
  })
}
