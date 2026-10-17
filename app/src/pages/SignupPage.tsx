
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Eye, EyeOff, Info, X } from 'lucide-react'

import { signup } from '@/services/auth-service'
import { setAuthToken } from '@/services/api'

/**
 * KURIO — M16.26.5
 *
 * Cadastro integrado à API REST simulada.
 * TanStack Query + Axios + MSW.
 *
 * Mantém o layout original do Figma.
 */

export function SignupPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const signupMutation = useMutation({
    mutationFn: signup,

    onSuccess: async (session) => {
      setAuthToken(session.token)

      queryClient.setQueryData(
        ['auth', 'me'],
        session.user,
      )

      setError('')
      setMessage('Conta demonstrativa criada com sucesso.')

      await navigate({ to: '/profile' })
    },

    onError: (requestError: unknown) => {
      setMessage('')

      if (axios.isAxiosError(requestError)) {
        const responseMessage =
          requestError.response?.data?.message

        if (typeof responseMessage === 'string') {
          setError(responseMessage)
          return
        }
      }

      setError(
        'Não foi possível criar a conta. Tente novamente.',
      )
    },
  })

  function clearFeedback() {
    setMessage('')
    setError('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (signupMutation.isPending) {
      return
    }

    clearFeedback()

    const normalizedUsername = username.trim()

    if (normalizedUsername.length < 3) {
      setError(
        'O nome de usuário deve ter pelo menos 3 caracteres.',
      )
      return
    }

    if (password.length < 8) {
      setError(
        'A senha deve ter pelo menos 8 caracteres.',
      )
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas informadas não coincidem.')
      return
    }

    signupMutation.mutate({
      name: normalizedUsername,
      email: email.trim(),
      password,
    })
  }

  const inputClassName =
    'h-[50px] w-full rounded-[5px] border border-[#70482e] bg-[#241612] px-4 text-sm text-[#f5f1eb] outline-none placeholder:text-[#a98c76] focus:border-[#d28a4c] lg:h-10'

  return (
    <main className="min-h-[780px] bg-[#160f0d] px-7 py-12 text-[#f5f1eb] sm:px-6 lg:flex lg:min-h-[820px] lg:items-start lg:justify-center lg:py-24">
      <div className="mx-auto w-full max-w-[500px]">
        {/* Identidade visual mobile */}
        <div className="mb-14 flex justify-center pt-5 lg:hidden">
          <Link
            to="/"
            className="text-[34px] font-bold tracking-[0.3em] text-[#f5f1eb]"
            aria-label="KURIO — Página inicial"
          >
            KURIO
          </Link>
        </div>

        {/* Painel de cadastro */}
        <section
          aria-labelledby="signup-title"
          className="w-full lg:border lg:border-[#70482e] lg:bg-[#241612] lg:shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
        >
          {/* Cabeçalho desktop */}
          <div className="relative hidden px-8 pt-12 lg:block">
            <Link
              to="/"
              aria-label="Fechar cadastro"
              className="absolute right-4 top-4 text-[#cfb28c] transition-colors hover:text-[#f5f1eb]"
            >
              <X size={18} />
            </Link>

            <div className="flex items-center justify-center gap-4 text-base font-bold">
              <Link
                to="/login"
                className="text-[#cfb28c] transition-colors hover:text-[#f5f1eb]"
              >
                Entrar
              </Link>

              <span className="h-5 w-px bg-[#70482e]" />

              <span className="text-[#d28a4c]">
                Criar conta
              </span>
            </div>

            <p className="mx-auto mt-8 max-w-[404px] text-center text-sm leading-6 text-[#cfb28c]">
              Crie seu perfil de colecionador e conecte uma
              carteira quando quiser.
            </p>
          </div>

          {/* Título mobile */}
          <h1
            id="signup-title"
            className="mb-10 text-center text-lg font-bold lg:sr-only"
          >
            Criar perfil de colecionador
          </h1>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3 lg:px-20 lg:pt-6"
          >
            {/* Nome de usuário */}
            <div>
              <label
                htmlFor="signup-username"
                className="sr-only"
              >
                Nome de usuário
              </label>

              <input
                id="signup-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                minLength={3}
                maxLength={40}
                placeholder="Nome de usuário"
                value={username}
                disabled={signupMutation.isPending}
                onChange={(event) => {
                  setUsername(event.target.value)
                  clearFeedback()
                }}
                className={inputClassName}
              />
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="signup-email"
                className="sr-only"
              >
                E-mail
              </label>

              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="Digite seu e-mail"
                value={email}
                disabled={signupMutation.isPending}
                onChange={(event) => {
                  setEmail(event.target.value)
                  clearFeedback()
                }}
                className={inputClassName}
              />
            </div>

            {/* Senha */}
            <div className="relative">
              <label
                htmlFor="signup-password"
                className="sr-only"
              >
                Senha
              </label>

              <input
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Senha"
                value={password}
                disabled={signupMutation.isPending}
                onChange={(event) => {
                  setPassword(event.target.value)
                  clearFeedback()
                }}
                className={`${inputClassName} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
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

            {/* Confirmação de senha */}
            <div className="relative">
              <label
                htmlFor="signup-confirm-password"
                className="sr-only"
              >
                Confirmar senha
              </label>

              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Confirmar senha"
                value={confirmPassword}
                disabled={signupMutation.isPending}
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                  clearFeedback()
                }}
                className={`${inputClassName} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (current) => !current,
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? 'Ocultar confirmação de senha'
                    : 'Mostrar confirmação de senha'
                }
                aria-pressed={showConfirmPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cfb28c] transition-colors hover:text-[#f5f1eb]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Botão de cadastro */}
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="mt-7 flex h-[60px] w-full items-center justify-center rounded-[5px] bg-[#d28a4c] text-sm font-bold text-[#160f0d] transition-colors hover:bg-[#e2a56e] disabled:cursor-wait disabled:opacity-60 lg:h-[45px]"
            >
              <span className="lg:hidden">
                {signupMutation.isPending
                  ? 'Criando perfil...'
                  : 'Criar perfil'}
              </span>

              <span className="hidden lg:inline">
                {signupMutation.isPending
                  ? 'Criando conta...'
                  : 'Criar conta'}
              </span>
            </button>

            {/* Erros de validação */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-red-700/50 bg-red-950/20 p-3 text-xs leading-6 text-red-300"
              >
                <Info
                  size={17}
                  className="mt-1 shrink-0"
                />
                <span>{error}</span>
              </div>
            )}

            {/* Resultado demonstrativo */}
            {message && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-2 rounded-md border border-[#70482e] bg-[#39251d] p-3 text-xs leading-6 text-[#cfb28c]"
              >
                <Info
                  size={17}
                  className="mt-1 shrink-0"
                />
                <span>{message}</span>
              </div>
            )}
          </form>

          {/* Login social */}
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
                  setError('')
                  setMessage(
                    'O cadastro com Google ainda não está integrado.',
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
                  setError('')
                  setMessage(
                    'O cadastro com Facebook ainda não está integrado.',
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

          {/* Link mobile para Login */}
          <p className="mt-10 text-center text-sm text-[#cfb28c] lg:hidden">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-bold text-[#d28a4c] underline-offset-4 hover:underline"
            >
              Entre
            </Link>
          </p>

          {/* Faixa inferior do painel desktop */}
          <div className="hidden h-[10px] bg-[#d28a4c] lg:block" />
        </section>

        {/* Nota mobile */}
        <p className="mt-8 px-2 pb-6 text-center text-xs leading-5 text-[#a98c76] lg:hidden">
          Ambiente demonstrativo. A conta é criada
          na API simulada, sem backend real.
        </p>
      </div>
    </main>
  )
}
