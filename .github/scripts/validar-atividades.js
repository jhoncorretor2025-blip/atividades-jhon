#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const html = read('index.html');
const js = read('assets/js/app.js');
const css = read('assets/css/app.css');
const checks = [
  ['versão do HTML', /<meta name="delta-version" content="V1\.6">/.test(html)],
  ['versão visível no cabeçalho', /aria-label="Versão atual V1\.6">V1\.6<\/span>/.test(html)],
  ['CSS externo com cache-busting', /assets\/css\/app\.css\?v=1\.6/.test(html)],
  ['JavaScript externo com cache-busting', /assets\/js\/app\.js\?v=1\.6/.test(html)],
  ['controles essenciais da interface', ['resetBtn','exportBtn','themeBtn','backupBtn','importBtn','searchInput','periodFilter','areaFilter','statusFilter','completeVisibleBtn','clearFiltersBtn'].every(id => html.includes('id="'+id+'"'))],
  ['28 atividades declaradas', (js.match(/\{id:"/g)||[]).length === 28],
  ['salvamento local', /localStorage\.setItem\(key\(\)/.test(js)],
  ['restauração com confirmação', /confirm\("Restaurar as atividades concluídas/.test(js)],
  ['versão nos estilos', css.includes('V1.7')]
];
let failed = 0;
for (const [name, ok] of checks) { console.log((ok ? 'OK  ' : 'FALHA  ') + name); if(!ok) failed++; }
if(failed){ console.error('Falharam '+failed+' verificação(ões).'); process.exit(1); }
console.log('Validação estática concluída: '+checks.length+' verificações aprovadas.');
