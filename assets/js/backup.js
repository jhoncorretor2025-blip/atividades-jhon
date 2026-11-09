/* V4.1 — backup inclui a fila de atividades adiadas e mantém compatibilidade anterior. */
$("backupBtn").addEventListener("click",()=>{
 const analytics=window.AtividadesJhonAnalytics;
 const backup={schema:"atividades-jhon-backup",schemaVersion:1,appVersion:"V5.7",exportedAt:new Date().toISOString(),date:localDate(),tasks:tasks.map(t=>({id:t.id,title:t.title,period:t.period,area:t.area})),doneIds:[...done],skippedIds:[...skipped],deferredIds:[...deferred],taskSchedules:taskSchedules,archivedTaskIds:[...archivedTaskIds],subtaskDone:subtaskDone,roundStates:roundStates,taskSequence:taskSequence,pausedTaskUntil:pausedTaskUntil,preferences:prefs,occurrences:analytics?analytics.getLogs():[],archivedIds:analytics?analytics.getArchived():[]};
 const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="backup-atividades-jhon-"+localDate()+".json";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast("Backup completo exportado com histórico.");
});
$("importBtn").addEventListener("click",()=>$("backupFile").click());
$("backupFile").addEventListener("change",async e=>{
 const file=e.target.files&&e.target.files[0];e.target.value="";if(!file)return;
 if(file.size>2*1024*1024){showToast("Arquivo muito grande (limite de 2 MB).");return}
 try{
  const data=JSON.parse(await file.text());
  if(!data||typeof data!=="object"||data.schema!=="atividades-jhon-backup"||data.schemaVersion!==1||!Array.isArray(data.tasks)||data.tasks.length>tasks.length||new Set(data.tasks.map(t=>t&&t.id)).size!==data.tasks.length||!Array.isArray(data.doneIds)||data.doneIds.length>tasks.length||!data.doneIds.every(id=>typeof id==="string"))throw new Error("Formato inválido");
  const validIds=new Set(tasks.map(t=>t.id));
  if(!data.tasks.every(t=>t&&typeof t.id==="string"&&validIds.has(t.id))||!data.doneIds.every(id=>validIds.has(id))||new Set(data.doneIds).size!==data.doneIds.length)throw new Error("Atividades não reconhecidas");
  const skippedIds=Array.isArray(data.skippedIds)?data.skippedIds:[];
  if(!skippedIds.every(id=>typeof id==="string"&&validIds.has(id))||new Set(skippedIds).size!==skippedIds.length)throw new Error("Atividades puladas não reconhecidas");
  const deferredIds=Array.isArray(data.deferredIds)?data.deferredIds:[];
  if(!deferredIds.every(id=>typeof id==="string"&&validIds.has(id))||new Set(deferredIds).size!==deferredIds.length)throw new Error("Fila de atividades adiadas inválida");
  let nextTaskSchedules=null;
  if(data.taskSchedules!==undefined){
   if(!data.taskSchedules||typeof data.taskSchedules!=="object"||Array.isArray(data.taskSchedules))throw new Error("Configurações de datas inválidas");
   nextTaskSchedules={};
   for(const [id,ranges] of Object.entries(data.taskSchedules)){
    if(!validIds.has(id)||!Array.isArray(ranges)||!ranges.every(r=>r&&Number.isInteger(r.start)&&Number.isInteger(r.end)&&r.start>=1&&r.end<=31&&r.start<=r.end))throw new Error("Intervalo de datas inválido");
    nextTaskSchedules[id]=ranges;
   }
  }
  let nextArchivedTaskIds=null,nextSubtaskDone=null,nextRoundStates=null,nextTaskSequence=null,nextPausedTaskUntil=null;
  if(data.archivedTaskIds!==undefined){
   if(!Array.isArray(data.archivedTaskIds)||!data.archivedTaskIds.every(id=>typeof id==="string"&&validIds.has(id))||new Set(data.archivedTaskIds).size!==data.archivedTaskIds.length)throw new Error("Lista de atividades arquivadas inválida");
   nextArchivedTaskIds=data.archivedTaskIds;
  }
  if(data.subtaskDone!==undefined){
   if(!data.subtaskDone||typeof data.subtaskDone!=="object"||Array.isArray(data.subtaskDone))throw new Error("Checklist de suplementos inválido");
   nextSubtaskDone={};
   for(const [taskId,checkedIds] of Object.entries(data.subtaskDone)){
    const task=tasks.find(item=>item.id===taskId);
    const allowed=new Set(Array.isArray(task&&task.subtasks)?task.subtasks.map(item=>item.id):[]);
    if(!task||!Array.isArray(checkedIds)||!checkedIds.every(id=>typeof id==="string"&&allowed.has(id))||new Set(checkedIds).size!==checkedIds.length)throw new Error("Itens do checklist inválidos");
    nextSubtaskDone[taskId]=checkedIds;
   }
  }
  if(data.roundStates!==undefined){
   if(!data.roundStates||typeof data.roundStates!=="object"||Array.isArray(data.roundStates))throw new Error("Contador de voltas inválido");
   nextRoundStates={};
   for(const [mode,state] of Object.entries(data.roundStates)){
    if(!state||typeof state!=="object"||!Number.isInteger(state.completedLaps)||state.completedLaps<0||!Array.isArray(state.poolIds)||!Array.isArray(state.processedIds)||!state.poolIds.every(id=>typeof id==="string"&&validIds.has(id))||!state.processedIds.every(id=>typeof id==="string"&&validIds.has(id)))throw new Error("Dados de voltas inválidos");
    nextRoundStates[mode]={completedLaps:state.completedLaps,poolIds:state.poolIds,processedIds:state.processedIds};
   }
  }
  if(data.taskSequence!==undefined){
   if(!data.taskSequence||typeof data.taskSequence!=="object"||Array.isArray(data.taskSequence))throw new Error("Numeração das atividades inválida");
   nextTaskSequence={};
   for(const [id,number] of Object.entries(data.taskSequence)){
    if(!validIds.has(id)||!Number.isInteger(number)||number<1)throw new Error("Número de atividade inválido");
    nextTaskSequence[id]=number;
   }
  }
  if(data.pausedTaskUntil!==undefined){
   if(!data.pausedTaskUntil||typeof data.pausedTaskUntil!=="object"||Array.isArray(data.pausedTaskUntil))throw new Error("Lista de atividades em pausa inválida");
   nextPausedTaskUntil={};
   for(const [id,resumeDate] of Object.entries(data.pausedTaskUntil)){
    if(!validIds.has(id)||!validPauseDate(resumeDate))throw new Error("Data de retorno de atividade inválida");
    nextPausedTaskUntil[id]=resumeDate;
   }
  }
  let nextOccurrences=null,nextArchived=null;
  if(data.occurrences!==undefined){if(!Array.isArray(data.occurrences)||data.occurrences.length>100000||!data.occurrences.every(x=>x&&typeof x.id==="string"&&validIds.has(x.id)&&typeof x.date==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)))throw new Error("Histórico inválido");nextOccurrences=data.occurrences;}
  if(data.archivedIds!==undefined){if(!Array.isArray(data.archivedIds)||!data.archivedIds.every(id=>typeof id==="string"&&validIds.has(id))||new Set(data.archivedIds).size!==data.archivedIds.length)throw new Error("Arquivo de atividades inválido");nextArchived=data.archivedIds;}
  if(!confirm("Restaurar as atividades concluídas, puladas, adiadas, pausas temporárias, histórico e preferências deste backup para hoje? Isso substituirá as marcações de hoje. Não é possível desfazer automaticamente."))return;
  done=new Set(data.doneIds);saveDone();skipped=new Set(skippedIds);saveSkipped();deferred=new Set(deferredIds);saveDeferred();if(nextTaskSchedules!==null){taskSchedules=nextTaskSchedules;saveTaskSchedules();}if(nextArchivedTaskIds!==null){archivedTaskIds=new Set(nextArchivedTaskIds);saveArchivedTaskIds();}if(nextSubtaskDone!==null){subtaskDone=nextSubtaskDone;saveSubtaskDone();}if(nextRoundStates!==null){roundStates=nextRoundStates;saveRoundStates();}if(nextTaskSequence!==null){taskSequence=nextTaskSequence;saveTaskSequence();}if(nextPausedTaskUntil!==null){pausedTaskUntil=nextPausedTaskUntil;savePausedTaskUntil();}
  if(data.preferences&&typeof data.preferences==="object"&&["light","dark"].includes(data.preferences.theme)){prefs={theme:data.preferences.theme};try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}}
  if(nextOccurrences!==null&&window.AtividadesJhonAnalytics)window.AtividadesJhonAnalytics.restore(nextOccurrences,nextArchived===null?undefined:nextArchived);
  applyPrefs();render();showToast("Backup restaurado para hoje.");
 }catch(err){showToast("Backup inválido ou incompatível. Nenhum dado foi alterado.");}
});
