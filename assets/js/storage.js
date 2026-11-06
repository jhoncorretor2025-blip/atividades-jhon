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
