const toolbar=document.querySelector('[data-stage-toolbar]');
const frame=document.querySelector('[data-stage-frame]');
const variantsTarget=document.querySelector('[data-variants]');
let currentFrame=frame.querySelector('iframe');
async function loadJson(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`${r.status} ${url}`);return r.json()}
function openExample(example,button){toolbar.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');frame.innerHTML='';const iframe=document.createElement('iframe');iframe.src='./examples/'+example.file;iframe.title=example.label;iframe.loading='eager';currentFrame=iframe;frame.append(iframe)}
async function loadVariants(){try{const d=await loadJson('./examples/variants.json');variantsTarget.innerHTML='';d.variants.forEach(item=>{const li=document.createElement('li');const strong=document.createElement('strong');strong.textContent=item.label;li.append(strong,document.createTextNode(' – '+item.description));variantsTarget.append(li)})}catch(e){console.warn(e)}}
async function loadExamples(){try{const d=await loadJson('./examples/manifest.json');if(!d.examples?.length)return;toolbar.innerHTML='';d.examples.forEach((example,index)=>{const b=document.createElement('button');b.type='button';b.textContent=example.label;b.setAttribute('aria-pressed',index===0?'true':'false');b.addEventListener('click',()=>openExample(example,b));toolbar.append(b)});toolbar.querySelector('button')?.click()}catch(e){console.warn('Statischer Fallback bleibt sichtbar.',e)}}
window.addEventListener('message',event=>{if(!currentFrame||event.source!==currentFrame.contentWindow||event.data?.type!=='how-to-web:example-height')return;const h=Math.max(520,Math.min(Number(event.data.height)||0,1200));if(h)currentFrame.style.height=`${h}px`});
loadVariants();loadExamples();
