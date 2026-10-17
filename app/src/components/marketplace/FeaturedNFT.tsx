

/**
 * KURIO — Marketplace de NFTs
 *
 * M04 — Etapa 01
 * Componente de NFT em destaque.
 *
 * Este componente é independente do catálogo.
 * A integração com a barra lateral será realizada
 * na próxima etapa, após a homologação.
 */

interface FeaturedNFTProps {
  image?: string
  title?: string
  subtitle?: string
}

export function FeaturedNFT({
  image = '/images/hero-ape.png',
  title = 'NFT EM DESTAQUE',
  subtitle = 'OFERTA LIMITADA',
}: FeaturedNFTProps) {
  return (
    <aside
      aria-label="NFT em destaque"
      className="relative w-full overflow-hidden rounded-xl bg-[#261913]"
    >
      {/* Identificação do destaque */}
      <div className="relative z-10 px-5 pt-6 text-center">
        <h3 className="text-lg font-bold uppercase tracking-wide text-[#f5eee7]">
          {title}
        </h3>

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d58c48]">
          {subtitle}
        </p>
      </div>

      {/* Imagem principal do NFT */}
      <div className="relative mt-4 h-[340px] overflow-hidden">
        <img
          src={image}
          alt="Arte digital do NFT em destaque"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        {/* Gradiente para integração com o fundo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#261913]/70 via-transparent to-transparent"
        />
      </div>

      {/* Elementos decorativos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 rounded-md border border-[#d58c48]/60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 bottom-5 h-10 w-10 rounded-xl border border-[#d58c48]/60"
      />
    </aside>
  )
}
