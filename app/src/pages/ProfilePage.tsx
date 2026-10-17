
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {
  Activity,
  Bookmark,
  Download,
  Eye,
  EyeOff,
  Heart,
  ImagePlus,
  LifeBuoy,
  LogOut,
  Tag,
  UserRound,
  Wallet,
} from 'lucide-react'

import { logout } from '@/services/auth-service'
import type { AuthUser } from '@/services/auth-service'
import { clearAuthToken } from '@/services/api'
import { useAuthUser } from '@/hooks/useAuthUser'

type ProfileField =
  | 'displayName'
  | 'username'
  | 'email'
  | 'ens'
  | 'walletNickname'

type ProfileData = Record<ProfileField, string>

const inputClass =
  'h-10 w-full rounded-[3px] border border-[#70482e] bg-[#241612] px-4 text-sm text-[#f5f1eb] outline-none placeholder:text-[#94745f] focus:border-[#d28a4c]'

/**
 * KURIO — M16.26.7.2
 *
 * Perfil conectado à sessão autenticada.
 * Nome e e-mail obtidos via GET /api/auth/me.
 *
 * Demais campos permanecem demonstrativos.
 * Layout original do Figma preservado.
 */
export function ProfilePage() {
  const { data: user, isPending, isError } = useAuthUser()

  if (isPending) {
    return (
      <main className="min-h-[760px] bg-[#160f0d] px-5 py-10 text-[#f5f1eb] sm:px-8 lg:py-12">
        <div
          role="status"
          className="mx-auto max-w-[1200px] text-sm text-[#cfb28c]"
        >
          Carregando dados do perfil...
        </div>
      </main>
    )
  }

  if (isError || !user) {
    return (
      <main className="min-h-[760px] bg-[#160f0d] px-5 py-10 text-[#f5f1eb] sm:px-8 lg:py-12">
        <div
          role="alert"
          className="mx-auto max-w-[1200px] text-sm text-[#d28a4c]"
        >
          Não foi possível carregar os dados da conta.
          Atualize a página e tente novamente.
        </div>
      </main>
    )
  }

  /*
   * A chave baseada no ID impede que o estado
   * local de uma conta seja reaproveitado
   * quando outro usuário fizer login.
   */
  return <AuthenticatedProfile key={user.id} user={user} />
}

function AuthenticatedProfile({
  user,
}: {
  user: AuthUser
}) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [profile, setProfile] = useState<ProfileData>({
    displayName: user.name,
    username: '',
    email: user.email,
    ens: '',
    walletNickname: '',
  })

  const [avatarUrl, setAvatarUrl] =
    useState<string | null>(null)

  const [feedback, setFeedback] = useState('')
  const [passwordFeedback, setPasswordFeedback] =
    useState('')

  const [currentPassword, setCurrentPassword] =
    useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [visiblePasswords, setVisiblePasswords] =
    useState({
      current: false,
      next: false,
      confirm: false,
    })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const logoutMutation = useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      clearAuthToken()
      queryClient.clear()

      await navigate({
        to: '/login',
        replace: true,
      })
    },

    onError: async (requestError: unknown) => {
      if (
        axios.isAxiosError(requestError) &&
        requestError.response?.status === 401
      ) {
        clearAuthToken()
        queryClient.clear()

        await navigate({
          to: '/login',
          replace: true,
        })

        return
      }

      setFeedback(
        'Não foi possível encerrar a sessão. Tente novamente.',
      )
    },
  })

  // Libera a URL temporária do avatar.
  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl)
      }
    }
  }, [avatarUrl])

  function updateField(
    field: ProfileField,
    value: string,
  ) {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }))

    setFeedback('')
  }

  function handleAvatarChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    if (
      ![
        'image/png',
        'image/jpeg',
        'image/webp',
      ].includes(file.type)
    ) {
      setFeedback(
        'Escolha uma imagem PNG, JPG ou WebP.',
      )
      event.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setFeedback(
        'A imagem deve ter no máximo 2 MB.',
      )
      event.target.value = ''
      return
    }

    setAvatarUrl(URL.createObjectURL(file))

    setFeedback(
      'Prévia do avatar atualizada. A imagem não foi enviada ao servidor.',
    )

    event.target.value = ''
  }

  function handleProfileSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (profile.displayName.trim().length < 2) {
      setFeedback(
        'Informe um nome de exibição com pelo menos 2 caracteres.',
      )
      return
    }

    if (profile.username.trim().length < 3) {
      setFeedback(
        'O nome de usuário deve ter pelo menos 3 caracteres.',
      )
      return
    }

    const anyPassword =
      currentPassword !== '' ||
      newPassword !== '' ||
      confirmPassword !== ''

    if (anyPassword) {
      if (!currentPassword) {
        setPasswordFeedback(
          'Informe a senha atual.',
        )
        return
      }

      if (newPassword.length < 8) {
        setPasswordFeedback(
          'A nova senha deve ter pelo menos 8 caracteres.',
        )
        return
      }

      if (newPassword !== confirmPassword) {
        setPasswordFeedback(
          'A confirmação da nova senha não coincide.',
        )
        return
      }

      setPasswordFeedback(
        'Campos de senha validados. A alteração real depende de um endpoint específico.',
      )
    } else {
      setPasswordFeedback('')
    }

    setFeedback(
      'Dados validados. As alterações do perfil ainda não são enviadas à API simulada.',
    )
  }

  const sidebarItems = [
    {
      label: 'Detalhes do perfil',
      icon: UserRound,
      active: true,
    },
    {
      label: 'Carteiras',
      icon: Wallet,
      to: '/wallets' as const,
    },
    {
      label: 'Atividade',
      icon: Activity,
    },
    {
      label: 'Lista de desejos',
      icon: Heart,
    },
    {
      label: 'Ofertas',
      icon: Tag,
    },
    {
      label: 'Downloads',
      icon: Download,
    },
    {
      label: 'Suporte',
      icon: LifeBuoy,
    },
  ]

  return (
    <main className="min-h-[760px] bg-[#160f0d] px-5 py-10 text-[#f5f1eb] sm:px-8 lg:py-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-9 lg:grid-cols-[310px_minmax(0,1fr)] lg:gap-7">
          {/* Navegação da conta */}
          <aside aria-label="Menu da conta">
            <h1 className="mb-5 px-3 text-lg font-bold">
              Meu perfil
            </h1>

            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon

                const content = (
                  <>
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </>
                )

                const className = `flex min-h-[45px] w-full items-center gap-3 px-4 text-left text-sm transition-colors ${
                  item.active
                    ? 'bg-[#39251d] font-bold text-[#d28a4c]'
                    : 'text-[#cfb28c] hover:bg-[#241612] hover:text-[#f5f1eb]'
                }`

                return 'to' in item && item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={className}
                  >
                    {content}
                  </Link>
                ) : item.active ? (
                  <div
                    key={item.label}
                    aria-current="page"
                    className={className}
                  >
                    {content}
                  </div>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      setFeedback(
                        `A seção "${item.label}" estará disponível em uma próxima etapa.`,
                      )
                    }
                    className={className}
                  >
                    {content}
                  </button>
                )
              })}
            </nav>

            {/* Logout funcional */}
            <div className="mt-2 border-t border-[#70482e] pt-2">
              <button
                type="button"
                disabled={logoutMutation.isPending}
                onClick={() => {
                  setFeedback('')
                  logoutMutation.mutate()
                }}
                className="flex min-h-10 w-full items-center gap-3 px-4 text-left text-sm text-[#cfb28c] hover:text-[#d28a4c] disabled:cursor-wait disabled:opacity-60"
              >
                <LogOut size={19} />
                {logoutMutation.isPending
                  ? 'Saindo...'
                  : 'Sair'}
              </button>
            </div>
          </aside>

          {/* Formulário do colecionador */}
          <section
            aria-labelledby="profile-heading"
            className="min-w-0"
          >
            <h2
              id="profile-heading"
              className="mb-8 text-base font-bold"
            >
              Perfil do colecionador
            </h2>

            <form onSubmit={handleProfileSubmit}>
              <div className="grid gap-x-7 gap-y-6 md:grid-cols-2">
                {/* Nome vindo da API */}
                <div>
                  <label
                    htmlFor="profile-display-name"
                    className="mb-3 block text-sm text-[#cfb28c]"
                  >
                    Nome de exibição{' '}
                    <span className="text-[#d28a4c]">
                      *
                    </span>
                  </label>

                  <input
                    id="profile-display-name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={80}
                    value={profile.displayName}
                    onChange={(event) =>
                      updateField(
                        'displayName',
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </div>

                {/* Nome de usuário demonstrativo */}
                <div>
                  <label
                    htmlFor="profile-username"
                    className="mb-3 block text-sm text-[#cfb28c]"
                  >
                    Nome de usuário{' '}
                    <span className="text-[#d28a4c]">
                      *
                    </span>
                  </label>

                  <input
                    id="profile-username"
                    type="text"
                    autoComplete="username"
                    required
                    minLength={3}
                    maxLength={40}
                    value={profile.username}
                    onChange={(event) =>
                      updateField(
                        'username',
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </div>

                {/* E-mail vindo da API */}
                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-3 block text-sm text-[#cfb28c]"
                  >
                    E-mail{' '}
                    <span className="text-[#d28a4c]">
                      *
                    </span>
                  </label>

                  <input
                    id="profile-email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={profile.email}
                    onChange={(event) =>
                      updateField(
                        'email',
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </div>

                {/* ENS demonstrativo */}
                <div>
                  <label
                    htmlFor="profile-ens"
                    className="mb-3 block text-sm text-[#cfb28c]"
                  >
                    Nome ENS{' '}
                    <span className="text-[#d28a4c]">
                      *
                    </span>
                  </label>

                  <div className="flex gap-2">
                    <div className="flex h-10 shrink-0 items-center rounded-[3px] border border-[#70482e] bg-[#241612] px-3 text-sm text-[#cfb28c]">
                      .eth
                    </div>

                    <input
                      id="profile-ens"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="seu-nome"
                      value={profile.ens}
                      onChange={(event) =>
                        updateField(
                          'ens',
                          event.target.value,
                        )
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Apelido demonstrativo */}
                <div>
                  <label
                    htmlFor="profile-wallet-nickname"
                    className="mb-3 block text-sm text-[#cfb28c]"
                  >
                    Apelido da carteira{' '}
                    <span className="text-[#d28a4c]">
                      *
                    </span>
                  </label>

                  <input
                    id="profile-wallet-nickname"
                    type="text"
                    required
                    maxLength={60}
                    placeholder="Minha carteira"
                    value={profile.walletNickname}
                    onChange={(event) =>
                      updateField(
                        'walletNickname',
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </div>

                {/* Avatar com prévia local */}
                <div>
                  <p className="mb-3 text-sm text-[#cfb28c]">
                    Avatar
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#70482e] bg-[#241612]">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Prévia do avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImagePlus
                          size={24}
                          className="text-[#cfb28c]"
                        />
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleAvatarChange}
                      className="sr-only"
                      aria-label="Selecionar imagem do avatar"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="h-10 rounded-[3px] border border-[#70482e] px-5 text-sm text-[#cfb28c] hover:border-[#d28a4c]"
                    >
                      Alterar
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAvatarUrl(null)
                        setFeedback(
                          'Prévia do avatar removida.',
                        )
                      }}
                      disabled={!avatarUrl}
                      className="text-sm text-[#cfb28c] hover:text-[#d28a4c] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>

              {/* Alteração de senha demonstrativa */}
              <div className="mt-10">
                <h3 className="mb-6 text-base font-bold">
                  Alterar senha
                </h3>

                <div className="max-w-[417px] space-y-6">
                  {(
                    [
                      {
                        key: 'current' as const,
                        label: 'Senha atual',
                        value: currentPassword,
                        setter: setCurrentPassword,
                        autocomplete: 'current-password',
                      },
                      {
                        key: 'next' as const,
                        label: 'Nova senha',
                        value: newPassword,
                        setter: setNewPassword,
                        autocomplete: 'new-password',
                      },
                      {
                        key: 'confirm' as const,
                        label: 'Confirmar nova senha',
                        value: confirmPassword,
                        setter: setConfirmPassword,
                        autocomplete: 'new-password',
                      },
                    ]
                  ).map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={`profile-password-${field.key}`}
                        className="mb-3 block text-sm text-[#cfb28c]"
                      >
                        {field.label}
                      </label>

                      <div className="relative">
                        <input
                          id={`profile-password-${field.key}`}
                          type={
                            visiblePasswords[field.key]
                              ? 'text'
                              : 'password'
                          }
                          autoComplete={
                            field.autocomplete
                          }
                          value={field.value}
                          onChange={(event) => {
                            field.setter(
                              event.target.value,
                            )
                            setPasswordFeedback('')
                          }}
                          className={`${inputClass} pr-12`}
                        />

                        <button
                          type="button"
                          aria-label={
                            visiblePasswords[field.key]
                              ? `Ocultar ${field.label.toLowerCase()}`
                              : `Mostrar ${field.label.toLowerCase()}`
                          }
                          aria-pressed={
                            visiblePasswords[field.key]
                          }
                          onClick={() =>
                            setVisiblePasswords(
                              (previous) => ({
                                ...previous,
                                [field.key]:
                                  !previous[field.key],
                              }),
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cfb28c] hover:text-[#f5f1eb]"
                        >
                          {visiblePasswords[
                            field.key
                          ] ? (
                            <EyeOff size={19} />
                          ) : (
                            <Eye size={19} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {passwordFeedback && (
                <p
                  role="status"
                  className="mt-5 text-sm text-[#d28a4c]"
                >
                  {passwordFeedback}
                </p>
              )}

              {feedback && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-md border border-[#70482e] bg-[#241612] p-4 text-sm leading-6 text-[#cfb28c]"
                >
                  {feedback}
                </p>
              )}

              <button
                type="submit"
                className="mt-8 h-10 min-w-[131px] rounded-[3px] bg-[#d28a4c] px-8 text-sm font-bold text-[#160f0d] transition-colors hover:bg-[#e2a56e]"
              >
                Salvar
              </button>
            </form>

            <p className="mt-5 text-xs leading-5 text-[#94745f]">
              Nome e e-mail carregados da conta autenticada.
              As alterações do formulário ainda não são salvas
              na API simulada.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#94745f]">
              <Bookmark size={15} />
              Recursos adicionais serão integrados futuramente.
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
