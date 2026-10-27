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
npm run build
```
