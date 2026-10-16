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
const structure = read('docs/estrutura.md');
const tests = read('docs/testes.md');
const legacy = read('teste.html');
const all = [html,js,css,structure,tests,legacy];
let appSyntaxValid = true;
try { new vm.Script(js, { filename: 'assets/js/app.js' }); } catch (error) { appSyntaxValid = false; console.error('Erro de sintaxe em app.js:', error.message); }
const checks = [
  ['versão V2.2 consistente nos arquivos ativos', all.every(s => !/V2\.1/.test(s)) && /<meta name="delta-version" content="V2\.2">/.test(html)],
  ['versão visível no cabeçalho', /aria-label="Versão atual V2\.2">V2\.2<\/span>/.test(html)],
  ['CSS e JavaScript com cache-busting V2.2', /assets\/css\/app\.css\?v=2\.2/.test(html) && /assets\/js\/app\.js\?v=2\.2/.test(html)],
  ['redirecionamento antigo aponta para V2.2', /url=\.\/index\.html\?v=2\.2/.test(legacy) && /index\.html\?v=2\.2/.test(legacy)],
  ['sintaxe JavaScript válida', appSyntaxValid],
  ['50 atividades declaradas', (js.match(/\{id:"/g)||[]).length === 50],
  ['cards Geral, Trabalho e Vida pessoal', html.includes('50 atividades cadastradas') && html.includes('28 atividades cadastradas') && html.includes('22 atividades cadastradas')],
  ['controles essenciais presentes', ['resetBtn','exportBtn','themeBtn','backupBtn','importBtn','helpBtn','prefsBtn','searchInput','periodFilter','areaFilter','statusFilter','completeVisibleBtn','clearFiltersBtn'].every(id => html.includes('id="'+id+'"'))],
  ['salvamento local e preferências', /localStorage\.setItem\(key\(\)/.test(js) && /localStorage\.setItem\(PREF_KEY/.test(js)],
  ['importação limitada e valida estrutura', /file\.size>2\*1024\*1024/.test(js) && /data\.schema!=="atividades-jhon-backup"/.test(js) && /new Set\(data\.doneIds\)\.size!==data\.doneIds\.length/.test(js)],
  ['confirmação antes de restaurar', /confirm\("Restaurar as atividades concluídas/.test(js)],
  ['tema escuro e foco visível', /body\[data-theme="dark"\]/.test(css) && /\.toolbar-action:focus-visible/.test(css)],
  ['etiqueta visual para tarefas noturnas', /t\.period==="Noturno".*NOTURNO/.test(js)],
  ['privacidade documenta armazenamento local sem sincronização', /localStorage/.test(structure) && /Não existe sincronização automática/.test(structure)],
  ['roteiro de regressão atualizado', /V2\.2 — regressão de backup/.test(tests)]
];
let failed=0;
for(const [name,ok] of checks){console.log((ok?'OK  ':'FALHA  ')+name);if(!ok)failed++;}
if(failed){console.error('Falharam '+failed+' verificação(ões).');process.exit(1);}
console.log('Validação estática concluída: '+checks.length+' verificações aprovadas.');
