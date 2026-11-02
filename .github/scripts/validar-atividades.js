#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const html = read('index.html');
const js = read('assets/js/app.js');
const css = read('assets/css/app.css');
const analytics = read('assets/js/analytics.js');
const structure = read('docs/estrutura.md');
const tests = read('docs/testes.md');
const legacy = read('teste.html');
let appSyntaxValid = true;
try { new vm.Script(js, { filename: 'assets/js/app.js' }); }
catch (error) { appSyntaxValid = false; console.error('Erro de sintaxe em app.js:', error.message); }
const taskCount = (js.match(/\\{id:"/g) || []).length;
const checks = [
  ['versão atual V3.1 no meta e no cabeçalho', /<meta name="delta-version" content="V3.1">/.test(html) && /aria-label="Versão atual V3.1">V3.1<\\/span>/.test(html)],
  ['cache-busting V3.1 nos três arquivos', ['app.css?v=3.1','app.js?v=3.1','analytics.js?v=3.1'].every(x => html.includes(x))],
  ['rodapé informa V3.1', /V3.1 · Os itens/.test(html)],
  ['redirecionamento antigo aponta para V3.1', /url=\\.\\/index\\.html\\?v=3\\.1/.test(legacy) && /V3.1/.test(legacy)],
  ['versão V3.1 na ajuda e no backup', /Versão: V3.1/.test(js) && /appVersion:"V3.1"/.test(js)],
  ['versão V3.1 no backup do banco de atividades', /appVersion:"V3.1"/.test(analytics)],
  ['sintaxe JavaScript válida', appSyntaxValid],
  ['51 atividades cadastradas', taskCount === 51],
  ['contagens dinâmicas nos cards e filtros', ['generalCount','workCount','personalCount'].every(id => html.includes('id="'+id+'"')) && /function updateActivityCounts/.test(js)],
  ['controles essenciais presentes', ['resetBtn','exportBtn','themeBtn','backupBtn','importBtn','helpBtn','prefsBtn','searchInput','periodFilter','areaFilter','statusFilter','completeVisibleBtn','clearFiltersBtn'].every(id => html.includes('id="'+id+'"'))],
  ['salvamento local e preferências', /localStorage\\.setItem\\(key\\(\\)/.test(js) && /localStorage\\.setItem\\(PREF_KEY/.test(js)],
  ['importação limitada e valida estrutura', /file\\.size>2\\*1024\\*1024/.test(js) && /data\\.schema!=="atividades-jhon-backup"/.test(js)],
  ['IDs concluídos e pulados são validados antes de gravar', js.indexOf('skippedIds.every') >= 0 && js.indexOf('skippedIds.every') < js.indexOf('done=new Set(data.doneIds)')],
  ['concluídas hoje respeita filtros aplicados', /const completed=list\\.filter\\(t=>done\\.has\\(t\\.id\\)\\)/.test(js)],
  ['tema escuro e foco visível', /body\\[data-theme="dark"\\]/.test(css) && /button:focus-visible/.test(css)],
  ['etiqueta visual para tarefas noturnas', /t\\.period==="Noturno".*NOTURNO/.test(js)],
  ['privacidade documenta armazenamento local', /localStorage/.test(structure) && /Não existe sincronização automática/.test(structure)],
  ['roteiro de regressão V3.1 atualizado', /V3.1 — melhorias e regressão/.test(tests)]
];
let failed = 0;
for (const [name,ok] of checks) { console.log((ok ? 'OK  ' : 'FALHA  ') + name); if (!ok) failed++; }
if (failed) { console.error('Falharam '+failed+' verificação(ões).'); process.exit(1); }
console.log('Validação estática concluída: '+checks.length+' verificações aprovadas.');
