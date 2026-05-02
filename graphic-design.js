// ============================================
// GRAPHIC DESIGN PAGE — CAROUSEL (1 slide at a time)
// ============================================

const carouselState = {};

function getTrack(id) {
  return document.querySelector(`#${id} .gd-carousel__track`);
}

function getSlides(id) {
  return document.querySelectorAll(`#${id} .gd-slide`);
}

function getDots(id) {
  return document.querySelectorAll(`#dots-${id} .gd-dot`);
}

function updateCarousel(id) {
  const track = getTrack(id);
  const slides = getSlides(id);
  const dots = getDots(id);
  if (!track || !slides.length) return;

  const idx = carouselState[id] || 0;
  // Each slide is 100% of the wrap width, gap is 0
  const slideWidth = slides[0].offsetWidth;

  track.style.transform = `translateX(-${idx * slideWidth}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('gd-dot--active', i === idx);
  });
}

function slide(id, dir) {
  const slides = getSlides(id);
  const max = slides.length - 1;   // 1 at a time so max = total - 1
  let idx = (carouselState[id] || 0) + dir;
  idx = Math.max(0, Math.min(idx, max));
  carouselState[id] = idx;
  updateCarousel(id);
}

function goTo(id, idx) {
  carouselState[id] = idx;
  updateCarousel(id);
}

document.addEventListener('DOMContentLoaded', () => {
  const ids = ['carousel-1', 'carousel-2', 'carousel-3', 'carousel-4'];

  ids.forEach(id => { carouselState[id] = 0; });

  window.addEventListener('resize', () => {
    ids.forEach(id => { updateCarousel(id); });
  }, { passive: true });

  // Touch/swipe support
  ids.forEach(id => {
    const wrap = document.querySelector(`#${id} .gd-carousel__track-wrap`);
    if (!wrap) return;
    let startX = 0;
    wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) slide(id, diff > 0 ? 1 : -1);
    }, { passive: true });
  });
});
