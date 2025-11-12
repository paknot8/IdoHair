// === MOBILE NAVIGATION TOGGLE ===
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// === FAQ ACCORDION ===
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const toggle = item.querySelector('.faq-toggle');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all
    faqItems.forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = 0;
      i.querySelector('.faq-toggle').style.transform = 'rotate(0deg)';
    });

    // Open clicked one
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      toggle.style.transform = 'rotate(45deg)';
    }
  });
});



// === REVIEW SLIDER (center-on-card, works every click) ===
const track = document.getElementById('review-slider-inner');
const viewport = document.getElementById('review-slider'); // wrapper with overflow-hidden
const btnNext = document.getElementById('next-review');
const btnPrev = document.getElementById('prev-review');

if (track && viewport && btnNext && btnPrev) {
  const cards = Array.from(track.querySelectorAll('.review-card'));
  const total = cards.length;
  let index = Math.floor(total / 2); // start in the middle

  function centerOn(i) {
    // wrap index
    index = (i + total) % total;

    const card = cards[index];
    // card center relative to the track
    const targetCenter = card.offsetLeft + (card.offsetWidth / 2);
    // viewport center
    const viewportCenter = viewport.clientWidth / 2;

    // translate so targetCenter aligns to viewportCenter
    const translate = targetCenter - viewportCenter;

    track.style.transition = 'transform 500ms ease';
    track.style.transform = `translateX(${-translate}px)`;
  }

  btnNext.addEventListener('click', () => centerOn(index + 1));
  btnPrev.addEventListener('click', () => centerOn(index - 1));

  window.addEventListener('resize', () => centerOn(index));
  window.addEventListener('load', () => centerOn(index));
}

