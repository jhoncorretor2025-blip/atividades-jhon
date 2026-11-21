# Histórico e checklist de preservação — Minhas Atividades

Este arquivo é a referência obrigatória antes de qualquer alteração futura.
Regra: não remover, substituir ou alterar uma funcionalidade existente sem solicitação explícita.
Antes de publicar: ler este arquivo, conferir os arquivos atuais, fazer a alteração mínima e executar o checklist de regressão.

## Estado funcional conhecido — V7.17

### Prioridade e contagem no modo celular
- O modo celular exibe a quantidade de atividades compatíveis no aviso.
- Cards com tempo estimado menor aparecem primeiro; cards sem estimativa ficam depois.
- A ordem normal das categorias e a numeração original dos cards não são alteradas fora do modo celular.

## Estado funcional conhecido — V7.16

### Modo celular, planejamento por tempo/energia e evolução
- Modo celular: o filtro rápido ativa uma apresentação em uma coluna, com alvos de toque ampliados e aviso de modo.
- Tempo: cada card permite salvar estimativa de 5, 15, 30, 60 ou mais de 60 minutos; o filtro mostra tarefas que cabem no tempo disponível ou sem estimativa.
- Energia: cada card permite classificar energia baixa, média ou alta; o filtro de energia mostra tarefas classificadas até aquele nível ou sem classificação.
- Tarefas adiadas: cada clique em "Ver mais tarde" incrementa um histórico por atividade; após dois adiamentos, aparece o painel "Tarefas que estou adiando", com sugestão de primeiro passo de 5 minutos.
- Evolução pessoal: o relatório semanal mostra tempo estimado em conclusões, projetos/checklists distintos concluídos, área com mais avanços e área com mais adiamentos; mantém a sequência e a comparação semanal.
- Tempo, energia e adiamentos entram no backup/restauração e na sincronização Google existente.
- Nenhuma tarefa cadastrada foi removida ou renomeada.

## Estado funcional conhecido — V7.15

### Novo card: criar e testar jogos
- Adicionado em `Pendências (variáveis)`: `pend-criar-testar-jogos`.
- Objetivo: explorar prompts de jogos no AutoPrompt, criar protótipos, testar ideias e mecânicas.
- Contexto: Minhoquinha é o primeiro jogo criado; a tarefa incentiva experimentar outros estilos.
- Nenhuma atividade existente foi removida ou alterada.

## Estado funcional conhecido — V7.14

### Filtro rápido 📱 Celular
- Adicionado botão "📱 Celular" nos filtros rápidos.
- O filtro mostra atividades cuja descrição tem indicação mobile (inclui "Pode fazer pelo celular" e "Parte pode ser feita pelo celular").
- Funciona em conjunto com o modo atual, filtros de frequência/área e situação.
- Não altera nem remove cards, dados ou registros; é apenas filtro visual.

## Estado funcional conhecido — V7.13

### Indicador mobile visível
- Cards com descrição contendo `📱 Pode fazer pelo celular` exibem uma etiqueta azul visível diretamente no card, sem precisar abrir "Ver descrição".
- Cards cuja descrição contém `📱 Pelo celular` exibem etiqueta "📱 Parte pode ser feita pelo celular".
- Alteração somente na renderização visual, CSS e cache-busting; dados e regras preservados.

## Estado funcional conhecido — V7.12

### Observações de atividades que podem ser feitas pelo celular
- Foram acrescentadas observações explícitas indicando que as atividades `postar-status-pessoal`, `rever-redes`, `videos-inscricao-youtube`, `tomar-vitaminas`, `olhar-steam`, `ver-shopee`, `rever-gpts`, `projetos-pessoais` e `personal-estudar-gemini` podem ser realizadas ou acompanhadas pelo celular.
- Em `projetos-pessoais`, a observação diferencia acompanhamento/planejamento/checklist pelo celular de tarefas que exigem computador.
- Apenas descrições foram alteradas; IDs, categorias, frequências, links, checklists e demais regras foram preservados.

## Estado funcional conhecido — V7.11

### Retirada de duas atividades de Vida pessoal
- `retorno-lead` e `conversas-antigas` foram movidas de `Ambos` para `Comercial`.
- Elas permanecem em Trabalho e não aparecem mais em Vida pessoal.
- IDs, frequência, prioridade, descrições e histórico foram preservados; somente a área foi alterada.

## Estado funcional conhecido — V7.10

### Ordem prioritária de Pendências (variáveis)
- A categoria mantém 26 atividades.
- Os quatro primeiros cards, nesta ordem, são: copiar fotos para o HD externo e liberar espaço no PC; entrar na segunda conta do celular; rever os HDs externos; estudar os melhores projetos do GitHub.
- Os outros 22 cards permanecem cadastrados, com IDs e conteúdos preservados.
- Nenhuma atividade foi duplicada ou removida.

## Estado funcional conhecido — V7.9

### Novas pendências variáveis
- Foram adicionados quatro cards à categoria Pendências (variáveis): acessar a segunda conta no celular; revisar HDs externos; estudar comunicação, hipnose e técnicas de influência em vendas; estudar os melhores projetos do GitHub.
- Os quatro cards usam a área Pendências (variáveis) e frequência Variável.
- A lista passou de 22 para 26 cards no catálogo atual. Todos os IDs e atividades que já existiam foram preservados.

## Estado funcional conhecido — V7.8

### Novas atividades em Vida pessoal
- Foram adicionados sete cards pessoais, sem alterar os IDs ou registros existentes.
- Estudos: habilidades do Gemini; funções do celular novo; lado humano da mulher.
- Favoritos pessoais: conferir o dinheiro do imóvel/condomínio.
- IA e DroidManiacos: arrumar o sistema da Biobel; criar NotebookLM e organizar/vincular as planilhas da Biobel; criar canal de IA sobre política.
- Todos usam áreas pessoais já existentes e permanecem fora de Trabalho e de Pendências (variáveis).

## Estado funcional conhecido — V7.7

### Classificação de imóveis antigos
- A atividade `imoveis-antigos` agora pertence somente à área `Comercial`, em vez de `Ambos`.
- Ela aparece no modo Trabalho e deixa de aparecer em Vida pessoal.
- O ID, a frequência semanal e a atividade em si foram preservados; apenas a categoria e a descrição foram ajustadas para o contexto comercial.

## Estado funcional conhecido — V7.6

### Filtro de esforço não pode esconder atividades ao trocar de categoria
- Ao entrar em Trabalho, Vida pessoal, Geral ou Pendências, o filtro de esforço (difficultyFilter) volta para all.
- O mesmo filtro é limpo ao voltar para a tela inicial e ao usar “Limpar filtros”.
- As classificações de esforço individuais permanecem salvas; somente o filtro temporário é redefinido. Isso evita abrir Vida pessoal com “Fáceis / rápidos” selecionado e receber uma lista vazia quando os cards não têm essa classificação.

## Estado funcional conhecido — V7.4

### Pendências variáveis — atualização da lista
- A categoria agora contém 26 cards.
- Os dois primeiros cards são: “Arrumar minhas contas bancárias (Caixa e Inter)” e “Configurar os aplicativos do meu celular novo”.
- O último card é: “Copiar fotos para o HD externo e liberar espaço no PC”, reunindo as duas ações solicitadas em uma única atividade.
- As 23 atividades anteriores foram mantidas sem remoção ou alteração de IDs.
- Todos os 26 cards continuam com `area:"Pendências (variáveis)"` e `period:"Variável"`; o contador do card inicial é dinâmico.

## Estado funcional conhecido — V7.3

### Cartões de seleção das quatro áreas
- O seletor inicial usa grade equilibrada de duas colunas em telas amplas e uma coluna em celulares, para exibir os quatro modos sem deixar o quarto card isolado.

### Separação correta das áreas
- `Pendências (variáveis)` é um modo independente: a lista, o resumo semanal e a contagem de voltas consideram somente atividades dessa área.
- O modo `Vida pessoal` exclui as pendências variáveis, mas continua incluindo tarefas compartilhadas (`Ambos`).
- O modo `Trabalho` mantém apenas `ADM`, `Comercial` e `Ambos`.
- O contador de Vida pessoal não soma Pendências variáveis e inclui as atividades compartilhadas; o contador de Pendências mostra os itens cadastrados nessa categoria.
- A visão `Geral` continua reunindo todas as áreas.

### Contador do card Pendências (variáveis)
- O card inicial usa o identificador exclusivo `pendingAreaCount`, separado do indicador de pendências do painel diário.
- `updateActivityCounts()` atualiza o contador com a quantidade de atividades cadastradas na área `Pendências (variáveis)`; atualmente são 26.
- O catálogo e as 23 atividades existentes foram preservados.

### Pendências variáveis
- Novo modo independente `pending`, com a área `Pendências (variáveis)`.
- 23 cards pontuais criados a partir da lista do usuário; não são recorrências diárias fixas.
- Pendências ficam fora dos modos Trabalho e Vida pessoal, mas aparecem em Geral e no modo Pendências.

### Rotina e cards
- As atividades `tomar-vitaminas`, `google-tarefa`, `postar-status-pessoal`, `videos-inscricao-youtube` e `projetos-pessoais` usam a área `Ambos` e devem aparecer tanto no modo pessoal quanto no modo trabalho.
- A atividade "Emitir Nota Fiscal" (id: nota-fiscal) deve aparecer somente nos dias 13–15 e 27–30 de cada mês.
- A atividade "Revisar o WhatsApp (Foco Total 08h-10h)" (id: whatsapp-focus) deve ocupar a posição fixa 8.
- A atividade "Verificar sinistros" (id: sinistros) já existe no catálogo, na área ADM, com link para a planilha.
- "Verificar sinistros" tem calendário padrão nos dias 05–07, 12–13 e 21–31.
- "Rever planilha" tem calendário padrão nos dias 01–19.
- "Organizar chaves do mural (toda sexta)" aparece somente às sextas-feiras (weekday 5 no JavaScript).
- Atividades sem calendário específico aparecem normalmente todos os dias.

### Modos de visualização
- A área `Ambos` é compartilhada: aparece nos modos pessoal e trabalho. As demais áreas de trabalho continuam fora do modo pessoal.

### Busca
- Quando o usuário digitar uma busca, atividades fora do calendário também devem ser encontradas.
- Sem texto de busca, o filtro principal deve aplicar `isTaskVisibleToday(t)`; a condição correta é `!!q || isTaskVisibleToday(t)`.
- Sem texto de busca, respeitar normalmente os calendários de visibilidade.
- A agenda semanal (`task.weekdays`) é combinada com a agenda mensal (`taskSchedules`) quando as duas existem.
- Atividades arquivadas ou pausadas continuam excluídas da busca e da lista.

### Google Planilhas
- Integração opcional via `google-apps-script/Code.gs`.
- O usuário cria o Apps Script, executa `setupGoogleActivitySync`, autoriza o Google e implanta como app da Web. Só então informa URL `/exec` e token nos dois dispositivos.
- O app envia alterações automaticamente após gravações no `localStorage` e consulta a nuvem a cada 20 segundos.
- Ao conectar dispositivo novo, primeiro baixa dados existentes; só envia backup local se a planilha ainda estiver vazia, evitando sobrescrever a base principal.
- O Supabase anterior continua disponível como integração opcional separada.

### Recursos existentes que devem ser preservados
- Painel inteligente e indicadores.
- Filtros rápidos.
- Histórico, contagem de conclusões, voltas e sequência de dias.
- Pausar, adiar, pular, concluir e arquivar/restaurar atividades.
- Checklists/subtarefas e links dos projetos.
- Preferências, tema, backup/restauração.
- Integração opcional de sincronização Supabase (configuração e sincronização manual).

## Checklist obrigatório antes de cada publicação
1. Conferir este documento e o histórico recente do Git.
2. Ler os arquivos atuais antes de editar; nunca trabalhar sobre uma cópia antiga.
3. Alterar somente os trechos necessários.
4. Validar sintaxe JavaScript dos arquivos modificados.
5. Verificar que nota-fiscal mantém os intervalos 13–15 e 27–30 e que a migração adiciona a regra sem apagar outras configurações.
5A. Verificar que chaves-mural usa weekdays [5], fica oculta segunda-feira e aparece sexta-feira.
6. Verificar que whatsapp-focus mantém fixedPosition: 8.
7. Verificar que sinistros continua no catálogo e que a busca encontra sinistros mesmo fora do calendário.
8. Verificar que, sem busca, o calendário continua escondendo cards fora dos dias configurados.
9. Atualizar cache-busting dos arquivos alterados e a versão do app.
10. Informar claramente o que foi alterado e o que foi efetivamente testado.
15. Verificar que Pendências (variáveis) aparece como modo separado, fica fora de Trabalho e Vida pessoal, e seus 26 cards aparecem em Geral e Pendências.
14. Google: conferir que conectar dispositivo novo faz pull primeiro e só faz upload se a planilha estiver vazia; não sobrescrever dados existentes automaticamente.
12. Testar especificamente a condição de visibilidade com busca vazia e com busca preenchida; busca vazia aplica o calendário, busca preenchida permite localizar cards fora da agenda. Não afirmar teste visual no navegador se ele não foi realizado.
13. Verificar que os cinco cards compartilhados aparecem nos modos pessoal e trabalho e que os demais cards de trabalho não aparecem no modo pessoal.
11. A numeração (`taskSequence`) deve conter somente números inteiros por ID; regras de calendário pertencem a `taskSchedules`, nunca à numeração.

## Observação sobre dados locais
As regras padrão vivem no código, mas configurações personalizadas podem estar salvas no localStorage de cada navegador. Migrações devem acrescentar novas regras sem apagar as existentes. Se uma regra estiver salva como lista vazia, verificar explicitamente se isso representa uma escolha personalizada antes de sobrescrevê-la.
