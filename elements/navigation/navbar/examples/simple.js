const root=document.querySelector('[data-navbar]');
const media=window.matchMedia('(max-width: 48rem)');

async function loadData(){
  const response=await fetch('./simple.json',{cache:'no-store'});
  if(!response.ok) throw new Error(String(response.status));
  return response.json();
}

function navigationMarkup(data){
  const links=data.navigation.primary.map(item=>`<li><a href="${item.href}"${item.current?' aria-current="page"':''}>${item.label}</a></li>`).join('');
  return `<div class="navbar">
    <a class="brand" href="${data.navigation.home.href}">${data.navigation.home.label}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="simple-navigation">${data.navigation.mobile_label}</button>
    <nav class="nav-panel" id="simple-navigation" aria-label="${data.navigation.label}"><ul class="nav-list">${links}</ul></nav>
  </div>`;
}

function bind(){
  const button=root.querySelector('.menu-toggle');
  const panel=root.querySelector('.nav-panel');
  function sync(){
    if(media.matches){
      const expanded=button.getAttribute('aria-expanded')==='true';
      panel.hidden=!expanded;
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
