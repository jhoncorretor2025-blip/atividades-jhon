/* V6.7 — sincronização automática com Google Planilhas via Apps Script. */
(()=>{
 const $=id=>document.getElementById(id);
 const CONFIG_KEY="atividades-jhon:google-sheets-config";
 const openPanel=$("openGoogleSyncSettings"),closePanel=$("closeGoogleSyncSettings"),panel=$("googleSyncSettings");
 if(openPanel)openPanel.addEventListener("click",()=>{panel.hidden=!panel.hidden;if(!panel.hidden)panel.scrollIntoView({behavior:"smooth",block:"start"});});
 if(closePanel)closePanel.addEventListener("click",()=>{panel.hidden=true;});

 const META_KEY="atividades-jhon:google-sync-meta";
 let config=readConfig(), dirty=false, applyingRemote=false, pushTimer=null, pollTimer=null, lastApplied="";
 const status=(msg)=>{const el=$("googleSyncStatus");if(el)el.textContent=msg;};
 function readConfig(){try{return JSON.parse(localStorage.getItem(CONFIG_KEY)||"{}")}catch{return{}}}
 function validConfig(c){return c&&/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(c.url||"")&&(c.token||"").length>=30;}
 function snapshot(){
  const data={};
  for(let i=0;i<localStorage.length;i++){
   const k=localStorage.key(i);
   if(k&&k.startsWith("atividades-jhon:")&&k!==CONFIG_KEY&&k!==META_KEY)data[k]=localStorage.getItem(k);
  }
  return {schema:1,exportedAt:new Date().toISOString(),data};
 }
 function restore(payload){
  if(!payload||payload.schema!==1||!payload.data||typeof payload.data!=="object"||Array.isArray(payload.data))throw new Error("Dados recebidos inválidos.");
  const entries=Object.entries(payload.data);
  if(entries.length>5000||entries.some(([k,v])=>!k.startsWith("atividades-jhon:")||typeof v!=="string"||v.length>2000000))throw new Error("Os dados recebidos não passaram na validação.");
  applyingRemote=true;
  try{
   const incoming=new Set(entries.map(([k])=>k));
   const current=[];
   for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith("atividades-jhon:")&&k!==CONFIG_KEY&&k!==META_KEY)current.push(k);}
   current.forEach(k=>{if(!incoming.has(k))localStorage.removeItem(k);});
   entries.forEach(([k,v])=>localStorage.setItem(k,v));
  }finally{applyingRemote=false;}
 }
 function jsonp(){
  return new Promise((resolve,reject)=>{
   const callback="__activityGoogleSync_"+Date.now()+"_"+Math.random().toString(36).slice(2);
   const script=document.createElement("script");
   const timer=setTimeout(()=>finish(new Error("Tempo esgotado ao consultar o Google Planilhas.")),15000);
   function finish(err,value){clearTimeout(timer);delete window[callback];script.remove();err?reject(err):resolve(value);}
   window[callback]=value=>finish(null,value);
   script.onerror=()=>finish(new Error("Não foi possível acessar o Google Apps Script. Confira a URL e a implantação."));
   script.src=config.url+"?action=pull&token="+encodeURIComponent(config.token)+"&callback="+callback+"&_="+Date.now();
   document.head.appendChild(script);
  });
 }
 async function pull(){
  if(!validConfig(config))return;
  const result=await jsonp();
  if(!result||!result.ok)throw new Error(result?.error||"Resposta inválida do Google.");
  if(!result.payload){status("Google conectado. Aguardando o primeiro backup.");return false;}
  const remoteTime=String(result.updatedAt||result.payload.exportedAt||"");
  if(remoteTime&&remoteTime!==lastApplied&&!dirty){
   const meta=JSON.parse(localStorage.getItem(META_KEY)||"{}");
   if(!meta.lastRemote||remoteTime>meta.lastRemote){
    restore(result.payload);
    lastApplied=remoteTime;
    localStorage.setItem(META_KEY,JSON.stringify({lastRemote:remoteTime}));
    status("Atualizado pelo Google em "+new Date(remoteTime).toLocaleString("pt-BR")+".");
    setTimeout(()=>location.reload(),250);
   return true;
   }
  }else if(!dirty){
   status("Sincronização ativa. Última verificação: "+new Date().toLocaleTimeString("pt-BR")+".");
  }
  return false;
 }
 async function push(){
  if(!validConfig(config)||applyingRemote)return;
  const payload=snapshot();
  status("Enviando alterações ao Google Planilhas…");
  try{
   await fetch(config.url,{method:"POST",mode:"no-cors",redirect:"follow",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({token:config.token,payload})});
   dirty=false;
   status("Alterações enviadas. Confirmando gravação no Google…");
   setTimeout(()=>pull().catch(e=>status("Enviado, mas não foi possível confirmar: "+e.message)),2500);
  }catch(e){status("Falha na sincronização: "+e.message+". Os dados continuam salvos neste dispositivo.");}
 }
 function schedulePush(){
  if(!validConfig(config)||applyingRemote)return;
  dirty=true;
  clearTimeout(pushTimer);
  pushTimer=setTimeout(push,1800);
  status("Alteração local detectada. Sincronizando…");
 }
 function start(){
  clearInterval(pollTimer);
  if(!validConfig(config)){status("Ainda não conectado. Seus dados continuam salvos neste dispositivo.");return;}
  pull().catch(e=>status("Google não conectado: "+e.message));
  pollTimer=setInterval(()=>pull().catch(e=>status("Verificação pendente: "+e.message)),20000);
 }
 $("saveGoogleSync").addEventListener("click",()=>{
  const url=$("googleScriptUrl").value.trim(),token=$("googleSyncToken").value.trim();
  const next={url,token};
  if(!validConfig(next)){status("Confira a URL /exec do Apps Script e o token gerado na configuração.");return;}
  config=next;
  localStorage.setItem(CONFIG_KEY,JSON.stringify(config));
  dirty=false;
  pull().then(hasCloudData=>{if(!hasCloudData){dirty=true;return push();}}).then(()=>start()).catch(e=>status("Não foi possível conectar: "+e.message));
 });
 $("clearGoogleSync").addEventListener("click",()=>{
  if(!confirm("Desconectar o Google neste dispositivo? Os dados da planilha e os dados locais não serão apagados."))return;
  localStorage.removeItem(CONFIG_KEY);config={};clearInterval(pollTimer);clearTimeout(pushTimer);
  $("googleScriptUrl").value="";$("googleSyncToken").value="";
  status("Google desconectado neste dispositivo. Os dados locais permanecem.");
 });
 if($("googleScriptUrl"))$("googleScriptUrl").value=config.url||"";
 if($("googleSyncToken"))$("googleSyncToken").value=config.token||"";
 // Observa as gravações feitas pelo próprio sistema para sincronizar sem botões.
 const originalSet=Storage.prototype.setItem, originalRemove=Storage.prototype.removeItem;
 Storage.prototype.setItem=function(k,v){originalSet.call(this,k,v);if(this===localStorage&&String(k).startsWith("atividades-jhon:")&&k!==CONFIG_KEY&&k!==META_KEY)schedulePush();};
 Storage.prototype.removeItem=function(k){originalRemove.call(this,k);if(this===localStorage&&String(k).startsWith("atividades-jhon:")&&k!==CONFIG_KEY&&k!==META_KEY)schedulePush();};
 window.addEventListener("storage",e=>{if(e.key&&e.key.startsWith("atividades-jhon:")&&e.key!==CONFIG_KEY)pull().catch(()=>{});});
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)pull().catch(e=>status("Verificação pendente: "+e.message));});
 start();
})();