# Atividades do Jhon — estrutura V2.2

## Organização
- `index.html`: entrada principal do GitHub Pages.
- `teste.html`: compatibilidade com o endereço antigo; encaminha para a página principal.
- `assets/css/app.css`: estilos, temas e responsividade.
- `assets/js/app.js`: lógica da interface, atividades, armazenamento local e backup.
- `docs/estrutura.md`: arquitetura e cuidados de manutenção.
- `docs/testes.md`: roteiro de validação manual.

## Dados e privacidade
As marcações diárias e preferências são guardadas no localStorage deste navegador. Não existe sincronização automática ou integração externa. O backup JSON é manual e contém IDs/títulos das atividades, marcações atuais e tema; não inclui senhas, tokens ou chaves secretas. A importação limita o arquivo a 2 MB, valida estrutura e IDs e pede confirmação antes de substituir as marcações do dia.

## Próxima evolução
Separar `app.js` em módulos independentes somente quando houver testes de regressão automatizados para preservar a ordem e as dependências. A extração atual evita mudar a lógica funcional durante a primeira migração.
