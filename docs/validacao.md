# Validação da atividade

## Cobertura

| Requisito | Verificação |
| --- | --- |
| Arquitetura React | `App.js` integra o provedor de contexto e o painel; seis componentes obrigatórios em arquivos próprios |
| Props | FAQ, opções de menu, abas, valores de progresso e parâmetros de paginação |
| Estado e eventos | Seleção de abas, abertura de FAQ e menu, filtro, mudança de página e conclusão de aulas |
| Hooks | Estado local, efeitos com limpeza, referências de foco e identificadores acessíveis |
| Context API (extra) | Progresso compartilhado entre destaque, cartões, resumo e feedback toast |
| Responsividade | 375 × 812, 768 × 1024 e 1440 × 1000 em Chromium |
| Semântica | `header`, `nav`, `main`, `section`, `article`, títulos e botões nativos |
| Acessibilidade | Nomes acessíveis, `aria-expanded`, `aria-controls`, `aria-current`, papéis de abas e progresso, região viva e redução de movimento |
| Código limpo | Indentação formatada; React e React DOM são as únicas dependências de execução |

## Cenários automatizados

1. Paginação anterior/próxima/específica, limites desabilitados, filtro reiniciando a página, abas e estado vazio, FAQ com apenas um item aberto, atualização do progresso e fechamento manual/automático do toast.
2. Navegação por teclado no menu e nas abas, Escape com retorno de foco, clique fora do menu e seleção de outro curso para continuar a trilha.
3. Conclusão de todas as aulas, limite de 100%, botão desabilitado e curso movido para a aba de concluídos.

Os três cenários são executados nas três resoluções: nove testes. Há assertivas de ausência de rolagem horizontal e erros de execução na página, além de capturas para conferência visual.

## Comandos e resultado

```sh
npm test
npm run build
```

Resultado final: nove testes aprovados e compilação de produção aprovada. As capturas das três resoluções foram conferidas visualmente. A revisão estática identificou nomes acessíveis que omitiam o texto visível dos controles; os nomes foram corrigidos e cobertos pelos testes.

## Limites da validação

Viewports simulados no Chromium; não houve teste em aparelhos físicos, Safari, Firefox ou com leitor de tela real. O progresso existe apenas em memória e reinicia ao recarregar, conforme o escopo demonstrativo.
