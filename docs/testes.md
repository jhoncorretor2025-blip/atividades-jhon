# Testes manuais — Atividades do Jhon V3.2

- [ ] A página abre e mostra V3.2.
- [ ] As atividades aparecem com a contagem dinâmica correta.
- [ ] Busca e filtros funcionam.
- [ ] Marcar/desmarcar atividade persiste após recarregar.
- [ ] Tema claro/escuro persiste após recarregar.
- [ ] Exportar resumo TXT.
- [ ] Exportar backup JSON.
- [ ] Restaurar backup válido após confirmação.
- [ ] Backup inválido não altera dados.
- [ ] Layout em celular e desktop.
- [ ] Network: app.css e app.js carregam com HTTP 200.
- [ ] Console sem erros JavaScript.
- [ ] Página publicada no GitHub Pages repete os testes.

## Validação automatizada V3.2
O workflow `.github/workflows/validar-atividades.yml` executa `node .github/scripts/validar-atividades.js` em push, pull request e manualmente. A validação estática não substitui testes reais no navegador.

## V3.2 — análise por período
- [ ] Alternar entre 7, 30, 90 dias e todo o histórico atualiza os indicadores e o ranking.
- [ ] Indicadores distinguem volume de registros, atividades realizadas e atividades sem registro no período.
- [ ] Ranking mostra frequência individual sem duplicar ocorrências.
- [ ] Histórico individual continua exibindo todas as datas, independentemente do filtro do ranking.
- [ ] Classificação geral e arquivamento continuam funcionando.
- [ ] O filtro funciona em tela estreita e no tema escuro.

## Regressão de funcionalidades anteriores
- [ ] Tela inicial Geral/Trabalho/Vida pessoal e contagens dinâmicas.
- [ ] Filtros, marcações diárias, atividades puladas e relatório semanal.
- [ ] Tema, backup/restauração, foco de teclado e layout responsivo.
