const mount=document.querySelector('[data-product-card]');

async function loadData(){
  const response=await fetch('./technical-retail.json',{cache:'no-store'});
  if(!response.ok) throw new Error(String(response.status));
  return response.json();
}

function render(data){
  const p=data.product;
  const specs=p.specs.map(item=>`<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join('');
  mount.innerHTML=`
    <article class="product-card" aria-labelledby="technical-title">
      <div class="product-card__media">
        <picture>
          <source type="image/avif" srcset="${p.image.avif_srcset}" sizes="(max-width: 608px) calc(100vw - 16px), 304px">
          <source type="image/webp" srcset="${p.image.webp_srcset}" sizes="(max-width: 608px) calc(100vw - 16px), 304px">
          <img src="${p.image.fallback}" alt="${p.image.alt}" width="${p.image.width}" height="${p.image.height}">
        </picture>
      </div>
      <div class="product-card__body">
        <p class="product-card__brand">${p.brand} · ${p.sku}</p>
        <h2 id="technical-title">${p.name}</h2>
        <p class="product-card__price">${p.price.display}</p>
        <dl class="specs">${specs}</dl>
        <a class="product-card__action" href="${p.product_url}">Technische Details ansehen</a>
      </div>
    </article>`;
  reportHeight();
}

function reportHeight(){
  requestAnimationFrame(()=>window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*'));
}

loadData().then(render).catch(error=>{console.warn('JSON konnte nicht geladen werden. Statischer Fallback bleibt aktiv.',error);reportHeight();});
window.addEventListener('resize',reportHeight);
