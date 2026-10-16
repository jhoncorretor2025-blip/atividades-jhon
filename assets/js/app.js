
const tasks = [
{id:"whatsapp-focus",title:"Revisar o WhatsApp (Foco Total 08h-10h)",icon:"◷",area:"ADM",period:"Diário",priority:"Alta",attention:true,desc:"Rotina matinal de foco no WhatsApp.",urgent:true},
{id:"nota-fiscal",title:"Emitir Nota Fiscal",icon:"♧",area:"ADM",period:"Mensal",priority:"Crítica",critical:true,desc:"Dia 15: emitir as notas fiscais para evitar multas e atrasos no faturamento.",attention:true},
{id:"status-social",title:"Colocar foto no Status do WhatsApp e Instagram (Deixar Nota)",icon:"◎",area:"Comercial",period:"Diário",priority:"Normal",desc:"Atualizar os stories e status com fotos de imóveis, anúncios ou comunicados relevantes e deixar uma nota explicativa."},
{id:"pastas-entrada-saida",title:"Verificar pastas de entrada e saída",icon:"▱",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"conversa-prestador",title:"Verificar conversa de prestador",icon:"⚒",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"facebook-interessados",title:"Revisar mensagens do Facebook (Interessados)",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:"Verificar pessoas que mandaram mensagem nos anúncios."},
{id:"avalyst",title:"Verificar o Avalyst",icon:"♧",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"facebook-aluguel",title:"Revisar o Facebook (Anúncios de Aluguel)",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:""},
{id:"retorno-lead",title:"Retornar contato com quem demonstrou interesse e ainda não respondeu",icon:"◷",area:"Ambos",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:"Follow-up de atendimento para leads que esfriaram ou aguardam retorno."},
{id:"revisao-whatsapp",title:"Revisão de WhatsApp",icon:"◷",area:"Comercial",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:""},
{id:"divulgar-facebook",title:"Divulgar anúncios no Facebook",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:""},
{id:"post-facebook",title:"Postar no Facebook",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:""},
{id:"rever-chave",title:"Rever chave",icon:"◷",area:"ADM",period:"Semanal",priority:"Alta",attention:true,urgent:true,desc:"Toda sexta-feira."},
{id:"responder-facebook",title:"Responder mensagem do Facebook",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:""},
{id:"cobranca-condominio",title:"Cobrança de inadimplência de condomínio",icon:"$",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"chaves-mural",title:"Organizar chaves do mural (toda sexta)",icon:"⚿",area:"ADM",period:"Semanal",priority:"Normal",desc:""},
{id:"sinistros",title:"Verificar sinistros",icon:"♧",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"inadimplencia-cobrancas",title:"Verificar inadimplência e cobranças",icon:"◷",area:"ADM",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:""},
{id:"emails",title:"Verificar e-mails",icon:"✉",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"planilha",title:"Rever planilha",icon:"▤",area:"ADM",period:"Semanal",priority:"Normal",desc:""},
{id:"conversas-antigas",title:"Verificar conversas antigas",icon:"◴",area:"Ambos",period:"Diário",priority:"Normal",desc:""},
{id:"anuncios-antigos",title:"Rever anúncios antigos",icon:"▤",area:"Comercial",period:"Semanal",priority:"Normal",desc:""},
{id:"captacao-proprietarios",title:"Entrar em contato com proprietários e buscar novas captações",icon:"◷",area:"Comercial",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:"Prospecção ativa e contato direto com proprietários para novos imóveis de locação."},
{id:"whatsapp-pessoal",title:"Ver WhatsApp pessoal (Clientes de Locação e Vendas)",icon:"◷",area:"Comercial",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:"Checar conversas e mensagens no WhatsApp pessoal onde há clientes de locação e vendas."},
{id:"etiquetas-interessados",title:"Arrumar etiqueta de interessados",icon:"◇",area:"Comercial",period:"Diário",priority:"Normal",desc:"Organizar e aplicar as etiquetas corretas aos contatos interessados no WhatsApp."},
{id:"imoveis-antigos",title:"Verificar imóveis antigos se ainda estão disponíveis",icon:"⌂",area:"Ambos",period:"Semanal",priority:"Normal",desc:"Revisar disponibilidade da carteira de imóveis antigos (ação administrativa e comercial)."},
{id:"fotos-vilson",title:"Verificar fotos que o Vilson cadastrou se tem algum imóvel não cadastrado",icon:"▧",area:"ADM",period:"Diário",priority:"Normal",desc:"Auditar a pasta/acervo de fotos do Vilson para identificar e cadastrar novos imóveis pendentes."},
{id:"etiquetas-whatsapp",title:"Verificar etiquetas do WhatsApp",icon:"◇",area:"Comercial",period:"Diário",priority:"Normal",desc:"Revisar contatos e leads categorizados por etiquetas coloridas para garantir que nenhum cliente fique sem retorno."}
];
const $=id=>document.getElementById(id);
const localDate=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const key=()=>"atividades-jhon:"+localDate();
function loadDone(){try{return JSON.parse(localStorage.getItem(key())||"[]")}catch{return[]}}
let done=new Set(loadDone());\nconst PREF_KEY="atividades-jhon:preferences";\nfunction loadPrefs(){try{return JSON.parse(localStorage.getItem(PREF_KEY)||"{}")}catch{return {}}}\nlet prefs=loadPrefs();\nfunction applyPrefs(){document.body.dataset.theme=prefs.theme==="dark"?"dark":"light";$("themeBtn").textContent=prefs.theme==="dark"?"☀️ Tema claro":"🌙 Tema escuro";$("themeBtn").setAttribute("aria-pressed",String(prefs.theme==="dark"))}
function saveDone(){try{localStorage.setItem(key(),JSON.stringify([...done]))}catch{showToast("Não foi possível salvar neste navegador.")}}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function tags(t){
 let a=[];
 if(t.critical)a.push('<span class="tag criticaltag">🚨 CRÍTICA</span>');
 if(t.attention)a.push('<span class="tag pending">◷ ATENÇÃO 11H (PENDENTE)</span>');
 if(t.period==="Diário")a.push('<span class="tag daily">▤ DIÁRIO</span>');
 if(t.period==="Semanal")a.push('<span class="tag weekly">▤ SEMANAL</span>');
 if(t.period==="Mensal")a.push('<span class="tag weekly">▤ MENSAL</span>');
 if(t.area==="ADM")a.push('<span class="tag admin">💼 ADM</span>');
 if(t.area==="Comercial")a.push('<span class="tag commercial">📣 COMERCIAL</span>');
 if(t.area==="Ambos")a.push('<span class="tag both">💼 📣 ADM &amp; COMERCIAL</span>');
 return a.join("");
}
function iconStyle(t){if(t.critical)return "background:#fff0f1;color:#ff3045";if(t.attention)return "background:#fff5d9;color:#bf6b1e";if(t.area==="Comercial")return "background:#dcebff;color:#2475ff";const colors={"status-social":"background:#ffe3f2;color:#e92b8e","pastas-entrada-saida":"background:#fff6be;color:#ad7200","conversa-prestador":"background:#f2e2ff;color:#a52aff","avalyst":"background:#dcebff;color:#3280ff","cobranca-condominio":"background:#ffead4;color:#ff6500","chaves-mural":"background:#fff6be;color:#bd8000","emails":"background:#dcebff;color:#3585ff","planilha":"background:#e2e8f0;color:#53657b","conversas-antigas":"background:#eae6ff;color:#7356ff","etiquetas-interessados":"background:#fff2bd;color:#b47a00","imoveis-antigos":"background:#f4e6ff;color:#a52cff","fotos-vilson":"background:#d0faf1;color:#00a99b","etiquetas-whatsapp":"background:#d1fae5;color:#059669"};return colors[t.id]||"background:#e2eaff;color:#3574ff"}
function filtered(){
 const q=$("searchInput").value.trim().toLocaleLowerCase("pt-BR"), period=$("periodFilter").value, area=$("areaFilter").value,status=$("statusFilter").value;
 return tasks.filter(t=>{
  const isDone=done.has(t.id);
  return (!q||(t.title+" "+t.desc+" "+t.area).toLocaleLowerCase("pt-BR").includes(q))&&
  (period==="all"||t.period===period)&&(area==="all"||t.area===area)&&
  (status==="all"||(status==="done"&&isDone)||(status==="pending"&&!isDone)||(status==="attention"&&t.attention&&!isDone));
 });
}
function render(){
 const list=filtered(), grid=$("taskGrid");
 $("totalCount").textContent=list.length;
 const completed=list.filter(t=>done.has(t.id)).length;
 $("doneCount").textContent=completed;
 $("pendingCount").textContent=list.filter(t=>t.attention&&!done.has(t.id)).length;
 const pct=list.length?Math.round(completed/list.length*100):0;
 $("progressText").textContent=pct+"%"; $("progressBar").style.width=pct+"%";
 $("resultCount").textContent=list.length+" "+(list.length===1?"atividade":"atividades");
 grid.innerHTML=list.length?list.map(t=>{
  const isDone=done.has(t.id);
  return '<article class="task '+(t.critical?'critical':t.urgent?'urgent':'')+(isDone?' done':'')+'">'+
   '<div class="task-icon" style="'+iconStyle(t)+'">'+escapeHtml(t.icon)+'</div>'+
   '<div class="task-main"><div class="title-line"><h4 class="task-title">'+escapeHtml(t.title)+'</h4></div>'+
   '<div class="tags">'+tags(t)+'</div><div class="state"><span class="dot"></span>'+escapeHtml(t.priority)+'</div>'+
   (t.desc?'<p class="task-desc">'+escapeHtml(t.desc)+'</p>':'')+'</div>'+
   '<input class="check" type="checkbox" aria-label="Marcar '+escapeHtml(t.title)+' como concluída" data-id="'+escapeHtml(t.id)+'" '+(isDone?'checked':'')+'></article>';
 }).join(""):'<div class="empty">Nenhuma atividade encontrada com esses filtros. Experimente alterar a busca.</div>';
 grid.querySelectorAll(".check").forEach(el=>el.addEventListener("change",()=>{
  if(el.checked)done.add(el.dataset.id);else done.delete(el.dataset.id);
  saveDone();render();showToast(el.checked?"Atividade concluída! ✅":"Atividade voltou para pendente.");
 }));
}
$("themeBtn").addEventListener("click",()=>{prefs.theme=prefs.theme==="dark"?"light":"dark";try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}applyPrefs();showToast("Tema atualizado.")});
$("backupBtn").addEventListener("click",()=>{
 const backup={schema:"atividades-jhon-backup",schemaVersion:1,appVersion:"V1.5",exportedAt:new Date().toISOString(),date:localDate(),tasks:tasks.map(t=>({id:t.id,title:t.title,period:t.period,area:t.area})),doneIds:[...done],preferences:prefs};
 const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="backup-atividades-jhon-"+localDate()+".json";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast("Backup JSON exportado.");
});
$("importBtn").addEventListener("click",()=>$("backupFile").click());
$("backupFile").addEventListener("change",async e=>{
 const file=e.target.files&&e.target.files[0];e.target.value="";if(!file)return;
 if(file.size>2*1024*1024){showToast("Arquivo muito grande (limite de 2 MB).");return}
 try{
  const data=JSON.parse(await file.text());
  if(!data||data.schema!=="atividades-jhon-backup"||data.schemaVersion!==1||!Array.isArray(data.doneIds)||!data.doneIds.every(id=>typeof id==="string"))throw new Error("Formato inválido");
  const validIds=new Set(tasks.map(t=>t.id));if(!data.doneIds.every(id=>validIds.has(id)))throw new Error("Atividades não reconhecidas");
  if(!confirm("Restaurar as atividades concluídas e preferências deste backup para hoje? Isso substituirá as marcações de hoje. Não é possível desfazer automaticamente."))return;
  done=new Set(data.doneIds);saveDone();
  if(data.preferences&&typeof data.preferences==="object"&&["light","dark"].includes(data.preferences.theme)){prefs={theme:data.preferences.theme};try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}}
  applyPrefs();render();showToast("Backup restaurado para hoje.");
 }catch(err){showToast("Backup inválido ou incompatível. Nenhum dado foi alterado.");}
});
$("helpBtn").addEventListener("click",()=>alert("AJUDA E PRIVACIDADE — ATIVIDADES DO JHON\\n\\nAs marcações e preferências ficam armazenadas neste navegador (localStorage), neste dispositivo e perfil de navegador. Não há sincronização automática com outros dispositivos.\\n\\nUse “Backup JSON” para guardar uma cópia manual e “Restaurar backup” para importar um arquivo JSON criado por este sistema. A restauração substitui as marcações de hoje após confirmação. O backup inclui os IDs/títulos das atividades, marcações atuais e preferência de tema; não inclui senhas ou tokens.\\n\\nLimpar dados do navegador pode apagar as marcações locais."));
$("prefsBtn").addEventListener("click",()=>{if(!confirm("Restaurar apenas as preferências visuais para o padrão claro? As atividades concluídas não serão alteradas."))return;prefs={theme:"light"};try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}applyPrefs();showToast("Preferências restauradas.")});
let toastTimer;
function showToast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200)}
$("completeVisibleBtn").addEventListener("click",()=>{
 const visible=filtered().filter(t=>!done.has(t.id));
 if(!visible.length){showToast("Não há atividades pendentes visíveis.");return}
 visible.forEach(t=>done.add(t.id));
 saveDone();render();
 showToast(visible.length+" atividade(s) concluída(s). ✅");
});
$("clearFiltersBtn").addEventListener("click",()=>{
 $("searchInput").value="";
 $("periodFilter").value="all";
 $("areaFilter").value="all";
 $("statusFilter").value="all";
 render();showToast("Filtros limpos.");
});
$("searchInput").addEventListener("input",render);
["periodFilter","areaFilter","statusFilter"].forEach(id=>$(id).addEventListener("change",render));
$("resetBtn").addEventListener("click",()=>{if(!confirm("Desmarcar todas as atividades de hoje?"))return;done.clear();saveDone();render();showToast("Atividades do dia reiniciadas.")});
$("exportBtn").addEventListener("click",()=>{
 const lines=["ATIVIDADES DE TRABALHO — JHON", "Data: "+new Date().toLocaleDateString("pt-BR"),""];
 tasks.forEach(t=>lines.push((done.has(t.id)?"[x] ":"[ ] ")+t.title+" | "+t.period+" | "+t.area+" | "+t.priority+(t.desc?"\n    "+t.desc:"")));
 const blob=new Blob(["\ufeff"+lines.join("\n")],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="atividades-trabalho-"+localDate()+".txt";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast("Resumo exportado.");
});
$("todayLabel").textContent=new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long",year:"numeric"});
applyPrefs();
render();
