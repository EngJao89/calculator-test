# Calculadora Angular

Documentação do projeto **calculator-test**: uma aplicação de calculadora web construída com Angular 21.

---

## Descrição do projeto

Aplicação SPA (Single Page Application) que oferece uma calculadora com operações básicas (adição, subtração, multiplicação e divisão), histórico de cálculos em sessão e entrada via teclado. A interface é responsiva e utiliza tema escuro.

### Funcionalidades

- **Operações:** `+`, `-`, `×`, `÷`
- **Entrada por teclado:** números, operadores, Enter (=), Escape/Delete/Backspace (limpar), ponto/vírgula (decimal)
- **Histórico:** lista de expressões e resultados; clique em um item para reutilizar o resultado
- **Limpeza:** botão C ou teclas Escape, Delete, Backspace

---

## Como rodar o projeto

### Pré-requisitos

- **Node.js** 18+
- **npm** 11.6.2+ (ou o gerenciador definido em `package.json`)

### Instalação

```bash
# Na raiz do projeto
npm install
```

### Desenvolvimento

```bash
npm start
```

Abre o servidor de desenvolvimento em `http://localhost:4200/`. A aplicação recarrega ao alterar os arquivos.

**Porta alternativa:**

```bash
ng serve --port 4201
```

### Build de produção

```bash
npm run build
```

Saída em `dist/calculator-test/`. Build otimizado e com hashing de assets.

### Testes

```bash
npm test
```

Executa os testes unitários com Vitest (52 testes no total).

### Outros scripts

| Comando           | Descrição                          |
|-------------------|------------------------------------|
| `npm run watch`   | Build em modo watch (development)  |
| `npm run commit`  | Commitizen para commits padronizados |
| `npm run serve:ssr:calculator-test` | Sobe o servidor SSR (após build) |

---

## Arquitetura

### Visão geral

- **Shell:** `App` (componente raiz) com `<router-outlet />`.
- **Rota principal:** `/` e `/calculator` renderizam o mesmo componente da calculadora.
- **Estado:** concentrado no componente da calculadora, sem store global.

### Estrutura de pastas relevante

```
src/
├── app/
│   ├── calculator/                    # Feature da calculadora
│   │   ├── calculator.component.ts     # Lógica e estado
│   │   ├── calculator.component.html   # Template
│   │   ├── calculator.component.css   # Estilos do componente
│   │   └── calculator.component.spec.ts
│   ├── app.ts                         # Root component
│   ├── app.html
│   ├── app.config.ts                  # Providers e rotas (provideRouter)
│   ├── app.routes.ts                  # Definição de rotas
│   └── app.routes.server.ts           # Rotas para SSR
├── main.ts                            # Bootstrap da aplicação
├── main.server.ts                     # Bootstrap para SSR
├── server.ts                          # Servidor Express (SSR)
├── index.html
└── styles.css                         # Estilos globais
```

### Fluxo da calculadora

1. **Display e estado:** `display`, `previousValue`, `operation`, `waitingForNewValue`, `history` (todos como Signals).
2. **Entrada:** números e decimal atualizam o display; operador armazena o valor atual e a operação; igual calcula, exibe o resultado e grava no histórico.
3. **Teclado:** `HostListener('window:keydown')` chama os mesmos métodos usados pelos botões (inputNumber, performOperation, equals, clear, inputDecimal).

### Stack técnica

- **Angular 21** – framework e CLI
- **TypeScript 5.9** – target ES2022, `moduleResolution: "bundler"`
- **Angular Router** – roteamento client-side
- **Angular SSR** – renderização no servidor (Express)
- **Vitest** – testes unitários (compatível com `@angular/core/testing`)
- **Standalone components** – sem NgModules; componentes importados diretamente nas rotas e no shell

---

## Decisões técnicas e arquiteturais

### Angular e Standalone Components

- Uso de **standalone components** (sem módulos) para reduzir boilerplate e alinhar com a direção atual do Angular.
- Rotas declaradas em `app.routes.ts` com import direto do `CalculatorComponent`; o `App` importa apenas `RouterOutlet`.

### Estado com Signals

- Todo o estado da calculadora (display, valor anterior, operação, “waiting for new value”, histórico) é mantido com **Angular Signals**.
- Motivação: reatividade fine-grained, menos ciclos de detecção de mudanças e API simples (`signal()`, `computed()` quando necessário). Sem RxJS para esse estado.

### Histórico em memória

- Histórico é um array em memória (signal de lista); **não há persistência** (localStorage ou backend).
- Escopo: apenas demonstrar a feature e manter a aplicação simples. Persistência pode ser adicionada depois sem mudar a API do componente (ex.: serviço de histórico injetável).

### Teclado global

- Uso de `@HostListener('window:keydown')` no componente da calculadora para que atalhos funcionem enquanto a aplicação está em foco, sem precisar focar em um input.
- `event.preventDefault()` nas teclas mapeadas evita comportamentos indesejados do browser (ex.: submit com Enter).

### Testes com Vitest

- Projeto configurado com **Vitest** (em vez de Jasmine/Karma) para testes unitários, conforme `tsconfig.spec.json` (`types: ["vitest/globals"]`) e builder `@angular/build:unit-test`.
- Testes do `CalculatorComponent` cobrem: inicialização, entrada de números/decimais, operações, histórico, teclado e casos extremos (ex.: divisão por zero). O `App` é testado com TestBed e verificação do `router-outlet`.

### TypeScript e build

- **moduleResolution: "bundler"** e **module: "ES2022"** para compatibilidade com o pipeline de build do Angular e com ESM.
- **strict** e opções adicionais do `angularCompilerOptions` habilitadas para maior segurança de tipos e templates.

### SSR

- Aplicação preparada para **Server-Side Rendering** (Angular SSR + Express em `server.ts`), permitindo primeiro carregamento renderizado no servidor. A calculadora em si não depende de APIs server-side; o SSR melhora principalmente SEO e tempo até primeiro conteúdo.

### Estilos

- Estilos da calculadora ficam no CSS do componente (scoped); estilos globais em `styles.css`. Sem pré-processador (SCSS) ou biblioteca de componentes para manter o projeto enxuto.

---

## Resumo

| Aspecto              | Escolha / observação                                  |
|----------------------|------------------------------------------------------|
| Framework            | Angular 21, standalone, signals                     |
| Estado               | Signals no componente da calculadora                 |
| Rotas                | Router com lazy-friendly (componente standalone)    |
| Testes               | Vitest + Angular Testing API                         |
| Build / TS            | ES2022, moduleResolution bundler, strict             |
| Histórico            | Em memória; sem persistência                         |
| Acessibilidade       | Teclado global; botões e ações documentados         |

Para dúvidas sobre a API do Angular ou do Vitest, consulte a [documentação do Angular](https://angular.dev) e a [documentação do Vitest](https://vitest.dev).
