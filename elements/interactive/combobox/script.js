const toolbar=document.querySelector('[data-stage-toolbar]');
const frame=document.querySelector('[data-stage-frame]');
const variantsTarget=document.querySelector('[data-variants]');
let currentFrame=frame.querySelector('iframe');

async function loadJson(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`${r.status} ${url}`);return r.json()}
function openExample(example,button){toolbar.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');frame.innerHTML='';const iframe=document.createElement('iframe');iframe.src='./examples/'+example.file;iframe.title=example.label;iframe.loading='eager';currentFrame=iframe;frame.append(iframe)}
async function loadVariants(){try{const d=await loadJson('./examples/variants.json');variantsTarget.innerHTML='';d.variants.forEach(item=>{const li=document.createElement('li');const strong=document.createElement('strong');strong.textContent=item.label;li.append(strong,document.createTextNode(' – '+item.description));variantsTarget.append(li)})}catch(e){console.warn(e)}}
async function loadExamples(){try{const d=await loadJson('./examples/manifest.json');if(!d.examples?.length)return;toolbar.innerHTML='';d.examples.forEach((example,index)=>{const b=document.createElement('button');b.type='button';b.textContent=example.label;b.setAttribute('aria-pressed',index===0?'true':'false');b.addEventListener('click',()=>openExample(example,b));toolbar.append(b)});toolbar.querySelector('button')?.click()}catch(e){console.warn('Statischer Fallback bleibt sichtbar.',e)}}
window.addEventListener('message',event=>{if(!currentFrame||event.source!==currentFrame.contentWindow||event.data?.type!=='how-to-web:example-height')return;const h=Math.max(520,Math.min(Number(event.data.height)||0,1200));if(h)currentFrame.style.height=`${h}px`});

const labInput=document.querySelector('[data-lab-input]');
const labList=document.querySelector('[data-lab-listbox]');
const labReset=document.querySelector('[data-lab-reset]');
const stateQuery=document.querySelector('[data-state-query]');
const stateOpen=document.querySelector('[data-state-open]');
const stateActive=document.querySelector('[data-state-active]');
const stateSelected=document.querySelector('[data-state-selected]');
const stateNote=document.querySelector('[data-state-note]');

const labOptions=[
  {id:'signal-ring',label:'Signal Ring',meta:'Wearable · voice + gesture'},
  {id:'orbit-charm',label:'Orbit Charm',meta:'Carry · ambient companion'},
  {id:'pocket-relay',label:'Pocket Relay',meta:'Carry · agent controller'},
  {id:'field-clip',label:'Field Clip',meta:'Wearable · quick access'},
  {id:'quiet-pin',label:'Quiet Pin',meta:'Wearable · discreet capture'},
  {id:'pulse-band',label:'Pulse Band',meta:'Wearable · tactile status'}
];
let labState={query:'r',popup_open:true,active_option:null,selected_value:null,filtered_options:[]};

function filterLab(query){const q=query.trim().toLowerCase();return q?labOptions.filter(o=>o.label.toLowerCase().includes(q)):labOptions}
function renderLab(){
  labState.filtered_options=filterLab(labState.query);
  if(labState.active_option&&!labState.filtered_options.some(o=>o.id===labState.active_option))labState.active_option=null;
  labInput.value=labState.query;
  labInput.setAttribute('aria-expanded',labState.popup_open?'true':'false');
  if(labState.active_option)labInput.setAttribute('aria-activedescendant','lab-option-'+labState.active_option);else labInput.removeAttribute('aria-activedescendant');
  labList.hidden=!labState.popup_open;
  labList.innerHTML=labState.filtered_options.map(o=>`<li id="lab-option-${o.id}" role="option" aria-selected="${o.id===labState.active_option?'true':'false'}" data-option-id="${o.id}"><strong>${o.label}</strong><span>${o.meta}</span></li>`).join('');
  stateQuery.textContent=JSON.stringify(labState.query);
  stateOpen.textContent=String(labState.popup_open);
  stateActive.textContent=labState.active_option?JSON.stringify(labOptions.find(o=>o.id===labState.active_option)?.label):'null';
  stateSelected.textContent=labState.selected_value?JSON.stringify(labState.selected_value):'null';
  stateNote.textContent=labState.active_option&&!labState.selected_value?'Aktiv ist noch nicht übernommen. Enter würde jetzt committen.':labState.selected_value?'Der Wert wurde explizit übernommen. Weitere Eingabe trennt Query und Selection wieder.':'Ein sichtbarer Vorschlag ist noch keine Auswahl.';
}
function setActive(index){
  const options=labState.filtered_options;
  if(!options.length){labState.active_option=null;renderLab();return}
  const wrapped=(index+options.length)%options.length;
  labState.active_option=options[wrapped].id;
  renderLab();
  requestAnimationFrame(()=>document.getElementById('lab-option-'+labState.active_option)?.scrollIntoView({block:'nearest'}));
}
function commitLab(id){
  const option=labOptions.find(o=>o.id===id);if(!option)return;
  labState.query=option.label;
  labState.selected_value=option.label;
  labState.active_option=null;
  labState.popup_open=false;
  renderLab();
}
labInput.addEventListener('input',()=>{
  labState.query=labInput.value;
  if(labState.selected_value!==labState.query)labState.selected_value=null;
  labState.active_option=null;
  labState.popup_open=true;
  renderLab();
});
labInput.addEventListener('keydown',event=>{
  const options=labState.filtered_options;
  const current=options.findIndex(o=>o.id===labState.active_option);
  if(event.key==='ArrowDown'){event.preventDefault();labState.popup_open=true;setActive(current<0?0:current+1)}
  else if(event.key==='ArrowUp'){event.preventDefault();labState.popup_open=true;setActive(current<0?options.length-1:current-1)}
  else if(event.key==='Enter'&&labState.active_option){event.preventDefault();commitLab(labState.active_option)}
  else if(event.key==='Escape'&&labState.popup_open){event.preventDefault();labState.popup_open=false;labState.active_option=null;renderLab()}
});
labList.addEventListener('pointerdown',event=>{if(event.target.closest('[role=option]'))event.preventDefault()});
labList.addEventListener('click',event=>{const option=event.target.closest('[role=option]');if(option)commitLab(option.dataset.optionId)});
labInput.addEventListener('blur',()=>requestAnimationFrame(()=>{if(document.activeElement!==labInput){labState.popup_open=false;labState.active_option=null;renderLab()}}));
labInput.addEventListener('focus',()=>{labState.popup_open=true;renderLab()});
labReset.addEventListener('click',()=>{labState={query:'r',popup_open:true,active_option:null,selected_value:null,filtered_options:[]};renderLab();labInput.focus()});

renderLab();
loadVariants();
loadExamples();