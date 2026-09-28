const openButton=document.querySelector('[data-open]');
const dialog=document.querySelector('[data-dialog]');
const closeButton=dialog.querySelector('[data-close]');
const title=dialog.querySelector('[data-initial-focus]');
const content=dialog.querySelector('[data-content]');
let invoker=null;
function requestCloseDialog(value=''){if(typeof dialog.requestClose==='function')dialog.requestClose(value);else dialog.close(value)}
async function load(){const r=await fetch('./information.json',{cache:'no-store'});if(!r.ok)throw new Error(String(r.status));return r.json()}
function render(data){title.textContent=data.dialog.label;content.innerHTML=data.dialog.sections.map(s=>`<section><h3>${s.heading}</h3><p>${s.body}</p></section>`).join('')}
function open(){invoker=document.activeElement;dialog.showModal();requestAnimationFrame(()=>title.focus());report()}
openButton.addEventListener('click',open);
closeButton.addEventListener('click',()=>requestCloseDialog('close'));
dialog.addEventListener('close',()=>{if(invoker?.isConnected)invoker.focus();report()});
function report(){requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'))}
load().then(render).catch(e=>console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',e));report();
