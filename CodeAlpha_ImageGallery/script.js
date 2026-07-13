const cards = [...document.querySelectorAll('.card')];
const filters = [...document.querySelectorAll('.filter')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const caption = document.querySelector('figcaption');
let visibleCards = cards;
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[currentIndex];
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector('img').alt;
  caption.textContent = card.dataset.title;
}
function openLightbox(card) {
  visibleCards = cards.filter(item => !item.classList.contains('hidden'));
  showImage(visibleCards.indexOf(card));
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); }

cards.forEach(card => card.addEventListener('click', () => openLightbox(card)));
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  cards.forEach(card => card.classList.toggle('hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter));
}));
document.querySelector('.close').addEventListener('click', closeLightbox);
document.querySelector('.prev').addEventListener('click', () => showImage(currentIndex - 1));
document.querySelector('.next').addEventListener('click', () => showImage(currentIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});
