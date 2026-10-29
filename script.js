const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const searchForm = document.getElementById('search-form');
const cards = [...document.querySelectorAll('.property-card')];
const searchMessage = document.getElementById('search-message');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(searchForm);
  const min = Number(data.get('min')) || 0;
  const max = Number(data.get('max')) || Infinity;
  const visible = cards.filter(card => {
    const location = data.get('location');
    const type = data.get('type');
    const beds = parseInt(data.get('beds'), 10) || 0;
    const baths = parseInt(data.get('baths'), 10) || 0;
    return (!location || card.dataset.location === location)
      && (!type || card.dataset.type === type)
      && Number(card.dataset.price) >= min
      && Number(card.dataset.price) <= max
      && Number(card.dataset.beds) >= beds
      && Number(card.dataset.baths) >= baths;
  });
  if (data.get('sort') === 'price-low') visible.sort((a,b) => +a.dataset.price - +b.dataset.price);
  if (data.get('sort') === 'price-high') visible.sort((a,b) => +b.dataset.price - +a.dataset.price);
  cards.forEach(card => card.hidden = !visible.includes(card));
  const grid = document.getElementById('property-grid');
  visible.forEach(card => grid.appendChild(card));
  searchMessage.textContent = `${visible.length} sample ${visible.length === 1 ? 'property' : 'properties'} found. This demo does not connect to live listings.`;
});

document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('form-message').textContent =
    'Thanks! This is a front-end test form, so your message has not been sent.';
});
