# Testes manuais — Atividades do Jhon V3.6

## Verificação da estrutura
- [ ] A página principal continua em `index.html` na raiz.
- [ ] A documentação está em `docs/architecture/` e `docs/testing/`.
- [ ] O validador está em `tests/validar-atividades.js`.
- [ ] O workflow executa `node tests/validar-atividades.js`.

## Testes funcionais
- [ ] A página abre e mostra V3.6.
- [ ] As atividades aparecem com a contagem dinâmica correta.
- [ ] Busca, filtros e marcações funcionam.
- [ ] Marcações e tema persistem após recarregar.
- [ ] Exportar resumo TXT e backup JSON.
- [ ] Restaurar backup válido após confirmação.
- [ ] Backup inválido não altera dados.
- [ ] Layout em celular e desktop.
- [ ] Arquivos CSS e JavaScript carregam com HTTP 200.
- [ ] Console sem erros JavaScript.
- [ ] Página publicada no GitHub Pages repete os testes.

## Validação automatizada V3.6
O workflow `.github/workflows/validar-atividades.yml` executa `node tests/validar-atividades.js` em push, pull request e manualmente. A validação estática não substitui testes reais no navegador.

## Regressão da análise V3.2
- [ ] Alternar entre 7, 30, 90 dias e todo o histórico atualiza indicadores e ranking.
- [ ] Indicadores distinguem volume, atividades realizadas e atividades sem registro.
- [ ] Histórico individual continua exibindo todas as datas.
- [ ] Classificação geral e arquivamento continuam funcionando.
- [ ] O filtro funciona em tela estreita e no tema escuro.

## Regressão de funcionalidades anteriores
- [ ] Tela inicial Geral/Trabalho/Vida pessoal e contagens dinâmicas.
- [ ] Filtros, marcações diárias, atividades puladas e relatório semanal.
- [ ] Tema, backup/restauração, foco de teclado e layout responsivo.
