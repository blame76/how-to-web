const openButton=document.querySelector('[data-open]');
const dialog=document.querySelector('[data-dialog]');
const form=document.querySelector('[data-form]');
const cancelButton=dialog.querySelector('[data-cancel]');
const initial=dialog.querySelector('[data-initial-focus]');
const status=document.querySelector('[data-status]');
let invoker=null;
async function load(){const r=await fetch('./form.json',{cache:'no-store'});if(!r.ok)throw new Error(String(r.status));return r.json()}
function open(){invoker=document.activeElement;status.textContent='';dialog.showModal();requestAnimationFrame(()=>initial.focus());report()}
openButton.addEventListener('click',open);
cancelButton.addEventListener('click',()=>dialog.close('cancel'));
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;dialog.close('save')});
dialog.addEventListener('close',()=>{if(dialog.returnValue==='save')status.textContent='Demo: Kontakt würde jetzt gespeichert.';if(invoker?.isConnected)invoker.focus();report()});
function report(){requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'))}
load().catch(e=>console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',e));report();
