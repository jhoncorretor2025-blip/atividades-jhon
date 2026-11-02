# Atividades do Jhon — estrutura V3.3

## Organização do repositório
- `index.html`: entrada principal do GitHub Pages; permanece na raiz.
- `teste.html`: compatibilidade com o endereço antigo.
- `assets/css/app.css`: estilos, temas e responsividade.
- `assets/js/app.js`: lógica principal da interface, atividades, armazenamento local e backup.
- `assets/js/analytics.js`: histórico de ocorrências, ranking e classificação.
- `docs/architecture/estrutura.md`: arquitetura e cuidados de manutenção.
- `docs/testing/testes.md`: roteiro de validação manual e regressão.
- `tests/validar-atividades.js`: validação automatizada estática.
- `.github/workflows/validar-atividades.yml`: execução da validação.
- `README.md`: apresentação e atalhos para a documentação.

## Cuidados com a publicação
O GitHub Pages publica a partir da raiz do repositório. Por isso, `index.html`, `teste.html` e `assets/` permanecem nos caminhos atuais. Nesta etapa, somente documentação e teste automatizado foram reorganizados.

## Dados e privacidade
As marcações diárias e preferências são guardadas no localStorage deste navegador. Não existe sincronização automática ou integração externa. O backup JSON é manual e contém IDs/títulos das atividades, marcações atuais, tema e histórico de ocorrências; não inclui senhas, tokens ou chaves secretas. A importação limita o arquivo a 2 MB, valida estrutura e IDs e pede confirmação antes de substituir as marcações do dia.

## Compatibilidade de dados
Os identificadores das atividades, as chaves do localStorage e o formato do backup foram preservados. A reorganização não migra, apaga nem reescreve dados do navegador.

## Versão atual
A versão publicada é **V3.3**. Esta versão reorganiza documentação e validação automatizada sem alterar o comportamento da aplicação.

## Próxima evolução
A separação de `app.js` em módulos independentes fica para uma etapa posterior, após ampliar os testes de regressão para proteger a ordem de carregamento e as dependências compartilhadas.
