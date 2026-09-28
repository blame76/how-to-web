const root=document.querySelector('[data-navbar]');
const media=window.matchMedia('(max-width: 48rem)');

async function loadData(){
  const response=await fetch('./utility-plus-primary.json',{cache:'no-store'});
  if(!response.ok) throw new Error(String(response.status));
  return response.json();
}

function linksMarkup(items,className){
  return `<ul class="${className}">${items.map(item=>`<li><a${item.emphasis?' class="emphasis"':''} href="${item.href}"${item.current?' aria-current="page"':''}>${item.label}</a></li>`).join('')}</ul>`;
}

function navigationMarkup(data){
  return `<div class="navbar">
    <a class="brand" href="${data.navigation.home.href}">${data.navigation.home.label}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="utility-navigation">${data.navigation.mobile_label}</button>
    <nav class="nav-panel" id="utility-navigation" aria-label="${data.navigation.label}">
      <div class="nav-group"><span class="group-label">Primär</span>${linksMarkup(data.navigation.primary,'primary-list')}</div>
      <div class="nav-group utility-group"><span class="group-label">Service</span>${linksMarkup(data.navigation.utility,'utility-list')}</div>
    </nav>
  </div>`;
}

function bind(){
  const button=root.querySelector('.menu-toggle');
  const panel=root.querySelector('.nav-panel');
  function sync(){
    if(media.matches){
      panel.hidden=button.getAttribute('aria-expanded')!=='true';
    }else{
      panel.hidden=false;
      button.setAttribute('aria-expanded','false');
    }
    reportHeight();
  }
  button.addEventListener('click',()=>{
    button.setAttribute('aria-expanded',button.getAttribute('aria-expanded')==='true'?'false':'true');
    sync();
  });
  root.addEventListener('keydown',event=>{
    if(event.key==='Escape' && media.matches && button.getAttribute('aria-expanded')==='true'){
      event.preventDefault();
      button.setAttribute('aria-expanded','false');
      sync();
      button.focus();
    }
  });
  media.addEventListener('change',sync);
  sync();
}

function reportHeight(){
  requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'));
}

loadData().then(data=>{root.innerHTML=navigationMarkup(data);bind();}).catch(error=>{console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',error);bind();});
window.addEventListener('resize',reportHeight);
