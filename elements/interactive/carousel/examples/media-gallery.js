const root=document.querySelector('[data-carousel]');
const media=root.querySelector('[data-media]');
const pickers=root.querySelector('[data-pickers]');
const prev=root.querySelector('[data-prev]');
const next=root.querySelector('[data-next]');
const position=root.querySelector('[data-position]');
let items=[];let index=0;
async function load(){const r=await fetch('./media-gallery.json',{cache:'no-store'});if(!r.ok)throw new Error(String(r.status));return r.json()}
function picture(item){return `<picture><source type="image/avif" srcset="../assets/generated/${item.image}-640.avif 640w, ../assets/generated/${item.image}-${item.width}.avif ${item.width}w" sizes="(max-width:900px) 100vw,70vw"><source type="image/webp" srcset="../assets/generated/${item.image}-640.webp 640w, ../assets/generated/${item.image}-${item.width}.webp ${item.width}w" sizes="(max-width:900px) 100vw,70vw"><img src="../assets/generated/${item.image}-${item.width}.webp" alt="${item.alt}" style="--focal:${item.position}"></picture>`}
function render(data){items=data.carousel.items;pickers.innerHTML=items.map((item,i)=>`<button type="button" class="thumb" data-index="${i}" aria-pressed="${i===0?'true':'false'}" aria-label="${item.label} anzeigen"><img src="../assets/generated/${item.image}-640.webp" alt=""></button>`).join('');pickers.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.index))));show(0,false)}
function show(i,announce=true){index=Math.max(0,Math.min(i,items.length-1));media.innerHTML=picture(items[index]);pickers.querySelectorAll('button').forEach((b,n)=>b.setAttribute('aria-pressed',n===index?'true':'false'));prev.disabled=index===0;next.disabled=index===items.length-1;position.textContent=`${index+1} von ${items.length} · ${items[index].label}`;position.setAttribute('aria-live',announce?'polite':'off');report()}
prev.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));
function report(){requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'))}
load().then(render).catch(e=>console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',e));
