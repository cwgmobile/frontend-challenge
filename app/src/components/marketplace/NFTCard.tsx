
import { Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'

/**
 * Dados necessários para apresentar um NFT no catálogo.
 *
 * imageScale define a ampliação inicial da imagem.
 * imagePosition permite ajustar seu enquadramento.
 */
interface NFTCardProps {
  id: string
  name: string
  price: number
  image: string
  oldPrice?: number
  imageScale?: number
  imagePosition?: string
}

/**
 * Card reutilizável do Marketplace KURIO.
 *
 * Apresenta imagem, nome e preço em ETH.
 * Ao passar o mouse, amplia suavemente a arte,
 * respeitando o enquadramento inicial.
 *
 * M09 — Integração com a página de detalhes:
 * imagem e nome permitem abrir o NFT selecionado.
 */
export function NFTCard({
  id,
  name,
  price,
  image,
  oldPrice,
  imageScale = 1,
  imagePosition = 'center',
}: NFTCardProps) {
  return (
    <article
      aria-label={`NFT ${name}`}
      data-nft-id={id}
      className="group min-w-0"
    >
      {/* Imagem clicável com navegação para os detalhes */}
      <Link
        to="/nft/$nftId"
        params={{ nftId: id }}
        aria-label={`Ver detalhes do NFT ${name}`}
        className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d58c48]"
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
              alt={`Arte digital ${name}`}
              loading="lazy"
              style={
                {
                  objectPosition: imagePosition,
                  '--nft-image-scale': imageScale,
                } as CSSProperties
              }
              className="h-full w-full object-cover transition-transform duration-300 ease-out [transform:scale(var(--nft-image-scale))] group-hover:[transform:scale(calc(var(--nft-image-scale)*1.05))] motion-reduce:transition-none"
            />
          </div>
        </div>
      </Link>

      <div className="pt-3">
        {/* Nome clicável com a mesma rota da imagem */}
        <h3 className="text-[13px] font-medium leading-5 tracking-[0.01em] text-[#f5eee7]">
          <Link
            to="/nft/$nftId"
            params={{ nftId: id }}
            className="transition-colors hover:text-[#d58c48] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d58c48]"
          >
            {name}
          </Link>
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-2.5">
          <p className="text-sm font-bold tracking-[0.02em] text-[#d58c48]">
            {price.toFixed(2)} ETH
          </p>

          {oldPrice !== undefined && (
            <span className="text-xs text-[#a98d79] line-through">
              {oldPrice.toFixed(2)} ETH
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
