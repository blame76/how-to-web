const toolbar=document.querySelector('[data-stage-toolbar]');
const frame=document.querySelector('[data-stage-frame]');
const variantsTarget=document.querySelector('[data-variants]');
let currentFrame=null;

async function loadJson(url){
  const response=await fetch(url,{cache:'no-store'});
  if(!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

function showEmpty(message='Noch kein Beispiel vorhanden.'){
  frame.innerHTML='';
  const empty=document.createElement('div');
  empty.className='stage-empty';
  empty.innerHTML=`<strong>${message}</strong><p>HTML-Beispiele in <code>examples/</code> werden über <code>manifest.json</code> geladen.</p>`;
  frame.append(empty);
}

async function loadVariants(){
  try{
    const data=await loadJson('./examples/variants.json');
    if(!data.variants?.length) return;
    variantsTarget.innerHTML='';
    for(const item of data.variants){
      const li=document.createElement('li');
      const state=item.example ? 'verfügbar' : 'geplant';
      li.textContent=`${item.label} – ${state}`;
      variantsTarget.append(li);
    }
  }catch(error){
    console.warn('Varianten konnten nicht geladen werden.',error);
  }
}

function openExample(example,button){
  toolbar.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed','false'));
  button.setAttribute('aria-pressed','true');
  frame.innerHTML='';
  const iframe=document.createElement('iframe');
  iframe.src='./examples/'+example.file;
  iframe.title=example.label;
  iframe.loading='eager';
  currentFrame=iframe;
  frame.append(iframe);
}

async function loadExamples(){
  try{
    const data=await loadJson('./examples/manifest.json');
    if(!data.examples?.length){
      showEmpty();
      return;
    }
    toolbar.innerHTML='';
    data.examples.forEach((example,index)=>{
      const button=document.createElement('button');
      button.type='button';
      button.textContent=example.label;
      button.setAttribute('aria-pressed',index===0?'true':'false');
      button.addEventListener('click',()=>openExample(example,button));
      toolbar.append(button);
    });
    const first=toolbar.querySelector('button');
    if(first) openExample(data.examples[0],first);
  }catch(error){
    console.warn('Beispiele konnten nicht geladen werden. Statischer Fallback bleibt sichtbar.',error);
    currentFrame=frame.querySelector('iframe');
  }
}

window.addEventListener('message',event=>{
  if(!currentFrame || event.source!==currentFrame.contentWindow) return;
  if(event.data?.type!=='how-to-web:example-height') return;
  const height=Math.max(520,Math.min(Number(event.data.height)||0,1400));
  if(height) currentFrame.style.height=`${height}px`;
});

currentFrame=frame.querySelector('iframe');
loadVariants();
loadExamples();
