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
  ['versão do HTML', /<meta name="delta-version" content="V2\.0">/.test(html)],
  ['versão visível no cabeçalho', /aria-label="Versão atual V2\.0">V2\.0<\/span>/.test(html)],
  ['CSS externo com cache-busting', /assets\/css\/app\.css\?v=2\.0/.test(html)],
  ['JavaScript externo com cache-busting', /assets\/js\/app\.js\?v=2\.0/.test(html)],
  ['controles essenciais da interface', ['resetBtn','exportBtn','themeBtn','backupBtn','importBtn','searchInput','periodFilter','areaFilter','statusFilter','completeVisibleBtn','clearFiltersBtn'].every(id => html.includes('id="'+id+'"'))],
  ['50 atividades declaradas', (js.match(/\{id:"/g)||[]).length === 50],
  ['contagens nas duas áreas iniciais', html.includes('28 atividades cadastradas') && html.includes('22 atividades cadastradas')],
  ['contagens das categorias no filtro', ['Administrativo (13)','Comercial (12)','ADM e Comercial (3)','Estudos (1)','Trabalho pessoal (3)','IA e DroidManiacos (4)','Favoritos pessoais (4)','Redes sociais (2)','Lazer (3)','Atividades secundárias (3)','Outros (1)','Saúde (1)'].every(label => html.includes(label))],
  ['salvamento local', /localStorage\.setItem\(key\(\)/.test(js)],
  ['restauração com confirmação', /confirm\("Restaurar as atividades concluídas/.test(js)],
  ['versão nos estilos', css.includes('V1.8')]
];
let failed = 0;
for (const [name, ok] of checks) { console.log((ok ? 'OK  ' : 'FALHA  ') + name); if(!ok) failed++; }
if(failed){ console.error('Falharam '+failed+' verificação(ões).'); process.exit(1); }
console.log('Validação estática concluída: '+checks.length+' verificações aprovadas.');
