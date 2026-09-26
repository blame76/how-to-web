const stage=document.querySelector('[data-stage]');
const toolbar=document.querySelector('[data-stage-toolbar]');
const frame=document.querySelector('[data-stage-frame]');
const variantsTarget=document.querySelector('[data-variants]');

async function loadJson(url){
  const response=await fetch(url,{cache:'no-store'});
  if(!response.ok) throw new Error(String(response.status));
  return response.json();
}
function showEmpty(){
  frame.innerHTML='<div class="stage-empty"><strong>Noch kein Beispiel vorhanden.</strong><p>Sobald HTML-Beispiele im Ordner examples/ liegen und das Manifest erzeugt wurde, werden sie hier automatisch geladen.</p></div>';
}
async function loadVariants(){
  try{
    const data=await loadJson('./examples/variants.json');
    if(!data.variants?.length) return;
    variantsTarget.innerHTML='';
    for(const item of data.variants){
      const li=document.createElement('li');
      li.textContent=item.label;
      variantsTarget.append(li);
    }
  }catch{}
}
async function loadExamples(){
  try{
    const data=await loadJson('./examples/manifest.json');
    if(!data.examples?.length){showEmpty();return;}
    toolbar.innerHTML='';
    data.examples.forEach((example,index)=>{
      const button=document.createElement('button');
      button.type='button';
      button.textContent=example.label;
      button.setAttribute('aria-pressed',index===0?'true':'false');
      button.addEventListener('click',()=>{
        toolbar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));
        button.setAttribute('aria-pressed','true');
        frame.innerHTML='';
        const iframe=document.createElement('iframe');
        iframe.src='./examples/'+example.file;
        iframe.title=example.label;
        iframe.loading='lazy';
        frame.append(iframe);
      });
      toolbar.append(button);
    });
    toolbar.querySelector('button')?.click();
  }catch{showEmpty();}
}
loadVariants();
loadExamples();
