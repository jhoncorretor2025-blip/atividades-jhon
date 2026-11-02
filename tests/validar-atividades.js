#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const html = read('index.html');
const legacy = read('teste.html');
const tasks = read('assets/js/tasks.js');
const storage = read('assets/js/storage.js');
const backup = read('assets/js/backup.js');
const dashboard = read('assets/js/dashboard.js');
const analytics = read('assets/js/analytics.js');
const css = read('assets/css/app.css');
const structure = read('docs/architecture/estrutura.md');
const tests = read('docs/testing/testes.md');
const modules = [
  ['assets/js/tasks.js', tasks],
  ['assets/js/storage.js', storage],
  ['assets/js/backup.js', backup],
  ['assets/js/dashboard.js', dashboard],
  ['assets/js/analytics.js', analytics]
];
const syntax = modules.map(([name,source]) => {
  try { new vm.Script(source,{filename:name}); return true; }
  catch(error) { console.error('Erro de sintaxe em '+name+':',error.message); return false; }
});
const taskCount = tasks.split('{id:"').length - 1;
const scriptPaths = [
  './assets/js/tasks.js?v=3.9',
  './assets/js/storage.js?v=3.9',
  './assets/js/backup.js?v=3.9',
  './assets/js/dashboard.js?v=3.9',
  './assets/js/analytics.js?v=3.9'
];
const scriptPositions = scriptPaths.map(p=>html.indexOf(p));
const orderedScripts = scriptPositions.every((p,i)=>p>=0&&(i===0||p>scriptPositions[i-1]));
const checks = [
  ['cinco módulos JavaScript existem', modules.every(([name])=>fs.existsSync(path.join(root,name)))],
  ['app.js antigo removido da estrutura', !fs.existsSync(path.join(root,'assets/js/app.js'))],
  ['scripts carregados na ordem correta', orderedScripts],
  ['versão V3.9 no meta e no cabeçalho', html.includes('<meta name="delta-version" content="V3.9">') && html.includes('aria-label="Versão atual V3.9">V3.9</span>')],
  ['cache-busting V3.9 nos cinco módulos e CSS', [...scriptPaths,'./assets/css/app.css?v=3.9'].every(x=>html.includes(x))],
  ['rodapé informa V3.9', html.includes('V3.9 · Os itens')],
  ['redirecionamento antigo aponta para V3.9', legacy.includes('index.html?v=3.9') && legacy.includes('V3.9')],
  ['versão V3.9 na ajuda e no backup', dashboard.includes('Versão: V3.9') && backup.includes('appVersion:"V3.9"')],
  ['sintaxe de todos os módulos válida', syntax.every(Boolean)],
  ['51 atividades cadastradas e IDs preservados', taskCount===51 && tasks.includes('id:"whatsapp-focus"') && tasks.includes('id:"tomar-creatina-20h"')],
  ['contagens dinâmicas por área preservadas', tasks.includes('function updateActivityCounts') && ['generalCount','workCount','personalCount'].every(id=>html.includes('id="'+id+'"'))],
  ['chaves históricas do armazenamento preservadas', storage.includes('"atividades-jhon:"') && storage.includes('"atividades-jhon:skipped:"') && storage.includes('"atividades-jhon:preferences"')],
  ['persistência local de concluídas, puladas e preferências', storage.includes('localStorage.getItem(key()') && storage.includes('localStorage.setItem(key()') && storage.includes('localStorage.setItem(skipKey()')],
  ['backup valida tamanho, estrutura e IDs', backup.includes('file.size>2*1024*1024') && backup.includes('data.schema!=="atividades-jhon-backup"') && backup.includes('validIds.has(id)')],
  ['backup mantém histórico e atividades arquivadas', backup.includes('occurrences:analytics?analytics.getLogs():[]') && backup.includes('archivedIds:analytics?analytics.getArchived():[]') && analytics.includes('restore:(nextLogs,nextArchived)')],
  ['importação mantém compatibilidade com backup anterior', backup.includes('if(data.occurrences!==undefined)') && backup.includes('if(data.archivedIds!==undefined)')],
  ['controles essenciais do painel preservados', ['resetBtn','exportBtn','themeBtn','backupBtn','importBtn','helpBtn','prefsBtn','searchInput','periodFilter','areaFilter','statusFilter','completeVisibleBtn','clearFiltersBtn'].every(id=>html.includes('id="'+id+'"'))],
  ['renderização, filtros e relatórios no dashboard', dashboard.includes('function render()') && dashboard.includes('function filtered()') && dashboard.includes('function renderWeeklyReport()')],
  ['streak atual, recorde e últimos sete dias', html.includes('id="currentStreak"') && html.includes('id="bestStreak"') && dashboard.includes('function getStreakStats()') && dashboard.includes('function renderStreak()') && dashboard.includes('renderStreak();') && css.includes('.streak-panel')],
  ['streak considera dias com ao menos uma atividade concluída', dashboard.includes('value.length)activeDates.add') && dashboard.includes('activeDates.has(today)') && dashboard.includes('activeDates.has(yesterday)')],
  ['análise por período, histórico e ranking preservados', html.includes('id="analyticsPeriod"') && analytics.includes('const periodStart=') && analytics.includes('Frequência por atividade')],
  ['indicadores de taxa de conclusão e média diária', analytics.includes('function completionMetrics(data)') && analytics.includes('distinct/data.length*100') && analytics.includes('periodRows.length/dayCount') && analytics.includes('Taxa de conclusão geral (%)') && analytics.includes('Média diária de conclusões')],
  ['filtros rápidos de Trabalho, Saúde, Estudos e Lazer', ['all','work','health','studies','leisure'].every(category=>html.includes('data-category="'+category+'"')) && analytics.includes('currentCategory=b.dataset.category')],
  ['classificação de atividades por categoria definida', analytics.includes('["ADM","Comercial","Ambos","Trabalho pessoal"]') && analytics.includes('["tomar-vitaminas","treino-academia","higiene-sono","tomar-creatina-20h"]') && analytics.includes('["Estudos","IA e DroidManiacos"]') && analytics.includes('task.area==="Lazer"')],
  ['tema escuro e foco visível preservados', css.includes('body[data-theme="dark"]') && css.includes('button:focus-visible')],
  ['privacidade e ordem dos módulos documentadas', structure.includes('localStorage') && structure.includes('Ordem de carregamento') && structure.includes('V3.9')],
  ['roteiro manual de regressão V3.9 atualizado', tests.includes('Atividades do Jhon V3.9') && tests.includes('Restaurar backup antigo')]
];
let failed=0;
for(const [name,ok] of checks){console.log((ok?'OK  ':'FALHA  ')+name);if(!ok)failed++;}
if(failed){console.error('Falharam '+failed+' verificação(ões).');process.exit(1);}
console.log('Validação estática concluída: '+checks.length+' verificações aprovadas.');
