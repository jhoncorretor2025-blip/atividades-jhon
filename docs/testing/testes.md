# Testes — Atividades do Jhon V3.8

## Verificações automatizadas
O workflow `.github/workflows/validar-atividades.yml` executa `node tests/validar-atividades.js` em push, pull request e execução manual.

- [ ] Estrutura e existência dos cinco módulos.
- [ ] Ordem de carregamento no HTML.
- [ ] Versão V3.8 no meta, cabeçalho, rodapé, ajuda e backup.
- [ ] Cache-busting V3.8 nos arquivos.
- [ ] Sintaxe de todos os módulos.
- [ ] Presença das 51 atividades.
- [ ] Chaves de armazenamento local preservadas.
- [ ] Validação do backup e compatibilidade com campos opcionais.
- [ ] Histórico, ranking e filtro por período preservados.
- [ ] Streak atual, melhor sequência e últimos sete dias.
- [ ] Marcar a primeira atividade do dia inicia/continua a sequência; desmarcar atualiza o contador.
- [ ] Dia sem atividade interrompe a sequência; atividade pulada não conta.

## Testes manuais de regressão
- [ ] Abrir a página no desktop e no celular.
- [ ] Escolher Geral, Trabalho e Vida pessoal.
- [ ] Pesquisar, filtrar e limpar filtros.
- [ ] Marcar, desmarcar, pular e retomar atividades.
- [ ] Recarregar e confirmar persistência das marcações.
- [ ] Alternar tema claro/escuro e recarregar.
- [ ] Concluir atividades visíveis.
- [ ] Abrir e conferir o relatório semanal.
- [ ] Abrir o banco de atividades e alternar ranking, histórico e classificação.
- [ ] Alternar período de 7, 30, 90 dias e todo o histórico.
- [ ] Exportar backup JSON e conferir marcações, preferências, ocorrências e arquivadas.
- [ ] Restaurar backup recém-exportado após confirmação.
- [ ] Restaurar backup antigo sem campos de ocorrências/arquivadas.
- [ ] Tentar importar JSON inválido e confirmar que nenhum dado é alterado.
- [ ] Exportar resumo TXT.
- [ ] Console sem erros e arquivos CSS/JS com HTTP 200.
- [ ] Confirmar publicação no GitHub Pages.

## Dados
Não limpar o armazenamento local durante testes de regressão. Se necessário, exportar backup antes de qualquer teste destrutivo.
