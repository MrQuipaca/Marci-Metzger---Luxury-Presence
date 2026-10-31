/* ===== Gallery: add up to 7 images here. Extra entries are ignored. ===== */
const PHOTOS=[
  {src:'https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/mtn%20falls%20pond.jpg',alt:'Mountain falls and pond'},
  {src:'https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/photo-5db79f9.jpg',alt:'Marci Metzger, Realtor'}
  // {src:'images/home-3.jpg',alt:'Describe photo 3'},
  // {src:'images/home-4.jpg',alt:'Describe photo 4'},
  // ...up to 7
].slice(0,7);

const inner=document.getElementById('galInner'),ind=document.getElementById('galInd'),car=document.getElementById('galleryCarousel');
PHOTOS.forEach((p,i)=>{
  const item=document.createElement('div');
  item.className='carousel-item'+(i===0?' active':'');
  const img=document.createElement('img');
  img.src=p.src;img.alt=p.alt;if(i>0)img.loading='lazy';
  item.appendChild(img);inner.appendChild(item);
  const b=document.createElement('button');
  b.type='button';b.setAttribute('data-bs-target','#galleryCarousel');b.setAttribute('data-bs-slide-to',i);
  b.setAttribute('aria-label','Slide '+(i+1));if(i===0){b.className='active';b.setAttribute('aria-current','true')}
  ind.appendChild(b);
});
if(PHOTOS.length<2){car.querySelectorAll('.carousel-control-prev,.carousel-control-next,.carousel-indicators').forEach(e=>e.remove())}
new bootstrap.Carousel(car,{interval:4000,ride:'carousel',pause:'hover',wrap:true});

/* navbar: solid on scroll or when menu is open; active link */
const hdr=document.getElementById('hdr'),navEl=document.getElementById('nav');
const onScroll=()=>hdr.classList.toggle('solid',scrollY>40);
addEventListener('scroll',onScroll,{passive:true});onScroll();
navEl.addEventListener('show.bs.collapse',()=>hdr.classList.add('menu'));
navEl.addEventListener('hidden.bs.collapse',()=>hdr.classList.remove('menu'));
const links=[...navEl.querySelectorAll('.nav-link')];
const targets=links.map(a=>document.querySelector(a.getAttribute('href')));
addEventListener('scroll',()=>{
  const y=scrollY+140;let idx=0;
  targets.forEach((t,i)=>{if(t&&t.offsetTop<=y)idx=i});
  links.forEach((a,i)=>a.classList.toggle('active',i===idx));
},{passive:true});
links.forEach(a=>a.addEventListener('click',()=>{const c=bootstrap.Collapse.getInstance(navEl);if(c&&navEl.classList.contains('show'))c.hide()}));

/* forms: placeholders, connect to your listings feed / form service */
document.getElementById('searchForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('searchMsg').textContent='Listing search is not connected yet. Call 206-919-6886 to see current homes.';
});
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('sent').textContent='Thanks. Your message was sent.';
  e.target.reset();
});
document.getElementById('yr').textContent=new Date().getFullYear();

/* cookies */
const ck=document.getElementById('cookie');
try{if(!localStorage.getItem('ck'))ck.hidden=false}catch{ck.hidden=false}
document.getElementById('accept').addEventListener('click',()=>{ck.hidden=true;try{localStorage.setItem('ck','1')}catch{}});
