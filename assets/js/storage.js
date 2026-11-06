/* V4.1 — armazenamento local, estado compartilhado e fila de atividades adiadas. */
const $=id=>document.getElementById(id);
const localDate=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const key=()=>"atividades-jhon:"+localDate();
function loadDone(){try{return JSON.parse(localStorage.getItem(key())||"[]")}catch{return[]}}
let done=new Set(loadDone());
const skipKey=()=>"atividades-jhon:skipped:"+localDate();
function loadSkipped(){try{return JSON.parse(localStorage.getItem(skipKey())||"[]")}catch{return[]}}
let skipped=new Set(loadSkipped());
function saveSkipped(){try{localStorage.setItem(skipKey(),JSON.stringify([...skipped]))}catch{showToast("Não foi possível salvar neste navegador.")}}
const deferredKey=()=>"atividades-jhon:later:"+localDate();
function loadDeferred(){try{const value=JSON.parse(localStorage.getItem(deferredKey())||"[]");return Array.isArray(value)?[...new Set(value.filter(id=>typeof id==="string"))]:[]}catch{return[]}}
let deferred=new Set(loadDeferred());
function saveDeferred(){try{localStorage.setItem(deferredKey(),JSON.stringify([...deferred]))}catch{showToast("Não foi possível salvar a ordem das pendências.")}}
const taskSequenceKey=()=>"atividades-jhon:sequence:"+localDate();
function loadTaskSequence(){
 try{
  const value=JSON.parse(localStorage.getItem(taskSequenceKey())||"{}");
  return value&&typeof value==="object"&&!Array.isArray(value)?value:{};
 }catch{return{}}
}
let taskSequence=loadTaskSequence();
function saveTaskSequence(){
 try{localStorage.setItem(taskSequenceKey(),JSON.stringify(taskSequence));return true}
 catch{showToast("Não foi possível salvar a numeração das atividades.");return false}
}
function assignTaskSequence(items){
 let next=Math.max(0,...Object.values(taskSequence).filter(Number.isInteger))+1;
 let changed=false;
 items.forEach(task=>{
  if(!Number.isInteger(taskSequence[task.id])){
   taskSequence[task.id]=next++;
   changed=true;
  }
 });
 if(changed)saveTaskSequence();
}
function resetTaskSequence(){taskSequence={};saveTaskSequence()}

const VITAMIN_TASK_ID="tomar-vitaminas";
const DEFAULT_VITAMIN_SUBTASKS={
 "tomar-vitaminas":[
  {id:"creatina",label:"Creatina"},
  {id:"nac",label:"NAC — pela manhã"},
  {id:"colageno",label:"Colágeno"},
  {id:"vitamina-d",label:"Vitamina D"},
  {id:"ashwagandha-moringa-maca",label:"Ashwagandha + Moringa + maca negra"}
 ]
};
const subtaskKey=()=>"atividades-jhon:subtasks:"+localDate();
function loadSubtaskDone(){
 try{
  const value=JSON.parse(localStorage.getItem(subtaskKey())||"{}");
  return value&&typeof value==="object"&&!Array.isArray(value)?value:{};
 }catch{return{}}
}
let subtaskDone=loadSubtaskDone();
function saveSubtaskDone(){
 try{localStorage.setItem(subtaskKey(),JSON.stringify(subtaskDone));return true}
 catch{showToast("Não foi possível salvar o checklist de vitaminas.");return false}
}

const roundKey=()=>"atividades-jhon:rounds:"+localDate();
function loadRoundStates(){
 try{
  const value=JSON.parse(localStorage.getItem(roundKey())||"{}");
  return value&&typeof value==="object"&&!Array.isArray(value)?value:{};
 }catch{return{}}
}
let roundStates=loadRoundStates();
function saveRoundStates(){
 try{localStorage.setItem(roundKey(),JSON.stringify(roundStates));return true}
 catch{showToast("Não foi possível salvar o contador de voltas.");return false}
}
function resetRoundStates(){roundStates={};saveRoundStates()}
function roundScopeIds(mode){
 const workAreas=["ADM","Comercial","Ambos"];
 return tasks.filter(t=>!isTaskArchived(t)&&isTaskVisibleToday(t)&&(mode==="work"?workAreas.includes(t.area):mode==="personal"?!workAreas.includes(t.area):true)).map(t=>t.id);
}
function getRoundState(mode){
 const key=mode||"general";
 const eligible=roundScopeIds(key);
 let state=roundStates[key];
 if(!state||typeof state!=="object"||!Array.isArray(state.poolIds)||!Array.isArray(state.processedIds)){
  state={completedLaps:0,poolIds:[...eligible],processedIds:eligible.filter(id=>done.has(id)||skipped.has(id))};
  roundStates[key]=state;
 }else{
  state.poolIds=state.poolIds.filter(id=>eligible.includes(id));
  state.processedIds=state.processedIds.filter(id=>state.poolIds.includes(id));
  eligible.forEach(id=>{
   if(!state.poolIds.includes(id)&&!done.has(id)&&!skipped.has(id))state.poolIds.push(id);
   if(state.poolIds.includes(id)&&(done.has(id)||skipped.has(id))&&!state.processedIds.includes(id))state.processedIds.push(id);
  });
 }
 return state;
}
function finishRoundIfReady(state,mode){
 const pool=state.poolIds;
 if(!pool.length||!pool.every(id=>state.processedIds.includes(id)))return false;
 state.completedLaps=(Number(state.completedLaps)||0)+1;
 const eligible=roundScopeIds(mode);
 state.poolIds=eligible.filter(id=>!done.has(id)&&!skipped.has(id));
 state.processedIds=[];
 return true;
}
function registerRoundAction(id,action,mode){
 const key=mode||"general";
 const state=getRoundState(key);
 const eligible=roundScopeIds(key);
 if(!eligible.includes(id))return {completed:false,state};
 if(!state.poolIds.includes(id))state.poolIds.push(id);
 if(action==="undo"){
  state.processedIds=state.processedIds.filter(item=>item!==id);
 }else if(!state.processedIds.includes(id)){
  state.processedIds.push(id);
 }
 const completed=finishRoundIfReady(state,key);
 saveRoundStates();
 return {completed,state};
}
function registerRoundActions(ids,action,mode){
 const key=mode||"general";
 const state=getRoundState(key);
 const eligible=roundScopeIds(key);
 ids.forEach(id=>{
  if(!eligible.includes(id))return;
  if(!state.poolIds.includes(id))state.poolIds.push(id);
  if(action==="undo")state.processedIds=state.processedIds.filter(item=>item!==id);
  else if(!state.processedIds.includes(id))state.processedIds.push(id);
 });
 const completed=finishRoundIfReady(state,key);
 saveRoundStates();
 return {completed,state};
}
const ARCHIVED_TASK_KEY="atividades-jhon:archived-tasks";
const DEFAULT_ARCHIVED_TASK_IDS=["etiquetas-interessados","etiquetas-whatsapp"];
function loadArchivedTaskIds(){
 try{
  const raw=localStorage.getItem(ARCHIVED_TASK_KEY);
  if(raw===null)return [...DEFAULT_ARCHIVED_TASK_IDS];
  const value=JSON.parse(raw);
  return Array.isArray(value)?[...new Set(value.filter(id=>typeof id==="string"))]:[];
 }catch{return [...DEFAULT_ARCHIVED_TASK_IDS]}
}
let archivedTaskIds=new Set(loadArchivedTaskIds());
function saveArchivedTaskIds(){
 try{localStorage.setItem(ARCHIVED_TASK_KEY,JSON.stringify([...archivedTaskIds]));return true}
 catch{showToast("Não foi possível salvar as atividades arquivadas.");return false}
}
function isTaskArchived(taskOrId){
 const id=typeof taskOrId==="string"?taskOrId:taskOrId&&taskOrId.id;
 return !!id&&archivedTaskIds.has(id);
}
function archiveTask(id){
 if(!tasks.some(task=>task.id===id))return false;
 archivedTaskIds.add(id);
 saveArchivedTaskIds();
 deferred.delete(id);
 saveDeferred();
 return true;
}
function restoreTask(id){
 archivedTaskIds.delete(id);
 saveArchivedTaskIds();
 return true;
}

const TASK_SCHEDULE_KEY="atividades-jhon:visibility-schedules";
const DEFAULT_TASK_SCHEDULES={
 "sinistros":[{"start":5,"end":7},{"start":12,"end":13},{"start":21,"end":31}],
 "planilha":[{"start":1,"end":19}]
};
function cloneDefaultTaskSchedules(){return JSON.parse(JSON.stringify(DEFAULT_TASK_SCHEDULES))}
function loadTaskSchedules(){
 try{
  const raw=localStorage.getItem(TASK_SCHEDULE_KEY);
  if(raw===null)return cloneDefaultTaskSchedules();
  const value=JSON.parse(raw);
  return value&&typeof value==="object"&&!Array.isArray(value)?value:{};
 }catch{return cloneDefaultTaskSchedules()}
}
let taskSchedules=loadTaskSchedules();
function saveTaskSchedules(){
 try{localStorage.setItem(TASK_SCHEDULE_KEY,JSON.stringify(taskSchedules));return true}
 catch{showToast("Não foi possível salvar as configurações de datas.");return false}
}
function isTaskVisibleToday(task){
 const ranges=taskSchedules[task.id];
 if(!Array.isArray(ranges)||ranges.length===0)return true;
 const day=new Date().getDate();
 return ranges.some(range=>range&&day>=Number(range.start)&&day<=Number(range.end));
}
let currentMode=null;
const PREF_KEY="atividades-jhon:preferences";
function loadPrefs(){try{return JSON.parse(localStorage.getItem(PREF_KEY)||"{}")}catch{return {}}}
let prefs=loadPrefs();
function saveDone(){try{localStorage.setItem(key(),JSON.stringify([...done]))}catch{showToast("Não foi possível salvar neste navegador.")}}
