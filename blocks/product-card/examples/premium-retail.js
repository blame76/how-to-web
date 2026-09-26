const mount=document.querySelector('[data-product-card]');

async function loadData(){
  const response=await fetch('./premium-retail.json',{cache:'no-store'});
  if(!response.ok) throw new Error(`Produktdaten konnten nicht geladen werden: ${response.status}`);
  return response.json();
}

function pictureMarkup(image){
  return `
    <picture>
      <source type="image/avif" srcset="${image.avif_srcset}" sizes="(max-width: 440px) calc(100vw - 16px), 400px">
      <source type="image/webp" srcset="${image.webp_srcset}" sizes="(max-width: 440px) calc(100vw - 16px), 400px">
      <img
        src="${image.fallback}"
        alt="${image.alt}"
        width="${image.width}"
        height="${image.height}"
        data-fit="${image.fit}"
        decoding="async">
    </picture>`;
}

function thumbMarkup(image,index){
  return `
    <li>
      <button class="product-card__thumbnail" type="button" data-image-index="${index}" aria-pressed="${index===0?'true':'false'}" aria-label="${image.label} anzeigen">
        <img src="${image.fallback}" alt="" width="96" height="96" loading="lazy">
      </button>
    </li>`;
}

function render(data){
  const product=data.product;
  const primary=product.images[0];

  mount.innerHTML=`
    <article class="product-card" aria-labelledby="product-title">
      <div class="product-card__media" data-product-media>
        ${pictureMarkup(primary)}
      </div>
      <div class="product-card__body">
        <p class="product-card__brand">${product.brand}</p>
        <h2 class="product-card__title" id="product-title">${product.name}</h2>
        <p class="product-card__price">${product.price.display}</p>
        <p class="product-card__rating" aria-label="${product.rating.display}">
          ${product.rating.value.toLocaleString('de-DE')} von 5 · ${product.rating.count} Bewertungen
        </p>
        <p class="product-card__variation">${product.variation_cue}</p>
        <ul class="product-card__thumbnails" aria-label="Produktansichten">
          ${product.images.map(thumbMarkup).join('')}
        </ul>
        <a class="product-card__action" href="${product.product_url}">
          Produkt ansehen<span class="visually-hidden">: ${product.name}</span>
        </a>
        <p class="product-card__status">Demo: ${data.decisions.current_image_count} von empfohlenen ${data.decisions.image_count_target}+ Ansichten vorhanden.</p>
      </div>
    </article>`;

  const media=mount.querySelector('[data-product-media]');
  const buttons=[...mount.querySelectorAll('[data-image-index]')];

  buttons.forEach(button=>{
    button.addEventListener('click',()=>{
      const index=Number(button.dataset.imageIndex);
      const image=product.images[index];
      media.innerHTML=pictureMarkup(image);
      buttons.forEach(item=>item.setAttribute('aria-pressed','false'));
      button.setAttribute('aria-pressed','true');
      reportHeight();
    });
  });

  reportHeight();
}

function reportHeight(){
  requestAnimationFrame(()=>{
    window.parent.postMessage({
      type:'how-to-web:example-height',
      height:document.documentElement.scrollHeight
    },'*');
  });
}

loadData()
  .then(render)
  .catch(error=>{
    mount.innerHTML=`<p role="alert"><strong>Beispiel konnte nicht geladen werden.</strong><br>${error.message}</p>`;
    reportHeight();
  });

window.addEventListener('resize',reportHeight);
