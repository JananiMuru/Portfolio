// ============================================
// CREATIVE LABS — CAROUSEL (1 slide at a time)
// ============================================

const carouselState = {};

function setupCarousel(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const track = el.querySelector('.gd-carousel__track');
  const slides = el.querySelectorAll('.gd-slide');
  const dotsWrap = document.getElementById('dots-' + id);
  if (!track || slides.length === 0) return;

  const max = slides.length - 1;
  carouselState[id] = { index: 0, max, track, dotsWrap };

  // Auto-generate dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = i === 0 ? 'gd-dot gd-dot--active' : 'gd-dot';
      dot.addEventListener('click', () => goTo(id, i));
      dotsWrap.appendChild(dot);
    });
  }

  updateCarousel(id);
}

function updateCarousel(id) {
  const state = carouselState[id];
  if (!state) return;
  const slides = state.track.querySelectorAll('.gd-slide');
  if (!slides.length) return;

  const slideWidth = slides[0].offsetWidth;
  state.track.style.transform = `translateX(-${state.index * slideWidth}px)`;

  if (state.dotsWrap) {
    state.dotsWrap.querySelectorAll('.gd-dot').forEach((dot, i) => {
      dot.classList.toggle('gd-dot--active', i === state.index);
    });
  }
}

function slide(id, dir) {
  const state = carouselState[id];
  if (!state) return;
  state.index = Math.max(0, Math.min(state.index + dir, state.max));
  updateCarousel(id);
}

function goTo(id, index) {
  const state = carouselState[id];
  if (!state) return;
  state.index = index;
  updateCarousel(id);
}

document.addEventListener('DOMContentLoaded', () => {
  setupCarousel('carousel-1');
  setupCarousel('carousel-2');
});

window.addEventListener('resize', () => {
  Object.keys(carouselState).forEach(id => updateCarousel(id));
}, { passive: true });
