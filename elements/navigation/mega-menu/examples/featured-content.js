const nav=document.querySelector('[data-nav]');const triggers=[...nav.querySelectorAll('[data-disclosure]')];
function panelFor(t){return document.getElementById(t.getAttribute('aria-controls'))}
function close(t,focus=false){t.setAttribute('aria-expanded','false');panelFor(t).hidden=true;if(focus)t.focus()}
function closeAll(except=null){triggers.forEach(t=>{if(t!==except)close(t)})}
function open(t){closeAll(t);t.setAttribute('aria-expanded','true');panelFor(t).hidden=false}
triggers.forEach(t=>t.addEventListener('click',()=>t.getAttribute('aria-expanded')==='true'?close(t):open(t)));
nav.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const t=triggers.find(x=>x.getAttribute('aria-expanded')==='true');if(t){e.preventDefault();close(t,true)}});
nav.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!nav.contains(document.activeElement))closeAll()}));
document.addEventListener('pointerdown',e=>{if(!nav.contains(e.target))closeAll()});
requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'));