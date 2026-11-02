# Atividades do Jhon — arquitetura V3.7

## Estrutura do repositório
- `index.html`: entrada do GitHub Pages.
- `teste.html`: redirecionamento compatível com endereço antigo.
- `assets/css/app.css`: estilos, temas e responsividade.
- `assets/js/tasks.js`: catálogo de atividades e contagens por área.
- `assets/js/storage.js`: estado diário, preferências e persistência local.
- `assets/js/backup.js`: exportação e restauração do backup JSON.
- `assets/js/dashboard.js`: interface, filtros, marcações, relatórios e ações do painel.
- `assets/js/analytics.js`: ocorrências, ranking, histórico e classificação.
- `tests/validar-atividades.js`: validação estática e de sintaxe.
- `.github/workflows/validar-atividades.yml`: execução automática da validação.
- `docs/`: documentação e roteiro de testes.

## Ordem de carregamento
Os scripts usam JavaScript clássico com atributo `defer`, mantendo a ordem no HTML:
1. `tasks.js`
2. `storage.js`
3. `backup.js`
4. `dashboard.js`
5. `analytics.js`

Essa ordem mantém as declarações compartilhadas disponíveis para os módulos seguintes. O painel e a análise continuam usando as mesmas entidades globais compatíveis com a estrutura anterior.

## Dados e compatibilidade
Foram preservadas as chaves `atividades-jhon:AAAA-MM-DD`, `atividades-jhon:skipped:AAAA-MM-DD` e `atividades-jhon:preferences`, além dos identificadores das 51 atividades. Não há migração nem limpeza automática de dados locais.

O backup mantém `schema: atividades-jhon-backup` e `schemaVersion: 1`. A exportação inclui marcações do dia, preferências, histórico de ocorrências e atividades arquivadas. A restauração aceita backups anteriores sem os campos opcionais de histórico, valida IDs e limita o arquivo a 2 MB.

## Privacidade
Os dados ficam no `localStorage` do navegador e do dispositivo. Não existe sincronização automática nem envio para servidor. O backup JSON é manual e deve ser guardado em local seguro.

## Versão
Versão atual: **V3.7**. A mudança modulariza o JavaScript sem alterar o layout ou o fluxo funcional pretendido.
