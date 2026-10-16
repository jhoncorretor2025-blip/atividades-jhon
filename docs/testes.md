# Testes manuais — Atividades do Jhon V2.2

- [ ] A página abre e mostra V2.2.
- [ ] As 28 atividades aparecem.
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


## Validação automatizada V2.2
O workflow `.github/workflows/validar-atividades.yml` executa `node .github/scripts/validar-atividades.js` em push, pull request e manualmente. Ele confere versão, caminhos CSS/JS, IDs de controles essenciais e os 28 identificadores de atividade. Isso é uma verificação estática, não substitui os testes reais no navegador.


## Correção emergencial V2.2
Corrigidos caracteres de quebra de linha literais que interrompiam a execução do JavaScript. A validação estática confirma os trechos e a versão; ainda é necessário validar o site no navegador.


## V2.2 — Rotina pessoal integrada
- [ ] Confirmar as 28 atividades de trabalho existentes.
- [ ] Confirmar a inclusão das 22 rotinas novas sem duplicar Emitir Nota Fiscal.
- [ ] Testar filtros por categoria e frequência, incluindo tarefas noturnas.
- [ ] Testar marcações e exportação de resumo.


## V2.2 — Escolha inicial de área
- [ ] Tela inicial mostra dois cards: Trabalho e Vida pessoal.
- [ ] Card Trabalho filtra as tarefas administrativas e comerciais.
- [ ] Card Vida pessoal mostra estudos, projetos pessoais, saúde e lazer.
- [ ] Botão Trocar área retorna à escolha inicial.
- [ ] Filtros de busca, frequência e situação funcionam dentro da área escolhida.
- [ ] A lista continua com 50 atividades.


## V2.2 — Contagem de atividades
- [ ] Cards iniciais exibem 28 atividades de trabalho e 22 pessoais.
- [ ] Filtro por área mostra o número de atividades por categoria.
- [ ] Conferir que as contagens correspondem às tarefas cadastradas.


## V2.2 — Card Geral
- [ ] A tela inicial apresenta Geral (50), Trabalho (28) e Vida pessoal (22).
- [ ] Geral mostra as 50 atividades juntas.
- [ ] Trabalho mostra somente as 28 tarefas profissionais.
- [ ] Vida pessoal mostra somente as 22 tarefas pessoais.
- [ ] Trocar área retorna à tela inicial.


## V2.2 — regressão de backup, acessibilidade e privacidade
- [ ] Backup com estrutura incompatível ou IDs desconhecidos é rejeitado sem alterar dados.
- [ ] Backup com IDs duplicados é rejeitado.
- [ ] Filtro Noturno apresenta etiqueta visual coerente.
- [ ] Ajuda informa armazenamento local, ausência de sincronização e integrações.
- [ ] Foco visível alcança botões, filtros e cards iniciais por teclado.
- [ ] Confirmar que a versão V2.2 coincide em HTML, título, CSS/JS, rodapé e redirecionamento antigo.
