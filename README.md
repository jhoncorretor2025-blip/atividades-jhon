# Atividades do Jhon

Painel pessoal para acompanhar atividades profissionais e pessoais, com filtros, marcações diárias, relatórios, histórico de frequência e contador de dias consecutivos, taxa de conclusão por período, média diária e filtros por categoria nas estatísticas.

Versão atual: **V3.9**

Abra a aplicação publicada pelo GitHub Pages. As marcações e preferências ficam no armazenamento local deste navegador. Use o backup JSON para guardar uma cópia manual.

Consulte [a arquitetura do projeto](docs/architecture/estrutura.md) e [o roteiro de testes](docs/testing/testes.md).

## Organização V3.9
O JavaScript foi dividido em módulos clássicos carregados em ordem controlada: catálogo de atividades, armazenamento, backup, painel e análise. A divisão preserva as chaves locais, os IDs e o formato do backup. O painel calcula a sequência atual e o recorde de dias com ao menos uma atividade concluída. As estatísticas mostram a cobertura das atividades do catálogo e a média diária de conclusões, com filtros para Trabalho, Saúde, Estudos e Lazer. Não há sincronização automática.
