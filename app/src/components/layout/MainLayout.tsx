
import {
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'

import {
  Search,
  ShoppingCart,
  LogIn,
  Menu,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  ArrowRight,
  Camera,
  MessageCircle,
  PlayCircle,
  Wallet,
  UserRound,
} from 'lucide-react'

import {
  useState,
  type FormEvent,
} from 'react'

import { useCart } from '@/hooks/useCart'
import { useAuthUser } from '@/hooks/useAuthUser'

/**
 * KURIO — Layout compartilhado do Marketplace.
 *
 * M07 — Rodapé completo.
 * M09.5 — Contador dinâmico do carrinho.
 * M16.26.7.3 — Navegação conforme autenticação.
 *
 * Correção:
 * O botão de autenticação permanece sempre visível.
 * O texto e o destino dependem da sessão autenticada.
 *
 * Layout original do Figma preservado.
 */
export function MainLayout() {
  const { itemCount } = useCart()

  const { data: authUser } = useAuthUser()

  const [menuOpen, setMenuOpen] = useState(false)

  const [newsletterEmail, setNewsletterEmail] =
    useState('')

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const isHome = pathname === '/'

  /**
   * A sessão é determinada pelos dados
   * retornados pela API simulada.
   *
   * Não usamos isPending nem isFetching
   * para esconder os links de autenticação.
   */
  const isAuthenticated = Boolean(authUser)

  function handleNewsletterSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#140d0b] font-mono text-[#f5eee7]">
      {/* Cabeçalho principal */}
      <header className="border-b border-[#39251c]">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
          <Link
            to="/"
            className="shrink-0 text-sm font-bold tracking-[0.2em] text-[#f5eee7]"
            aria-label="KURIO — Página inicial"
          >
            KURIO
          </Link>

          {/* Navegação principal */}
          <nav
            aria-label="Navegação principal"
            className="hidden h-16 items-center gap-7 md:flex"
          >
            <Link
              to="/"
              aria-current={
                isHome ? 'page' : undefined
              }
              className={`flex h-full items-center border-b-2 text-xs transition-colors ${
                isHome
                  ? 'border-[#d58c48] text-[#d58c48]'
                  : 'border-transparent text-[#cbb8a8] hover:text-[#d58c48]'
              }`}
            >
              Início
            </Link>

            <span
              aria-disabled="true"
              className="cursor-not-allowed text-xs text-[#cbb8a8]/60"
              title="Página em desenvolvimento"
            >
              Mercado
            </span>

            <span
              aria-disabled="true"
              className="cursor-not-allowed text-xs text-[#cbb8a8]/60"
              title="Página em desenvolvimento"
            >
              Criadores
            </span>

            <span
              aria-disabled="true"
              className="cursor-not-allowed text-xs text-[#cbb8a8]/60"
              title="Página em desenvolvimento"
            >
              Aprenda
            </span>
          </nav>

          {/* Ações do cabeçalho */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Pesquisa indisponível"
              title="Pesquisa em desenvolvimento"
              disabled
              className="hidden text-[#cbb8a8]/50 sm:inline-flex"
            >
              <Search size={17} />
            </button>

            {/* Carrinho */}
            <Link
              to="/cart"
              aria-label={`Abrir carrinho (${itemCount} ${
                itemCount === 1
                  ? 'edição'
                  : 'edições'
              })`}
              className="relative text-[#f5eee7] transition-colors hover:text-[#d58c48]"
            >
              <ShoppingCart size={18} />

              <span className="absolute -right-2 -top-2 rounded-full bg-[#d58c48] px-1 text-[9px] font-bold text-[#140d0b]">
                {itemCount}
              </span>
            </Link>

            {/*
              Botão de autenticação.

              Sempre renderizado:
              - Sem sessão: Entrar
              - Com sessão: Meu perfil

              Não existe condição externa
              capaz de ocultar este botão.
            */}
            <Link
              to={
                isAuthenticated
                  ? '/profile'
                  : '/login'
              }
              className="hidden items-center gap-1 rounded bg-[#d58c48] px-3 py-2 text-xs font-semibold text-[#140d0b] transition-colors hover:bg-[#e6a568] sm:inline-flex"
            >
              {isAuthenticated ? (
                <>
                  <UserRound size={14} />
                  Meu perfil
                </>
              ) : (
                <>
                  <LogIn size={14} />
                  Entrar
                </>
              )}
            </Link>

            {/* Menu móvel */}
            <button
              type="button"
              aria-label={
                menuOpen
                  ? 'Fechar menu'
                  : 'Abrir menu'
              }
              aria-expanded={menuOpen}
              aria-controls="kurio-mobile-nav"
              onClick={() =>
                setMenuOpen(
                  (previous) => !previous,
                )
              }
              className="inline-flex text-[#f5eee7] md:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Navegação móvel */}
        {menuOpen && (
          <nav
            id="kurio-mobile-nav"
            aria-label="Navegação móvel"
            className="flex flex-col gap-4 border-t border-[#39251c] px-5 py-5 text-sm md:hidden"
          >
            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Início
            </Link>

            <span className="text-[#cbb8a8]/60">
              Mercado — em breve
            </span>

            <span className="text-[#cbb8a8]/60">
              Criadores — em breve
            </span>

            <span className="text-[#cbb8a8]/60">
              Aprenda — em breve
            </span>

            {/* Link móvel sempre disponível */}
            <Link
              to={
                isAuthenticated
                  ? '/profile'
                  : '/login'
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              {isAuthenticated
                ? 'Meu perfil'
                : 'Entrar'}
            </Link>
          </nav>
        )}
      </header>

      {/* Conteúdo das páginas */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Rodapé institucional */}
      <footer className="border-t border-[#39251c] bg-[#1b110e]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Benefícios do marketplace */}
          <div className="grid gap-6 border-b border-[#39251c] py-10 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <ShieldCheck
                aria-hidden="true"
                size={26}
                className="shrink-0 text-[#d58c48]"
              />

              <div>
                <h2 className="text-sm font-bold text-[#f5eee7]">
                  Transações seguras
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#b99b86]">
                  Explore ativos digitais com mais
                  confiança e transparência.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BadgeCheck
                aria-hidden="true"
                size={26}
                className="shrink-0 text-[#d58c48]"
              />

              <div>
                <h2 className="text-sm font-bold text-[#f5eee7]">
                  Coleções verificadas
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#b99b86]">
                  Descubra artistas e coleções
                  selecionadas no marketplace.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Headphones
                aria-hidden="true"
                size={26}
                className="shrink-0 text-[#d58c48]"
              />

              <div>
                <h2 className="text-sm font-bold text-[#f5eee7]">
                  Comunidade KURIO
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#b99b86]">
                  Acompanhe novidades e conteúdos
                  sobre propriedade digital.
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="grid gap-6 border-b border-[#39251c] py-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#f5eee7]">
                Fique por dentro das novidades
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#b99b86]">
                Descubra novas coleções, artistas
                e tendências do universo NFT.
              </p>
            </div>

            <div>
              <form
                onSubmit={
                  handleNewsletterSubmit
                }
                aria-label="Inscrição na newsletter"
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label
                  htmlFor="kurio-newsletter-email"
                  className="sr-only"
                >
                  Seu e-mail
                </label>

                <input
                  id="kurio-newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) =>
                    setNewsletterEmail(
                      event.target.value,
                    )
                  }
                  placeholder="Seu endereço de e-mail"
                  autoComplete="email"
                  disabled
                  className="min-w-0 flex-1 rounded-md border border-[#50352a] bg-[#140d0b] px-4 py-3 text-xs text-[#f5eee7] placeholder:text-[#927868] disabled:cursor-not-allowed disabled:opacity-70"
                />

                <button
                  type="submit"
                  disabled
                  title="Inscrições em desenvolvimento"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#d58c48] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#140d0b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Inscrever-se

                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                  />
                </button>
              </form>

              <p className="mt-2 text-[11px] text-[#927868]">
                Inscrições disponíveis em uma
                próxima versão.
              </p>
            </div>
          </div>

          {/* Identidade e navegação */}
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link
                to="/"
                className="text-lg font-bold tracking-[0.2em] text-[#f5eee7]"
                aria-label="KURIO — Página inicial"
              >
                KURIO
              </Link>

              <p className="mt-4 max-w-xs text-xs leading-6 text-[#b99b86]">
                Um espaço para descobrir,
                explorar e colecionar arte digital.
              </p>

              {/* Redes sociais demonstrativas */}
              <div
                aria-label="Redes sociais — em desenvolvimento"
                className="mt-5 flex items-center gap-4 text-[#a98d79]"
              >
                <Camera
                  size={18}
                  aria-hidden="true"
                />

                <MessageCircle
                  size={18}
                  aria-hidden="true"
                />

                <PlayCircle
                  size={18}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Marketplace */}
            <div>
              <h2 className="text-sm font-bold text-[#f5eee7]">
                Marketplace
              </h2>

              <nav
                aria-label="Links do marketplace"
                className="mt-5 flex flex-col items-start gap-3 text-xs"
              >
                <Link
                  to="/"
                  hash="catalogo"
                  className="text-[#b99b86] transition-colors hover:text-[#d58c48]"
                >
                  Explorar NFTs
                </Link>

                <Link
                  to="/cart"
                  className="text-[#b99b86] transition-colors hover:text-[#d58c48]"
                >
                  Meu carrinho
                </Link>

                <Link
                  to="/wallets"
                  className="text-[#b99b86] transition-colors hover:text-[#d58c48]"
                >
                  Carteiras digitais
                </Link>
              </nav>
            </div>

            {/* Minha conta */}
            <div>
              <h2 className="text-sm font-bold text-[#f5eee7]">
                Minha conta
              </h2>

              <nav
                aria-label="Links da conta"
                className="mt-5 flex flex-col items-start gap-3 text-xs"
              >
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="text-[#b99b86] transition-colors hover:text-[#d58c48]"
                  >
                    Meu perfil
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[#b99b86] transition-colors hover:text-[#d58c48]"
                    >
                      Entrar
                    </Link>

                    <Link
                      to="/signup"
                      className="text-[#b99b86] transition-colors hover:text-[#d58c48]"
                    >
                      Criar conta
                    </Link>
                  </>
                )}
              </nav>
            </div>

            {/* Sobre */}
            <div>
              <h2 className="text-sm font-bold text-[#f5eee7]">
                Sobre a KURIO
              </h2>

              <p className="mt-5 text-xs leading-6 text-[#b99b86]">
                Arte, tecnologia e novas
                possibilidades para colecionadores.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-[#d58c48]">
                <Wallet
                  size={18}
                  aria-hidden="true"
                />

                <span>Universo Web3</span>
              </div>
            </div>
          </div>

          {/* Faixa inferior */}
          <div className="flex flex-col gap-4 border-t border-[#39251c] py-6 text-center text-xs text-[#b99b86] sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>
              © 2026 Kurio. Propriedade digital
              para todos.
            </p>

            <p>
              Marketplace de arte digital
              e colecionáveis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
