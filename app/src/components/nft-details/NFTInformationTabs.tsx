
import { useState } from 'react'

/**
 * KURIO — M08.05
 * Abas de informações e avaliações do NFT.
 *
 * Componente independente da página principal,
 * preparado para reutilização com outros NFTs.
 *
 * Os textos editoriais específicos do Emerald Ape
 * seguem a referência visual do Figma.
 */

interface NFTInformationTabsProps {
  nftId: string
  nftName: string | null
  network: string
}

type InformationTab = 'details' | 'reviews'

export function NFTInformationTabs({
  nftId,
  nftName,
  network,
}: NFTInformationTabsProps) {
  const [activeTab, setActiveTab] =
    useState<InformationTab>('details')

  const isEmeraldApe = nftId === 'emerald-ape-042'

  return (
    <section
      aria-label="Informações complementares do NFT"
      className="mt-16"
    >
      {/* Navegação entre as duas abas */}
      <div
        role="tablist"
        aria-label="Detalhes e avaliações"
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-[#39251c]"
      >
        <button
          type="button"
          role="tab"
          id="nft-details-tab"
          aria-selected={activeTab === 'details'}
          aria-controls="nft-information-panel"
          onClick={() => setActiveTab('details')}
          className={`relative pb-3 text-sm font-semibold transition-colors ${
            activeTab === 'details'
              ? 'text-[#d58c48]'
              : 'text-[#cbb8a8] hover:text-[#f5eee7]'
          }`}
        >
          Detalhes do NFT

          {activeTab === 'details' && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d58c48]"
            />
          )}
        </button>

        <button
          type="button"
          role="tab"
          id="nft-reviews-tab"
          aria-selected={activeTab === 'reviews'}
          aria-controls="nft-information-panel"
          onClick={() => setActiveTab('reviews')}
          className={`relative pb-3 text-sm font-semibold transition-colors ${
            activeTab === 'reviews'
              ? 'text-[#d58c48]'
              : 'text-[#cbb8a8] hover:text-[#f5eee7]'
          }`}
        >
          Avaliações de colecionadores
          {isEmeraldApe ? ' (19)' : ''}
          {activeTab === 'reviews' && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d58c48]"
            />
          )}
        </button>
      </div>

      {/* Conteúdo da aba selecionada */}
      <div
        id="nft-information-panel"
        role="tabpanel"
        aria-labelledby={
          activeTab === 'details'
            ? 'nft-details-tab'
            : 'nft-reviews-tab'
        }
        tabIndex={0}
        className="pt-5 text-xs leading-7 text-[#b69a7c]"
      >
        {activeTab === 'details' ? (
          isEmeraldApe ? (
            <div className="space-y-5">
              <p>
                Emerald Ape #042 é uma obra digital 1/50
                finalizada à mão da coleção Kurio Editions.
                Cada atributo fica armazenado nos metadados
                do token e verificado na Ethereum. A obra
                explora identidade, movimento e luz em um
                mundo digital sem fronteiras.
              </p>

              <p>
                A propriedade inclui a arte em alta resolução,
                lançamentos exclusivos para colecionadores
                e um registro permanente de procedência
                registrada na rede. Nova Sato recebe 5% de
                direitos autorais nas vendas secundárias,
                apoiando novos trabalhos e lançamentos da
                comunidade.
              </p>

              <div>
                <h3 className="font-bold text-[#f5eee7]">
                  Rede:
                </h3>
                <p>
                  Cunhado na Ethereum com procedência
                  imutável e metadados armazenados no IPFS.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#f5eee7]">
                  Contrato:
                </h3>
                <p>
                  Direitos autorais do criador: 5% nas vendas
                  secundárias, pagos automaticamente pelos
                  mercados compatíveis.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#f5eee7]">
                  Direitos autorais:
                </h3>
                <p>
                  0x7A42...19E8 · Contrato inteligente
                  ERC-721 verificado.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p>
                {nftName ?? 'Esta obra'} faz parte do
                marketplace KURIO.
              </p>

              <p>Rede: {network}</p>

              <p>
                Descrição detalhada e informações do
                contrato ainda não disponíveis.
              </p>
            </div>
          )
        ) : (
          <div className="rounded-md border border-[#39251c] bg-[#1d1410] px-6 py-8">
            <h3 className="text-sm font-semibold text-[#f5eee7]">
              Avaliações de colecionadores
            </h3>

            <p className="mt-3">
              {isEmeraldApe
                ? 'O Figma apresenta 19 avaliações para esta obra. Os comentários individuais ainda não estão disponíveis nos dados do projeto.'
                : 'Ainda não há avaliações disponíveis para esta obra.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
