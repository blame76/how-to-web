const mount=document.querySelector('[data-product-card]');

async function loadData(){
  const response=await fetch('./compact.json',{cache:'no-store'});
  if(!response.ok) throw new Error(String(response.status));
  return response.json();
}

function render(data){
  const p=data.product;
  mount.innerHTML=`
    <article class="product-card" aria-labelledby="compact-title">
      <div class="product-card__media"><img src="${p.image.fallback}" alt="${p.image.alt}" width="${p.image.width}" height="${p.image.height}"></div>
      <div class="product-card__body">
        <p class="product-card__brand">${p.brand}</p>
        <h2 id="compact-title">${p.name}</h2>
        <p class="product-card__variation">${p.variation_cue}</p>
        <div class="product-card__footer"><strong>${p.price.display}</strong><a href="${p.product_url}">Ansehen</a></div>
      </div>
    </article>`;
  reportHeight();
}

function reportHeight(){
  requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'));
}

loadData().then(render).catch(error=>{console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',error);reportHeight();});
window.addEventListener('resize',reportHeight);
