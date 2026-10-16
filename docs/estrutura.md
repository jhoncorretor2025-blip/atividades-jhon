# Atividades do Jhon — estrutura V1.8

## Organização
- `index.html`: entrada principal do GitHub Pages.
- `teste.html`: compatibilidade com o endereço antigo; encaminha para a página principal.
- `assets/css/app.css`: estilos, temas e responsividade.
- `assets/js/app.js`: lógica da interface, atividades, armazenamento local e backup.
- `docs/estrutura.md`: arquitetura e cuidados de manutenção.
- `docs/testes.md`: roteiro de validação manual.

## Dados e privacidade
As marcações e preferências são guardadas no localStorage deste navegador. Não existe sincronização automática. O backup JSON é manual; valide o arquivo e confirme antes de substituir marcações. Nunca inclua senhas, tokens ou chaves secretas no backup.

## Próxima evolução
Separar `app.js` em módulos independentes somente quando houver testes de regressão automatizados para preservar a ordem e as dependências. A extração atual evita mudar a lógica funcional durante a primeira migração.
