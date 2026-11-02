/* V3.7 — armazenamento local e estado compartilhado. Mantém as chaves históricas. */
const $=id=>document.getElementById(id);
const localDate=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const key=()=>"atividades-jhon:"+localDate();
function loadDone(){try{return JSON.parse(localStorage.getItem(key())||"[]")}catch{return[]}}
let done=new Set(loadDone());
const skipKey=()=>"atividades-jhon:skipped:"+localDate();
function loadSkipped(){try{return JSON.parse(localStorage.getItem(skipKey())||"[]")}catch{return[]}}
let skipped=new Set(loadSkipped());
function saveSkipped(){try{localStorage.setItem(skipKey(),JSON.stringify([...skipped]))}catch{showToast("Não foi possível salvar neste navegador.")}}
let currentMode=null;
const PREF_KEY="atividades-jhon:preferences";
function loadPrefs(){try{return JSON.parse(localStorage.getItem(PREF_KEY)||"{}")}catch{return {}}}
let prefs=loadPrefs();
function saveDone(){try{localStorage.setItem(key(),JSON.stringify([...done]))}catch{showToast("Não foi possível salvar neste navegador.")}}
