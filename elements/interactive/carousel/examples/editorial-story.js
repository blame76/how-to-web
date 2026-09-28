const root=document.querySelector('[data-carousel]');
const slidesHost=root.querySelector('[data-slides]');
const pickersHost=root.querySelector('[data-pickers]');
const prev=root.querySelector('[data-prev]');
const next=root.querySelector('[data-next]');
const position=root.querySelector('[data-position]');
let slides=[];let index=0;let wrap=false;
async function load(){const r=await fetch('./editorial-story.json',{cache:'no-store'});if(!r.ok)throw new Error(String(r.status));return r.json()}
function picture(s){return `<picture class="slide__media"><source type="image/avif" srcset="${s.image.avif}" sizes="100vw"><source type="image/webp" srcset="${s.image.webp}" sizes="100vw"><img src="${s.image.fallback}" alt="${s.image.alt}" style="--focal:${s.image.position}" ${s.id==='charm'?'fetchpriority="high"':'loading="lazy"'}></picture>`}
function render(data){slides=data.carousel.slides;wrap=data.carousel.wrap;slidesHost.innerHTML=slides.map((s,i)=>`<article class="slide${i===0?' is-active':''}" role="group" aria-roledescription="slide" aria-label="${i+1} von ${slides.length}" ${i===0?'':'hidden'}>${picture(s)}<div class="slide__veil"></div><div class="slide__copy slide__copy--${s.content_position}"><p class="kicker">${s.kicker}</p><h1>${s.heading}</h1><p>${s.body}</p></div></article>`).join('');pickersHost.innerHTML=slides.map((s,i)=>`<button class="picker" type="button" data-index="${i}" aria-label="Slide ${i+1}: ${s.heading}" aria-pressed="${i===0?'true':'false'}">${String(i+1).padStart(2,'0')}</button>`).join('');bindPickers();show(0,false)}
function show(nextIndex,announce=true){index=Math.max(0,Math.min(nextIndex,slides.length-1));[...slidesHost.children].forEach((el,i)=>{el.hidden=i!==index;el.classList.toggle('is-active',i===index)});pickersHost.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',i===index?'true':'false'));prev.disabled=!wrap&&index===0;next.disabled=!wrap&&index===slides.length-1;position.textContent=`${index+1} von ${slides.length}`;if(!announce)position.setAttribute('aria-live','off');else position.setAttribute('aria-live','polite');report()}
function move(delta){let target=index+delta;if(wrap){target=(target+slides.length)%slides.length}show(target)}
function bindPickers(){pickersHost.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.index))))}
prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
function report(){requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'))}
load().then(render).catch(e=>{console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',e);slides=[{}];show(0,false)});
