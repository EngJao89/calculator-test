# 🧮 Calculadora Angular

Uma calculadora moderna e funcional desenvolvida com Angular 21, com suporte completo ao teclado, histórico de cálculos e interface responsiva.

## ✨ Funcionalidades

### Operações Básicas
- ➕ **Adição** (`+`)
- ➖ **Subtração** (`-`)
- ✖️ **Multiplicação** (`×`)
- ➗ **Divisão** (`÷`)

### Recursos Avançados
- ⌨️ **Suporte completo ao teclado** - Use seu teclado para realizar cálculos
- 📜 **Histórico de cálculos** - Todas as operações são salvas automaticamente
- 🎯 **Reutilização de resultados** - Clique em qualquer item do histórico para usar o resultado
- 🧹 **Limpeza rápida** - Botão C ou teclas Escape/Delete/Backspace para limpar
- 📱 **Design responsivo** - Funciona perfeitamente em desktop e mobile
- 🎨 **Interface moderna** - Design elegante com tema escuro

## 🚀 Como Usar

### Interface Gráfica

1. **Números**: Clique nos botões numéricos (0-9)
2. **Operadores**: Clique nos botões de operação (+, -, ×, ÷)
3. **Igual**: Clique no botão `=` para calcular
4. **Limpar**: Clique no botão `C` para resetar
5. **Decimal**: Clique no botão `.` para adicionar ponto decimal
6. **Histórico**: 
   - Visualize todos os cálculos realizados no painel lateral
   - Clique em qualquer item do histórico para usar o resultado
   - Use o botão "Limpar" para apagar todo o histórico

### Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `0-9` | Digitar números |
| `+` | Adição |
| `-` | Subtração |
| `*` | Multiplicação |
| `/` | Divisão |
| `Enter` ou `=` | Calcular resultado |
| `Escape`, `Delete` ou `Backspace` | Limpar calculadora |
| `.` ou `,` | Adicionar ponto decimal |

### Exemplos de Uso

**Exemplo 1: Cálculo simples**
```
5 + 3 = 8
```

**Exemplo 2: Cadeia de operações**
```
10 + 5 × 2 = 30
```

**Exemplo 3: Números decimais**
```
1.5 + 2.5 = 4
```

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 11.6.2 ou superior)

### Passos

1. **Clone o repositório** (ou baixe o projeto)
   ```bash
   git clone <url-do-repositorio>
   cd calculator-test
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   # ou
   ng serve
   ```

4. **Acesse a aplicação**
   - Abra seu navegador em `http://localhost:4200/`
   - A aplicação recarrega automaticamente quando você modifica os arquivos

## 🏗️ Estrutura do Projeto

```
calculator-test/
├── src/
│   ├── app/
│   │   ├── calculator/              # Módulo da calculadora
│   │   │   ├── calculator.component.ts      # Lógica do componente
│   │   │   ├── calculator.component.html    # Template HTML
│   │   │   ├── calculator.component.css     # Estilos
│   │   │   └── calculator.component.spec.ts # Testes unitários
│   │   ├── app.ts                   # Componente raiz
│   │   ├── app.routes.ts            # Configuração de rotas
│   │   └── app.config.ts            # Configuração da aplicação
│   ├── index.html                   # HTML principal
│   ├── main.ts                       # Ponto de entrada
│   └── styles.css                   # Estilos globais
├── angular.json                      # Configuração do Angular
├── package.json                      # Dependências do projeto
└── tsconfig.json                     # Configuração TypeScript
```

## 🧪 Testes

O projeto possui **52 testes unitários** cobrindo todas as funcionalidades da calculadora.

### Executar Testes

```bash
npm test
# ou
ng test
```

### Cobertura de Testes

Os testes cobrem:
- ✅ Inicialização e estado inicial
- ✅ Entrada de números e decimais
- ✅ Todas as operações matemáticas
- ✅ Histórico de cálculos
- ✅ Suporte ao teclado
- ✅ Casos especiais (divisão por zero, números negativos, etc.)
- ✅ Cálculos complexos e cadeias de operações

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npm test` | Executa os testes unitários |
| `npm run watch` | Compila em modo watch (desenvolvimento) |
| `npm run commit` | Abre o commitizen para commits padronizados |

## 🎨 Tecnologias Utilizadas

- **Angular 21** - Framework principal
- **TypeScript 5.9** - Linguagem de programação
- **Vitest 4.0** - Framework de testes
- **Angular Signals** - Sistema reativo moderno
- **CSS3** - Estilização moderna com gradientes e animações

## 📝 Arquitetura

### Componente CalculatorComponent

O componente principal utiliza:

- **Signals** para gerenciamento de estado reativo
- **HostListener** para captura de eventos de teclado
- **Standalone Component** (sem módulos)
- **Interface CalculationHistory** para tipagem do histórico

### Fluxo de Operação

1. Usuário insere número → `inputNumber()`
2. Usuário seleciona operador → `performOperation()`
3. Usuário insere segundo número → `inputNumber()`
4. Usuário pressiona igual → `equals()`
   - Calcula o resultado
   - Salva no histórico
   - Atualiza o display

## 🐛 Resolução de Problemas

### Problema: Módulo não encontrado
**Solução**: Execute `npm install` para instalar todas as dependências

### Problema: Porta 4200 já em uso
**Solução**: Use `ng serve --port 4201` para usar outra porta

### Problema: Testes falhando
**Solução**: Certifique-se de que todas as dependências estão instaladas: `npm install`

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`npm run commit`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado.

## 👨‍💻 Desenvolvimento

### Adicionar Nova Funcionalidade

1. Crie um novo método no `calculator.component.ts`
2. Adicione o botão/evento no `calculator.component.html`
3. Adicione estilos no `calculator.component.css` se necessário
4. Escreva testes no `calculator.component.spec.ts`
5. Execute os testes para garantir que tudo funciona

### Padrões de Código

- Use **signals** para estado reativo
- Mantenha métodos pequenos e focados
- Adicione comentários para lógica complexa
- Siga o padrão de nomenclatura do Angular
- Escreva testes para novas funcionalidades

## 📚 Recursos Adicionais

- [Documentação Angular](https://angular.dev)
- [Angular Signals](https://angular.dev/guide/signals)
- [Vitest Documentation](https://vitest.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Desenvolvido com ❤️ usando Angular 21
