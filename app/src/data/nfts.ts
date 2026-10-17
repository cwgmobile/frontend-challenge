
/**
 * KURIO Marketplace
 * M08 — Fonte centralizada de dados dos NFTs.
 *
 * Este módulo permite compartilhar os mesmos dados
 * entre catálogo, detalhes do NFT e carrinho.
 *
 * Os dados foram extraídos do catálogo homologado.
 * Informações ainda desconhecidas não são inventadas.
 */

/**
 * Representa um NFT disponível no catálogo.
 *
 * name e price podem ser null quando as informações
 * comerciais ainda não estiverem disponíveis.
 *
 * imageScale e imagePosition preservam os ajustes
 * visuais individuais definidos durante a Home.
 */
export interface NFT {
  id: string
  name: string | null
  price: number | null
  oldPrice?: number
  category: string
  network: string
  image: string
  imageScale?: number
  imagePosition?: string
}

/**
 * Catálogo inicial de NFTs.
 *
 * Categoria e rede são dados provisórios,
 * conforme a implementação original da Home.
 */
export const nfts: NFT[] = [
  {
    id: 'emerald-ape-042',
    name: 'Emerald Ape #042',
    price: 1.19,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/hero-ape.png',
  },
  {
    id: 'sage-nomad-009',
    name: 'Sage Nomad #009',
    price: 1.69,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/sage-nomad-009.png',
  },
  {
    id: 'neon-vessel-552',
    name: 'Neon Vessel #552',
    price: 1.99,
    oldPrice: 2.29,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/neon-vessel-552.png',
  },
  {
    id: 'cosmic-bloom-118',
    name: 'Cosmic Bloom #118',
    price: 1.29,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/sage-nomad-009.png',
    imageScale: 1.18,
    imagePosition: 'center 45%',
  },
  {
    id: 'violet-nomad-314',
    name: 'Violet Nomad #314',
    price: 1.39,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/sage-nomad-009.png',
    imageScale: 1,
    imagePosition: 'center',
  },
  {
    id: 'ivory-baron-088',
    name: 'Ivory Baron #088',
    price: 1.79,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/neon-vessel-552.png',
  },
  {
    id: 'golden-beat-207',
    name: 'Golden Beat #207',
    price: 0.99,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/golden-beat-207.png',
    imageScale: 1.12,
    imagePosition: 'center',
  },
  {
    id: 'nft-artwork-10',
    name: null,
    price: null,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/golden-beat-207.png',
  },
  {
    id: 'golden-signal-160',
    name: 'Golden Signal #160',
    price: 0.39,
    category: 'Arte digital',
    network: 'Ethereum',
    image: '/images/golden-beat-207.png',
    imageScale: 1.16,
    imagePosition: 'center 45%',
  },
]

/**
 * Localiza um NFT pelo identificador utilizado
 * nas rotas dinâmicas do marketplace.
 *
 * Retorna undefined quando o NFT não existe.
 */
export function getNFTById(id: string): NFT | undefined {
  return nfts.find((nft) => nft.id === id)
}
