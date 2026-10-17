
import { NFTCatalog } from '@/components/marketplace/NFTCatalog'
import { PromoBanners } from '@/components/marketplace/PromoBanners'
import { BlogSection } from '@/components/marketplace/BlogSection'

/**
 * Página inicial do Marketplace KURIO.
 *
 * Reúne o banner principal e o catálogo de NFTs.
 * Novas seções serão adicionadas gradualmente,
 * conforme a referência visual do Figma.
 */
export function HomePage() {
  return (
    <main>
      {/* Banner principal com apresentação do Marketplace */}
      <section
        aria-labelledby="home-title"
        className="border-b border-[#39251c] bg-[#140d0b] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Conteúdo textual do banner */}
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#d58c48]">
              Bem-vindo à Kurio
            </p>

            <h1
              id="home-title"
              className="text-4xl font-bold uppercase leading-[1.12] tracking-tight text-[#f5eee7] sm:text-5xl xl:text-6xl"
            >
              Seja dono do futuro
              <span className="block text-[#d58c48]">
                da arte digital
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#cbb8a8] sm:text-base">
              Descubra NFTs selecionados de criadores emergentes e
              consagrados. Colecione arte digital rara, apoie artistas
              e tenha uma parte da cultura da internet.
            </p>

            {/* Direciona o visitante para o catálogo de NFTs */}
            <a
              href="#catalogo"
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded bg-[#d58c48] px-8 text-sm font-bold uppercase tracking-wider text-[#140d0b] transition-colors hover:bg-[#e6a568]"
            >
              Explorar
            </a>
          </div>

          {/* Imagem original exportada do Figma */}
          <div className="mx-auto w-full max-w-[450px] lg:ml-auto">
            <img
              src="/images/hero-ape.png"
              alt="Macaco ilustrado com óculos verdes e jaqueta universitária verde"
              className="aspect-square w-full rounded-3xl object-cover"
              width={450}
              height={450}
              fetchPriority="high"
            />
          </div>

          {/*
           * Indicadores visuais do banner.
           * No desktop, ficam na região inferior central.
           * Em telas menores, permanecem abaixo da imagem.
           *
           * O carrossel funcional será desenvolvido
           * em uma etapa posterior.
           */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-2 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d58c48]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#d58c48]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#d58c48]" />
          </div>
        </div>
      </section>

      {/*
       * Catálogo principal do Marketplace.
       *
       * O componente reúne os filtros laterais e a
       * área destinada à exibição dos NFTs.
       *
       * O identificador "catalogo" está definido
       * dentro do próprio componente NFTCatalog.
       */}
      <NFTCatalog />
      {/* M05 — Banners promocionais */}
      <PromoBanners />
      {/* M06 — Diário da Cunhagem */}
      <BlogSection />
    </main>
  )
}
