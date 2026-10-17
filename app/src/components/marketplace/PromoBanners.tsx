
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

/**
 * KURIO — M05 | Banners promocionais
 *
 * Componente responsável pelos dois banners da Home.
 *
 * Referência: Figma — Genesis Drops e Curated Digital Art.
 * Imagens originais exportadas para public/images.
 *
 * Layout responsivo:
 * - Desktop: dois banners lado a lado.
 * - Mobile: banners empilhados.
 */

interface PromoBannerData {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
}

const banners: PromoBannerData[] = [
  {
    id: 'genesis',
    title: 'Limited-edition genesis drops',
    description:
      'Colecione edições escassas diretamente dos criadores antes da revelação pública.',
    image: '/images/genesis-drops.png',
    imageAlt: 'Arte digital da coleção Genesis Drops',
  },
  {
    id: 'curated',
    title: 'Curated digital art & much more',
    description:
      'Explore novos artistas, coleções verificadas e obras digitais que definem a cultura.',
    image: '/images/curated-digital-art.png',
    imageAlt: 'Arte digital da coleção Curated Digital Art',
  },
]

export function PromoBanners() {
  return (
    <section
      aria-label="Coleções promocionais"
      className="bg-[#140d0b] px-5 py-12 sm:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-2">
        {banners.map((banner) => (
          <article
            key={banner.id}
            className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-xl bg-[#2b1b15] sm:flex-row"
          >
            {/* Imagem promocional — aproximadamente metade do banner */}
            <div className="relative h-[250px] overflow-hidden sm:h-auto sm:w-[49%] sm:shrink-0">
              <img
                src={banner.image}
                alt={banner.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>

            {/* Informações e ação promocional */}
            <div className="flex flex-1 flex-col items-start justify-center px-6 py-7 sm:px-5 lg:px-6">
              <h2 className="max-w-[260px] text-xl font-bold leading-tight text-[#f5eee7]">
                {banner.title}
              </h2>

              <p className="mt-3 text-xs leading-relaxed text-[#c9b7aa]">
                {banner.description}
              </p>

              <Link
                to="/"
                hash="catalogo"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#d58c48] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-[#140d0b] transition-colors hover:bg-[#e9a767] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9a767]"
                aria-label={`Explorar ${banner.title}`}
              >
                Explorar
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
