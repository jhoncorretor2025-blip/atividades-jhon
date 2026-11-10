# Histórico e checklist de preservação — Minhas Atividades

Este arquivo é a referência obrigatória antes de qualquer alteração futura.
Regra: não remover, substituir ou alterar uma funcionalidade existente sem solicitação explícita.
Antes de publicar: ler este arquivo, conferir os arquivos atuais, fazer a alteração mínima e executar o checklist de regressão.

## Estado funcional conhecido — V6.5

### Rotina e cards
- A atividade "Emitir Nota Fiscal" (id: nota-fiscal) deve aparecer somente nos dias 13–15 e 27–30 de cada mês.
- A atividade "Revisar o WhatsApp (Foco Total 08h-10h)" (id: whatsapp-focus) deve ocupar a posição fixa 8.
- A atividade "Verificar sinistros" (id: sinistros) já existe no catálogo, na área ADM, com link para a planilha.
- "Verificar sinistros" tem calendário padrão nos dias 05–07, 12–13 e 21–31.
- "Rever planilha" tem calendário padrão nos dias 01–19.
- "Organizar chaves do mural (toda sexta)" aparece somente às sextas-feiras (weekday 5 no JavaScript).
- Atividades sem calendário específico aparecem normalmente todos os dias.

### Busca
- Quando o usuário digitar uma busca, atividades fora do calendário também devem ser encontradas.
- Sem texto de busca, o filtro principal deve aplicar `isTaskVisibleToday(t)`; a condição correta é `!!q || isTaskVisibleToday(t)`.
- Sem texto de busca, respeitar normalmente os calendários de visibilidade.
- A agenda semanal (`task.weekdays`) é combinada com a agenda mensal (`taskSchedules`) quando as duas existem.
- Atividades arquivadas ou pausadas continuam excluídas da busca e da lista.

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
12. Testar especificamente a condição de visibilidade com busca vazia e com busca preenchida; busca vazia aplica o calendário, busca preenchida permite localizar cards fora da agenda. Não afirmar teste visual no navegador se ele não foi realizado.
11. A numeração (`taskSequence`) deve conter somente números inteiros por ID; regras de calendário pertencem a `taskSchedules`, nunca à numeração.

## Observação sobre dados locais
As regras padrão vivem no código, mas configurações personalizadas podem estar salvas no localStorage de cada navegador. Migrações devem acrescentar novas regras sem apagar as existentes. Se uma regra estiver salva como lista vazia, verificar explicitamente se isso representa uma escolha personalizada antes de sobrescrevê-la.
