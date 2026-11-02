# Atividades do Jhon

Painel com tela inicial para escolher entre geral (51 atividades), trabalho (28) e vida pessoal (22), além de contagens por categoria nos filtros.

Versão atual: **V3.5**

Abra a página publicada pelo GitHub Pages. O estado das atividades fica no armazenamento local do navegador; use o backup JSON para guardar uma cópia manual.

Consulte [a estrutura do projeto](docs/architecture/estrutura.md) e [o roteiro de testes](docs/testing/testes.md).

Preferências disponíveis: tema claro/escuro. O backup é manual e local; não existe sincronização automática. A restauração valida o arquivo e pede confirmação antes de substituir as marcações do dia.

## Análise V3.2
O banco de atividades permite comparar os últimos 7, 30 ou 90 dias e todo o histórico, mostrando volume de realizações, quantas atividades tiveram ao menos um registro e quantas ficaram sem execução no período. A análise usa os registros já existentes e não altera as marcações diárias.

## Organização V3.5
A documentação técnica fica em `docs/architecture/`, o roteiro de testes em `docs/testing/` e o validador automatizado em `tests/`. Os arquivos públicos permanecem na raiz e em `assets/` para manter a publicação no GitHub Pages.
