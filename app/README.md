# KURIO — NFT Marketplace

Aplicação frontend de marketplace de NFTs desenvolvida como desafio técnico para uma vaga de desenvolvimento frontend júnior.

O projeto apresenta catálogo de colecionáveis digitais, páginas de detalhes, filtros, carrinho persistente e um fluxo de registro de pedidos **demonstrativos**. Não há integração com blockchain, transferência de NFTs ou processamento de pagamentos reais.

## Tecnologias

- React 19 e TypeScript
- Vite 8
- Tailwind CSS 4 e componentes de interface com shadcn/ui
- TanStack Router e TanStack Query
- Axios e Mock Service Worker (MSW)
- Socket.IO para eventos simulados
- Playwright para testes de ponta a ponta (E2E)

## Funcionalidades

- Catálogo de NFTs com filtros por categoria e rede, ordenação e navegação por abas.
- Página de detalhes com galeria, seleção de quantidade e acesso ao carrinho.
- Carrinho com alteração de quantidades, remoção e persistência local.
- Checkout demonstrativo com dados do colecionador, seleção de rede/carteira, validação de endereço e registro simulado de pedido.
- Página de confirmação de pedido e páginas de login, cadastro, perfil e carteiras.
- Interfaces responsivas para desktop e dispositivos móveis.

> **Aviso:** carteiras, pedidos e transações são recursos demonstrativos. A escolha de uma carteira não estabelece uma conexão real, e registrar um pedido não realiza cobrança.

## Pré-requisitos

- Node.js e npm compatíveis com as versões utilizadas no projeto.
- Navegador Chromium para executar os testes E2E.

## Instalação e execução

No terminal, entre na pasta `app` e execute:

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173/`.

No Windows PowerShell, caso `npm` ou `npx` seja bloqueado pela política de execução, utilize `npm.cmd` e `npx.cmd`.

### Serviço Socket.IO de demonstração

Em outro terminal, a partir da pasta `app`:

```bash
node ./server/socket-server.mjs
```

O serviço utiliza a porta `3001` no ambiente local. Mantenha-o ativo quando quiser testar os eventos simulados em tempo real.

### Build de produção

```bash
npm run build
npm run preview
```

O build é gerado em `dist/`. Por padrão, o preview local é disponibilizado em `http://localhost:4173/`.

**Observação sobre publicação:** o funcionamento da API simulada com MSW e dos eventos Socket.IO deve ser verificado no ambiente hospedado. O build local, por si só, não comprova que esses serviços funcionarão em uma hospedagem pública.

## Testes automatizados

Os testes de ponta a ponta utilizam **Playwright** e estão na pasta `tests/`.

### Preparação

```bash
npm install
npx playwright install chromium
```

### Executar todos os testes

```bash
npx playwright test
```

### Executar por área

```bash
npx playwright test tests/catalog.spec.ts
npx playwright test tests/cart.spec.ts
npx playwright test tests/checkout.spec.ts
```

### Abrir o relatório HTML

```bash
npx playwright show-report
```

### Cobertura dos testes

| Arquivo | Cenários | Execuções previstas (desktop + mobile) |
| --- | ---: | ---: |
| `tests/catalog.spec.ts` | 8 | 16 |
| `tests/cart.spec.ts` | 5 | 10 |
| `tests/checkout.spec.ts` | 3 | 6 |
| **Total** | **16** | **32** |

**Catálogo:** carregamento inicial, navegação para login e carrinho, filtros por categoria e rede, abas, ordenação e persistência dos filtros na URL.

**Carrinho:** estado vazio, retorno ao catálogo, inclusão de NFT, persistência após recarga, alteração de quantidade e remoção.

**Checkout:** estado de carrinho vazio, registro de pedido demonstrativo com dados fictícios e rejeição de endereço Ethereum inválido.

### Resultados observados

- **30/30 execuções aprovadas** na execução conjunta anterior à inclusão do teste de endereço inválido.
- **6/6 execuções aprovadas** na execução isolada mais recente de `tests/checkout.spec.ts`, incluindo o teste negativo.
- A suíte completa atualizada contém **32 execuções previstas**; a execução conjunta final ainda precisa ser registrada.

Os testes foram executados em configurações Chromium desktop e mobile. O sucesso dos testes E2E não substitui uma auditoria manual completa de acessibilidade nem testes em navegadores diferentes.

## Auditoria Lighthouse

Auditoria da **versão de produção local**, acessada pelo preview do Vite (`http://localhost:4173/`), em modo **Mobile**, com emulação de Moto G Power e conexão Slow 4G.

| Indicador | Pontuação |
| --- | ---: |
| Performance | 83 |
| Acessibilidade | 97 |
| Boas práticas | 96 |
| SEO | 83 |

A auditoria identificou oportunidades de melhoria em entrega de imagens, JavaScript não utilizado, recursos que bloqueiam renderização, metadados SEO e `robots.txt`. Essas melhorias não foram declaradas como concluídas.

## Validação de produção local

O comando `npm run build` foi executado com sucesso usando Vite 8.3.4. A aplicação também foi aberta no preview local e o catálogo de NFTs foi visualizado corretamente. O build apresentou um aviso não bloqueante sobre o tamanho do principal pacote JavaScript.

## Organização do projeto

- `src/`: código-fonte da interface, componentes, páginas, hooks e serviços.
- `tests/`: testes E2E Playwright.
- `server/`: servidor de eventos Socket.IO demonstrativo.
- `public/`: arquivos estáticos utilizados pela aplicação.
- `dist/`: resultado gerado pelo build de produção.
- `playwright.config.ts`: configuração dos testes automatizados.

## Limitações e próximos passos

- Não há autenticação de carteira, transferência de ativos ou pagamento real.
- A API de pedidos é simulada; a demonstração não representa uma plataforma de comércio de NFTs pronta para operação real.
- A publicação pública, a verificação da API simulada no ambiente hospedado e a regressão visual automatizada ainda precisam ser confirmadas/documentadas.
- Pontos levantados pelo Lighthouse podem ser otimizados futuramente, conforme prioridade e tempo disponível.

## Contexto

Projeto desenvolvido para demonstrar fundamentos de desenvolvimento frontend, integração com serviços simulados, gerenciamento de estado, responsividade, tratamento de erros e testes automatizados.
