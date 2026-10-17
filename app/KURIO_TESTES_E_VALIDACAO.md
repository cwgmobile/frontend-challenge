# KURIO — Documentação de testes e validação

**Projeto:** KURIO NFT Marketplace — desafio técnico de frontend  
**Objetivo:** registrar como a aplicação foi testada, os resultados observados e as limitações da validação.  
**Ambiente de execução:** Windows, PowerShell, Chrome/Chromium, Vite e Playwright.  
**Data das verificações registradas:** 16–17/10/2026.

> Este documento descreve resultados efetivamente informados durante o desenvolvimento. O marketplace e o checkout são demonstrativos: não há pagamento real nem transação em blockchain.

## 1. Estratégia de testes

Foram utilizados testes **end-to-end (E2E)** com **Playwright**, executados em dois projetos de navegador: `chromium-desktop` e `chromium-mobile`. Os testes simulam interações de um usuário com a interface, verificando navegação, mensagens, botões, estados e fluxos de compra. A configuração do Playwright utiliza servidor de desenvolvimento Vite, relatório HTML e rastreamentos (*traces*) em caso de falha.

O aplicativo usa React, TypeScript, TanStack Router, TanStack Query, Axios e **Mock Service Worker (MSW)** para simular as respostas da API. O registro de pedidos testado é **demonstrativo**, feito contra a API simulada, não contra uma blockchain.

### Como executar

No terminal PowerShell, dentro da pasta `app`:

```powershell
npm.cmd install
npx.cmd playwright install chromium
npx.cmd playwright test
```

Para executar os testes por área:

```powershell
npx.cmd playwright test tests/catalog.spec.ts
npx.cmd playwright test tests/cart.spec.ts
npx.cmd playwright test tests/checkout.spec.ts
```

Para abrir o relatório HTML gerado:

```powershell
npx.cmd playwright show-report
```

Os comandos de instalação são necessários principalmente na primeira preparação do ambiente. O Playwright inicia o ambiente web conforme a configuração do projeto.

## 2. Organização dos testes

| Arquivo | Cenários por projeto | Execuções desktop + mobile |
|---|---:|---:|
| `tests/catalog.spec.ts` | 8 | 16 |
| `tests/cart.spec.ts` | 5 | 10 |
| `tests/checkout.spec.ts` | 3 | 6 |
| **Total** | **16** | **32** |

### 2.1 Catálogo — `catalog.spec.ts`

Foram automatizados oito cenários:

1. Carregamento da página inicial e do catálogo.
2. Navegação para a página de login.
3. Acesso à página do carrinho.
4. Seleção de categoria e atualização da URL.
5. Seleção de filtro de rede.
6. Alternância entre abas do catálogo.
7. Seleção de ordenação por menor preço.
8. Preservação dos filtros após recarregar a página.

**Método:** Playwright navega pelas páginas e interage com links, abas, filtros e controles por seus nomes acessíveis. Verifica a URL e os estados apresentados na interface. **Limitação:** esses testes não comprovam, em todos os cenários, a ordem efetiva de todos os itens ou a correspondência integral entre filtros e resultados da API.

**Resultado registrado:** `16 passed (14.9s)` na execução específica do catálogo.

### 2.2 Carrinho — `cart.spec.ts`

Foram automatizados cinco cenários:

1. Exibição da mensagem de carrinho vazio.
2. Retorno ao catálogo pelo link de navegação.
3. Abertura de um NFT, compra demonstrativa, presença no carrinho e persistência após recarregar.
4. Aumento e redução da quantidade, incluindo estado desabilitado do botão de diminuir na quantidade mínima.
5. Remoção de um NFT e retorno ao estado de carrinho vazio.

**Método:** cada cenário começa limpando o `localStorage` para reduzir interferência entre testes. Um card é identificado por `data-nft-id`; o teste abre os detalhes, usa o botão **Comprar** e verifica a navegação para `/cart`. Os botões do carrinho são localizados pelos nomes acessíveis. A persistência é conferida com `page.reload()`.

**Resultado registrado:** `10 passed (11.6s)` na execução específica do carrinho.

### 2.3 Checkout — `checkout.spec.ts`

Foram automatizados três cenários:

1. **Carrinho vazio:** acesso direto a `/checkout` exibe mensagem informativa, sem formulário de compra.
2. **Pedido demonstrativo:** um NFT é adicionado, o usuário segue para o checkout, preenche os campos obrigatórios com dados fictícios, seleciona rede Ethereum e carteira MetaMask, informa um endereço no formato `0x` seguido de 40 caracteres hexadecimais e registra o pedido. O teste verifica a navegação para `/confirmation`.
3. **Endereço inválido:** preenchimento do formulário com `0x123`; o teste verifica a mensagem de erro de validação e a permanência em `/checkout`.

**Método:** os campos são preenchidos com Playwright; seleções são feitas por opções do formulário e o botão **Registrar pedido demonstrativo** é acionado. O teste verifica a resposta visível ao usuário. Não há conexão com carteira real, transferência de NFT ou cobrança.

**Resultado registrado:** `6 passed (8.5s)` na execução específica do checkout, incluindo o cenário de endereço inválido.

## 3. Resultados de execução

| Verificação | Resultado observado |
|---|---|
| Catálogo isolado | 16/16 aprovados |
| Carrinho isolado | 10/10 aprovados |
| Checkout isolado, após inclusão do teste negativo | 6/6 aprovados |
| Suíte completa, **antes** do teste negativo | 30/30 aprovados em 26,2 s |
| Suíte completa, **depois** do teste negativo | **Ainda não executada/registrada**; total esperado: 32 |

Os testes são executados nos projetos desktop e mobile definidos no Playwright. O sucesso de uma execução E2E confirma os fluxos cobertos naquele ambiente e momento; não substitui testes de segurança, carga, integração blockchain ou compatibilidade com todos os navegadores.

## 4. Build e verificação de produção

Comando executado:

```powershell
npm.cmd run build
```

**Resultado:** compilação Vite concluída com sucesso em **967 ms**, com **2.166 módulos transformados**. Foi registrado aviso não bloqueante sobre o pacote JavaScript principal acima de 500 kB (aproximadamente 544,84 kB; gzip 165,14 kB).

A pré-visualização do build foi iniciada com:

```powershell
npm.cmd run preview -- --host 0.0.0.0
```

Endereço local de pré-visualização: `http://localhost:4173/`. O catálogo foi verificado visualmente e carregou corretamente. Um erro inicial de **Not Found** foi relacionado ao acesso por uma URL incorreta contendo `/**`; ao abrir a rota `/` corretamente, a aplicação funcionou.

> A pré-visualização local não equivale a um deploy público validado. A publicação e a configuração de MSW/Socket.IO no ambiente hospedado ainda devem ser verificadas.

## 5. Auditoria Lighthouse

A auditoria foi executada no Chrome DevTools, em modo **Mobile / Navigation**, com simulação de dispositivo Moto G Power e rede Slow 4G, usando Lighthouse 13.4.1 e Chromium 155.

| Categoria | Servidor de desenvolvimento `:5173` | Build de produção `:4173` |
|---|---:|---:|
| Performance | 42 | **83** |
| Acessibilidade | 97 | **97** |
| Boas práticas | 96 | **96** |
| SEO | 83 | **83** |

**Interpretação:** a pontuação de performance melhorou significativamente ao medir o build otimizado. Os resultados de produção ficaram todos acima de 80 pontos. Não foi estabelecida a meta de atingir 100 pontos em cada categoria.

### Recomendações identificadas

- Otimização de imagens: economia estimada de 552 KiB.
- Redução de JavaScript não utilizado: economia estimada de 228 KiB.
- Recursos que bloqueiam renderização: economia estimada de 150 ms.
- Nove tarefas longas na *main thread*.
- Oportunidades relacionadas a LCP, tamanho do DOM e dependências de rede.
- Atributos ARIA proibidos em elementos específicos.
- Erros registrados no console e ausência de *source maps* para JavaScript de grande porte.
- Ausência de `meta description` e problemas de validação em `robots.txt`.

Esses itens foram **diagnosticados**, não necessariamente corrigidos. A prioridade do desafio é entregar os requisitos funcionais e a documentação, preservando a estabilidade do projeto.

## 6. Como os problemas encontrados foram tratados

Durante a criação dos testes, um seletor de link encontrou mais de um elemento chamado **Explorar NFTs** (conteúdo principal e rodapé). O teste foi ajustado para procurar o link dentro de `main`, com correspondência exata do nome. Após a alteração, os quatro testes iniciais do carrinho passaram.

No catálogo, um seletor de **Explorar** também precisou usar correspondência exata para evitar ambiguidades. O objetivo foi tornar os testes mais confiáveis sem alterar o comportamento da aplicação.

## 7. Limitações e pendências

- Executar novamente `npx.cmd playwright test` e registrar o resultado **32/32**, caso aprovado.
- Criar e executar os testes de **regressão visual** solicitados no desafio; os testes E2E atuais não são testes de comparação de capturas de tela.
- Salvar os relatórios/evidências Lighthouse no repositório, conforme exigido pelo enunciado.
- Concluir ou revisar `ARCHITECTURE.md` e o `README.md`, com instruções de instalação, execução, testes, decisões e limitações.
- Publicar o frontend e validar as rotas diretamente no endereço público, além do comportamento de MSW e Socket.IO fora do ambiente local.
- Verificar a entrega no GitHub e conferir todos os itens do enunciado original antes de enviar.

## 8. Resumo para o avaliador

O KURIO foi validado com testes automatizados de ponta a ponta em configurações desktop e mobile, cobrindo catálogo, navegação, carrinho e registro de pedidos demonstrativos. Os testes também verificam um cenário de entrada inválida no checkout. O build de produção foi gerado com sucesso, a pré-visualização local foi conferida e a aplicação passou por auditoria Lighthouse. As limitações conhecidas e os itens pendentes são apresentados explicitamente para tornar a entrega transparente e reproduzível.
