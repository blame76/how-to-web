const openButton=document.querySelector('[data-open]');
const dialog=document.querySelector('[data-dialog]');
const cancelButton=dialog.querySelector('[data-cancel]');
const confirmButton=dialog.querySelector('[data-confirm]');
const project=document.querySelector('[data-project]');
const result=document.querySelector('[data-result]');
let invoker=null;
async function load(){const r=await fetch('./confirmation.json',{cache:'no-store'});if(!r.ok)throw new Error(String(r.status));return r.json()}
function open(){invoker=document.activeElement;dialog.showModal();requestAnimationFrame(()=>cancelButton.focus());report()}
openButton.addEventListener('click',open);
cancelButton.addEventListener('click',()=>dialog.close('cancel'));
confirmButton.addEventListener('click',()=>dialog.close('confirm'));
dialog.addEventListener('close',()=>{
  if(dialog.returnValue==='confirm'){
    project.remove();
    result.hidden=false;
    requestAnimationFrame(()=>result.focus());
  }else if(invoker?.isConnected){
    invoker.focus();
  }
  report();
});
function report(){requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'))}
load().catch(e=>console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',e));report();
