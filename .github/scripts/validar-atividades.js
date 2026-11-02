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
const taskCount = js.split('{id:"').length - 1;
const skippedValidation = js.indexOf('skippedIds.every');
const doneWrite = js.indexOf('done=new Set(data.doneIds)');
const checks = [
  ['versão V3.1 no meta e no cabeçalho', html.includes('<meta name="delta-version" content="V3.1">') && html.includes('aria-label="Versão atual V3.1">V3.1</span>')],
  ['cache-busting V3.1 nos três arquivos', ['app.css?v=3.1','app.js?v=3.1','analytics.js?v=3.1'].every(x => html.includes(x))],
  ['rodapé informa V3.1', html.includes('V3.1 · Os itens')],
  ['redirecionamento antigo aponta para V3.1', legacy.includes('index.html?v=3.1') && legacy.includes('V3.1')],
  ['versão V3.1 na ajuda e no backup', js.includes('Versão: V3.1') && js.includes('appVersion:"V3.1"')],
  ['versão V3.1 no backup do banco de atividades', analytics.includes('appVersion:"V3.1"')],
  ['sintaxe JavaScript válida', appSyntaxValid],
  ['51 atividades cadastradas', taskCount === 51],
  ['contagens dinâmicas nos cards e filtros', ['generalCount','workCount','personalCount'].every(id => html.includes('id="'+id+'"')) && js.includes('function updateActivityCounts')],
  ['controles essenciais presentes', ['resetBtn','exportBtn','themeBtn','backupBtn','importBtn','helpBtn','prefsBtn','searchInput','periodFilter','areaFilter','statusFilter','completeVisibleBtn','clearFiltersBtn'].every(id => html.includes('id="'+id+'"'))],
  ['salvamento local e preferências', js.includes('localStorage.setItem(key()') && js.includes('localStorage.setItem(PREF_KEY')],
  ['importação limitada e valida estrutura', js.includes('file.size>2*1024*1024') && js.includes('data.schema!=="atividades-jhon-backup"')],
  ['IDs concluídos e pulados validados antes de gravar', skippedValidation >= 0 && skippedValidation < doneWrite],
  ['concluídas hoje respeita filtros aplicados', js.includes('const completed=list.filter(t=>done.has(t.id))')],
  ['tema escuro e foco visível', css.includes('body[data-theme="dark"]') && css.includes('button:focus-visible')],
  ['etiqueta visual para tarefas noturnas', js.includes('t.period==="Noturno"') && js.includes('NOTURNO')],
  ['privacidade documenta armazenamento local', structure.includes('localStorage') && structure.includes('Não existe sincronização automática')],
  ['roteiro de regressão V3.1 atualizado', tests.includes('V3.1 — melhorias e regressão')]
];
let failed = 0;
for (const [name,ok] of checks) { console.log((ok ? 'OK  ' : 'FALHA  ') + name); if (!ok) failed++; }
if (failed) { console.error('Falharam '+failed+' verificação(ões).'); process.exit(1); }
console.log('Validação estática concluída: '+checks.length+' verificações aprovadas.');
