
import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Activity,
  Bookmark,
  Download,
  LifeBuoy,
  LogOut,
  Plus,
  Tag,
  UserRound,
  Wallet,
} from 'lucide-react'

type WalletForm = {
  displayName: string
  nickname: string
  network: string
  profileName: string
  address: string
  secondaryAddress: string
  walletType: string
  referralCode: string
  email: string
  ens: string
}

const initialForm: WalletForm = {
  displayName: '',
  nickname: '',
  network: '',
  profileName: '',
  address: '',
  secondaryAddress: '',
  walletType: '',
  referralCode: '',
  email: '',
  ens: '',
}

const inputClass =
  'h-10 w-full min-w-0 rounded-[3px] border border-[#3F2319] bg-transparent px-3 text-sm text-[#F5F1EB] outline-none placeholder:text-[#B39463] focus:border-[#D28A4C]'

const labelClass = 'mb-2 block text-[15px] text-[#F5F1EB]'

function Field({
  label,
  required = false,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block min-w-0">
      <span className={labelClass}>
        {label}
        {required && <span className="ml-1 text-[#F0805F]">*</span>}
      </span>
      {children}
    </label>
  )
}

const navigation = [
  { label: 'Dados do perfil', icon: UserRound, href: '/profile' },
  { label: 'Carteiras', icon: Wallet, href: '/wallets' },
  { label: 'Atividade', icon: Activity },
  { label: 'Lista de interesse', icon: Bookmark },
  { label: 'Ofertas', icon: Tag },
  { label: 'Arquivos baixados', icon: Download },
  { label: 'Suporte', icon: LifeBuoy },
]

export function WalletsPage() {
  const [form, setForm] = useState<WalletForm>(initialForm)
  const [sameAsPrimary, setSameAsPrimary] = useState(false)
  const [showSecondary, setShowSecondary] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function updateField(field: keyof WalletForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setMessage('')
    setError('')
  }

  function showUnavailable() {
    setMessage('')
    setError('Esta funcionalidade estará disponível após a integração da conta.')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')

    const address = form.address.trim()

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setError('Informe um endereço Ethereum válido: 0x seguido de 40 caracteres hexadecimais.')
      return
    }

    if (
      form.secondaryAddress.trim() &&
      !/^0x[a-fA-F0-9]{40}$/.test(form.secondaryAddress.trim()) &&
      !/^[a-zA-Z0-9-]+\.eth$/.test(form.secondaryAddress.trim())
    ) {
      setError('A carteira secundária deve conter um endereço 0x válido ou um nome ENS .eth.')
      return
    }

    if (form.ens.trim() && !/^[a-zA-Z0-9-]+$/.test(form.ens.trim())) {
      setError('Informe apenas o nome ENS, sem o sufixo .eth.')
      return
    }

    setMessage(
      'Dados da carteira validados. Nenhuma carteira foi conectada ou salva, pois a integração ainda não está disponível.',
    )
  }

  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-8 text-[#F5F1EB] sm:px-6 lg:py-10">
      <div className="grid items-start gap-7 lg:grid-cols-[310px_minmax(0,1fr)]">
        <aside className="w-full bg-[#241612] py-2">
          <h1 className="px-5 py-3 text-lg font-bold">Meu perfil</h1>

          <nav aria-label="Navegação da conta">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = item.href === '/wallets'

              const content = (
                <>
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </>
              )

              const classes = [
                'flex min-h-11 w-full items-center gap-3 border-l-[6px] px-4 text-left text-[15px] transition-colors hover:bg-[#302019]',
                active
                  ? 'border-[#D28A4C] text-[#E89B55]'
                  : 'border-transparent text-[#E89B55]',
              ].join(' ')

              return item.href ? (
                <Link
                  key={item.label}
                  to={item.href as '/profile' | '/wallets'}
                  className={classes}
                  aria-current={active ? 'page' : undefined}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={showUnavailable}
                  className={classes}
                >
                  {content}
                </button>
              )
            })}
          </nav>

          <div className="mt-2 border-t border-[#3F2319] pt-2">
            <button
              type="button"
              onClick={showUnavailable}
              className="flex min-h-10 w-full items-center gap-3 px-5 text-left text-[15px] font-bold text-[#E89B55] hover:bg-[#302019]"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </aside>

        <section className="min-w-0">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[17px] font-bold">Carteira principal</h2>
                <button
                  type="button"
                  onClick={() => {
                    setMessage('')
                    setError(
                      'Para adicionar uma carteira real, será necessário integrar um provedor de carteiras.',
                    )
                  }}
                  className="inline-flex items-center gap-1 text-base font-medium text-[#E89B55] hover:text-[#F5F1EB]"
                >
                  <Plus size={17} />
                  Adicionar
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#CFB28C]">
                Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.
              </p>
            </div>

            <div className="grid gap-x-7 gap-y-6 md:grid-cols-2">
              <Field label="Nome de exibição" required>
                <input
                  className={inputClass}
                  required
                  maxLength={80}
                  value={form.displayName}
                  onChange={(e) => updateField('displayName', e.target.value)}
                />
              </Field>

              <Field label="Apelido da carteira" required>
                <input
                  className={inputClass}
                  required
                  maxLength={80}
                  value={form.nickname}
                  onChange={(e) => updateField('nickname', e.target.value)}
                />
              </Field>

              <Field label="Rede" required>
                <select
                  className={inputClass}
                  required
                  value={form.network}
                  onChange={(e) => updateField('network', e.target.value)}
                >
                  <option value="" className="bg-[#241612]">
                    Selecione uma rede
                  </option>
                  <option value="Ethereum" className="bg-[#241612]">
                    Ethereum
                  </option>
                  <option value="Polygon" className="bg-[#241612]">
                    Polygon
                  </option>
                  <option value="Base" className="bg-[#241612]">
                    Base
                  </option>
                </select>
              </Field>

              <Field label="Nome do perfil" required>
                <input
                  className={inputClass}
                  required
                  maxLength={80}
                  value={form.profileName}
                  onChange={(e) => updateField('profileName', e.target.value)}
                />
              </Field>

              <Field label="Endereço da carteira" required>
                <input
                  className={inputClass}
                  required
                  placeholder="Endereço 0x da carteira"
                  spellCheck={false}
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                />
              </Field>

              <div className="flex min-w-0 items-end">
                <input
                  className={inputClass}
                  aria-label="ENS ou carteira secundária opcional"
                  placeholder="ENS ou carteira secundária (opcional)"
                  spellCheck={false}
                  value={form.secondaryAddress}
                  onChange={(e) =>
                    updateField('secondaryAddress', e.target.value)
                  }
                />
              </div>

              <Field label="Tipo de carteira" required>
                <select
                  className={inputClass}
                  required
                  value={form.walletType}
                  onChange={(e) => updateField('walletType', e.target.value)}
                >
                  <option value="" className="bg-[#241612]">
                    Selecione uma carteira
                  </option>
                  <option value="MetaMask" className="bg-[#241612]">
                    MetaMask
                  </option>
                  <option value="WalletConnect" className="bg-[#241612]">
                    WalletConnect
                  </option>
                  <option value="Coinbase Wallet" className="bg-[#241612]">
                    Coinbase Wallet
                  </option>
                  <option value="Outra" className="bg-[#241612]">
                    Outra
                  </option>
                </select>
              </Field>

              <Field label="Código de indicação" required>
                <input
                  className={inputClass}
                  required
                  maxLength={40}
                  value={form.referralCode}
                  onChange={(e) => updateField('referralCode', e.target.value)}
                />
              </Field>

              <Field label="E-mail" required>
                <input
                  type="email"
                  className={inputClass}
                  required
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </Field>

              <Field label="Nome ENS" required>
                <div className="flex min-w-0 gap-2">
                  <span className="flex h-10 w-[78px] shrink-0 items-center justify-center rounded-[3px] border border-[#3F2319] text-[15px]">
                    .eth
                  </span>
                  <input
                    className={inputClass}
                    required
                    placeholder="nome"
                    spellCheck={false}
                    value={form.ens}
                    onChange={(e) => updateField('ens', e.target.value)}
                  />
                </div>
              </Field>
            </div>

            <button
              type="submit"
              className="min-h-10 rounded-[3px] bg-[#D28A4C] px-5 text-sm font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55]"
            >
              Salvar carteira
            </button>

            <div className="space-y-3 border-t border-[#3F2319] pt-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[17px] font-bold">Carteira secundária</h2>
                <div className="flex flex-wrap items-center gap-5">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={sameAsPrimary}
                      onChange={(e) => {
                        setSameAsPrimary(e.target.checked)
                        setMessage('')
                      }}
                      className="accent-[#D28A4C]"
                    />
                    Igual à carteira principal
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSecondary((current) => !current)
                      setMessage('')
                    }}
                    className="text-base font-medium text-[#E89B55] hover:text-[#F5F1EB]"
                  >
                    {showSecondary ? 'Ocultar' : 'Adicionar'}
                  </button>
                </div>
              </div>

              {sameAsPrimary ? (
                <p className="text-sm text-[#CFB28C]">
                  A carteira principal foi selecionada como referência.
                  Nenhuma conexão foi realizada.
                </p>
              ) : showSecondary ? (
                <div className="space-y-3">
                  <p className="text-sm text-[#CFB28C]">
                    Informe um endereço secundário no campo opcional acima.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSecondary(false)
                      updateField('secondaryAddress', '')
                    }}
                    className="text-sm text-[#E89B55] hover:underline"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <p className="text-sm text-[#CFB28C]">
                  Você ainda não adicionou uma carteira secundária.
                </p>
              )}
            </div>

            {error && (
              <p
                role="alert"
                className="rounded border border-[#F0805F]/40 bg-[#F0805F]/10 p-3 text-sm text-[#F5B09A]"
              >
                {error}
              </p>
            )}

            {message && (
              <p
                role="status"
                className="rounded border border-[#D28A4C]/40 bg-[#D28A4C]/10 p-3 text-sm text-[#F5F1EB]"
              >
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  )
}
