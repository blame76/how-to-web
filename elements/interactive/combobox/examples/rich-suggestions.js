const input=document.querySelector('[data-input]');const list=document.querySelector('[data-list]');const form=document.querySelector('[data-form]');const error=document.querySelector('[data-error]');const status=document.querySelector('[data-status]');
const options=[
{id:'signal-ring',label:'Signal Ring',description:'Wearable · voice + gesture · jewelry-first'},
{id:'orbit-charm',label:'Orbit Charm',description:'Carry · ambient companion · bag or keychain'},
{id:'pocket-relay',label:'Pocket Relay',description:'Carry · agent controller · screen-light'},
{id:'field-clip',label:'Field Clip',description:'Wearable · quick access · technical'},
{id:'quiet-pin',label:'Quiet Pin',description:'Wearable · discreet capture · minimal'}
];let active=-1;let selectedValue=null;
function matches(){const q=input.value.trim().toLowerCase();return q?options.filter(x=>(x.label+' '+x.description).toLowerCase().includes(q)):options}
function close(){list.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');active=-1}
function render(){const items=matches();if(active>=items.length)active=-1;list.hidden=false;input.setAttribute('aria-expanded','true');if(!items.length){list.innerHTML='<li class="empty">No object matches.</li>';input.removeAttribute('aria-activedescendant');return}list.innerHTML=items.map((x,i)=>`<li id="rich-option-${x.id}" role="option" aria-selected="${i===active?'true':'false'}" data-index="${i}"><strong>${x.label}</strong><span>${x.description}</span></li>`).join('');if(active>=0){const id=items[active].id;input.setAttribute('aria-activedescendant','rich-option-'+id);requestAnimationFrame(()=>document.getElementById('rich-option-'+id)?.scrollIntoView({block:'nearest'}))}else input.removeAttribute('aria-activedescendant')}
function commit(index){const item=matches()[index];if(!item)return;input.value=item.label;selectedValue=item.label;input.removeAttribute('aria-invalid');error.textContent='';close();status.textContent=`Selected: ${item.label}`}
input.addEventListener('input',()=>{if(input.value!==selectedValue)selectedValue=null;input.removeAttribute('aria-invalid');error.textContent='';active=-1;render()});
input.addEventListener('focus',render);
input.addEventListener('keydown',e=>{const items=matches();if(e.key==='ArrowDown'){e.preventDefault();if(list.hidden)render();active=items.length?(active+1+items.length)%items.length:-1;render()}else if(e.key==='ArrowUp'){e.preventDefault();if(list.hidden)render();active=items.length?(active-1+items.length)%items.length:-1;render()}else if(e.key==='Enter'&&active>=0){e.preventDefault();commit(active)}else if(e.key==='Escape'&&!list.hidden){e.preventDefault();close()}});
list.addEventListener('pointerdown',e=>{if(e.target.closest('[role=option]'))e.preventDefault()});list.addEventListener('click',e=>{const item=e.target.closest('[role=option]');if(item)commit(Number(item.dataset.index))});
form.addEventListener('submit',e=>{e.preventDefault();close();if(!selectedValue){input.setAttribute('aria-invalid','true');error.textContent='Choose a listed object before continuing.';status.textContent='';input.focus();return}status.textContent=`Would open: ${selectedValue}`});
input.addEventListener('blur',()=>requestAnimationFrame(()=>{if(document.activeElement!==input)close()}));