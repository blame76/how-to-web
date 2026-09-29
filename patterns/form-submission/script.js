const frame=document.querySelector('[data-demo-frame]');
window.addEventListener('message',event=>{
  if(event.source!==frame?.contentWindow||event.data?.type!=='how-to-web:example-height')return;
  const height=Math.max(640,Math.min(Number(event.data.height)||0,1300));
  if(height)frame.style.height=height+'px';
});