const mount=document.querySelector('[data-product-card]');

const fallbackImages={
  studio:{
    alt:'Grauer Oversized-Hoodie in frontaler Studioansicht.',
    fit:'contain',
    avif:'../assets/generated/hoodie-studio-front-480.avif 480w, ../assets/generated/hoodie-studio-front-960.avif 960w, ../assets/generated/hoodie-studio-front-1440.avif 1440w, ../assets/generated/hoodie-studio-front-1920.avif 1920w',
    webp:'../assets/generated/hoodie-studio-front-480.webp 480w, ../assets/generated/hoodie-studio-front-960.webp 960w, ../assets/generated/hoodie-studio-front-1440.webp 1440w, ../assets/generated/hoodie-studio-front-1920.webp 1920w',
    fallback:'../assets/generated/hoodie-studio-front-960.webp'
  },
  moon:{
    alt:'Person im grauen Oversized-Hoodie von hinten auf dem Mond mit Blick auf die Erde.',
    fit:'cover',
    avif:'../assets/generated/hoodie-moon-back-480.avif 480w, ../assets/generated/hoodie-moon-back-960.avif 960w, ../assets/generated/hoodie-moon-back-1440.avif 1440w, ../assets/generated/hoodie-moon-back-1920.avif 1920w',
    webp:'../assets/generated/hoodie-moon-back-480.webp 480w, ../assets/generated/hoodie-moon-back-960.webp 960w, ../assets/generated/hoodie-moon-back-1440.webp 1440w, ../assets/generated/hoodie-moon-back-1920.webp 1920w',
    fallback:'../assets/generated/hoodie-moon-back-960.webp'
  }
};

function pictureMarkup(image){
  const avif=image.avif_srcset||image.avif;
  const webp=image.webp_srcset||image.webp;
  const fallback=image.fallback;
  return `
    <picture>
      <source type="image/avif" srcset="${avif}" sizes="(max-width: 440px) calc(100vw - 16px), 400px">
      <source type="image/webp" srcset="${webp}" sizes="(max-width: 440px) calc(100vw - 16px), 400px">
      <img src="${fallback}" alt="${image.alt}" width="${image.width||1920}" height="${image.height||1920}" data-fit="${image.fit}" decoding="async">
    </picture>`;
}

function bindStaticFallback(){
  const media=mount.querySelector('[data-product-media]');
  const buttons=[...mount.querySelectorAll('[data-static-image]')];
  buttons.forEach(button=>{
    button.addEventListener('click',()=>{
      const image=fallbackImages[button.dataset.staticImage];
      media.innerHTML=pictureMarkup(image);
      buttons.forEach(item=>item.setAttribute('aria-pressed','false'));
      button.setAttribute('aria-pressed','true');
      reportHeight();
    });
  });
  reportHeight();
}

async function loadData(){
  const response=await fetch('./premium-retail.json',{cache:'no-store'});
  if(!response.ok) throw new Error(`Produktdaten konnten nicht geladen werden: ${response.status}`);
  return response.json();
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
      <div class="product-card__media" data-product-media>${pictureMarkup(primary)}</div>
      <div class="product-card__body">
        <p class="product-card__brand">${product.brand}</p>
        <h2 class="product-card__title" id="product-title">${product.name}</h2>
        <p class="product-card__price">${product.price.display}</p>
        <p class="product-card__rating" aria-label="${product.rating.display}">${product.rating.value.toLocaleString('de-DE')} von 5 · ${product.rating.count} Bewertungen</p>
        <p class="product-card__variation">${product.variation_cue}</p>
        <ul class="product-card__thumbnails" aria-label="Produktansichten">${product.images.map(thumbMarkup).join('')}</ul>
        <a class="product-card__action" href="${product.product_url}">Produkt ansehen<span class="visually-hidden">: ${product.name}</span></a>
        <p class="product-card__status">Demo: ${data.decisions.current_image_count} von empfohlenen ${data.decisions.image_count_target}+ Ansichten vorhanden.</p>
      </div>
    </article>`;

  const media=mount.querySelector('[data-product-media]');
  const buttons=[...mount.querySelectorAll('[data-image-index]')];
  buttons.forEach(button=>{
    button.addEventListener('click',()=>{
      const image=product.images[Number(button.dataset.imageIndex)];
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
    window.parent.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*');
  });
}

bindStaticFallback();

loadData()
  .then(render)
  .catch(error=>{
    console.warn('JSON konnte nicht geladen werden. Vorgerenderter Fallback bleibt aktiv.',error);
    reportHeight();
  });

window.addEventListener('resize',reportHeight);
