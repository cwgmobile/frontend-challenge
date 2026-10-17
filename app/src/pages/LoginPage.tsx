
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Eye, EyeOff, LockKeyhole, X } from 'lucide-react'

import { login } from '@/services/auth-service'
import { setAuthToken } from '@/services/api'

/**
 * KURIO — M16.26.4
 *
 * Login integrado à API REST simulada.
 * TanStack Query + Axios + MSW.
 *
 * O visual original do Figma foi preservado.
 */

export function LoginPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: async (session) => {
      setAuthToken(session.token)

      queryClient.setQueryData(
        ['auth', 'me'],
        session.user,
      )

      setIsErrorMessage(false)
      setMessage('Login realizado com sucesso.')

      await navigate({ to: '/profile' })
    },

    onError: (error: unknown) => {
      setIsErrorMessage(true)

      if (axios.isAxiosError(error)) {
        const responseMessage = error.response?.data?.message

        if (typeof responseMessage === 'string') {
          setMessage(responseMessage)
          return
        }
      }

      setMessage(
        'Não foi possível entrar. Verifique sua conexão e tente novamente.',
      )
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loginMutation.isPending) {
      return
    }

    setMessage('')
    setIsErrorMessage(false)

    loginMutation.mutate({
      email: email.trim(),
      password,
    })
  }

  return (
    <main className="relative min-h-[720px] bg-[#160f0d] px-7 py-12 text-[#f5f1eb] sm:px-6 lg:flex lg:min-h-[760px] lg:items-start lg:justify-center lg:py-24">
      {/* Logotipo em destaque na versão mobile */}
      <div className="mb-14 flex justify-center pt-5 lg:hidden">
        <Link
          to="/"
          className="text-[34px] font-bold tracking-[0.3em] text-[#f5f1eb]"
          aria-label="KURIO — Página inicial"
        >
          KURIO
        </Link>
      </div>

      {/* Painel desktop / conteúdo mobile */}
      <section
        aria-labelledby="login-title"
        className="mx-auto w-full max-w-[500px] lg:border lg:border-[#70482e] lg:bg-[#241612] lg:shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
      >
        {/* Cabeçalho desktop */}
        <div className="relative hidden px-8 pt-12 lg:block">
          <Link
            to="/"
            aria-label="Fechar login"
            className="absolute right-4 top-4 text-[#cfb28c] transition-colors hover:text-[#f5f1eb]"
          >
            <X size={18} />
          </Link>

          <div className="flex items-center justify-center gap-4 text-base font-bold">
            <span className="text-[#d28a4c]">Entrar</span>
            <span className="h-5 w-px bg-[#70482e]" />
            <Link
              to="/signup"
              className="text-[#cfb28c] transition-colors hover:text-[#f5f1eb]"
            >
              Criar conta
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-[404px] text-center text-sm leading-6 text-[#cfb28c]">
            Entre para gerenciar sua carteira, coleção e perfil de criador.
          </p>
        </div>

        {/* Título mobile */}
        <h1
          id="login-title"
          className="mb-10 text-center text-lg font-bold lg:sr-only"
        >
          Entrar
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 lg:px-20 lg:pt-6"
        >
          <div>
            <label htmlFor="login-email" className="sr-only">
              E-mail
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="contato@email.com"
              value={email}
              disabled={loginMutation.isPending}
              onChange={(event) => {
                setEmail(event.target.value)
                setMessage('')
              }}
              className="h-[50px] w-full rounded-[5px] border border-[#70482e] bg-[#241612] px-4 text-sm text-[#f5f1eb] outline-none placeholder:text-[#a98c76] focus:border-[#d28a4c] lg:h-10"
            />
          </div>

          <div className="relative">
            <label htmlFor="login-password" className="sr-only">
              Senha
            </label>
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="Senha"
              value={password}
              disabled={loginMutation.isPending}
              onChange={(event) => {
                setPassword(event.target.value)
                setMessage('')
              }}
              className="h-[50px] w-full rounded-[5px] border border-[#70482e] bg-[#241612] py-2 pl-4 pr-12 text-sm text-[#f5f1eb] outline-none placeholder:text-[#a98c76] focus:border-[#d28a4c] lg:h-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={
                showPassword ? 'Ocultar senha' : 'Mostrar senha'
              }
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cfb28c] transition-colors hover:text-[#f5f1eb]"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                setIsErrorMessage(false)
                setMessage(
                  'A recuperação de senha ainda não está disponível nesta demonstração.',
                )
              }}
              className="text-xs text-[#cfb28c] underline-offset-4 hover:text-[#d28a4c] hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-7 flex h-[60px] w-full items-center justify-center rounded-[5px] bg-[#d28a4c] text-sm font-bold text-[#160f0d] transition-colors hover:bg-[#e2a56e] disabled:cursor-wait disabled:opacity-60 lg:h-[45px]"
          >
            {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
          </button>

          {message && (
            <p
              role={isErrorMessage ? 'alert' : 'status'}
              aria-live="polite"
              className="rounded-md border border-[#70482e] bg-[#39251d] p-3 text-xs leading-6 text-[#cfb28c]"
            >
              {message}
            </p>
          )}
        </form>

        {/* Acesso por provedores externos */}
        <div className="mt-10 lg:mt-6 lg:px-20 lg:pb-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#70482e]" />
            <span className="whitespace-nowrap text-xs text-[#cfb28c]">
              Ou continue com
            </span>
            <span className="h-px flex-1 bg-[#70482e]" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setIsErrorMessage(false)
                setMessage(
                  'O acesso com Google ainda não está integrado.',
                )
              }}
              className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[5px] border border-[#70482e] text-sm font-medium transition-colors hover:border-[#d28a4c] lg:h-10"
            >
              <span
                aria-hidden="true"
                className="text-lg font-bold text-[#d28a4c]"
              >
                G
              </span>
              Continuar com Google
            </button>

            <button
              type="button"
              onClick={() => {
                setIsErrorMessage(false)
                setMessage(
                  'O acesso com Facebook ainda não está integrado.',
                )
              }}
              className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[5px] border border-[#70482e] text-sm font-medium transition-colors hover:border-[#d28a4c] lg:h-10"
            >
              <span
                aria-hidden="true"
                className="text-lg font-bold text-[#d28a4c]"
              >
                f
              </span>
              Continuar com Facebook
            </button>
          </div>
        </div>

        {/* Navegação para cadastro no mobile */}
        <p className="mt-10 text-center text-sm text-[#cfb28c] lg:hidden">
          Novo na Kurio?{' '}
          <Link
            to="/signup"
            className="font-bold text-[#d28a4c] underline-offset-4 hover:underline"
          >
            Crie uma conta
          </Link>
        </p>

        <div className="hidden h-[10px] bg-[#d28a4c] lg:block" />
      </section>

      {/* Informação de segurança */}
      <p className="mt-8 flex items-center justify-center gap-2 px-2 pb-6 text-center text-xs leading-5 text-[#a98c76] lg:hidden">
        <LockKeyhole size={14} />
        Ambiente demonstrativo com autenticação simulada.
      </p>
    </main>
  )
}
