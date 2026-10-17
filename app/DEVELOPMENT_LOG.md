**# Jungle Gaming — NFT Marketplace**

**## Diário Técnico de Desenvolvimento**

**\*\*Projeto:\*\*** Frontend Challenge — Jungle Gaming  

**\*\*Tecnologia principal:\*\*** React + TypeScript  

**\*\*Objetivo:\*\*** Desenvolver um Marketplace de NFTs seguindo os requisitos técnicos e o protótipo fornecido pela empresa.

**---**

**# M01 — Preparação e Configuração do Ambiente**

**## Etapa 01 — Repositório e ambiente**

O desenvolvimento foi iniciado a partir do repositório disponibilizado pela Jungle Gaming.

Foi criada uma aplicação React com TypeScript utilizando Vite.

**\*\*Ferramentas utilizadas:\*\***

\- Visual Studio Code

\- Git

\- Node.js

\- npm

\- Vite

\- React

\- TypeScript

**\*\*Organização:\*\*** a aplicação frontend está localizada na pasta \`app\` do repositório.

**## Etapa 02 — Dependências**

Foram instaladas as dependências iniciais para atender à arquitetura solicitada no desafio:

\- TanStack Router: navegação tipada entre páginas.

\- TanStack Query: gerenciamento de dados assíncronos e cache.

\- Axios: comunicação HTTP.

\- Socket.IO Client: comunicação em tempo real.

\- Tailwind CSS v4: estilização.

\- Lucide React: biblioteca de ícones.

\- shadcn/ui: componentes de interface.

As integrações de API, WebSocket e testes serão implementadas em etapas posteriores.

**## Etapa 03 — Configuração do Vite**

Arquivo: \`vite.config.ts\`

O Vite foi configurado com os plugins React e Tailwind CSS, além do alias \`@\` para facilitar importações da pasta \`src\`.

**\*\*Problema identificado:\*\***

O Vite 8 apresentou um aviso sobre o uso de \`\_\_dirname\`.

**\*\*Correção:\*\***

A resolução do caminho passou a utilizar:

\`fileURLToPath(new URL('./src', import.meta.url))\`

**\*\*Resultado:\*\*** compilação concluída sem o aviso de compatibilidade.

**## Etapa 04 — Configuração do shadcn/ui**

A primeira tentativa de inicialização apresentou um erro na leitura da configuração do workspace.

Foi utilizada a versão \`shadcn\@4.20.0\`, que concluiu a configuração.

**\*\*Configurações selecionadas:\*\***

\- Biblioteca: Radix UI

\- Preset: Nova

\- Ícones: Lucide

\- Fonte: Geist

A ferramenta criou componentes e arquivos auxiliares e atualizou a folha de estilos.

**\*\*Observação:\*\*** a localização dos arquivos gerados deve ser revisada durante a organização definitiva do projeto.

**\*\*Resultado:\*\*** inicialização concluída.

**---**

**# M02 — Estrutura e Navegação**

**## Etapa 01 — Organização de diretórios**

Foram preparados diretórios para separar as responsabilidades da aplicação.

**\*\*Estrutura planejada:\*\***

\- \`components/layout\`: layout compartilhado.

\- \`components/shared\`: componentes reutilizáveis.

\- \`components/ui\`: componentes de interface.

\- \`hooks\`: hooks personalizados.

\- \`mocks\`: simulações de dados e serviços.

\- \`pages\`: páginas da aplicação.

\- \`routes\`: configuração das rotas.

\- \`services\`: comunicação com serviços externos.

\- \`stores\`: gerenciamento de estado.

\- \`types\`: definições TypeScript.

\- \`utils\`: funções auxiliares.

**\*\*Justificativa:\*\*** facilitar manutenção, testes e evolução do código.

**## Etapa 02 — Configuração das rotas**

Arquivo: \`src/routes/router.tsx\`

Foram configuradas nove páginas:

1\. Home

2\. Detalhes do NFT

3\. Carrinho

4\. Checkout

5\. Confirmação

6\. Login

7\. Cadastro

8\. Perfil

9\. Carteiras

Inicialmente, as rotas utilizam páginas provisórias.

**\*\*Problema identificado:\*\***

A criação dinâmica das rotas dificultou a inferência dos parâmetros pelo TypeScript.

**\*\*Correção:\*\***

As rotas foram declaradas individualmente, preservando a tipagem do TanStack Router.

**## Etapa 03 — Integração dos providers**

Arquivo: \`src/main.tsx\`

Foram configurados:

\- \`RouterProvider\`: integração do roteador com React.

\- \`QueryClientProvider\`: disponibilização do TanStack Query.

\- \`React.StrictMode\`: verificações adicionais durante o desenvolvimento.

O TanStack Query recebeu configurações iniciais de cache, tentativas de requisição e atualização dos dados.

**## Etapa 04 — Layout principal**

Arquivo: \`src/components/layout/MainLayout.tsx\`

Foi criado um layout compartilhado contendo:

\- Cabeçalho.

\- Navegação principal.

\- Área de conteúdo com \`Outlet\`.

\- Rodapé.

\- Estrutura responsiva inicial.

**\*\*Problema identificado:\*\***

O arquivo \`MainLayout.tsx\` não existia no caminho esperado.

**\*\*Correção:\*\***

O arquivo foi criado em \`src/components/layout/\` e integrado ao roteador.

**## Etapa 05 — Ajustes de qualidade do código**

O ESLint apresentou erros relacionados à regra \`react-refresh/only-export-components\`.

Foram discutidas exceções localizadas para arquivos de configuração e componentes gerados pelo shadcn/ui.

**\*\*Situação:\*\*** a correção definitiva e a validação completa do lint ainda precisam ser confirmadas.

**## Etapa 06 — Validação da navegação**

O servidor Vite foi iniciado utilizando:

\`npm.cmd run dev\`

**\*\*Resultado informado na validação manual:\*\***

\- Aplicação carregando no navegador.

\- Cabeçalho e rodapé funcionando.

\- Navegação entre as nove rotas funcionando.

\- Erros anteriores de tipagem não aparecem mais no editor.

**\*\*Situação:\*\*** navegação homologada visualmente.

**\*\*Pendente:\*\*** executar novamente o build de produção e o lint após os últimos ajustes.

**---**

**# Próximas Etapas**

\- Implementação visual das telas conforme o Figma.

\- Criação dos componentes reutilizáveis.

\- Implementação dos serviços REST.

\- Simulação de APIs com MSW.

\- Integração Socket.IO.

\- Implementação dos fluxos de autenticação e compra.

\- Testes automatizados com Playwright.

\- Verificação de acessibilidade e desempenho.

\- Documentação final e publicação.

**---**

**# Critério de Homologação**

Cada etapa será considerada concluída após:

1\. Implementação do código.

2\. Verificação de erros.

3\. Teste correspondente.

4\. Registro do resultado neste diário técnico.

Os resultados não executados serão identificados como pendentes.

**## M02 — Etapa 07: Validação do Build de Produção**

**\*\*Objetivo:\*\***

Verificar se a aplicação compila corretamente após a

implementação das rotas e do layout compartilhado.

**\*\*Comando executado:\*\***

\`npm.cmd run build\`

**\*\*Ferramentas utilizadas:\*\***

\- TypeScript (\`tsc -b\`)

\- Vite 8.3.4

**\*\*Resultado obtido:\*\***

\- Compilação TypeScript concluída sem erros.

\- 2054 módulos transformados pelo Vite.

\- Build de produção gerado na pasta \`dist\`.

\- Tempo de compilação: 932 ms.

\- Arquivo JavaScript principal: 325,14 kB.

\- Arquivo CSS principal: 24,88 kB.

**\*\*Conclusão:\*\***

A estrutura atual da aplicação está apta para

continuar o desenvolvimento das interfaces.

**\*\*Situação:\*\*** APROVADO.

**\*\*Observação:\*\***

A validação do ESLint permanece pendente.

**## M02 — Etapa 08: Correção e Validação do ESLint**

**\*\*Objetivo:\*\***

Eliminar os erros de análise estática e validar

a qualidade do código do projeto.

**\*\*Problema identificado:\*\***

A regra \`react-refresh/only-export-components\`

apresentou erro no componente Button gerado pelo shadcn/ui.

**\*\*Arquivo corrigido:\*\***

\`@/components/ui/button.tsx\`

(localizado na pasta \`@\` da raiz da aplicação)

**\*\*Solução aplicada:\*\***

Adicionada uma exceção localizada para a regra

\`react-refresh/only-export-components\`.

**\*\*Justificativa técnica:\*\***

O componente gerado exporta definições auxiliares

além do componente React. A exceção evita o conflito

sem desativar globalmente as verificações do ESLint.

**\*\*Validação realizada:\*\***

Comando: \`npm.cmd run lint\`

Resultado: execução concluída sem erros ou avisos.

**\*\*Situação:\*\*** APROVADO.

**\*\*Observação:\*\***

A localização dos arquivos gerados pelo shadcn/ui

será revisada durante a organização definitiva do projeto.

**## M03 — Etapa 02: Implementação do Cabeçalho KURIO**

**\*\*Objetivo:\*\***

Substituir o cabeçalho provisório pela identidade visual

do Marketplace KURIO, utilizando o Figma como referência.

**\*\*Arquivo modificado:\*\***

\`src/components/layout/MainLayout.tsx\`

**\*\*Implementação realizada:\*\***

\- Identificação visual KURIO.

\- Navegação principal com destaque para a página inicial.

\- Links para carrinho e autenticação.

\- Contador provisório de itens no carrinho.

\- Menu responsivo para dispositivos móveis.

\- Aplicação inicial das cores e da tipografia do projeto.

\- Rodapé provisório com identificação KURIO.

**\*\*Decisões técnicas:\*\***

\- Preservar a navegação existente do TanStack Router.

\- Utilizar Tailwind CSS para estilização responsiva.

\- Manter desabilitadas as funcionalidades ainda não implementadas.

\- Preparar a estrutura para futura integração do carrinho.

**\*\*Validação:\*\***

\- Aplicação executada no navegador.

\- Funcionamento visual confirmado pelo desenvolvedor.

\- Compilação informada como concluída sem erros.

**\*\*Situação:\*\*** APROVADO.

**\*\*Pendências:\*\***

\- Implementação da pesquisa.

\- Integração do contador real do carrinho.

\- Desenvolvimento das demais seções do layout.

\- Validação detalhada da responsividade.

**## M03 — Etapa 03: Implementação inicial da Home KURIO**

**\*\*Objetivo:\*\***

Iniciar o desenvolvimento da página inicial do Marketplace,

seguindo a referência visual fornecida no Figma.

**\*\*Arquivos envolvidos:\*\***

\- \`src/pages/HomePage.tsx\` — criado.

\- \`src/routes/router.tsx\` — atualizado.

**\*\*Implementações realizadas:\*\***

\- Criação do componente HomePage.

\- Estrutura inicial do banner principal.

\- Título "SEJA DONO DO FUTURO DA ARTE DIGITAL".

\- Texto de apresentação da plataforma.

\- Botão "Explorar", preparado para acessar o catálogo.

\- Estilização responsiva com Tailwind CSS.

\- Integração da HomePage à rota \`/\` do TanStack Router.

**\*\*Decisões técnicas:\*\***

\- Preservar as nove rotas existentes.

\- Manter as páginas restantes com conteúdo provisório.

\- Desenvolver as seções da Home gradualmente.

\- Adicionar a imagem do banner em uma etapa posterior.

\- Implementar a seção de catálogo antes de ativar

  completamente a navegação do botão "Explorar".

**\*\*Validação:\*\***

\- Comando \`npm.cmd run build\` executado.

\- Conclusão informada pelo desenvolvedor.

\- Validação visual específica da nova Home ainda pendente.

**\*\*Situação:\*\*** Implementação inicial concluída.

**\*\*Próximas atividades:\*\***

\- Inserir a imagem principal do banner.

\- Ajustar proporções e espaçamentos conforme o Figma.

\- Desenvolver o catálogo de NFTs.

**## M03 — Etapa 04.1: Ajuste dos indicadores do banner**

**\*\*Objetivo:\*\***

Corrigir o posicionamento e o formato dos três indicadores

visuais do banner principal, seguindo a referência do Figma.

**\*\*Arquivo modificado:\*\***

\- \`src/pages/HomePage.tsx\`

**\*\*Alterações realizadas:\*\***

\- Substituição dos indicadores anteriores por três círculos

  de tamanho uniforme.

\- Aplicação da cor laranja da identidade visual KURIO.

\- Reposicionamento dos indicadores para a região central

  inferior do banner em telas desktop.

\- Centralização dos indicadores abaixo da imagem em

  dispositivos móveis.

\- Preservação do texto, botão Explorar e imagem original.

**\*\*Decisões técnicas:\*\***

\- Utilização de posicionamento relativo e absoluto

  com classes responsivas do Tailwind CSS.

\- Manutenção dos indicadores como elementos decorativos.

\- Implementação funcional do carrossel adiada até a

  definição dos demais slides.

**\*\*Validação:\*\***

\- Código atualizado e salvo pelo desenvolvedor.

\- Conferência visual após o ajuste ainda pendente.

**\*\*Situação:\*\*** Ajuste implementado, aguardando validação visual.

**## M03 — Etapa 05: Estrutura inicial do catálogo de NFTs**

**\*\*Objetivo:\*\***

Implementar a estrutura visual inicial do catálogo de NFTs

do Marketplace KURIO, seguindo a referência do Figma.

**\*\*Arquivos envolvidos:\*\***

\- \`src/components/marketplace/NFTCatalog.tsx\` — criado.

\- \`src/pages/HomePage.tsx\` — atualizado.

**\*\*Implementações realizadas:\*\***

\- Criação do componente reutilizável NFTCatalog.

\- Integração do catálogo à página inicial.

\- Organização responsiva em barra lateral e resultados.

\- Inclusão das nove categorias previstas no Figma.

\- Exibição da faixa de preços de referência em ETH.

\- Inclusão das redes Ethereum, Polygon e Solana.

\- Criação da área provisória para os cards de NFTs.

\- Integração do botão "Explorar" à seção \`#catalogo\`.

**\*\*Decisões técnicas:\*\***

\- Separar o catálogo da Home em componente próprio.

\- Utilizar Tailwind CSS para layout e responsividade.

\- Manter os dados de categorias e redes como referências

  estáticas até a implementação dos filtros funcionais.

\- Não simular resultados de pesquisa ou filtragem.

\- Reservar a implementação dos cards para a próxima etapa.

**\*\*Validação:\*\***

\- Comando \`npm.cmd run build\` executado sem erros.

\- Catálogo exibido corretamente no navegador.

\- Estrutura visual confirmada pelo desenvolvedor.

**\*\*Situação:\*\*** APROVADO.

**\*\*Pendências:\*\***

\- Implementar os cards com imagens originais do Figma.

\- Implementar filtros funcionais e ordenação.

\- Adicionar paginação e estados de carregamento.

\- Refinar os detalhes visuais conforme o Figma.

**\*\*Próxima etapa:\*\***

M03 — Etapa 06: Cards de NFTs.

**---**

**## M03 — Etapa 06: Implementação dos cards de NFTs**

**\*\*Objetivo:\*\***

Implementar os três primeiros cards do Marketplace KURIO,

seguindo a referência visual fornecida no Figma.

**\*\*Arquivos envolvidos:\*\***

\- \`src/components/marketplace/NFTCard.tsx\` — criado e ajustado.

\- \`src/components/marketplace/NFTCatalog.tsx\` — atualizado.

\- \`public/images/\` — inclusão dos recursos visuais.

**\*\*Implementações realizadas:\*\***

\- Criação do componente reutilizável NFTCard.

\- Integração dos três primeiros NFTs ao catálogo.

\- Exibição individual de imagem, nome e preço em ETH.

\- Aplicação de fundo visual compartilhado entre os cards.

\- Organização dos cards em grade responsiva.

\- Preservação das categorias, redes e faixa de preços.

\- Remoção da área provisória que ocupava o catálogo.

**\*\*NFTs integrados:\*\***

\- Emerald Ape #042 — 1.19 ETH.

\- Sage Nomad #009 — 1.69 ETH.

\- Neon Vessel #552 — 1.99 ETH.

**\*\*Problema identificado:\*\***

O componente NFTCard havia sido criado, mas o NFTCatalog

ainda apresentava o retângulo provisório, sem importar

nem renderizar os cards.

**\*\*Correção aplicada:\*\***

\- Importação do componente NFTCard no NFTCatalog.

\- Criação da lista inicial de NFTs.

\- Renderização dos cards por meio de \`nfts.map()\`.

\- Substituição da área provisória pela grade de NFTs.

**\*\*Decisões técnicas:\*\***

\- Manter imagem, nome e preço como propriedades do componente.

\- Reutilizar a estrutura visual entre diferentes NFTs.

\- Utilizar imagens locais da pasta \`public/images\`.

\- Preservar os filtros como elementos estáticos nesta etapa.

\- Preparar os cards para futura navegação à página de detalhes.

**\*\*Validação:\*\***

\- Exibição visual dos três cards confirmada pelo desenvolvedor.

\- Build de produção após os últimos ajustes: confirmação pendente.

**\*\*Situação:\*\*** Implementação visual aprovada;

validação final do build pendente.

**\*\*Pendências:\*\***

\- Confirmar o build de produção.

\- Refinar proporções e espaçamentos conforme o Figma.

\- Implementar navegação para detalhes dos NFTs.

\- Integrar dados dinâmicos e funcionalidades do catálogo.

**---**

**## M03 — Etapa 07: Refinamento visual dos cards de NFTs**

**\*\*Objetivo:\*\***

Aproximar a apresentação dos cards do protótipo original

do Figma e implementar a exibição de preço promocional.

**\*\*Arquivos modificados:\*\***

\- \`src/components/marketplace/NFTCard.tsx\`

\- \`src/components/marketplace/NFTCatalog.tsx\`

**\*\*Alterações realizadas:\*\***

\- Redução das margens internas do fundo dos cards.

\- Ajuste dos cantos arredondados das imagens.

\- Refinamento dos espaçamentos entre imagem, nome e preço.

\- Ajuste da tipografia dos nomes e valores.

\- Inclusão da propriedade opcional \`oldPrice\`.

\- Exibição do preço anterior tachado quando disponível.

**\*\*NFT com preço promocional:\*\***

\- Neon Vessel #552

\- Preço atual: 1.99 ETH

\- Preço anterior: 2.29 ETH

**\*\*Validação:\*\***

\- Compilação de produção executada com \`npm.cmd run build\`.

\- Resultado informado pelo desenvolvedor: sem erros.

**\*\*Situação:\*\*** APROVADO.

**\*\*Próxima etapa:\*\***

M03 — Etapa 08: Refinamento do cabeçalho do catálogo,

abas de navegação e controle de ordenação conforme o Figma.

**---**

**## M03 — Etapa 08: Cabeçalho e ordenação do catálogo**

**\*\*Objetivo:\*\***

Aproximar o cabeçalho do catálogo do protótipo Figma,

implementando abas de navegação e ordenação dos NFTs.

**\*\*Arquivo modificado:\*\***

\- \`src/components/marketplace/NFTCatalog.tsx\`

**\*\*Implementações realizadas:\*\***

\- Inclusão das abas "Todos os NFTs", "Novos lançamentos" e "Em alta".

\- Controle da aba selecionada com React useState.

\- Destaque visual da aba ativa.

\- Implementação do seletor "Ordenar por".

\- Ordenação funcional por menor e maior preço.

\- Estado vazio para coleções ainda sem dados classificados.

\- Preservação dos três NFTs e dos preços promocionais.

\- Preservação dos filtros laterais existentes.

\- Inclusão de atributos de acessibilidade nas abas.

**\*\*Decisões técnicas:\*\***

\- Manter os dados iniciais locais até a integração com a API.

\- Não inventar classificações de lançamentos ou tendências.

\- Ordenar uma cópia da lista para preservar os dados originais.

\- Utilizar componentes React e Tailwind CSS.

**\*\*Validação:\*\***

\- Comando: \`npm.cmd run build\`.

\- Resultado informado pelo desenvolvedor: compilação sem erros.

**\*\*Situação:\*\*** APROVADO.

**\*\*Pendências:\*\***

\- Integrar dados reais às abas.

\- Implementar filtros funcionais.

\- Refinar a barra lateral conforme o Figma.

\- Validar responsividade e acessibilidade detalhadamente.

**\*\*Próxima etapa:\*\***

M03 — Etapa 09: Refinamento visual da barra lateral

de filtros conforme o Figma.

**---**

**## M03 — Etapa 09: Refinamento da barra lateral de filtros**

**\*\*Objetivo:\*\***

Aproximar a barra lateral do catálogo KURIO do

protótipo original desenvolvido no Figma.

**\*\*Arquivo modificado:\*\***

\- \`src/components/marketplace/NFTCatalog.tsx\`

**\*\*Alterações realizadas:\*\***

\- Substituição do título "Filtros" por "Coleções".

\- Remoção do cartão externo com bordas e fundo.

\- Redução da largura da barra lateral de 260px para 220px.

\- Ajuste dos espaçamentos entre categorias e redes.

\- Refinamento das cores e da tipografia.

\- Inclusão de indicador visual para a faixa de preços.

\- Preservação das contagens das categorias e redes.

\- Preservação das abas e da ordenação funcional.

\- Preservação dos três NFTs e dos preços promocionais.

**\*\*Decisões técnicas:\*\***

\- Manter a faixa de preços apenas visual nesta etapa.

\- Não implementar filtros sem os dados necessários.

\- Preservar a estrutura React, TypeScript e Tailwind CSS.

\- Manter o layout responsivo.

**\*\*Validação:\*\***

\- Inspeção visual realizada pelo desenvolvedor.

\- Comando: \`npm.cmd run build\`.

\- Resultado informado pelo desenvolvedor: sem erros.

**\*\*Situação:\*\*** APROVADO.

**\*\*Próxima etapa:\*\***

M03 — Etapa 10: Implementação funcional dos filtros

do catálogo, utilizando os dados disponíveis.

**---**

**## M03 — Etapa 10: Filtros funcionais do catálogo (em andamento)**

**### Etapas 10.1 a 10.4 — Filtro por categoria**

**\*\*Objetivo:\*\***

Implementar a primeira funcionalidade real de filtragem

dos NFTs no Marketplace KURIO.

**\*\*Arquivo modificado:\*\***

\- \`src/components/marketplace/NFTCatalog.tsx\`

**\*\*Implementações realizadas:\*\***

\- Inclusão dos campos \`category\` e \`network\` nos três NFTs.

\- Definição provisória da categoria "Arte digital".

\- Definição provisória da rede "Ethereum".

\- Criação do estado \`selectedCategory\` com React useState.

\- Implementação da seleção de categorias por clique.

\- Destaque visual da categoria selecionada.

\- Implementação do botão "Limpar categoria".

\- Filtragem dos NFTs pela categoria selecionada.

\- Exibição de mensagem quando não houver resultados.

\- Preservação das abas e da ordenação por preço.

**\*\*Decisões técnicas:\*\***

\- Os dados de categoria e rede são provisórios.

\- As contagens da barra lateral permanecem ilustrativas.

\- Os filtros por rede e preço serão implementados separadamente.

\- Os dados originais dos NFTs não são modificados.

**\*\*Validações:\*\***

\- Teste da categoria "Fotografia": aprovado.

\- Teste do botão "Limpar categoria": aprovado.

\- Compilação com \`npm.cmd run build\`: sem erros,

  conforme confirmação do desenvolvedor.

**\*\*Situação:\*\*** FILTRO POR CATEGORIA APROVADO.

**\*\*Próxima etapa:\*\***

M03 — Etapa 10.6: Implementação do filtro

funcional por rede blockchain.

**## M03 — Etapa 10.6 a 10.8 | Filtro por rede blockchain**

**\*\*Status:\*\*** Concluído e validado.

**### Implementações**

\- Adicionado estado \`selectedNetwork\` para controlar a rede selecionada.

\- Implementada filtragem funcional por Ethereum, Polygon e Solana.

\- Integrados os filtros de categoria e rede blockchain.

\- Implementada seleção e desmarcação das redes.

\- Adicionados os controles "Limpar rede" e "Limpar todos os filtros".

\- Preservadas as funcionalidades de ordenação e navegação por abas.

\- Corrigidos os avisos de variáveis não utilizadas no componente.

**### Validação funcional**

\- Seleção da rede Polygon: catálogo sem resultados, conforme os dados provisórios.

\- Limpeza do filtro: os três NFTs voltam a aparecer.

\- Teste funcional realizado com sucesso.

**### Validação técnica**

\- Comando executado: \`npm.cmd run build\`

\- Resultado informado: compilação concluída sem erros.

**### Observações**

\- Os três NFTs iniciais pertencem provisoriamente à rede Ethereum.

\- As contagens exibidas nos filtros são ilustrativas, conforme o protótipo.

\- O filtro por faixa de preços ainda não foi implementado.

\- As abas "Novos lançamentos" e "Em alta" aguardam dados específicos.

**---**

**## M03 — Etapa 11 | Filtro de preço dos NFTs**

**\*\*Status:\*\*** Homologado pelo usuário em 15/10/2026.

**### Objetivo**

Implementar o filtro de preço máximo no catálogo de NFTs, mantendo a integração com os filtros de categoria, rede blockchain e ordenação.

**### Implementação**

1\. Criadas as constantes \`MIN_PRICE\`, \`MAX_PRICE\` e \`PRICE_STEP\`.

2\. Implementado o estado React \`maxPrice\`, com valor inicial de 12,30 ETH.

3\. Substituído o indicador visual estático por um controle deslizante funcional (\`input type="range"\`).

4\. Integrado o preço máximo à filtragem dos NFTs.

5\. Implementada a atualização do catálogo conforme a movimentação do slider.

6\. Adicionada a exibição dinâmica do preço máximo selecionado.

7\. Implementado o botão **\*\*Limpar preço\*\***.

8\. Atualizado o botão **\*\*Limpar todos os filtros\*\*** para restaurar categoria, rede e preço.

9\. Preservadas as funcionalidades existentes de ordenação e navegação entre abas.

**### Problema identificado**

O TypeScript e o ESLint apresentaram avisos de variável não utilizada após a criação inicial do estado \`maxPrice\`.

**### Correção aplicada**

O estado foi conectado ao filtro de NFTs e ao controle deslizante, eliminando a condição que provocava os avisos de variável não utilizada.

**### Validação**

\- Usuário confirmou que a implementação ficou correta.

\- Funcionamento visual e funcional homologado pelo usuário.

\- Resultado dos comandos \`npm.cmd run build\` e \`npm.cmd run lint\`: não informado separadamente.

**### Arquivo atualizado**

\`src/components/marketplace/NFTCatalog.tsx\`

**### Próxima etapa**

M03 — Etapa 12: completar o catálogo inicial com os nove NFTs previstos no Figma, utilizando as imagens originais disponíveis.

**---**

**## M03 — Etapa 12 | Catálogo com nove NFTs**

**\*\*Data:\*\*** 15/10/2026  

**\*\*Status:\*\*** Homologado pelo usuário.

**### Objetivo**

Completar as nove posições de NFTs da página inicial, seguindo a estrutura original do Figma.

**### Implementações**

1\. Consultada a grade original de NFTs no Figma.

2\. Identificadas nove posições distribuídas em três linhas.

3\. Confirmado o reaproveitamento de imagens entre diferentes NFTs.

4\. Extraída a arte original do macaco dourado com fones de ouvido.

5\. Adicionado o arquivo \`golden-beat-207.png\` em \`public/images/\`.

6\. Ampliado o catálogo de três para nove posições.

7\. Preservados os nomes e preços identificados no Figma.

8\. Criada a interface \`CatalogNFT\` para tipagem dos dados.

9\. Criado o componente \`PendingNFTCard\` para a posição sem nome ou preço definidos.

10\. Adaptados os filtros e a ordenação para lidar com preços indisponíveis.

11\. Preservados os filtros de categoria, rede blockchain e preço máximo.

12\. Mantida a reutilização do componente \`NFTCard\`.

**### Otimização de imagens**

As nove posições utilizam quatro artes diferentes, evitando duplicação desnecessária de arquivos.

**### Validação**

\- Código atualizado e salvo no VS Code.

\- Build executado com sucesso.

\- ESLint executado com sucesso.

\- Aplicação iniciada e testada no navegador.

\- Funcionalidades aprovadas pelo usuário.

**### Arquivos envolvidos**

\- \`src/components/marketplace/NFTCatalog.tsx\`

\- \`public/images/golden-beat-207.png\`

**### Próxima etapa**

M03 — Etapa 13: implementar a paginação do catálogo conforme o Figma.

**---**

**## M03 — Etapa 13 | Paginação do catálogo NFT**

**\*\*Data:\*\*** 15/10/2026  

**\*\*Status:\*\*** Homologado pelo usuário.

**### Objetivo**

Implementar a paginação do catálogo KURIO, mantendo a

compatibilidade com filtros, ordenação e estrutura visual

do Figma.

**### Implementações**

1\. Definido o limite de nove NFTs por página.

2\. Criado o estado \`currentPage\` para controlar a navegação.

3\. Implementado o cálculo dinâmico de \`totalPages\`.

4\. Adicionado \`safeCurrentPage\` para impedir páginas inválidas.

5\. Implementada a seleção dos NFTs por página com \`slice()\`.

6\. Criados os botões de página anterior e próxima.

7\. Implementados os botões numéricos de navegação.

8\. Adicionada identificação visual da página ativa.

9\. Configurados estados desabilitados para navegação indisponível.

10\. Implementado o retorno automático à primeira página

    após alterações de filtros, abas ou ordenação.

11\. Adicionado indicador de página e quantidade de resultados.

12\. Preservados os nove NFTs cadastrados anteriormente.

13\. Mantidos os filtros de categoria, rede blockchain e preço.

14\. Preservada a ordenação por menor e maior preço.

15\. Adicionados atributos de acessibilidade à paginação.

**### Comportamento atual**

O catálogo possui nove posições cadastradas e exibe

uma página de resultados.

A navegação entre páginas diferentes está preparada,

mas depende da inclusão de novos NFTs.

**### Validação**

\- Código salvo no VS Code.

\- \`npm.cmd run build\` executado com sucesso.

\- \`npm.cmd run lint\` executado com sucesso.

\- Paginação verificada no navegador.

\- Filtros e ordenação testados.

\- Implementação aprovada pelo usuário.

**### Arquivo atualizado**

\- \`src/components/marketplace/NFTCatalog.tsx\`

**### Próxima etapa**

M03 — Etapa 14: revisar a fidelidade visual do catálogo

em relação ao Figma e identificar os ajustes necessários.

**## M03 — Etapa 14.3 | Enquadramento e zoom dos NFTs**

**\*\*Status:\*\*** Homologada pelo usuário

\- Configurados enquadramentos individuais no NFTCatalog.tsx.

\- Identificada diferença de comportamento entre NFTCard e PendingNFTCard.

\- Corrigido o NFTCard.tsx para aplicar zoom suave no hover.

\- Preservados filtros, ordenação e paginação.

\- Build, lint e teste visual confirmados pelo usuário.

**## M03 — Etapa 14.4 | Espaçamento vertical do catálogo**

**\*\*Status:\*\*** Homologada pelo usuário

\- Ajustado o grid do NFTCatalog.tsx.

\- Espaçamento horizontal preservado em 24 px.

\- Espaçamento vertical alterado para 64 px.

\- Preservados zoom, filtros, ordenação e paginação.

\- Build, lint e teste visual confirmados pelo usuário.

**## M03 — Etapa 14.5 | Revisão final do catálogo e responsividade**

**\*\*Data:\*\*** 15/10/2026  

**\*\*Status:\*\*** Concluída — revisão visual aprovada  

**\*\*Projeto:\*\*** KURIO — Frontend Challenge

**### 1. Objetivo**

Realizar a revisão final do catálogo de NFTs, verificando a apresentação visual nas versões desktop e mobile, antes de avançar para o desenvolvimento da página de detalhes dos NFTs.

**### 2. Validação desktop**

Foi analisada uma captura completa da página inicial do KURIO.

**\*\*Itens verificados:\*\***

\- Organização do catálogo em três colunas.

\- Exibição das nove posições de NFTs.

\- Alinhamento da barra lateral de filtros.

\- Espaçamento horizontal de 24 px e vertical de 64 px entre os cards.

\- Enquadramento individual das imagens.

\- Apresentação dos nomes e preços em ETH.

\- Posicionamento da paginação abaixo do catálogo.

\- Integração visual entre cabeçalho, hero, catálogo e rodapé.

**\*\*Resultado:\*\*** nenhum problema evidente de alinhamento ou transbordamento identificado na captura desktop.

**### 3. Validação mobile — 390 px**

Foi analisada uma captura completa da página na largura de 390 px, utilizando o modo responsivo do navegador.

**\*\*Itens verificados:\*\***

\- Cabeçalho adaptado para telas pequenas.

\- Hero organizado verticalmente.

\- Título, descrição e botão de exploração visíveis.

\- Imagem principal redimensionada.

\- Filtros organizados antes dos resultados.

\- Catálogo apresentado em coluna única.

\- Imagens dos NFTs ajustadas à largura disponível.

\- Paginação e rodapé visíveis.

\- Ausência de transbordamento horizontal aparente.

**\*\*Resultado:\*\*** layout mobile aprovado visualmente na largura de 390 px.

**### 4. Funcionalidades preservadas**

A revisão não exigiu modificações adicionais no código.

Permanecem as funcionalidades implementadas e homologadas anteriormente:

\- Filtros por categoria, rede blockchain e preço máximo.

\- Ordenação por preço crescente e decrescente.

\- Limpeza individual e geral dos filtros.

\- Paginação dinâmica.

\- Enquadramentos individuais das artes.

\- Efeito de zoom suave ao passar o mouse.

\- Tratamento visual de NFT sem informações comerciais disponíveis.

**### 5. Melhorias futuras identificadas**

\- Avaliar um painel recolhível de filtros na versão mobile.

\- Substituir imagens reutilizadas por artes individuais quando os arquivos estiverem disponíveis.

\- Integrar dados reais de NFTs e categorias futuramente.

\- Realizar testes adicionais em outras larguras de tela.

Esses itens não impedem o encerramento da etapa visual atual.

**### 6. Homologação**

**\*\*Resultado final:\*\*** M03 — Catálogo de NFTs concluído e aprovado visualmente nas versões desktop e mobile de 390 px.

A revisão complementa os testes de build, lint e funcionalidades homologados nas etapas anteriores. Não foram executados novos testes automatizados nesta etapa.

**---**

**## Próximo módulo — M04 | Página de detalhes do NFT**

**\*\*Status:\*\*** Planejado — desenvolvimento ainda não iniciado.

**\*\*Objetivo:\*\*** implementar a página individual de um NFT, respeitando o layout do Figma e a arquitetura existente do projeto.

**\*\*Diretrizes:\*\***

\- Reutilizar os componentes já desenvolvidos.

\- Preservar React, TypeScript, Vite e Tailwind CSS.

\- Utilizar a rota \`/nft/$nftId\` já prevista no roteador.

\- Preparar a interface para integração com os dados do marketplace.

\- Implementar em etapas pequenas, com testes e homologação antes de avançar.

**\*\*Encerramento:\*\*** M03 finalizado. M04 autorizado para planejamento da primeira etapa.

**---**

**## M04 — NFT em destaque | Concluído**

**\*\*Status:\*\*** Homologado visualmente.

**### Implementações**

\- Criado o componente \`FeaturedNFT.tsx\`.

\- Integrado o banner de NFT em destaque abaixo dos filtros do catálogo.

\- Ajustada a largura da barra lateral de 220 px para 310 px, aproximando as proporções do Figma.

\- Mantida a adaptação da barra lateral para dispositivos móveis.

**### Validações**

\- Build e lint aprovados conforme confirmação do desenvolvedor.

\- Layout desktop revisado por captura de tela.

\- Banner, filtros e cards alinhados visualmente.

**### Observações**

\- A imagem utilizada no destaque poderá ser substituída posteriormente pela arte específica do Figma.

\- Catálogo, filtros e paginação existentes foram preservados.

**---**

**## M05 — Banners promocionais | Concluído**

**\*\*Status:\*\*** Homologado visualmente no desktop.

**### Implementações**

\- Criado o componente \`PromoBanners.tsx\`.

\- Integrados dois banners abaixo do catálogo:

  - Limited-edition genesis drops.

  - Curated digital art & much more.

\- Substituídas as imagens provisórias pelos arquivos exportados do Figma:

  - \`genesis-drops.png\`

  - \`curated-digital-art.png\`

\- Implementado layout responsivo com banners lado a lado no desktop e empilhados no mobile.

\- Adicionados botões de navegação para o catálogo.

**### Validações**

\- Build e lint aprovados conforme confirmação do desenvolvedor.

\- Página completa revisada por captura de tela.

\- Proporções, imagens e posicionamento aprovados visualmente no desktop.

**### Pendências**

\- Conferência visual específica da versão mobile.

\- Verificação funcional final dos links promocionais.

**---**

**## Próximas etapas**

**### M06 — Diário da Cunhagem**

**\*\*Status:\*\*** Pendente.

\- Preparar as quatro imagens dos artigos.

\- Criar o componente \`BlogSection.tsx\`.

\- Integrar a seção à Home.

\- Validar desktop, mobile, build e lint.

**### M07 — Rodapé completo**

**\*\*Status:\*\*** Pendente.

\- Implementar a estrutura do rodapé conforme o Figma.

\- Incluir newsletter, links, informações e demais elementos previstos no design.

**### M08 — Página de detalhes do NFT**

**\*\*Status:\*\*** Pendente.

\- Implementar a página conforme o Figma.

\- Integrar a navegação a partir dos cards.

\- Validar as funcionalidades previstas no desafio.

**---**

**\*\*Diretriz de desenvolvimento:\*\*** preservar os módulos homologados, executar uma etapa por vez e atualizar este histórico a cada homologação.

**---**

**## M06 — Diário da Cunhagem | Homologação visual desktop**

**\*\*Status:\*\*** Aprovado visualmente no desktop.

**\*\*Data:\*\*** 15/10/2026.

**### Implementações**

\- Criado o componente \`BlogSection.tsx\`.

\- Integrada a seção à Home, abaixo dos banners promocionais.

\- Utilizadas as quatro imagens exportadas do Figma, na ordem original.

\- Implementados quatro cards editoriais com fundo marrom.

\- Centralizados o título e a descrição da seção.

\- Posicionados data e tempo de leitura abaixo das imagens.

\- Adicionados títulos, resumos e a indicação visual "Ler mais →".

\- Removido o botão geral "Explorar artigos".

\- Preservados os módulos anteriores.

**### Validações**

\- Build e lint aprovados conforme confirmação do desenvolvedor.

\- Captura de tela completa revisada.

\- Layout desktop aprovado visualmente.

**### Pendências**

\- Homologação visual mobile.

\- Implementação futura das páginas dos artigos, caso exigidas pelo escopo.

\- "Ler mais →" permanece apenas como indicação visual, sem navegação funcional.

**### Próximo módulo**

M07 — Rodapé completo conforme o Figma.

**---**

**## M07 — Rodapé completo | Homologação visual desktop**

**\*\*Status:\*\*** Aprovado visualmente no desktop.

**\*\*Data:\*\*** 16/10/2026.

**### Implementações**

\- Substituído o rodapé provisório pelo rodapé institucional.

\- Implementadas três áreas de benefícios do marketplace.

\- Criada a área visual de newsletter.

\- Adicionadas quatro colunas de informações e navegação.

\- Incluídos ícones sociais e informações sobre carteiras digitais.

\- Mantido o copyright da KURIO.

\- Preservados o cabeçalho, a navegação e os módulos anteriores.

\- Corrigidos três erros de importação de ícones do lucide-react.

**### Validações**

\- Layout desktop revisado por captura de tela.

\- Estrutura visual aprovada.

\- Build e lint: confirmar resultado final no terminal.

**### Pendências**

\- Homologação visual mobile.

\- Comparação final com o rodapé original do Figma.

\- Integração funcional da newsletter e dos links sociais.

**### Próxima etapa**

M07 — Conferência responsiva antes da homologação final.

**---**

**## M07 — Homologação responsiva**

**\*\*Data:\*\*** 16/10/2026  

**\*\*Status:\*\*** Aprovado visualmente em desktop e mobile (390 px).

**### Validação mobile**

\- Benefícios e ícones corretamente alinhados.

\- Newsletter adaptada à largura do dispositivo.

\- Links institucionais organizados verticalmente.

\- Identidade KURIO e copyright legíveis.

\- Nenhum corte ou transbordamento horizontal visível.

\- Módulos anteriores preservados.

**### Pendências funcionais**

\- Newsletter sem integração de envio.

\- Redes sociais sem destinos configurados.

\- Comparação final dos detalhes com o Figma.

\- Confirmação final de build e lint, caso ainda não executados após a correção dos ícones.

**### Próximo módulo**

M08 — Página de detalhes do NFT.

**## Homologação — Estrutura das nove páginas**

**\*\*Status:\*\*** Aprovado

**### Implementações**

\- Criação do componente reutilizável \`PageScaffold\`.

\- Criação das oito páginas provisórias.

\- Integração das nove páginas ao TanStack Router.

\- Reaproveitamento do \`MainLayout\`.

\- Preservação da Home anteriormente homologada.

**### Validações**

\- ESLint: aprovado.

\- Build de produção: aprovado.

\- Navegação pelas nove rotas: aprovada.

**### Próxima etapa**

M08 — Implementação visual e funcional da página

de detalhes do NFT, seguindo o Figma.

**### Observação**

As oito páginas adicionais possuem apenas a estrutura

inicial. Sua implementação definitiva permanece pendente.

**---**

**## M08 — Tela de Detalhes do NFT**

**\*\*Status:\*\*** HOMOLOGADO  

**\*\*Projeto:\*\*** KURIO — Jungle Gaming Frontend Challenge  

**\*\*Referência visual:\*\*** Figma — Detalhes do NFT

**### 1. Objetivo**

Implementar a segunda tela do marketplace, permitindo

consultar informações de NFTs por meio de rotas dinâmicas.

A implementação priorizou fidelidade ao Figma,

reaproveitamento de componentes e manutenção da

arquitetura existente.

**### 2. Decisões arquiteturais**

**\*\*DA-01 — Preparação antecipada das nove rotas\*\***

Por sugestão durante o desenvolvimento, todas as nove

rotas foram estruturadas e testadas antes da implementação

individual das telas.

Motivação:

\- Antecipar possíveis problemas de navegação.

\- Facilitar a organização do projeto.

\- Reduzir retrabalho nas próximas etapas.

\- Reutilizar o layout principal.

Resultado:

\- Nove rotas funcionando.

\- Páginas individuais preparadas.

\- MainLayout compartilhado.

**\*\*DA-02 — Centralização dos dados dos NFTs\*\***

Os dados anteriormente definidos no NFTCatalog foram

transferidos para \`src/data/nfts.ts\`.

Motivação:

\- Evitar duplicação de informações.

\- Compartilhar dados entre catálogo, detalhes e carrinho.

\- Facilitar futuras integrações com APIs.

Resultado:

\- Interface NFT compartilhada.

\- Lista centralizada de nove NFTs.

\- Função getNFTById() para consulta por identificador.

\- Catálogo original preservado.

**\*\*DA-03 — Componentização da tela de detalhes\*\***

As seções inferiores foram separadas em componentes

independentes para manter o código organizado.

Componentes:

\- NFTInformationTabs.tsx

\- RelatedNFTs.tsx

Motivação:

\- Reduzir a complexidade da página principal.

\- Facilitar manutenção e testes.

\- Reutilizar componentes existentes.

**### 3. Implementações realizadas**

**\*\*NFTDetailsPage.tsx\*\***

\- Consulta de NFT pelo parâmetro da rota.

\- Tratamento de NFT não encontrado.

\- Galeria com quatro miniaturas.

\- Imagem principal.

\- Nome e preço.

\- Informações da edição.

\- Avaliações ilustrativas conforme o Figma.

\- Controle visual de quantidade.

\- Botão Favoritar com estado local.

\- Botão Comprar preparado para integração futura.

\- Metadados disponíveis.

\- Compartilhamento.

**\*\*NFTInformationTabs.tsx\*\***

\- Aba Detalhes do NFT.

\- Aba Avaliações de colecionadores.

\- Alternância interativa.

\- Conteúdo editorial do Emerald Ape conforme o Figma.

\- Tratamento de informações indisponíveis.

**\*\*RelatedNFTs.tsx\*\***

\- Reutilização dos dados centralizados.

\- Reutilização do NFTCard.

\- Exibição de cinco NFTs por grupo.

\- Paginação por indicadores.

\- Navegação para detalhes de outros NFTs.

\- Exclusão do NFT atualmente selecionado.

**### 4. Testes de homologação**

\- [x] Navegação entre abas funcionando.

\- [x] Cards relacionados abrindo o NFT correspondente.

\- [x] ESLint aprovado.

\- [x] Build de produção aprovado.

\- [x] Comparação visual com a referência do Figma.

**### 5. Limitações e melhorias futuras**

\- Ajustar proporções e espaçamentos finos conforme o Figma.

\- Refinar a ordem das obras relacionadas.

\- Substituir miniaturas repetidas por imagens distintas,

  quando disponíveis.

\- Integrar avaliações reais quando houver fonte de dados.

\- Integrar botão Comprar ao estado compartilhado do carrinho.

\- Definir regras de quantidade conforme disponibilidade.

\- Validar a experiência mobile antes da homologação

  responsiva definitiva.

\- Integrar favoritos persistentes futuramente.

**### 6. Resultado**

Segunda tela do KURIO implementada e homologada

funcionalmente nesta versão.

A interface principal está pronta para evolução.

As limitações conhecidas foram documentadas sem

comprometer as funcionalidades já aprovadas.

**### 7. Próximo módulo**

**\*\*M09 — Carrinho de compras\*\***

Prioridades:

1\. Criar estado compartilhado do carrinho.

2\. Integrar a ação Comprar.

3\. Implementar a interface conforme o Figma.

4\. Atualizar o contador do cabeçalho.

5\. Validar navegação, responsividade, lint e build.

**---**

M09 — Carrinho de compras | Etapas 09.1 e 09.2

Data: 16/10/2026

Projeto: KURIO — Jungle Gaming Frontend Challenge

Situação: Etapas M09.1 e M09.2 homologadas pelo desenvolvedor. M09 em andamento.

Objetivo

Iniciei a infraestrutura do carrinho de compras para compartilhar os NFTs selecionados entre as páginas do marketplace, preservando as telas já homologadas e preparando a futura implementação da interface conforme o Figma.

M09.1 — Estado compartilhado do carrinho

Arquivos criados ou organizados:

\- src/contexts/cart-context.ts — definição do contexto e das interfaces TypeScript.

\- src/contexts/CartContext.tsx — implementação do componente CartProvider.

\- src/hooks/useCart.ts — hook personalizado para acessar o contexto.

Implementações:

\- Estruturei o estado do carrinho por identificador do NFT e quantidade.

\- Preparei as operações de adicionar itens, atualizar quantidades, remover itens e limpar o carrinho.

\- Implementei o cálculo derivado da quantidade total de itens e do subtotal em ETH.

\- Utilizei getNFTById() e a fonte centralizada src/data/nfts.ts para recuperar os dados comerciais dos NFTs, sem confiar em preços armazenados no navegador.

\- Adicionei persistência local com localStorage, usando a chave kurio-cart-v1.

\- Incluí validações para descartar registros inválidos e NFTs indisponíveis na recuperação do armazenamento.

Problema identificado e correção:

O ESLint apontou a regra react-refresh/only-export-components no arquivo CartContext.tsx, pois o mesmo módulo exportava o componente provedor e o hook useCart.

Para respeitar o React Fast Refresh sem desabilitar a regra, separei as responsabilidades em três arquivos: definições do contexto, componente provedor e hook personalizado. Essa organização também facilita a manutenção e a reutilização do código.

M09.2 — Integração global do CartProvider

Arquivo atualizado: src/main.tsx.

\- Integrei o CartProvider ao ponto de entrada da aplicação.

\- Mantive o QueryClientProvider, o RouterProvider do TanStack Router e o React.StrictMode.

\- Disponibilizei o contexto do carrinho para as rotas da aplicação, sem alterar os componentes visuais das páginas já aprovadas.

Validação e homologação

\- A correção estrutural do M09.1 foi confirmada como concluída pelo desenvolvedor.

\- A integração do M09.2 foi confirmada como concluída pelo desenvolvedor.

\- Os comandos solicitados para verificação foram npm.cmd run lint e npm.cmd run build.

\- Os resultados detalhados do terminal não foram anexados a este registro; portanto, não atribuo números, tempos ou mensagens de saída não apresentados.

Resultado: infraestrutura compartilhada do carrinho preparada e etapas M09.1/M09.2 homologadas pelo desenvolvedor.

Limitações e próximas etapas

\- M09.3: conectar o botão Comprar da NFTDetailsPage.tsx ao hook useCart, respeitando a quantidade selecionada.

\- Implementar a interface de CartPage.tsx de acordo com o frame “Desktop / Carrinho de NFTs” no Figma.

\- Integrar o contador real de itens ao cabeçalho.

\- Definir e validar o comportamento de promoções, taxa de rede e continuidade para checkout; não considerar essas regras implementadas nesta etapa.

\- Validar a navegação, a responsividade, os estados vazios e os resultados de lint e build após cada integração.

Próxima etapa autorizada para desenvolvimento: M09.3 — integração da ação Comprar ao carrinho.



**---**



**## M09.3 — Integração da compra com o carrinho**



**\*\*Status:\*\*** Homologado.



**### Implementação**



\- Integrei a página \`NFTDetailsPage.tsx\` ao contexto global do carrinho utilizando o hook \`useCart()\`.

\- Configurei o botão **\*\*Comprar\*\*** para adicionar o NFT selecionado, respeitando a quantidade escolhida.

\- Implementei a navegação automática para \`/cart\` após adicionar o produto.

\- Mantive o bloqueio de compra para NFTs sem preço disponível.

\- Preservei as funcionalidades e a estrutura visual da página de detalhes.



**### Ajustes e homologação**



Durante a integração, foi identificado um erro na implementação inicial. Substituí o arquivo pelo código revisado e realizei nova validação.



**\*\*Resultado:\*\*** correção confirmada e etapa aprovada.



**---**



**## M09.4 — Interface funcional do carrinho**



**\*\*Status:\*\*** Homologado.



**### Implementação**



Substituí a página provisória \`CartPage.tsx\` por uma interface funcional, baseada na referência visual do Figma.



Funcionalidades implementadas:



\- Listagem dos NFTs adicionados ao carrinho.

\- Exibição de imagem, nome, rede e preço unitário.

\- Controle de quantidade por produto.

\- Remoção individual de NFTs.

\- Atualização automática do subtotal de cada item.

\- Cálculo do subtotal geral e do total estimado.

\- Estado vazio com navegação para o marketplace.

\- Campo visual para código promocional, sem aplicação de descontos fictícios.

\- Layout responsivo para desktop e dispositivos móveis.

\- Integração com o contexto global e persistência dos itens no armazenamento local.



**### Limitações identificadas**



\- A taxa de rede de 0.016 ETH é uma referência visual do Figma, não uma estimativa obtida da blockchain.

\- O campo promocional ainda não possui integração com regras comerciais.

\- A conexão de carteira e o processamento da compra serão implementados em etapas posteriores.

\- O botão de finalização direciona provisoriamente para \`/checkout\`.



**### Homologação**



A implementação foi apresentada e aprovada após os testes realizados no ambiente local.



**\*\*Resultado:\*\*** M09.4 homologado.



**---**



**## Próxima etapa — M09.5**



**\*\*Contador dinâmico do carrinho no cabeçalho.\*\***



Objetivo: integrar o componente de navegação ao \`useCart()\`, exibindo a quantidade real de unidades selecionadas e atualizando o indicador automaticamente, sem alterar a identidade visual homologada.



**\*\*Status:\*\*** Pendente de implementação.



**---**



**---**



**## M09.5 — Contador dinâmico e navegação dos NFTs**



**\*\*Status:\*\*** Homologado.



**### Implementação**



\- Integrei o componente \`MainLayout.tsx\` ao contexto global

  do carrinho por meio do hook \`useCart()\`.

\- Substituí o contador fixo do cabeçalho pelo valor dinâmico

  \`itemCount\`.

\- Mantive a identidade visual do cabeçalho, o menu responsivo

  e o rodapé institucional.

\- Atualizei o texto acessível do ícone do carrinho para

  informar a quantidade de edições selecionadas.



**### Correção identificada durante os testes**



Durante a homologação, identifiquei que os NFTs exibidos

na página inicial não permitiam acessar seus detalhes.



Analisei os componentes \`HomePage.tsx\`, \`NFTCatalog.tsx\`

e \`NFTCard.tsx\`, localizando a ausência de navegação

no componente de card.



Corrigi o \`NFTCard.tsx\` utilizando o componente \`Link\`

do TanStack Router, permitindo abrir a página de detalhes

ao clicar na imagem ou no nome do NFT.



A correção preservou os filtros, a ordenação, a paginação

e a identidade visual do catálogo.



**### Testes e homologação**



\- Navegação do catálogo para os detalhes: aprovada.

\- Adição de NFTs ao carrinho: aprovada.

\- Seleção e atualização de quantidades: aprovada.

\- Atualização dinâmica do contador: aprovada.

\- Integração entre detalhes, carrinho e cabeçalho: aprovada.



**\*\*Resultado:\*\*** M09.5 homologado após testes funcionais.



**### Próxima etapa**



M10 — Implementação da página de checkout,

seguindo a referência visual do Figma.



**\*\*Status:\*\*** Pendente.



**---**



**## M10 — Checkout e pagamento**



**\*\*Status:\*\*** Homologado.



**### Implementação**

\- Substituí a página provisória de Checkout por uma interface funcional.

\- Integrei os NFTs, as quantidades e os valores ao contexto global do carrinho.

\- Implementei o formulário do colecionador com validação de campos obrigatórios.

\- Adicionei a seleção de MetaMask, WalletConnect e Coinbase Wallet.

\- Implementei a validação do formato de endereço Ethereum.

\- Mantive a confirmação de pagamento bloqueada até existir integração blockchain real.

\- Adaptei a interface para desktop e dispositivos móveis.



**### Homologação**

\- Navegação do carrinho para o Checkout aprovada.

\- Resumo e cálculos da compra conferidos.

\- Seleção das três carteiras testada.

\- Validação de campos obrigatórios aprovada.

\- Endereços inválidos rejeitados.

\- Endereço Ethereum de exemplo aceito.

\- Responsividade mobile verificada.

\- Verificações técnicas confirmadas pelo desenvolvedor.



**### Próxima etapa**

M11 — Tela de confirmação da compra.



**## M11 — Tela de confirmação do pedido**



**\*\*Status:\*\*** Homologado em 16/10/2026.



**### Implementação**

\- Substituí a página provisória de confirmação por uma interface completa.

\- Utilizei o Figma como referência para o painel central e os detalhes do pedido.

\- Integrei a listagem de NFTs ao contexto global do carrinho.

\- Implementei quantidades, subtotais e total estimado.

\- Adicionei os estados informativos de transação pendente e carteira não conectada.

\- Mantive a arquitetura existente do layout compartilhado.

\- Implementei navegação para Checkout e página inicial.

\- Preparei a interface para futura integração blockchain.



**### Correções**

\- Removi o uso incorreto de MainLayout com children.

\- Ajustei o atributo alt das imagens para aceitar nomes nulos.



**### Homologação**

\- Interface desktop verificada.

\- Interface mobile verificada.

\- Responsividade aprovada.

\- Valores do pedido conferidos.

\- Navegação testada.

\- Lint e build confirmados pelo desenvolvedor.



**### Limitações conhecidas**

\- Nenhuma transação blockchain é executada.

\- Nenhum hash de transação é gerado.

\- A transferência de propriedade dos NFTs não é simulada como real.

\- A taxa de rede ainda é ilustrativa.



**### Próxima etapa**

M12 — Autenticação: Login e Cadastro.



**## M12 — Login**



**\*\*Status:\*\*** Homologado em 16/10/2026.



**### Implementação**

\- Substituí a página provisória por uma tela de login responsiva.

\- Segui as referências desktop e mobile do Figma.

\- Implementei campos de e-mail e senha com validação nativa.

\- Adicionei o controle para mostrar e ocultar a senha.

\- Implementei mensagens informativas para autenticação indisponível.

\- Preparei as opções Google, Facebook e recuperação de senha para futuras integrações.

\- Adicionei navegação para a página de cadastro.

\- Mantive o layout compartilhado do marketplace.



**### Ajustes e homologação**

\- Corrigi a sobreposição de textos na versão mobile.

\- Conferi visualmente as versões desktop e mobile.

\- Testei a validação de campos obrigatórios.

\- Testei o envio com e-mail e senha preenchidos.

\- Confirmei que o formulário não cria sessões fictícias.

\- Verifiquei as mensagens de indisponibilidade dos provedores externos.



**### Limitações conhecidas**

\- Autenticação real ainda não integrada.

\- Login social e recuperação de senha ainda indisponíveis.



**### Próxima etapa**

M13 — Cadastro de usuário.



**## M13 — Cadastro de usuário**



**\*\*Status:\*\*** Homologado em 16/10/2026.



**### Implementação**

\- Substituí a página provisória de cadastro por uma interface completa.

\- Segui as referências desktop e mobile do Figma.

\- Implementei os campos nome de usuário, e-mail, senha e confirmação de senha.

\- Adicionei validação de campos obrigatórios e formato de e-mail.

\- Implementei verificação de tamanho mínimo da senha.

\- Implementei comparação entre senha e confirmação.

\- Adicionei controles independentes para mostrar e ocultar as senhas.

\- Preparei os acessos por Google e Facebook para integração futura.

\- Implementei navegação para Login.

\- Mantive o layout compartilhado do KURIO.



**### Homologação**

\- Interface mobile aprovada visualmente.

\- Interface desktop aprovada visualmente.

\- Cadastro demonstrativo com senhas iguais validado.

\- Senhas diferentes rejeitadas corretamente.

\- Mensagens dos provedores externos verificadas.

\- Navegação para Login testada.



**### Limitações conhecidas**

\- Nenhuma conta real é criada.

\- Nenhuma senha é armazenada.

\- Autenticação e login social dependem de integração futura.



**### Próxima etapa**

M14 — Perfil do usuário.



**## M14 — Perfil do Colecionador**



**\*\*Status:\*\*** Homologado em 16/10/2026.



**### Implementação**

\- Substituí a página provisória pelo perfil do colecionador.

\- Segui a referência visual do Figma.

\- Implementei menu de navegação da conta.

\- Adicionei campos de identificação, e-mail, ENS e apelido da carteira.

\- Implementei seleção, prévia e remoção de avatar.

\- Adicionei validação de senha atual, nova senha e confirmação.

\- Implementei controles para mostrar e ocultar senhas.

\- Mantive a responsividade e o layout compartilhado.



**### Homologação**

\- Desktop e mobile aprovados visualmente.

\- Formulário de perfil validado.

\- Prévia e remoção do avatar testadas.

\- Senhas diferentes rejeitadas.

\- Senhas iguais validadas.

\- Mensagens informativas verificadas.



**### Limitações conhecidas**

\- Os dados não são persistidos.

\- Nenhuma senha real é alterada.

\- Não existe sessão autenticada.

\- Algumas seções do menu aguardam implementação.



**### Próxima etapa**

M15 — Gerenciamento de Carteiras.



**## M15 — Carteiras Digitais**



**\*\*Data:\*\*** 16/10/2026  

**\*\*Status:\*\*** Homologado funcionalmente.



**### Implementação**

\- Substituí a página provisória de carteiras.

\- Adaptei o layout à referência do Figma.

\- Mantive o menu lateral de gerenciamento da conta.

\- Implementei o formulário da carteira principal.

\- Adicionei seleção de rede e tipo de carteira.

\- Implementei validação de endereços Ethereum.

\- Adicionei a seção de carteira secundária.

\- Implementei as opções de adicionar, cancelar e utilizar a carteira principal como referência.

\- Mantive o layout responsivo.



**### Testes realizados**

\- Layout mobile aprovado.

\- Endereço Ethereum inválido rejeitado.

\- Endereço de teste válido aceito.

\- Mensagem de validação exibida corretamente.

\- Carteira secundária: adicionar e cancelar aprovados.

\- Nenhuma conexão ou transação real foi simulada.



**### Limitações conhecidas**

\- Não existe integração com provedores de carteiras.

\- Os dados das carteiras não são persistidos.

\- Nenhuma carteira real é conectada.

\- A autenticação permanece pendente de integração.



**### Verificação técnica**

\- Comandos executados: npm.cmd run lint e npm.cmd run build.

\- Resultado: confirmar ausência de erros no terminal antes da entrega.



**### Próxima etapa**

Revisão geral e preparação para entrega do desafio frontend KURIO.



**## M16 — Integração REST e revisão funcional (em andamento)**



**### Infraestrutura de API simulada**

\- Instalei e configurei o Mock Service Worker (MSW).

\- Inicializei o worker no ambiente de desenvolvimento.

\- Implementei os endpoints GET /api/health, GET /api/nfts e GET /api/nfts/:nftId.

\- Validei as respostas HTTP 200 para recursos existentes e HTTP 404 para NFTs inexistentes.

\- Configurei uma instância centralizada do Axios.

\- Criei o serviço REST de NFTs e os hooks do TanStack Query.



**### Integração do catálogo**

\- Substituí a leitura direta dos dados locais pela consulta à API simulada.

\- Preservei os nove NFTs, os filtros, a ordenação, as abas e a paginação existentes.

\- Adicionei estados de carregamento, erro e tentativa de recuperação.

\- Confirmei no DevTools a requisição GET /api/nfts com resposta HTTP 200.



**### Integração dos detalhes**

\- Integrei a página de detalhes ao endpoint GET /api/nfts/:nftId.

\- Adicionei tratamento para carregamento, falhas e NFTs inexistentes.

\- Preservei a galeria, a seleção de quantidade e a integração com o carrinho.

\- Validei a abertura de um NFT existente e o tratamento de um identificador inexistente.

\- Corrigi os erros de compilação identificados durante a integração.



**### Pendências**

\- Migrar filtros, ordenação e paginação para parâmetros de URL e consultas REST.

\- Implementar os fluxos simulados de autenticação, carrinho, pedidos e carteiras.

\- Integrar os eventos em tempo real exigidos pelo desafio.

\- Criar e executar testes E2E com Playwright.

\- Executar auditoria Lighthouse e preparar a publicação.



Status: M16 em andamento; integração REST de catálogo e detalhes homologada.



**### M16 — Etapas 22 a 25 | Catálogo integrado à API**



**\*\*Status:\*\*** Homologado



\- Configurei a validação dos parâmetros de busca da rota Home com TanStack Router.

\- Ampliei o endpoint \`GET /api/nfts\` no MSW para aceitar categoria, rede, preço máximo, ordenação, aba e paginação.

\- Atualizei o serviço Axios e os hooks TanStack Query para utilizar parâmetros tipados.

\- Integrei o componente \`NFTCatalog.tsx\` à API simulada, removendo a dependência de filtragem e paginação locais.

\- Sincronizei os filtros com a URL para permitir atualização, navegação e compartilhamento dos parâmetros.

\- Corrigi os erros de tipagem relacionados às propriedades \`category\` e \`network\`.

\- Ajustei as navegações com \`resetScroll: false\` para preservar a posição da tela ao utilizar os filtros.

\- Executei as verificações de lint e build durante a integração.

\- Validei o ajuste final no navegador e aprovei o comportamento do catálogo.



**\*\*Resultado:\*\*** Catálogo conectado à API REST simulada, com filtros e paginação funcionais e experiência de navegação preservada.



**## M16.26.7.3 — Navegação conforme autenticação**



**### Implementação**



Atualizei o componente \`src/components/layout/MainLayout.tsx\`

para adaptar os links de navegação ao estado de autenticação.



O cabeçalho, o menu móvel e o rodapé agora apresentam:



\- **\*\*Entrar\*\*** e **\*\*Criar conta\*\*** quando não existe sessão autenticada.

\- **\*\*Meu perfil\*\*** quando existe uma sessão autenticada.



Corrigi um problema no qual o botão de autenticação

desaparecia após o logout. A causa estava na renderização

condicional vinculada ao estado \`isPending\` da consulta

\`useAuthUser()\`.



A solução foi manter os links de autenticação renderizados,

utilizando os dados do usuário apenas para determinar

o texto e o destino de cada link.



Preservei a identidade visual do Figma, o contador do

carrinho, a navegação responsiva e o rodapé institucional.



**### Testes manuais realizados**



\- **\*\*Login:\*\*** aprovado. A conta de demonstração autenticou

  e abriu a página de perfil.

\- **\*\*Persistência da sessão:\*\*** aprovada. A autenticação

  permaneceu ativa após atualizar a página com F5.

\- **\*\*Logout:\*\*** aprovado. A sessão foi encerrada, ocorreu

  o redirecionamento para \`/login\` e o botão **\*\*Entrar\*\***

  voltou a aparecer.

\- **\*\*Proteção de \`/profile\`:\*\*** aprovada. O acesso direto

  sem autenticação redirecionou para \`/login\`.



**### Validações pendentes**



\- Testar o acesso direto a \`/wallets\` sem autenticação.

\- Confirmar os resultados de \`npm.cmd run lint\`

  e \`npm.cmd run build\` após a correção final.

\- Verificar visualmente os links de autenticação

  no menu móvel e no rodapé.



**### Situação**



Implementação funcional nos cenários manuais testados.

Homologação técnica completa ainda pendente.



**## M16.27 — Fluxo de pedidos demonstrativos**



**### M16.27.1 a M16.27.3 — Serviço e API de pedidos**



\- Criei o serviço REST \`order-service.ts\` com Axios e tipagem TypeScript.

\- Implementei endpoints MSW para criação e consulta de pedidos.

\- Adicionei persistência demonstrativa de pedidos no navegador.

\- Implementei chave de idempotência para reduzir o risco de pedidos duplicados.

\- Integrei os novos handlers à API simulada existente.

\- Preservei os endpoints de catálogo e autenticação.



**### M16.27.4 — Checkout funcional**



\- Conectei o checkout ao endpoint \`POST /api/orders\`.

\- Implementei envio dos dados do comprador e itens do carrinho.

\- Adicionei validação de endereço conforme a rede selecionada.

\- Implementei estado de carregamento e tratamento de erros.

\- Salvei o identificador do pedido na sessão do navegador.

\- Implementei navegação para \`/confirmation\` após o registro.

\- Mantive o layout visual previamente aprovado.



**### M16.27.5 — Confirmação vinculada ao pedido**



\- Conectei a confirmação ao endpoint \`GET /api/orders/:orderId\`.

\- Substituí os dados transitórios do carrinho pelos dados persistidos do pedido.

\- Passei a exibir identificador, status, itens, valores e carteira informada.

\- Preservei os estados de carregamento, erro e ausência de pedido.

\- Mantive o carrinho intacto após a criação do pedido.

\- Diferenciei o identificador interno do pedido de um hash blockchain.



**### Homologação**



\- Build do Vite concluído com sucesso.

\- Aviso não bloqueante de bundle superior a 500 KB identificado.

\- Navegação do checkout para a confirmação validada no navegador.

\- Consulta e exibição dos dados do pedido verificadas visualmente.

\- Pedido demonstrativo registrado com status \`pending\`.

\- Nenhuma cobrança ou transferência blockchain realizada.



**### Pendências**



\- Implementar atualização de status dos pedidos e eventos Socket.IO.

\- Adicionar testes automatizados de integração e Playwright E2E.

\- Validar o fluxo completo em cenários de erro e repetição de requisições.

\- Otimizar o tamanho dos bundles gerados.



**## M16.29 — Validação do checkout e build**



**### Resultados confirmados**

\- MSW interceptando GET /api/nfts (200 OK).

\- MSW interceptando POST /api/orders.

\- Validação de dados inválidos retornando 400 INVALID_COLLECTOR.

\- Pedido de teste registrado com sucesso.

\- Página de confirmação exibida.

\- Socket.IO: cliente conectado e acompanhando o pedido.

\- Socket.IO: reconexão e acompanhamento restabelecidos.

\- Build de produção concluído com sucesso.



**### Observações**

\- Aviso não bloqueante de chunk superior a 500 kB.

\- Mudança efetiva de status via Socket.IO ainda não homologada.

\- Revisão final das rotas e preparação da entrega pendentes.

\- Ambiente demonstrativo, sem transações blockchain reais.



**## M16.30 — Homologação do Socket.IO**



**### Teste aprovado**

\- Servidor Socket.IO iniciado na porta 3001.

\- Cliente conectado e inscrito no pedido.

\- Evento demonstrativo \`order.demo.update\` enviado.

\- Evento \`order.status.updated\` recebido pelo navegador.

\- Status recebido: \`confirmed\`.

\- Identificador do pedido preservado.



**### Limitação**

\- A atualização é demonstrativa.

\- O teste não comprova persistência do novo status.

\- Nenhuma transação blockchain real foi executada.



**### Resultado**

Comunicação de eventos em tempo real homologada.



**## M16.31 — Homologação de autenticação e carteiras**



**### Testes aprovados**

\- Login realizado com sucesso.

\- Cadastro de nova conta realizado com sucesso.

\- Página de perfil acessada corretamente.

\- Página de carteiras acessada após autenticação.

\- Opção "Igual à carteira principal" testada.

\- Mensagem demonstrativa exibida corretamente.



**### Limitações**

\- Nenhuma carteira blockchain real foi conectada.

\- Nenhuma transação financeira foi realizada.



**### Resultado**

Fluxos de autenticação e carteiras homologados

dentro do escopo demonstrativo.


---

## M16.32 — Testes automatizados E2E com Playwright

**Status:** Execuções realizadas e aprovadas, com nova execução integral pendente após ampliação da suíte.

### Ferramentas e configuração

- Framework: `@playwright/test`.
- Navegador de testes: Chromium.
- Projetos de execução: desktop e mobile, definidos em `playwright.config.ts`.
- Servidor local da aplicação: Vite, inicializado pelo Playwright conforme a configuração do projeto.
- Relatório HTML do Playwright e rastros (*traces*) em caso de falha.
- API simulada com Mock Service Worker (MSW), sem depender de pagamentos ou serviços blockchain reais.

### Arquivos de testes

| Arquivo | Cenários por projeto | Execuções desktop + mobile |
| --- | ---: | ---: |
| `tests/catalog.spec.ts` | 8 | 16 |
| `tests/cart.spec.ts` | 5 | 10 |
| `tests/checkout.spec.ts` | 3 | 6 |
| **Total atual** | **16** | **32** |

A contagem de **32** corresponde ao total esperado para a suíte atual, não a uma execução integral já homologada.

### Escopo validado

**Catálogo:** navegação e interações principais do marketplace, incluindo comportamentos do catálogo e acesso aos NFTs.

**Carrinho:** estado vazio, retorno ao catálogo, inclusão e persistência de itens, atualização de quantidade e remoção.

**Checkout:** comportamento com carrinho vazio, registro de pedido demonstrativo e rejeição de endereço de carteira inválido.

### Como os testes foram executados

No PowerShell, dentro da pasta `app`:

```powershell
npx.cmd playwright test
```

Para executar um arquivo específico:

```powershell
npx.cmd playwright test tests/checkout.spec.ts
```

Para abrir o relatório HTML:

```powershell
npx.cmd playwright show-report
```

Também estão disponíveis os scripts do projeto: `npm.cmd run test:e2e`, `npm.cmd run test:e2e:ui` e `npm.cmd run test:e2e:report`.

### Resultados registrados

1. **Suíte anterior:** 30 testes aprovados em uma execução completa, considerando desktop e mobile.
2. **Suíte de checkout atualizada:** 6 testes aprovados, considerando desktop e mobile, após a inclusão do cenário de endereço de carteira inválido.
3. **Suíte completa atual:** 32 testes esperados; **ainda não há registro de execução integral após a última atualização**.

**Importante:** os resultados 30/30 e 6/6 são de execuções distintas. Não devem ser somados como se representassem uma única execução da suíte atual.

### Próxima validação

Executar novamente `npx.cmd playwright test` e registrar o resultado completo, inclusive eventuais falhas e correções, antes de declarar 32/32 homologados.

---

## M16.33 — Build e execução em modo de produção

**Status:** Aprovado.

### Procedimento

No PowerShell, dentro da pasta `app`:

```powershell
npm.cmd run build
npm.cmd run preview -- --host 0.0.0.0
```

A versão de produção foi acessada em `http://localhost:4173/`.

### Resultado registrado

- Build de produção concluído com sucesso.
- Vite 8.3.4: 2.166 módulos transformados.
- Tempo aproximado informado: 967 ms.
- Arquivo JavaScript principal: aproximadamente 544,84 kB.
- Aviso de tamanho do bundle superior a 500 kB: **não bloqueante**.
- Pré-visualização de produção carregada corretamente no navegador.

Esses valores refletem a execução registrada, não uma medição contínua nem garantia de tamanho idêntico após futuras alterações.

---

## M16.34 — Auditoria Lighthouse da versão de produção

**Status:** Auditoria executada; resultados registrados.

### Ambiente

- Página inicial da versão de produção servida pelo Vite Preview.
- Endereço utilizado: `http://localhost:4173/`.
- Auditoria em modo mobile do Lighthouse.

### Resultados

| Indicador | Pontuação |
| --- | ---: |
| Performance | **83** |
| Acessibilidade | **97** |
| Boas práticas (*Best Practices*) | **96** |
| SEO | **83** |

Todos os indicadores ficaram acima de 80 pontos. As pontuações não devem ser apresentadas como acima de 85 em todas as categorias.

### Observações técnicas

Foram identificadas oportunidades de melhoria, incluindo otimização de imagens, redução de JavaScript não utilizado, metadados de SEO, `robots.txt` e ajustes de acessibilidade. Não foram tratadas como impeditivas da conclusão da etapa de auditoria. Os resultados são pontuais e podem variar conforme ambiente, conteúdo e configuração da medição.

Uma medição anterior no servidor de desenvolvimento (`localhost:5173`) não foi usada como referência de desempenho de produção.

---

## M16.35 — Limitações, pendências e critérios para entrega

**Situação:** Checklist de encerramento em andamento.

### Limitações declaradas

- Os NFTs, pedidos, autenticação e carteiras utilizam dados e fluxos demonstrativos.
- Não existe cobrança real nem transação em blockchain.
- A taxa de rede exibida é uma referência visual, não uma cotação de rede em tempo real.
- O Socket.IO teve comunicação de eventos homologada; a persistência de mudanças de status não foi comprovada pelo teste registrado.
- Funcionalidades explicitamente ilustrativas em módulos anteriores, como newsletter e links sem destino, não devem ser anunciadas como integrações operacionais sem nova verificação.

### Pendências que exigem evidência adicional

- [ ] Executar a suíte Playwright completa atual e registrar o resultado (32 execuções esperadas).
- [ ] Criar e executar testes de regressão visual com capturas de referência e comparação automatizada, caso ainda não tenham sido feitos.
- [ ] Verificar a documentação `ARCHITECTURE.md` e alinhar as instruções finais de instalação e execução.
- [ ] Confirmar publicação pública da aplicação e funcionamento dos recursos demonstrativos no ambiente publicado.
- [ ] Registrar a URL pública e a revisão final do repositório quando estiverem disponíveis.

### Nota sobre o histórico

Este diário é incremental: registros antigos que indicam uma funcionalidade como *pendente* descrevem o estado daquela etapa, e não necessariamente o estado atual. As seções mais recentes documentam as implementações e validações posteriores. Nenhuma homologação anterior foi removida ou reescrita nesta atualização.

## M16.36 — Homologação consolidada dos testes

**Data:** 16/10/2026  
**Status:** APROVADO

### Ferramenta
Playwright — Chromium Desktop e Chromium Mobile.

### Comando executado
`npx.cmd playwright test`

### Resultados
- Testes executados: 34
- Testes aprovados: 34
- Falhas: 0
- Duração total: 30,4 segundos
- Testes funcionais E2E: 32 aprovados
- Testes de regressão visual: 2 aprovados

### Funcionalidades validadas
- Catálogo e navegação
- Filtros e ordenação
- Persistência de filtros
- Carrinho e controle de quantidades
- Checkout demonstrativo
- Validação de endereço de carteira
- Comparação visual do cabeçalho desktop e mobile

### Conclusão
A suíte automatizada completa foi executada com sucesso.
Os cenários implementados estão homologados para a
versão atual do KURIO.

**Observação:** a regressão visual automatizada cobre
o cabeçalho. Não representa comparação de todas as telas.
M17 — Publicação, incidentes, homologação final e entrega (16–17/10/2026)
Atualização posterior aos registros M16: as pendências históricas acima retratam o momento em que foram escritas. Esta seção consolida as verificações posteriores informadas durante a conversa. Ela não apaga resultados ou limitações anteriores. O registro foi elaborado com base nos comandos, mensagens e resultados compartilhados pelo desenvolvedor, sem acesso direto ao computador Windows nem ao painel privado da Vercel.

M17.01 — Testes automatizados e regressão visual
Situação informada: concluída antes da publicação.
- A suíte Playwright chegou a 34 execuções aprovadas, contemplando projetos desktop e mobile: 32 verificações funcionais e 2 de regressão visual (cabeçalho desktop e mobile).
- As capturas de referência visual foram incorporadas ao repositório, conforme relato do processo.
- Em etapas anteriores, seletores ambíguos como “Explorar NFTs” e “Explorar” exigiram correspondência exata e/ou escopo no elemento main. A correção foi no teste, para identificar precisamente o elemento esperado, sem mudar a regra funcional da aplicação.
- Build de produção e Lighthouse haviam sido validados anteriormente: Performance 83, Acessibilidade 97, Boas práticas 96, SEO 83. Esses resultados são uma fotografia da execução local e não uma promessa de pontuação idêntica no ambiente publicado.
Comandos de referência (PowerShell, dentro de app):
npm.cmd run build
npx.cmd playwright test
npx.cmd playwright show-report
Aprendizado: distinguir teste funcional de regressão visual, registrar o total de execuções por navegador e não confundir resultados de rodadas diferentes.
M17.02 — GitHub: fork, repositório remoto e histórico
Problema/necessidade: publicar a solução no repositório controlado pelo candidato, preservando o desafio original.
Procedimento realizado: fork para cwgmobile/frontend-challenge, atualização do remoto origin, commits e push na branch main.
Repositório público: https://github.com/cwgmobile/frontend-challenge
Marcos registrados:
Commit	Conteúdo
0c7d00f	Inclusão da aplicação e arquivos do projeto no repositório do candidato.
787f513	Inclusão de app/vercel.json com reescrita SPA para index.html.
0fbf07d	Correção do nome do evento emitido pelo servidor Socket.IO.


Evidência do último push: 787f513..0fbf07d  main -> main, com destino https://github.com/cwgmobile/frontend-challenge.git.
Aprendizado: git commit registra alterações localmente; git push origin main envia para o remoto. Verificar git status --short antes do commit ajuda a evitar incluir arquivos não relacionados.
M17.03 — Deploy Vercel: configuração e rotas SPA
Problema: uma aplicação React com rotas client-side precisa responder corretamente a acessos diretos em URLs internas, não apenas à página inicial.
Configuração informada:
- Projeto Vercel vinculado ao repositório GitHub.
- Root Directory: app.
- Framework Preset: Vite.
- Build Command: vite build.
- Output Directory: dist.
- Install Command: npm install.
- Arquivo app/vercel.json:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
Endereço público: https://frontend-challenge-plum-two.vercel.app/
Resultado: o desenvolvedor confirmou que os deploys no painel Vercel estavam com status Ready, inclusive após o push final. Ready comprova conclusão da implantação, mas não substitui os testes funcionais.
M17.04 — Incidente: catálogo vazio após primeira publicação
Sintoma: a interface carregava na Vercel, mas o catálogo de NFTs não aparecia.
Causa identificada: o MSW era iniciado automaticamente no ambiente de desenvolvimento, porém em produção exigia a variável VITE_ENABLE_MOCKS=true. Sem essa configuração, as requisições /api/... não eram interceptadas pelos mocks no navegador.
Correção realizada: configurar VITE_ENABLE_MOCKS=true nas variáveis de ambiente da Vercel para Production e executar novo deploy, sem reutilizar cache.
Evidências relatadas no console:
[MSW] Mocking enabled
[KURIO] MSW iniciado com sucesso.
[KURIO MSW] Requisição recebida: GET /api/nfts
Foi relatada correspondência do handler e resposta 200 OK; o catálogo voltou a aparecer.
Aprendizado: variáveis VITE_... são resolvidas no build do frontend; alterações no ambiente exigem nova compilação/deploy. O uso de MSW em produção é intencional e demonstrativo, não uma API real.
M17.05 — Incidente: checkout retornando HTTP 405 em produção
Sintoma: tentativa de registrar pedido na Vercel apresentou HTTP 405 para POST /api/orders, com resposta HTML da hospedagem em vez de JSON do mock.
Diagnóstico: a chamada não estava sendo atendida pelo handler esperado do MSW naquele teste. Foram conferidos a inicialização do service worker e os handlers de pedidos.
Resultado posterior: em nova validação, o checkout demonstrativo foi concluído, com a tela de confirmação e logs do MSW indicando interceptação de POST /api/orders e GET /api/orders/:orderId.
Limite de evidência: o resultado final de sucesso está confirmado pelo relato; não há prova suficiente para atribuir o 405 a uma única causa definitiva além da ausência de interceptação naquela tentativa. Não registrar como correção de backend real.
Observação: o pedido é simulado, com persistência local no navegador; não há cobrança, assinatura de transação ou blockchain.
M17.06 — Dificuldade: pedidos antigos e repetição de formulários
Sintoma: testar a tela de confirmação repetidamente exigia refazer os dados do checkout; tentativa de abrir uma confirmação antiga pelo histórico resultou em Not Found.
Tratamento: em vez de exigir outra compra, o teste foi dividido em etapas independentes: primeiro o endpoint de saúde do servidor e depois um cliente Socket.IO executado pelo terminal.
Aprendizado: rotas de confirmação podem depender de um identificador e de dados presentes no armazenamento do navegador; uma URL antiga, isoladamente, não prova falha do Socket.IO. Para testar infraestrutura, usar um cliente mínimo reduz trabalho repetitivo.
M17.07 — Socket.IO: arquitetura, testes e correção de evento
Arquivos examinados na conversa:
- app/src/services/socket-service.ts.
- app/src/pages/ConfirmationPage.tsx (trecho do useEffect).
- app/server/socket-server.mjs.
Funcionamento no frontend:
- autoConnect: false evita conexão automática ao importar o serviço.
- A página de confirmação chama socket.connect(), inscreve o pedido via order.subscribe, escuta order.updated, invalida a consulta TanStack Query correspondente e remove listeners/encerra a conexão na limpeza do efeito.
- A URL é definida por VITE_SOCKET_URL, com fallback para http://localhost:3001.
Problema encontrado — nomes divergentes:
- Cliente escutava order.updated.
- Servidor emitia order.status.updated.
- Correção aplicada: servidor passou a emitir order.updated.
- Alteração isolada: server/socket-server.mjs, commit 0fbf07d e push confirmado ao GitHub.
Testes locais realizados:
1. Inicialização: node server/socket-server.mjs.
2. Log confirmado: servidor disponível em http://localhost:3001.
3. Acesso a http://localhost:3001/health com retorno positivo relatado.
4. Cliente de teste via terminal com socket.io-client, conectado ao servidor e inscrito em teste-kurio; desenvolvedor confirmou o funcionamento.
Comando de teste sem checkout:
node -e "const {io}=require('socket.io-client'); const s=io('http://localhost:3001'); s.on('connect',()=>{console.log('CONECTADO:',s.id);s.emit('order.subscribe','teste-kurio');setTimeout(()=>s.disconnect(),1000)});s.on('connect_error',e=>{console.error('ERRO:',e.message);process.exit(1)})"
Limitações importantes, verificadas no código:
- O servidor escuta a porta fixa 3001, não uma porta dinâmica definida pelo provedor.
- A configuração CORS permite apenas http://localhost:5173 e http://127.0.0.1:5173, não o domínio público da Vercel.
- A hospedagem Vercel do frontend não hospeda automaticamente o processo Node persistente de server/socket-server.mjs.
- O evento order.demo.update é desativado se NODE_ENV === 'production'.
- O servidor demonstrativo emite eventos, mas não altera por si só o pedido guardado no localStorage do navegador; a página apenas invalida/refaz a consulta.
- Não foi demonstrada a atualização completa de status de ponta a ponta após a correção, nem uma conexão Socket.IO em produção. O teste confirmou saúde, conexão e inscrição locais.
Conclusão técnica: Socket.IO implementado e comunicação local validada; serviço de tempo real não disponibilizado publicamente nesta entrega. Essa condição foi explicitada na mensagem enviada à empresa.
M17.08 — Inspeção do console do navegador
Observações relatadas:
- Logs do MSW confirmaram inicialização e tratamento de requisições do catálogo e pedidos.
- Também apareceram mensagens de extensão do Chrome (chrome-extension://...), que não constituem evidência de defeito da aplicação.
- A ausência de logs Socket.IO na página inicial não era prova de falha, pois a conexão é iniciada pela tela de confirmação, não pela home.
Aprendizado: identificar a origem das mensagens antes de atribuir erros ao frontend; separar console da aplicação, service worker, hospedagem e extensões.
M17.09 — Homologação e encerramento
Validações comunicadas pelo desenvolvedor:
Área	Resultado
GitHub	Push final para main confirmado (0fbf07d).
Vercel	Deploys informados como Ready.
Catálogo	Carregamento público validado após habilitar MSW.
Carrinho	Fluxo público validado.
Checkout	Pedido demonstrativo concluído na Vercel após incidente 405.
Confirmação	Tela de confirmação exibida no teste público.
Playwright	34 execuções aprovadas em desktop/mobile, conforme histórico informado.
Lighthouse	83 / 97 / 96 / 83 no teste local de produção.
Socket.IO	Saúde, conexão e inscrição local validadas; produção não hospedada.
Comunicação de entrega	Mensagem com links enviada à Jungle Gaming, conforme confirmação do candidato.


Links entregues:
- Aplicação: https://frontend-challenge-plum-two.vercel.app/
- Código: https://github.com/cwgmobile/frontend-challenge
Status de encerramento: desafio enviado à Jungle Gaming; aguarda retorno da empresa. O envio é um fato informado pelo candidato e não significa aprovação pela equipe avaliadora.
M17.10 — Lições aprendidas e decisões para projetos futuros
1. Separar ambientes: desenvolvimento local, preview de produção e deploy público possuem diferenças reais de configuração.
2. Documentar variáveis: VITE_ENABLE_MOCKS e VITE_SOCKET_URL têm impacto direto na experiência publicada.
3. Usar observabilidade: mensagens do console, logs MSW, status HTTP, endpoint /health e terminal do Socket.IO ajudaram a isolar problemas.
4. Testar sem repetir fluxos longos: quando possível, criar testes mínimos independentes para conexão, eventos e endpoints.
5. Manter eventos consistentes: nomes publicados pelo servidor precisam coincidir exatamente com os listeners do cliente.
6. Não confundir simulação com integração real: MSW, checkout e carteiras são demonstrativos; tempo real local não equivale a backend em produção.
7. Evitar alterações arriscadas na véspera: priorizar estabilização, testes, documentação e entrega.
8. Preservar evidências: comandos, commits, resultados Playwright, métricas Lighthouse e URLs permitem reproduzir e explicar as decisões técnicas.
M17.11 — Pendências técnicas não bloqueantes para evolução futura
- Hospedar o Socket.IO em serviço adequado a conexões persistentes; aceitar PORT do ambiente e configurar CORS para o domínio do frontend.
- Configurar VITE_SOCKET_URL na Vercel e publicar novo build, caso haja backend de tempo real.
- Criar um teste de ponta a ponta que dispare order.updated e comprove a reação da interface e, se necessário, a persistência do novo status.
- Investigar vulnerabilidades apontadas pelo npm audit sem aplicar atualizações destrutivas automaticamente.
- Avaliar otimizações de bundle, imagens, SEO e acessibilidade apontadas pelo Lighthouse.
- Se o desafio evoluir para produto real, substituir MSW/localStorage por API, banco, autenticação e infraestrutura de pagamento/blockchain apropriados.
Registro final: desenvolvimento encerrado para a entrega do desafio; documentação histórica preservada e complementada com os incidentes e resultados posteriores.