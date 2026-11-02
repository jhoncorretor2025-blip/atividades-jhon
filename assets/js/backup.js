/* V3.9 — exportação e restauração compatíveis com backups anteriores. */
$("backupBtn").addEventListener("click",()=>{
 const analytics=window.AtividadesJhonAnalytics;
 const backup={schema:"atividades-jhon-backup",schemaVersion:1,appVersion:"V3.9",exportedAt:new Date().toISOString(),date:localDate(),tasks:tasks.map(t=>({id:t.id,title:t.title,period:t.period,area:t.area})),doneIds:[...done],skippedIds:[...skipped],preferences:prefs,occurrences:analytics?analytics.getLogs():[],archivedIds:analytics?analytics.getArchived():[]};
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
  let nextOccurrences=null,nextArchived=null;
  if(data.occurrences!==undefined){if(!Array.isArray(data.occurrences)||data.occurrences.length>100000||!data.occurrences.every(x=>x&&typeof x.id==="string"&&validIds.has(x.id)&&typeof x.date==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)))throw new Error("Histórico inválido");nextOccurrences=data.occurrences;}
  if(data.archivedIds!==undefined){if(!Array.isArray(data.archivedIds)||!data.archivedIds.every(id=>typeof id==="string"&&validIds.has(id))||new Set(data.archivedIds).size!==data.archivedIds.length)throw new Error("Arquivo de atividades inválido");nextArchived=data.archivedIds;}
  if(!confirm("Restaurar as atividades concluídas, histórico e preferências deste backup para hoje? Isso substituirá as marcações de hoje. Não é possível desfazer automaticamente."))return;
  done=new Set(data.doneIds);saveDone();skipped=new Set(skippedIds);saveSkipped();
  if(data.preferences&&typeof data.preferences==="object"&&["light","dark"].includes(data.preferences.theme)){prefs={theme:data.preferences.theme};try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}}
  if(nextOccurrences!==null&&window.AtividadesJhonAnalytics)window.AtividadesJhonAnalytics.restore(nextOccurrences,nextArchived===null?undefined:nextArchived);
  applyPrefs();render();showToast("Backup restaurado para hoje.");
 }catch(err){showToast("Backup inválido ou incompatível. Nenhum dado foi alterado.");}
});
