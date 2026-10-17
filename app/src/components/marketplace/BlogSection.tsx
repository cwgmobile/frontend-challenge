
/**
 * KURIO — M06 | Diário da Cunhagem
 *
 * Etapa 04 — Ajuste visual conforme o Figma.
 *
 * Estrutura:
 * - Título e descrição centralizados.
 * - Quatro cards editoriais.
 * - Imagem na parte superior.
 * - Data e tempo de leitura abaixo da imagem.
 * - Título, resumo e indicação "Ler mais".
 *
 * Responsividade:
 * - Mobile: uma coluna.
 * - Tablet: duas colunas.
 * - Desktop: quatro colunas.
 *
 * Observação:
 * Os artigos ainda não possuem páginas individuais.
 * Por isso, "Ler mais" é apresentado como indicação
 * visual, sem criar links para rotas inexistentes.
 */

interface BlogArticle {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  date: string
  readingTime: string
}

const articles: BlogArticle[] = [
  {
    id: 'propriedade-nft',
    title: 'Como funciona a propriedade de NFTs',
    description:
      'Aprenda a colecionar, negociar e verificar ativos digitais.',
    image: '/images/blog-propriedade-nft.png',
    imageAlt: 'Arte digital sobre propriedade de NFTs',
    date: '12 de setembro',
    readingTime: 'Leitura de 6 min',
  },
  {
    id: 'artistas-digitais',
    title: '10 artistas digitais para acompanhar',
    description:
      'Conheça criadores que moldam a cultura digital.',
    image: '/images/blog-artistas-digitais.png',
    imageAlt: 'Arte representando artistas digitais',
    date: '13 de setembro',
    readingTime: 'Leitura de 2 min',
  },
  {
    id: 'raridade',
    title: 'Raridade, atributos e procedência',
    description:
      'Entenda raridade, procedência, direitos autorais e utilidade.',
    image: '/images/blog-raridade.png',
    imageAlt: 'Arte digital sobre raridade e procedência',
    date: '15 de setembro',
    readingTime: 'Leitura de 3 min',
  },
  {
    id: 'seguranca-carteira',
    title: 'Como proteger sua carteira',
    description:
      'Proteja sua carteira, seus ativos e sua identidade.',
    image: '/images/blog-seguranca-carteira.png',
    imageAlt: 'Arte digital sobre segurança de carteiras',
    date: '15 de setembro',
    readingTime: 'Leitura de 2 min',
  },
]

export function BlogSection() {
  return (
    <section
      id="diario-da-cunhagem"
      aria-labelledby="blog-section-title"
      className="bg-[#140d0b] px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho centralizado conforme a referência */}
        <header className="mb-10 text-center">
          <h2
            id="blog-section-title"
            className="text-2xl font-bold text-[#f5eee7] sm:text-3xl"
          >
            Diário da Cunhagem
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[#c9b7aa]">
            Histórias, guias e insights para colecionadores sobre o
            universo da propriedade digital.
          </p>
        </header>

        {/* Grade de artigos: 1, 2 ou 4 colunas */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-lg bg-[#2b1b15]"
            >
              {/* Imagem superior do card */}
              <div className="aspect-[4/3] overflow-hidden bg-[#261913]">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Conteúdo editorial sobre fundo marrom */}
              <div className="flex flex-1 flex-col px-4 pb-5 pt-3">
                <p className="text-xs leading-relaxed text-[#c9a78e]">
                  {article.date} | {article.readingTime}
                </p>

                <h3 className="mt-3 text-base font-bold leading-snug text-[#f5eee7]">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#c9b7aa]">
                  {article.description}
                </p>

                {/* Indicação visual; rota editorial ainda não implementada */}
                <span className="mt-auto inline-block pt-4 text-xs font-semibold text-[#d58c48]">
                  Ler mais →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
