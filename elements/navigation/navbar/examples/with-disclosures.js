const root=document.querySelector('[data-navbar]');
const media=window.matchMedia('(max-width: 48rem)');

async function loadData(){
  const response=await fetch('./with-disclosures.json',{cache:'no-store'});
  if(!response.ok) throw new Error(String(response.status));
  return response.json();
}

function itemMarkup(item,index){
  if(item.children){
    const children=item.children.map(child=>`<li><a href="${child.href}"${child.current?' aria-current="page"':''}>${child.label}</a></li>`).join('');
    return `<li class="nav-item has-disclosure"><button class="disclosure-button" type="button" aria-expanded="false" aria-controls="group-${index}">${item.label} <span aria-hidden="true">↓</span></button><ul class="subnav" id="group-${index}" hidden>${children}</ul></li>`;
  }
  return `<li class="nav-item"><a class="top-link" href="${item.href}"${item.current?' aria-current="page"':''}>${item.label}</a></li>`;
}

function navigationMarkup(data){
  const items=data.navigation.primary.map(itemMarkup).join('');
  return `<div class="navbar"><a class="brand" href="${data.navigation.home.href}">${data.navigation.home.label}</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="disclosure-navigation">${data.navigation.mobile_label}</button><nav class="nav-panel" id="disclosure-navigation" aria-label="${data.navigation.label}"><ul class="nav-list">${items}</ul></nav></div>`;
}

function bind(){
  const menuButton=root.querySelector('.menu-toggle');
  const panel=root.querySelector('.nav-panel');
  const disclosureButtons=[...root.querySelectorAll('.disclosure-button')];

  function closeDisclosure(button,focus=false){
    const target=document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded','false');
    if(target) target.hidden=true;
    if(focus) button.focus();
  }

  function closeOthers(except){
    disclosureButtons.forEach(button=>{if(button!==except) closeDisclosure(button)});
  }

  disclosureButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      const expanded=button.getAttribute('aria-expanded')==='true';
      closeOthers(button);
      const target=document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded',expanded?'false':'true');
      if(target) target.hidden=expanded;
      reportHeight();
    });
    button.addEventListener('keydown',event=>{
      if(event.key==='Escape' && button.getAttribute('aria-expanded')==='true'){
        event.preventDefault();
        closeDisclosure(button,true);
        reportHeight();
      }
    });
  });

  function sync(){
    closeOthers(null);
    if(media.matches){
      const expanded=menuButton.getAttribute('aria-expanded')==='true';
      panel.hidden=!expanded;
    }else{
      panel.hidden=false;
      menuButton.setAttribute('aria-expanded','false');
    }
    reportHeight();
  }

  menuButton.addEventListener('click',()=>{
    menuButton.setAttribute('aria-expanded',menuButton.getAttribute('aria-expanded')==='true'?'false':'true');
    sync();
  });

  root.addEventListener('keydown',event=>{
    if(event.key!=='Escape') return;
    const open=disclosureButtons.find(button=>button.getAttribute('aria-expanded')==='true');
    if(open){event.preventDefault();closeDisclosure(open,true);reportHeight();return}
    if(media.matches && menuButton.getAttribute('aria-expanded')==='true'){
      event.preventDefault();
      menuButton.setAttribute('aria-expanded','false');
      sync();
      menuButton.focus();
    }
  });

  document.addEventListener('pointerdown',event=>{
    if(media.matches || root.contains(event.target)) return;
    disclosureButtons.forEach(button=>closeDisclosure(button));
    reportHeight();
  });

  media.addEventListener('change',sync);
  sync();
}

function reportHeight(){
  requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'));
}

bind();
loadData().then(data=>{root.innerHTML=navigationMarkup(data);bind();}).catch(error=>console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',error));
window.addEventListener('resize',reportHeight);
