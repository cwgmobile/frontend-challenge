
import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { nfts } from '@/data/nfts'
import { NFTCard } from '@/components/marketplace/NFTCard'

/**
 * KURIO — M08.05
 * NFTs relacionados à obra selecionada.
 *
 * Reutiliza a fonte centralizada de NFTs e o
 * componente visual NFTCard do marketplace.
 *
 * Exibe cinco obras por página no desktop.
 * A navegação entre grupos é feita pelos indicadores.
 */

interface RelatedNFTsProps {
  currentNFTId: string
}

const ITEMS_PER_PAGE = 5

export function RelatedNFTs({
  currentNFTId,
}: RelatedNFTsProps) {
  const [currentPage, setCurrentPage] = useState(0)

  /**
   * Exclui a obra atual e os NFTs sem informações
   * comerciais suficientes para exibição.
   */
  const relatedNfts = nfts.filter(
    (nft) =>
      nft.id !== currentNFTId &&
      nft.name !== null &&
      nft.price !== null,
  )

  const totalPages = Math.ceil(
    relatedNfts.length / ITEMS_PER_PAGE,
  )

  const safePage = Math.min(
    currentPage,
    Math.max(0, totalPages - 1),
  )

  const visibleNfts = relatedNfts.slice(
    safePage * ITEMS_PER_PAGE,
    (safePage + 1) * ITEMS_PER_PAGE,
  )

  if (relatedNfts.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="related-nfts-title"
      className="mt-20"
    >
      <h2
        id="related-nfts-title"
        className="border-b border-[#39251c] pb-3 text-sm font-bold tracking-wide text-[#d58c48]"
      >
        Mais desta coleção
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {visibleNfts.map((nft) => {
          if (nft.name === null || nft.price === null) {
            return null
          }

          return (
            <Link
              key={nft.id}
              to="/nft/$nftId"
              params={{ nftId: nft.id }}
              className="block min-w-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#d58c48]"
              aria-label={`Ver detalhes de ${nft.name}`}
            >
              <NFTCard
                id={nft.id}
                name={nft.name}
                price={nft.price}
                oldPrice={nft.oldPrice}
                image={nft.image}
                imageScale={nft.imageScale}
                imagePosition={nft.imagePosition}
              />
            </Link>
          )
        })}
      </div>

      {/* Indicadores de paginação */}
      {totalPages > 1 && (
        <nav
          aria-label="Páginas de NFTs relacionados"
          className="mt-7 flex items-center justify-center gap-2"
        >
          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Mostrar grupo ${index + 1}`}
                aria-current={
                  safePage === index ? 'page' : undefined
                }
                onClick={() => setCurrentPage(index)}
                className={`h-2.5 w-2.5 rounded-full border border-[#d58c48] transition-colors ${
                  safePage === index
                    ? 'bg-[#d58c48]'
                    : 'bg-transparent hover:bg-[#60402e]'
                }`}
              />
            ),
          )}
        </nav>
      )}
    </section>
  )
}
