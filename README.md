# Ritmo · espaço de aprendizado

Atividade de React.js com seis componentes visuais, CSS puro e conteúdo fictício em português. O painel permite filtrar cursos, navegar por páginas e concluir aulas de uma trilha de React.

## Executar

Requer Node.js 22.12 ou superior.

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite. Para gerar os arquivos de produção, execute `npm run build`; para visualizar a versão compilada, `npm run preview`.

## Componentes do enunciado

| Componente | Demonstração |
| --- | --- |
| `Accordion` | FAQ, dados via props, um item aberto e transição suave |
| `Pagination` | Três cursos por página, página atual e limites desabilitados |
| `ProgressBar` | Percentual via props, atualizado ao concluir uma aula |
| `Tabs` | Cursos em andamento e concluídos, navegação por teclado |
| `Dropdown` | Filtro de categoria, fechamento por seleção, Escape e clique fora |
| `Toast` | Feedback de conclusão, fechamento manual e automático em 5 segundos |

`src/App.js` conecta o provedor global à interface. Os componentes reutilizáveis estão em `src/components/`. `src/context/LearningContext.jsx` usa **Context API** (desafio extra) para compartilhar o progresso entre a trilha, o catálogo, o resumo e as notificações. Há estado local, props, callbacks, `useState`, `useEffect`, `useRef` e `useId`.

## Verificação

```sh
npx playwright install chromium
npm test
npm run build
```

Os testes executam as interações dos seis componentes em 375 × 812 (celular), 768 × 1024 (tablet) e 1440 × 1000 (desktop), incluindo teclado, conclusão da trilha, notificações e ausência de rolagem horizontal. Os breakpoints do CSS são 640 e 1100 px. O layout também respeita a preferência por redução de movimento.

## Limites

É uma demonstração local, sem cadastro, servidor ou persistência. Recarregar a página reinicia o progresso. Não há vídeos reais nem emissão de certificados. Somente React e React DOM entram na aplicação; Vite e Playwright são ferramentas de desenvolvimento.
