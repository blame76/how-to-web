const toolbar=document.querySelector('[data-stage-toolbar]');
const frame=document.querySelector('[data-stage-frame]');
const variantsTarget=document.querySelector('[data-variants]');
let currentFrame=frame.querySelector('iframe');
async function loadJson(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`${r.status} ${url}`);return r.json()}
function openExample(example,button){toolbar.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');frame.innerHTML='';const iframe=document.createElement('iframe');iframe.src='./examples/'+example.file;iframe.title=example.label;iframe.loading='eager';currentFrame=iframe;frame.append(iframe)}
async function loadVariants(){try{const d=await loadJson('./examples/variants.json');variantsTarget.innerHTML='';d.variants.forEach(item=>{const li=document.createElement('li');const strong=document.createElement('strong');strong.textContent=item.label;li.append(strong,document.createTextNode(' – '+item.description));variantsTarget.append(li)})}catch(e){console.warn(e)}}
async function loadExamples(){try{const d=await loadJson('./examples/manifest.json');if(!d.examples?.length)return;toolbar.innerHTML='';d.examples.forEach((example,index)=>{const b=document.createElement('button');b.type='button';b.textContent=example.label;b.setAttribute('aria-pressed',index===0?'true':'false');b.addEventListener('click',()=>openExample(example,b));toolbar.append(b)});toolbar.querySelector('button')?.click()}catch(e){console.warn('Statischer Fallback bleibt sichtbar.',e)}}
window.addEventListener('message',event=>{if(!currentFrame||event.source!==currentFrame.contentWindow||event.data?.type!=='how-to-web:example-height')return;const h=Math.max(520,Math.min(Number(event.data.height)||0,1200));if(h)currentFrame.style.height=`${h}px`});

const groups=[
  {label:'Hardware',links:['Charm','Ring','Clip']},
  {label:'Software',links:['Desktop','Mobile','API']},
  {label:'Services',links:['Beratung','Integration','Support']}
];
const patternDemo=document.querySelector('[data-pattern-demo]');
const patternAnalysis=document.querySelector('[data-pattern-analysis]');
const patternButtons=[...document.querySelectorAll('[data-pattern]')];
const analyses={
  simple:{title:'Simple Dropdown',gain:'Wenig Interaktionslogik und geringer Implementierungsaufwand.',cost:'Alle Ziele stehen in einer langen Sequenz; Beziehungen zwischen Gruppen sind schwächer sichtbar.',use:'Wenn die Zahl relevanter Ziele überschaubar bleibt und Nutzer keinen gleichzeitigen Überblick brauchen.'},
  cascade:{title:'Cascading',gain:'Spart Fläche und zeigt pro Schritt nur den gerade gewählten Bereich.',cost:'Andere Bereiche verschwinden während des Drill-downs; Vergleich und Gesamtüberblick werden schwächer.',use:'Wenn die Hierarchie wichtiger ist als der gleichzeitige Vergleich mehrerer Gruppen.'},
  mega:{title:'Mega Menu',gain:'Alle Gruppen und ihre wichtigsten Ziele sind gleichzeitig scanbar.',cost:'Mehr Fläche, Zustände, Responsive- und Accessibility-Verantwortung.',use:'Wenn viele relevante Ziele sinnvoll gruppiert sind und der gleichzeitige Überblick einen echten Navigationsvorteil schafft.'}
};
function links(items){return `<ul>${items.map(x=>`<li><a href="#">${x}</a></li>`).join('')}</ul>`}
function demo(mode){
  const bar='<div class="demo-bar"><span class="demo-brand">ACME</span><div class="demo-nav"><span>Produkte</span><span>Über uns</span></div></div>';
  if(mode==='simple'){
    const all=groups.flatMap(g=>g.links);
    return `<div class="demo-shell">${bar}<div class="simple-panel"><strong>Produkte</strong>${links(all)}</div></div>`;
  }
  if(mode==='cascade'){
    return `<div class="demo-shell">${bar}<div class="cascade-panel"><div class="cascade-layout"><div class="cascade-categories">${groups.map((g,i)=>`<strong${i===0?' class="cascade-current"':''}>${g.label} →</strong>`).join('')}</div><div><p class="eyebrow">Aktuell sichtbar</p><h4>${groups[0].label}</h4>${links(groups[0].links)}</div></div></div></div>`;
  }
  return `<div class="demo-shell">${bar}<div class="mega-panel-demo">${groups.map(g=>`<section><h4>${g.label}</h4>${links(g.links)}</section>`).join('')}</div></div>`;
}
function renderPattern(mode){
  patternButtons.forEach(b=>b.setAttribute('aria-pressed',b.dataset.pattern===mode?'true':'false'));
  patternDemo.innerHTML=demo(mode);
  const a=analyses[mode];
  patternAnalysis.innerHTML=`<p class="eyebrow">Was ändert sich?</p><h3>${a.title}</h3><dl><div><dt>Gewinn</dt><dd>${a.gain}</dd></div><div><dt>Kosten</dt><dd>${a.cost}</dd></div><div><dt>Gut begründbar, wenn …</dt><dd>${a.use}</dd></div></dl>`;
}
patternButtons.forEach(b=>b.addEventListener('click',()=>renderPattern(b.dataset.pattern)));
renderPattern('simple');

loadVariants();loadExamples();
