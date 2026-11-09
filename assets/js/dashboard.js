/* V5.8 — painel Meu Dia e cards compactos com descrições expansíveis. */
function applyPrefs(){document.body.dataset.theme=prefs.theme==="dark"?"dark":"light";$("themeBtn").textContent=prefs.theme==="dark"?"☀️ Tema claro":"🌙 Tema escuro";$("themeBtn").setAttribute("aria-pressed",String(prefs.theme==="dark"))}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function tags(t){
 let a=[];
 if(t.critical)a.push('<span class="tag criticaltag">🚨 CRÍTICA</span>');
 if(t.attention)a.push('<span class="tag pending">◷ ATENÇÃO (PENDENTE)</span>');
 if(t.period==="Diário")a.push('<span class="tag daily">▤ DIÁRIO</span>');
 if(t.period==="Semanal")a.push('<span class="tag weekly">▤ SEMANAL</span>');
 if(t.period==="Mensal")a.push('<span class="tag weekly">▤ MENSAL</span>');
 if(t.period==="Noturno")a.push('<span class="tag weekly">🌙 NOTURNO</span>');
 if(t.area==="ADM")a.push('<span class="tag admin">💼 ADM</span>');
 if(t.area==="Comercial")a.push('<span class="tag commercial">📣 COMERCIAL</span>');
 if(t.area==="Ambos")a.push('<span class="tag both">💼 📣 ADM &amp; COMERCIAL</span>');
 if(!["ADM","Comercial","Ambos"].includes(t.area))a.push('<span class="tag category">📂 '+escapeHtml(t.area.toLocaleUpperCase("pt-BR"))+'</span>');
 return a.join("");
}
function iconStyle(t){if(t.critical)return "background:#fff0f1;color:#ff3045";if(t.attention)return "background:#fff5d9;color:#bf6b1e";if(t.area==="Comercial")return "background:#dcebff;color:#2475ff";if(!["ADM","Ambos"].includes(t.area))return "background:#e7f8ee;color:#177245";const colors={"status-social":"background:#ffe3f2;color:#e92b8e","pastas-entrada-saida":"background:#fff6be;color:#ad7200","conversa-prestador":"background:#f2e2ff;color:#a52aff","avalyst":"background:#dcebff;color:#3280ff","cobranca-condominio":"background:#ffead4;color:#ff6500","chaves-mural":"background:#fff6be;color:#bd8000","emails":"background:#dcebff;color:#3585ff","planilha":"background:#e2e8f0;color:#53657b","conversas-antigas":"background:#eae6ff;color:#7356ff","etiquetas-interessados":"background:#fff2bd;color:#b47a00","imoveis-antigos":"background:#f4e6ff;color:#a52cff","fotos-vilson":"background:#d0faf1;color:#00a99b","etiquetas-whatsapp":"background:#d1fae5;color:#059669"};return colors[t.id]||"background:#e2eaff;color:#3574ff"}
function filtered(){
 const q=$("searchInput").value.trim().toLocaleLowerCase("pt-BR"), period=$("periodFilter").value, area=$("areaFilter").value,status=$("statusFilter").value, quick=window.quickActivityFilter||"all";
 const matching=tasks.filter(t=>{
  const workAreas=["ADM","Comercial","Ambos"];
  if(currentMode==="work"&&!workAreas.includes(t.area))return false;
  if(currentMode==="personal"&&workAreas.includes(t.area))return false;
  const isDone=done.has(t.id), isSkipped=skipped.has(t.id);
  return !isTaskArchived(t)&&!isTaskPaused(t)&&isTaskVisibleToday(t)&&(!q||(t.title+" "+t.desc+" "+t.area).toLocaleLowerCase("pt-BR").includes(q))&&
  (period==="all"||t.period===period)&&(area==="all"||t.area===area)&&
  (status==="all"&&!isSkipped&&!isDone||(status==="done"&&isDone)||(status==="pending"&&!isDone&&!isSkipped)||(status==="attention"&&t.attention&&!isDone&&!isSkipped)||(status==="skipped"&&isSkipped))&&\n  (quick==="all"||(quick==="critical"&&(t.critical||t.priority==="Crítica")&&!isDone&&!isSkipped)||(quick==="projects"&&t.area==="Projetos")||(quick==="pending"&&!isDone&&!isSkipped)||(quick==="attention"&&t.attention&&!isDone&&!isSkipped)||(quick==="done"&&isDone);
 });
 const fixed=matching.filter(t=>Number.isInteger(t.fixedPosition)).sort((a,b)=>a.fixedPosition-b.fixedPosition);
 const ordered=matching.filter(t=>!Number.isInteger(t.fixedPosition));
 fixed.forEach(t=>ordered.splice(Math.max(0,Math.min(ordered.length,t.fixedPosition-1)),0,t));
 // Atribui o número uma única vez, antes de mover adiadas para o fim.
 // Assim o cartão mantém seu número original durante toda a volta.
 assignTaskSequence(ordered);
 const deferredOrder=new Map([...deferred].map((id,index)=>[id,index]));
 const movable=ordered.filter(t=>!Number.isInteger(t.fixedPosition));
 movable.sort((a,b)=>{
  const aLater=deferredOrder.has(a.id), bLater=deferredOrder.has(b.id);
  if(aLater!==bLater)return aLater?1:-1;
  if(aLater)return deferredOrder.get(a.id)-deferredOrder.get(b.id);
  return 0;
 });
 const result=movable;
 fixed.forEach(t=>result.splice(Math.max(0,Math.min(result.length,t.fixedPosition-1)),0,t));
 return result;
}

function dateKeyOffset(offset){
 const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-offset);
 return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function historyForDate(date){
 const read=(k)=>{try{const v=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(v)?v:[]}catch{return[]}};
 return {done:new Set(read("atividades-jhon:"+date)),skipped:new Set(read("atividades-jhon:skipped:"+date))};
}
function reportScope(){
 return tasks.filter(t=>!isTaskArchived(t)&&!isTaskPaused(t)&&isTaskVisibleToday(t)&&(currentMode==="work"?["ADM","Comercial","Ambos"].includes(t.area):currentMode==="personal"?!["ADM","Comercial","Ambos"].includes(t.area):true));
}
function renderWeeklyReport(){
 const scope=reportScope(),ids=new Set(scope.map(t=>t.id)),total=scope.length;
 const days=Array.from({length:7},(_,i)=>{
  const date=dateKeyOffset(6-i),data=historyForDate(date);
  const completed=[...data.done].filter(id=>ids.has(id)).length;
  const skippedCount=[...data.skipped].filter(id=>ids.has(id)&&!data.done.has(id)).length;
  const label=new Date(date+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit"});
  return {date,label,completed,skipped:skippedCount,pending:Math.max(0,total-completed-skippedCount),rate:total?Math.round(completed/total*100):0};
 });
 const previous=Array.from({length:7},(_,i)=>{
  const date=dateKeyOffset(13-i),data=historyForDate(date);
  return [...data.done].filter(id=>ids.has(id)).length;
 });
 const doneTotal=days.reduce((s,d)=>s+d.completed,0),skipTotal=days.reduce((s,d)=>s+d.skipped,0);
 const rate=total?Math.round(doneTotal/(total*7)*100):0;
 const prevRate=total?Math.round(previous.reduce((s,n)=>s+n,0)/(total*7)*100):0;
 const best=days.reduce((a,b)=>b.completed>a.completed?b:a,days[0]);
 $("weeklyRange").textContent=days[0].label+" a "+days[6].label+" · "+(currentMode==="work"?"Trabalho":currentMode==="personal"?"Vida pessoal":"Todas as áreas");
 $("weekDone").textContent=doneTotal;
 $("weekSkipped").textContent=skipTotal;
 $("weekRate").textContent=rate+"%";
 $("weekBest").textContent=best&&best.completed?best.label+" ("+best.completed+")":"—";
 const diff=rate-prevRate;
 $("weekComparison").textContent=(diff>0?"▲ +":diff<0?"▼ ":"=")+diff+" pontos percentuais · semana anterior: "+prevRate+"%";
 $("weekComparison").className=diff>0?"positive":diff<0?"negative":"";
 const max=Math.max(1,...days.map(d=>d.completed));
 $("weeklyDays").innerHTML=days.map(d=>'<div class="weekly-day"><div class="weekly-day-label">'+d.label+'</div><div class="weekly-bar-track"><div class="weekly-bar" style="width:'+Math.round(d.completed/max*100)+'%"></div></div><strong>'+d.completed+'</strong><span>'+d.skipped+' puladas · '+d.rate+'%</span></div>').join("");
}
$("weeklyReportBtn").addEventListener("click",()=>{
 const panel=$("weeklyReport");panel.hidden=!panel.hidden;
 if(!panel.hidden){renderWeeklyReport();panel.scrollIntoView({behavior:"smooth",block:"start"});}
});
$("closeWeeklyReport").addEventListener("click",()=>{$("weeklyReport").hidden=true;});


function getStreakStats(){
 const activeDates=new Set();
 try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||!/^atividades-jhon:\d{4}-\d{2}-\d{2}$/.test(k))continue;const value=JSON.parse(localStorage.getItem(k)||"[]");if(Array.isArray(value)&&value.length)activeDates.add(k.slice("atividades-jhon:".length));}}catch{}
 const sorted=[...activeDates].sort();let best=0,run=0,previous=null;
 for(const date of sorted){const current=new Date(date+"T12:00:00");const gap=previous?Math.round((current-previous)/86400000):null;run=gap===1?run+1:1;best=Math.max(best,run);previous=current;}
 const today=localDate(),yesterday=dateKeyOffset(1);let current=0,cursor=activeDates.has(today)?0:activeDates.has(yesterday)?1:null;
 if(cursor!==null){while(activeDates.has(dateKeyOffset(cursor))){current++;cursor++;}}
 const week=Array.from({length:7},(_,i)=>{const date=dateKeyOffset(6-i);return {date,active:activeDates.has(date),label:new Date(date+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"short"}).replace(".","")}});
 return {current,best,week};
}
function renderStreak(){const panel=document.getElementById("currentStreak");if(!panel)return;const stats=getStreakStats();panel.textContent=stats.current;$("bestStreak").textContent=stats.best+" "+(stats.best===1?"dia":"dias");$("streakMessage").textContent=stats.current===0?"Comece sua sequência hoje!":stats.current===1?"Você começou uma nova sequência. Continue amanhã!":"Muito bem! Continue mantendo o ritmo.";$("streakWeek").innerHTML=stats.week.map(d=>'<div class="streak-day '+(d.active?"active":"")+'"><span>'+escapeHtml(d.label)+'</span><i aria-label="'+(d.active?"Dia com atividade":"Sem atividade")+'">'+(d.active?"✓":"·")+'</i></div>').join("");}

function renderRoundPanel(){
 const panel=$("roundPanel");
 if(!panel)return;
 if(!currentMode){panel.hidden=true;return}
 panel.hidden=false;
 const state=getRoundState(currentMode);
 if(finishRoundIfReady(state,currentMode))saveRoundStates();
 const total=state.poolIds.length;
 const processed=state.processedIds.filter(id=>state.poolIds.includes(id)).length;
 $("roundCount").textContent=String(state.completedLaps||0);
 $("roundCurrent").textContent=total?String((state.completedLaps||0)+1):"—";
 $("roundProgress").textContent=processed+" de "+total+" atividades";
 $("roundProgressBar").style.width=total?Math.round(processed/total*100)+"%":"0%";
 $("roundMessage").textContent=total
  ?"Concluir, pular ou adiar conta como etapa. Cards em pausa ficam fora da volta até retornarem."
  :"Não há atividades pendentes nesta fila.";
}
function renderVitaminSubtasks(task,isSkipped){
 if(!Array.isArray(task.subtasks)||!task.subtasks.length)return "";
 const checked=new Set(Array.isArray(subtaskDone[task.id])?subtaskDone[task.id]:[]);
 const completed=task.subtasks.filter(item=>checked.has(item.id)).length;
 return '<div class="subtask-box"><div class="subtask-heading"><strong>'+escapeHtml(task.subtaskTitle||"Checklist de vitaminas")+'</strong><span>'+completed+'/'+task.subtasks.length+'</span></div><div class="subtask-list">'+
  task.subtasks.map(item=>item.link?'<div class="subtask-item project-subtask-item"><input class="subtask-check" type="checkbox" data-task-id="'+escapeHtml(task.id)+'" data-subtask-id="'+escapeHtml(item.id)+'" '+(checked.has(item.id)?'checked':'')+' '+(isSkipped?'disabled':'')+'><span>'+escapeHtml(item.label)+'</span><a class="project-subtask-link" href="'+escapeHtml(item.link)+'" target="_blank" rel="noopener noreferrer">↗ Abrir</a></div>':'<label class="subtask-item"><input class="subtask-check" type="checkbox" data-task-id="'+escapeHtml(task.id)+'" data-subtask-id="'+escapeHtml(item.id)+'" '+(checked.has(item.id)?'checked':'')+' '+(isSkipped?'disabled':'')+'><span>'+escapeHtml(item.label)+'</span></label>').join("")+
  '</div></div>';
}
function refreshArchiveManager(){
 const select=$("archiveTaskSelect"),list=$("archivedTaskList");
 if(!select||!list)return;
 const active=tasks.filter(task=>!isTaskArchived(task));
 const selected=select.value;
 select.innerHTML=active.map(task=>'<option value="'+escapeHtml(task.id)+'">'+escapeHtml(task.title)+'</option>').join("");
 if(selected&&active.some(task=>task.id===selected))select.value=selected;
 const archived=tasks.filter(task=>isTaskArchived(task));
 list.innerHTML=archived.length?archived.map(task=>'<div class="archived-task-row"><span>'+escapeHtml(task.title)+'</span><button class="toolbar-action restore-task-btn" type="button" data-restore-task="'+escapeHtml(task.id)+'">↶ Restaurar</button></div>').join(""):'<p class="archive-empty">Nenhuma atividade arquivada.</p>';
 list.querySelectorAll(".restore-task-btn").forEach(button=>button.addEventListener("click",()=>{
  restoreTask(button.dataset.restoreTask);render();refreshArchiveManager();
  showToast("Atividade restaurada para a rotina. ✅");
 }));
}
function render(){
 const list=filtered(), grid=$("taskGrid");
 const scope=tasks.filter(t=>!isTaskArchived(t)&&!isTaskPaused(t)&&isTaskVisibleToday(t)&&(currentMode==="work"?["ADM","Comercial","Ambos"].includes(t.area):currentMode==="personal"?!["ADM","Comercial","Ambos"].includes(t.area):true));
 const dayScope=tasks.filter(t=>!isTaskArchived(t)&&!isTaskPaused(t)&&isTaskVisibleToday(t));
 const dayDone=dayScope.filter(t=>done.has(t.id)).length;
 const daySkipped=dayScope.filter(t=>skipped.has(t.id)).length;
 const dayPending=dayScope.length-dayDone-daySkipped;
 const dayCritical=dayScope.filter(t=>(t.critical||t.priority==="Crítica")&&!done.has(t.id)&&!skipped.has(t.id)).length;
 const dayEligible=dayScope.length-daySkipped;
 const dayPct=dayEligible?Math.round(dayDone/dayEligible*100):100;
 $("myDayTotal").textContent=dayScope.length;
 $("myDayDone").textContent=dayDone;
 $("myDayPending").textContent=dayPending;
 $("myDayCritical").textContent=dayCritical;
 $("myDayProgressText").textContent=dayPct+"%";
 $("myDayProgressBar").style.width=dayPct+"%";
 $("myDayMessage").textContent=dayPending===0?"Parabéns! Você concluiu tudo que estava disponível hoje.":dayCritical>0?dayPending+" atividades pendentes, incluindo "+dayCritical+" críticas.":"Você tem "+dayPending+" atividades pendentes. Vamos avançar!";

 const executed=scope.filter(t=>done.has(t.id)).length;
 const skippedCount=scope.filter(t=>skipped.has(t.id)).length;
 const pending=scope.length-executed-skippedCount;
 $("summaryTotal").textContent=scope.length;
 $("summaryDone").textContent=executed;
 $("summarySkipped").textContent=skippedCount;
 $("summaryPending").textContent=pending;
 const summaryPct=scope.length?Math.round(executed/scope.length*100):0;
 const summaryPctLabel=$("summaryDonePct"),summaryPctBar=$("summaryProgressBar");
 if(summaryPctLabel)summaryPctLabel.textContent=summaryPct+"% da área concluída";
 if(summaryPctBar)summaryPctBar.style.width=summaryPct+"%";
 $("totalCount").textContent=list.length;
 const completed=list.filter(t=>done.has(t.id)).length;
 $("doneCount").textContent=completed;
 $("pendingCount").textContent=list.filter(t=>t.attention&&!done.has(t.id)&&!skipped.has(t.id)).length;
 const eligible=scope.length-skippedCount;
 const pct=eligible?Math.round(completed/eligible*100):100;
 $("progressText").textContent=pct+"%"; $("progressBar").style.width=pct+"%";
 renderStreak();
 renderRoundPanel();
 refreshArchiveManager();
 $("resultCount").textContent=list.length+" "+(list.length===1?"atividade":"atividades");
 grid.innerHTML=list.length?list.map((t,index)=>{
  const number=String(taskSequence[t.id]||index+1);
  const isDone=done.has(t.id), isSkipped=skipped.has(t.id), isDeferred=deferred.has(t.id);
  const occurrenceCount=window.AtividadesJhonAnalytics&&typeof window.AtividadesJhonAnalytics.countOccurrences==="function"?window.AtividadesJhonAnalytics.countOccurrences(t.id):0;
  return '<article class="task '+(isSkipped?' skipped':'')+(t.critical?'critical':t.urgent?'urgent':'')+(isDone?' done':'')+'">'+
   '<span class="task-number" aria-label="Atividade '+number+' de '+list.length+'">'+number+'</span>'+
   '<div class="task-side"><div class="task-icon" style="'+iconStyle(t)+'">'+escapeHtml(t.icon)+'</div>'+(isDone||isSkipped?'':'<button class="pause-btn" type="button" data-pause="'+escapeHtml(t.id)+'" aria-label="Dar uma pausa de 15 dias em '+escapeHtml(t.title)+'" title="Suspender esta atividade por 15 dias">⏸ Dar uma pausa</button>')+'</div>'+
   '<div class="task-main"><div class="title-line"><h4 class="task-title">'+escapeHtml(t.title)+'</h4></div>'+
   '<div class="tags">'+tags(t)+'<span class="tag occurrence-count-tag" title="Total de conclusões registradas, incluindo repetições">🔁 '+occurrenceCount+'x</span>'+(isSkipped?'<span class="tag skipped-tag">⏭ PULADA</span>':'')+(isDeferred?'<span class="tag deferred-tag">🕒 MAIS TARDE</span>':'')+'</div><div class="state"><span class="dot"></span>'+escapeHtml(t.priority)+'</div>'+
   (t.link?'<a class="task-link" href="'+escapeHtml(t.link)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(t.linkLabel||"↗ Abrir link")+"</a>": "")+(t.desc?'<details class="task-description"><summary>Ver descrição</summary><p class="task-desc">'+escapeHtml(t.desc)+'</p></details>':'')+renderVitaminSubtasks(t,isSkipped)+'</div>'+
   '<div class="task-actions"><input class="check" type="checkbox" aria-label="Marcar '+escapeHtml(t.title)+' como concluída" data-id="'+escapeHtml(t.id)+'" '+(isDone?'checked':'')+' '+(isSkipped?'disabled':'')+'><button class="skip-btn" type="button" data-skip="'+escapeHtml(t.id)+'" aria-label="'+(isSkipped?'Retomar':'Pular')+' '+escapeHtml(t.title)+'">'+(isSkipped?'↶ Retomar':'⏭ Pular')+'</button>'+(isDone||isSkipped?'':'<button class="defer-btn" type="button" data-defer="'+escapeHtml(t.id)+'" aria-label="Ver mais tarde: '+escapeHtml(t.title)+'">🕒 Ver mais tarde</button>')+'</div></article>';
 }).join(""):'<div class="empty">Nenhuma atividade encontrada com esses filtros. Experimente alterar a busca.</div>';
 grid.querySelectorAll(".skip-btn").forEach(el=>el.addEventListener("click",()=>{
  const id=el.dataset.skip;
  let roundResult;
  if(skipped.has(id)){
   skipped.delete(id);roundResult=registerRoundAction(id,"undo",currentMode);
   showToast("Atividade voltou para a lista.");
  }else{
   skipped.add(id);done.delete(id);roundResult=registerRoundAction(id,"skip",currentMode);
   showToast("Atividade pulada. Você pode retomá-la depois.");
  }
  deferred.delete(id);saveDeferred();saveSkipped();saveDone();render();
  if(roundResult&&roundResult.completed)showToast("Volta "+roundResult.state.completedLaps+" concluída! Nova volta iniciada.");
 }));
 grid.querySelectorAll(".pause-btn").forEach(el=>el.addEventListener("click",()=>{
  const id=el.dataset.pause,task=tasks.find(item=>item.id===id);
  if(!task)return;
  if(!confirm('Dar uma pausa de 15 dias em "'+task.title+'"? A atividade ficará oculta e voltará automaticamente depois desse período.'))return;
  const resumeDate=pauseTask(id);
  if(!resumeDate){showToast("Não foi possível salvar a pausa. Tente novamente.");return}
  render();
  const formattedDate=new Date(resumeDate+"T12:00:00").toLocaleDateString("pt-BR");
  showToast("Pausa de 15 dias ativada. A atividade volta em "+formattedDate+". ⏸");
 }));
 grid.querySelectorAll(".defer-btn").forEach(el=>el.addEventListener("click",()=>{
  const id=el.dataset.defer;
  deferred.delete(id);deferred.add(id);saveDeferred();
  const roundResult=registerRoundAction(id,"defer",currentMode);
  render();
  showToast(roundResult.completed?"Volta "+roundResult.state.completedLaps+" concluída! Nova volta iniciada.":"Atividade enviada para o final das pendências. 🕒");
 }));
 grid.querySelectorAll(".subtask-check").forEach(el=>el.addEventListener("change",()=>{
  const taskId=el.dataset.taskId,subtaskId=el.dataset.subtaskId,task=tasks.find(item=>item.id===taskId);
  if(!task||!Array.isArray(task.subtasks))return;
  const checked=new Set(Array.isArray(subtaskDone[taskId])?subtaskDone[taskId]:[]);
  if(el.checked)checked.add(subtaskId);else checked.delete(subtaskId);
  subtaskDone[taskId]=[...checked];
  const allComplete=task.subtasks.every(item=>checked.has(item.id));
  const wasDone=done.has(taskId);
  let roundResult=null,occurrenceSaved=true;
  if(allComplete){
   done.add(taskId);deferred.delete(taskId);
   if(!wasDone){
    const analytics=window.AtividadesJhonAnalytics;
    occurrenceSaved=!!(analytics&&typeof analytics.recordOccurrence==="function"&&analytics.recordOccurrence(taskId,"subtask"));
   }
   if(!wasDone)roundResult=registerRoundAction(taskId,"done",currentMode);
  }else if(wasDone){
   done.delete(taskId);
   registerRoundAction(taskId,"undo",currentMode);
  }
  saveSubtaskDone();saveDeferred();saveDone();render();
  if(allComplete)showToast(!occurrenceSaved?"Checklist concluído, mas não foi possível salvar a contagem no histórico. Verifique o armazenamento do navegador.":(roundResult&&roundResult.completed?"Volta "+roundResult.state.completedLaps+" concluída! Nova volta iniciada.":"Todas as vitaminas marcadas! Card concluído. ✅"));
  else showToast("Item atualizado no checklist.");
 }));
 grid.querySelectorAll(".check").forEach(el=>el.addEventListener("change",()=>{
  const id=el.dataset.id,task=tasks.find(item=>item.id===id);
  if(el.checked){
   done.add(id);
   if(task&&Array.isArray(task.subtasks))subtaskDone[id]=task.subtasks.map(item=>item.id);
   deferred.delete(id);
   const analytics=window.AtividadesJhonAnalytics;
   const occurrenceSaved=!!(analytics&&typeof analytics.recordOccurrence==="function"&&analytics.recordOccurrence(id,"card"));
   const roundResult=registerRoundAction(id,"done",currentMode);
   saveSubtaskDone();saveDeferred();saveDone();render();
   showToast(!occurrenceSaved?"Atividade concluída, mas não foi possível salvar a contagem no histórico. Verifique o armazenamento do navegador.":(roundResult.completed?"Volta "+roundResult.state.completedLaps+" concluída! Nova volta iniciada.":"Atividade concluída! ✅"));
  }else{
   done.delete(id);
   if(task&&Array.isArray(task.subtasks))subtaskDone[id]=[];
   registerRoundAction(id,"undo",currentMode);
   saveSubtaskDone();saveDeferred();saveDone();render();
   showToast("Atividade voltou para pendente.");
  }
 }));
}
$("themeBtn").addEventListener("click",()=>{prefs.theme=prefs.theme==="dark"?"light":"dark";try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}applyPrefs();showToast("Tema atualizado.")});
$("helpBtn").addEventListener("click",()=>alert("AJUDA, PRIVACIDADE E DIAGNÓSTICO — ATIVIDADES DO JHON\n\nVersão: V5.9. Aplicação estática em HTML, CSS e JavaScript, publicada no GitHub Pages. Não há integração externa nem sincronização automática.\n\nAs marcações, a contagem e o histórico de conclusões, a fila de atividades adiadas, as pausas temporárias de 15 dias, as configurações de datas e as preferências ficam no armazenamento local deste navegador, dispositivo e perfil. Use Backup JSON para guardar uma cópia manual; o arquivo inclui marcações de hoje, identificadores/títulos das atividades e tema, mas não senhas, tokens ou chaves.\n\nO restaurador aceita apenas JSON compatível, limita o arquivo a 2 MB e valida a estrutura e os IDs antes de alterar dados. A substituição pede confirmação. Limpar os dados do navegador pode apagar as marcações locais.\n\nSe algo não funcionar: recarregue a página, confirme que está online, teste marcar uma atividade e recarregar; se o problema continuar, exporte um backup antes de limpar os dados."));
$("prefsBtn").addEventListener("click",()=>{if(!confirm("Restaurar apenas as preferências visuais para o padrão claro? As atividades concluídas não serão alteradas."))return;prefs={theme:"light"};try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}applyPrefs();showToast("Preferências restauradas.")});
$("archiveSettingsBtn").addEventListener("click",()=>{
 const panel=$("archiveSettings");panel.hidden=!panel.hidden;
 if(!panel.hidden){refreshArchiveManager();panel.scrollIntoView({behavior:"smooth",block:"start"});}
});
$("closeArchiveSettings").addEventListener("click",()=>{$("archiveSettings").hidden=true;});
$("archiveTaskBtn").addEventListener("click",()=>{
 const id=$("archiveTaskSelect").value;
 if(!id){showToast("Escolhe uma atividade para arquivar.");return}
 if(!confirm("Arquivar esta atividade? Ela deixará de aparecer na rotina, mas poderá ser restaurada depois."))return;
 archiveTask(id);render();refreshArchiveManager();
 showToast("Atividade arquivada. Ela pode ser restaurada quando precisares.");
});
function formatScheduleRanges(ranges){
 return (ranges||[]).map(r=>String(r.start).padStart(2,"0")+"-"+String(r.end).padStart(2,"0")).join(", ");
}
function parseScheduleRanges(value){
 const raw=value.trim();
 if(!raw)return [];
 const parts=raw.split(/[,;]+/).map(part=>part.trim()).filter(Boolean);
 const parsed=[];
 for(const part of parts){
  const match=part.match(/^(\d{1,2})\s*-\s*(\d{1,2})$/);
  if(!match)throw new Error("Use intervalos no formato 05-07, 12-13.");
  const start=Number(match[1]),end=Number(match[2]);
  if(start<1||end>31||start>end)throw new Error("Os dias devem estar entre 1 e 31, e o início não pode ser maior que o fim.");
  parsed.push({start,end});
 }
 return parsed;
}
function refreshScheduleEditor(){
 const select=$("scheduleTaskSelect"), input=$("scheduleRangesInput"), feedback=$("scheduleFeedback");
 if(!select||!input)return;
 const current=select.value||tasks[0]?.id;
 select.innerHTML=tasks.map(t=>'<option value="'+escapeHtml(t.id)+'">'+escapeHtml(t.title)+'</option>').join("");
 if(current&&tasks.some(t=>t.id===current))select.value=current;
 const ranges=taskSchedules[select.value];
 input.value=Array.isArray(ranges)?formatScheduleRanges(ranges):"";
 if(feedback)feedback.textContent=Array.isArray(ranges)&&ranges.length?"Ativa: aparece nos dias "+formatScheduleRanges(ranges)+".":"Sem regra: aparece todos os dias.";
}
$("scheduleSettingsBtn").addEventListener("click",()=>{
 const panel=$("scheduleSettings");panel.hidden=!panel.hidden;
 if(!panel.hidden){refreshScheduleEditor();panel.scrollIntoView({behavior:"smooth",block:"start"});}
});
$("closeScheduleSettings").addEventListener("click",()=>{$("scheduleSettings").hidden=true;});
$("scheduleTaskSelect").addEventListener("change",refreshScheduleEditor);
$("saveScheduleBtn").addEventListener("click",()=>{
 try{
  const ranges=parseScheduleRanges($("scheduleRangesInput").value);
  const id=$("scheduleTaskSelect").value;
  if(!ranges.length){showToast("Informe pelo menos um intervalo de dias.");return}
  taskSchedules[id]=ranges;
  if(!saveTaskSchedules())return;
  refreshScheduleEditor();render();
  $("scheduleFeedback").textContent="Datas salvas. Esta atividade só aparecerá nos dias configurados.";
  showToast("Configuração de datas salva. ✅");
 }catch(error){$("scheduleFeedback").textContent=error.message;showToast(error.message);}
});
$("clearScheduleBtn").addEventListener("click",()=>{
 const id=$("scheduleTaskSelect").value;
 delete taskSchedules[id];
 if(!saveTaskSchedules())return;
 refreshScheduleEditor();render();
 $("scheduleFeedback").textContent="Regra removida: esta atividade aparecerá todos os dias.";
 showToast("A atividade voltará a aparecer todos os dias.");
});

let toastTimer;
function showToast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200)}
$("completeVisibleBtn").addEventListener("click",()=>{
 const visible=filtered().filter(t=>!done.has(t.id)&&!skipped.has(t.id));
 if(!visible.length){showToast("Não há atividades pendentes visíveis.");return}
 let historySaved=true;
 visible.forEach(t=>{
  done.add(t.id);skipped.delete(t.id);deferred.delete(t.id);
  if(Array.isArray(t.subtasks))subtaskDone[t.id]=t.subtasks.map(item=>item.id);
  const analytics=window.AtividadesJhonAnalytics;
  if(!(analytics&&typeof analytics.recordOccurrence==="function"&&analytics.recordOccurrence(t.id,"bulk")))historySaved=false;
 });
 const roundResult=registerRoundActions(visible.map(t=>t.id),"done",currentMode);
 saveSubtaskDone();saveSkipped();saveDeferred();saveDone();render();
 showToast(!historySaved?"Atividades concluídas, mas não foi possível salvar todo o histórico. Verifique o armazenamento do navegador.":(roundResult.completed?"Volta "+roundResult.state.completedLaps+" concluída! Nova volta iniciada.":visible.length+" atividade(s) concluída(s). ✅"));
});
function chooseMode(mode){
 currentMode=mode;
 $("modeChooser").hidden=true;
 $("activityWorkspace").hidden=false;
 const isWork=mode==="work";
 const isGeneral=mode==="general";
 $("workspaceEyebrow").textContent=isGeneral?"ROTINA COMPLETA":isWork?"ROTINA PROFISSIONAL":"ROTINA PESSOAL";
 $("workspaceTitle").textContent=isGeneral?"Todas as atividades":isWork?"Atividades de trabalho":"Vida pessoal";
 $("taskListTitle").textContent=isGeneral?"🌐 Todas as atividades":isWork?"💼 Atividades de trabalho":"🌱 Atividades da vida pessoal";
 $("areaFilter").value="all";
 $("periodFilter").value="all";
 $("statusFilter").value="all";
 $("searchInput").value="";
 render();
 window.scrollTo({top:0,behavior:"smooth"});
}
$("chooseGeneral").addEventListener("click",()=>chooseMode("general"));
$("chooseWork").addEventListener("click",()=>chooseMode("work"));
$("choosePersonal").addEventListener("click",()=>chooseMode("personal"));
function goHome(){
 currentMode=null;
 $("activityWorkspace").hidden=true;
 $("modeChooser").hidden=false;
 $("searchInput").value="";
 $("periodFilter").value="all";
 $("areaFilter").value="all";
 $("statusFilter").value="all";
 render();
 window.scrollTo({top:0,behavior:"smooth"});
}
$("homeLink").addEventListener("click",event=>{
 event.preventDefault();
 goHome();
});
$("changeModeBtn").addEventListener("click",goHome);
$("clearFiltersBtn").addEventListener("click",()=>{
 $("searchInput").value="";
 $("periodFilter").value="all";
 $("areaFilter").value="all";
 $("statusFilter").value="all";
 render();showToast("Filtros limpos.");
});
window.quickActivityFilter="all";\ndocument.querySelectorAll("[data-quick]").forEach(button=>button.addEventListener("click",()=>{window.quickActivityFilter=button.dataset.quick;document.querySelectorAll("[data-quick]").forEach(item=>{item.classList.toggle("active",item===button);item.setAttribute("aria-pressed",String(item===button));});$("statusFilter").value="all";render();}));\n$("smartStartBtn").addEventListener("click",()=>{const id=$("smartStartBtn").dataset.next;if(!id)return;window.quickActivityFilter="all";document.querySelectorAll("[data-quick]").forEach(item=>item.classList.toggle("active",item.dataset.quick==="all"));$("searchInput").value=tasks.find(t=>t.id===id)?.title||"";render();$("taskGrid").scrollIntoView({behavior:"smooth",block:"start"});});\n$("openSyncSettings").addEventListener("click",()=>{const p=$("syncSettings");p.hidden=!p.hidden;if(!p.hidden)p.scrollIntoView({behavior:"smooth",block:"start"});});\n$("closeSyncSettings").addEventListener("click",()=>{$("syncSettings").hidden=true;});\n$("openCentralSettings").addEventListener("click",()=>{const p=$("syncSettings");p.hidden=false;p.scrollIntoView({behavior:"smooth",block:"start"});});\n$("searchInput").addEventListener("input",render);
["periodFilter","areaFilter","statusFilter"].forEach(id=>$(id).addEventListener("change",render));
$("resetBtn").addEventListener("click",()=>{if(!confirm("Desmarcar todas as atividades de hoje e limpar a fila de adiadas?"))return;done.clear();skipped.clear();deferred.clear();subtaskDone={};resetTaskSequence();resetRoundStates();saveSubtaskDone();saveDone();saveSkipped();saveDeferred();render();showToast("Atividades do dia reiniciadas.")});
$("exportBtn").addEventListener("click",()=>{
 const lines=["ATIVIDADES DO JHON — TRABALHO E ROTINA PESSOAL", "Data: "+new Date().toLocaleDateString("pt-BR"),""];
 tasks.forEach(t=>lines.push((done.has(t.id)?"[x] ":skipped.has(t.id)?"[PULADA] ":"[ ] ")+t.title+" | "+t.period+" | "+t.area+" | "+t.priority+(t.desc?"\n    "+t.desc:"")));
 const blob=new Blob(["\ufeff"+lines.join("\n")],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="atividades-trabalho-"+localDate()+".txt";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast("Resumo exportado.");
});
$("todayLabel").textContent=new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long",year:"numeric"});
function setupResponsiveNavigation(){
 const progress=document.getElementById("progressDetails");
 const tools=document.getElementById("toolsDetails");
 if(!progress||!tools)return;
 const mobile=window.matchMedia("(max-width:760px)");
 const sync=()=>{
  if(mobile.matches){progress.open=false;tools.open=false;}
  else{progress.open=true;tools.open=true;}
 };
 sync();
 if(typeof mobile.addEventListener==="function")mobile.addEventListener("change",sync);
 else if(typeof mobile.addListener==="function")mobile.addListener(sync);
}
setupResponsiveNavigation();
updateActivityCounts();
applyPrefs();
render();
