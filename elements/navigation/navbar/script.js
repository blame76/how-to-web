const toolbar=document.querySelector('[data-stage-toolbar]');
const frame=document.querySelector('[data-stage-frame]');
const variantsTarget=document.querySelector('[data-variants]');
let currentFrame=frame.querySelector('iframe');

async function loadJson(url){
  const response=await fetch(url,{cache:'no-store'});
  if(!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
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

async function loadVariants(){
  try{
    const data=await loadJson('./examples/variants.json');
    if(!data.variants?.length) return;
    variantsTarget.innerHTML='';
    for(const item of data.variants){
      const li=document.createElement('li');
      const strong=document.createElement('strong');
      strong.textContent=item.label;
      li.append(strong,document.createTextNode(' – '+item.description));
      variantsTarget.append(li);
    }
  }catch(error){console.warn('Varianten konnten nicht geladen werden.',error)}
}

async function loadExamples(){
  try{
    const data=await loadJson('./examples/manifest.json');
    if(!data.examples?.length) return;
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
  const height=Math.max(480,Math.min(Number(event.data.height)||0,1200));
  if(height) currentFrame.style.height=`${height}px`;
});

loadVariants();
loadExamples();
