const nav=document.querySelector('[data-nav]');const triggers=[...nav.querySelectorAll('[data-disclosure]')];
function panelFor(trigger){return document.getElementById(trigger.getAttribute('aria-controls'))}
function close(trigger,returnFocus=false){trigger.setAttribute('aria-expanded','false');panelFor(trigger).hidden=true;if(returnFocus)trigger.focus()}
function closeAll(except=null){triggers.forEach(t=>{if(t!==except)close(t)})}
function open(trigger){closeAll(trigger);trigger.setAttribute('aria-expanded','true');panelFor(trigger).hidden=false}
triggers.forEach(trigger=>trigger.addEventListener('click',()=>trigger.getAttribute('aria-expanded')==='true'?close(trigger):open(trigger)));
nav.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const openTrigger=triggers.find(t=>t.getAttribute('aria-expanded')==='true');if(openTrigger){event.preventDefault();close(openTrigger,true)}});
nav.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!nav.contains(document.activeElement))closeAll()}));
document.addEventListener('pointerdown',event=>{if(!nav.contains(event.target))closeAll()});
function report(){requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'))}report();