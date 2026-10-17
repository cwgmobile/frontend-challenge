
/**
 * KURIO — Estrutura reutilizável de páginas.
 *
 * Exibe o título e a identificação de cada tela
 * enquanto sua implementação definitiva é desenvolvida.
 *
 * Permite validar o roteamento sem duplicar layouts.
 */

interface PageScaffoldProps {
  title: string
  description: string
}

export function PageScaffold({
  title,
  description,
}: PageScaffoldProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
      <div className="rounded-xl border border-[#39251c] bg-[#1b110e] p-8 sm:p-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#d58c48]">
          KURIO Marketplace
        </p>

        <h1 className="text-2xl font-bold text-[#f5eee7] sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#c9b7aa]">
          {description}
        </p>

        <p className="mt-8 text-xs text-[#a98d79]">
          Estrutura inicial — aguardando implementação conforme o Figma.
        </p>
      </div>
    </main>
  )
}
