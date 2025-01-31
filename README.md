# Teste-Playwright

## Desafio Proposto pela NIUCO
QA Challenge
Introdução
Este repositório contém dois testes práticos para a vaga de QA Engineer. O objetivo é validar suas habilidades de automação de testes com:

Validação de fluxos de UI com Playwright.
Interação e validação de APIs com Playwright e Node.js.
Você terá até 2 dias para completar o teste.

Requisitos Técnicos
Node.js >= 14.x
TypeScript >= 4.x
Playwright >= 1.12.x
Passos para instalação:
Clone este repositório:

git clone <link-do-repositorio>
cd nome-do-repositorio
Instale as dependências:

npm install
Para rodar os testes de UI:

npm run test:ui
Para rodar os testes de API:

npm run test:api
Estrutura do Projeto
.
├── tests/
│   ├── api/
│   │   └── reqres.spec.ts       # Testes de API
│   ├── ui/
│   │   └── swaglabs.spec.ts      # Testes de UI
├── playwright.config.ts          # Configuração do Playwright
├── package.json
├── README.md
├── tsconfig.json                 # Configuração do TypeScript
└── ...
Descrição dos Testes
Parte 1: Automação de UI com Playwright
Você deverá escrever testes automatizados para o site de e-commerce Swag Labs Demo.
As credenciais de login são fornecidas abaixo:

Usuário: standard_user
Senha: secret_sauce
Fluxos de Teste de UI
Login no sistema:

Simule um fluxo de login com credenciais corretas.
Valide se o usuário foi autenticado e redirecionado para a página principal.
Cenário adicional: Simule tentativas de login com credenciais incorretas e valide se as mensagens de erro aparecem corretamente.
Adicionar e remover produtos ao carrinho:

Faça o login.
Adicione três produtos da lista ao carrinho.
Remova dois produtos.
Valide se os produtos restantes no carrinho são os corretos.
Cenário adicional: Valide se o contador do carrinho é atualizado corretamente à medida que os produtos são adicionados/removidos.
Simulação de erro na finalização da compra:

Após adicionar produtos ao carrinho, tente finalizar a compra sem preencher os dados obrigatórios no checkout (nome, endereço, etc.).
Valide se as mensagens de erro são exibidas e se o sistema bloqueia o usuário de finalizar a compra.
O que será avaliado:
Uso correto de seletores de elementos.
Automação de cenários de interação de usuário.
Tratamento de cenários de erro (ex: interações com elementos que não existem ou estão ocultos).
Execução paralela de testes para otimização.
Parte 2: Testes de API com Playwright
Você deverá interagir com a API pública de simulação Reqres.
Escreva testes para validar as respostas e o comportamento da API.

Fluxos de Teste de API
Listar usuários e validar dados:

Faça uma requisição GET para o endpoint /api/users?page=2.
Valide o status da resposta (200) e o conteúdo retornado, verificando se os usuários possuem os campos corretos (id, first_name, last_name, email).
Cenário adicional: Valide a estrutura de dados da resposta usando assertions (ex: garantir que email tenha um formato válido).
Criar e atualizar um usuário:

Faça uma requisição POST para o endpoint /api/users com um payload de criação.
Valide se a resposta contém o código de status 201 e o usuário criado contém os dados corretos.
Faça uma requisição PUT para o endpoint /api/users/2 e valide se o usuário foi atualizado corretamente.
Cenário adicional: Valide se os tempos de resposta da API estão dentro de limites aceitáveis.
Manipulação de falhas na API:

Faça uma requisição DELETE para um usuário que não existe (/api/users/999) e valide se a resposta correta de erro (404) é retornada.
Simule um cenário de falha de rede ou tempo limite na API e verifique se o sistema lida com o erro corretamente.
O que será avaliado:
Compreensão de cenários de sucesso e erro em APIs.
Uso de assertions e validações de dados complexos.
Manipulação de cenários assíncronos e tempos de resposta.
Estruturação de testes para maior clareza e eficiência.
Melhorias Técnicas
Relatórios de Testes:

Inclua um relatório HTML ao final da execução dos testes. Configure o Playwright para gerar relatórios com as informações detalhadas sobre os resultados de cada teste.
Execução Paralela:

Garanta que os testes de API e UI possam ser executados em paralelo para otimizar o tempo de execução. Utilize a configuração adequada do Playwright para rodar testes simultaneamente.
Pipeline de CI/CD:

Configure uma pipeline de integração contínua usando GitHub Actions (ou outra ferramenta de CI/CD) para garantir que o projeto seja automaticamente testado ao fazer um push no repositório. Isso não é obrigatório, mas será um diferencial.
Exemplo de Execução Paralela
No arquivo playwright.config.ts, configure a execução paralela com o seguinte snippet:

export default defineConfig({
  workers: process.env.CI ? 1 : undefined, // Utilizar um worker em CI, múltiplos localmente
  retries: process.env.CI ? 2 : 0,         // Retentar em caso de falha em ambiente de CI
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
});
