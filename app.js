const track=document.querySelector('#recipe-track');
const previous=document.querySelector('#previous'),next=document.querySelector('#next');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
function updateControls(){previous.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;}
function move(direction){const slide=track.querySelector('.slide');track.scrollBy({left:direction*(slide.getBoundingClientRect().width+20),behavior:reduced.matches?'instant':'smooth'});}
previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
track.addEventListener('scroll',updateControls,{passive:true});window.addEventListener('resize',updateControls);updateControls();
track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}});
const dialog=document.querySelector('#preview-dialog'),preview=document.querySelector('#large-preview');let opener;
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{opener=button;preview.src=`muestra-${button.dataset.preview}.webp`;preview.alt=button.dataset.preview==='salada'?'Página real ampliada de la receta de acarajé':'Página real ampliada de la receta de quindim';dialog.showModal();document.body.classList.add('modal-open');}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});
document.querySelectorAll('.checkout').forEach(link=>link.addEventListener('click',()=>{if(typeof window.fbq==='function'){const special=link.dataset.plan==='especial';window.fbq('track','InitiateCheckout',{value:special?14.90:9.90,currency:'USD',content_name:special?'Colección salado + dulce':'Recetario salado'});}}));
