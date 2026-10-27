# Plano de implementação

## Objetivo

Atender ao enunciado com um painel de aprendizado responsivo e seis componentes React. Conteúdo e identidade visual são escolhas de implementação: Ritmo, interface clara, verde escuro, superfícies neutras e ilustrações abstratas feitas com CSS.

## Escopo e decisões

- React e React DOM, Vite para desenvolvimento, CSS puro e Playwright para testes no navegador.
- Componentes reutilizáveis recebem dados por props; interação visual fica no estado local.
- Context API compartilha aulas concluídas e notificações entre componentes, atendendo ao desafio extra.
- Layout em duas colunas no desktop, coluna única no tablet e controles reorganizados no celular.
- Sem backend, autenticação, persistência ou biblioteca de UI: não são requisitos desta atividade.

## Etapas e commits

1. Estrutura mínima, comandos de execução e testes de aceitação inicialmente falhando.
2. Seis componentes acessíveis, contexto, dados e painel responsivo.
3. Validação em três resoluções, ajustes necessários e documentação dos resultados.

## Critérios de aceite

FAQ com um item aberto, paginação com limites, barra atualizada por conclusão de aula, abas com teclado, dropdown com fechamento por clique fora/Escape/seleção e toast temporário. Build de produção e testes devem passar. Validar também finalização da trilha, estado vazio, uso de props e limpeza dos efeitos.
