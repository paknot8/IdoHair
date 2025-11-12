// === MOBILE NAVIGATION TOGGLE ===
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') &&
        !e.target.closest('#mobile-menu') &&
        !e.target.closest('#menu-btn')) {
      mobileMenu.classList.add('hidden');
    }
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


// === NAVBAR DROPDOWNS (click to toggle) ===
document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('button');
    const menu = dropdown.querySelector('.dropdown-menu');

    button.addEventListener('click', (e) => {
      e.stopPropagation();

      // Close all other dropdowns
      dropdowns.forEach(other => {
        if (other !== dropdown) {
          const otherMenu = other.querySelector('.dropdown-menu');
          if (otherMenu) otherMenu.classList.add('hidden');
        }
      });

      // Toggle current dropdown
      menu.classList.toggle('hidden');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => {
        const menu = d.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('hidden');
      });
    }
  });
});


// === REVIEW SLIDER (center-on-card, works every click) ===
const track = document.getElementById('review-slider-inner');
const viewport = document.getElementById('review-slider');
const btnNext = document.getElementById('next-review');
const btnPrev = document.getElementById('prev-review');

if (track && viewport && btnNext && btnPrev) {
  const cards = Array.from(track.querySelectorAll('.review-card'));
  const total = cards.length;
  let index = Math.floor(total / 2); // start in the middle

  function centerOn(i) {
    index = (i + total) % total;
    const card = cards[index];
    const targetCenter = card.offsetLeft + (card.offsetWidth / 2);
    const viewportCenter = viewport.clientWidth / 2;
    const translate = targetCenter - viewportCenter;

    track.style.transition = 'transform 500ms ease';
    track.style.transform = `translateX(${-translate}px)`;
  }

  btnNext.addEventListener('click', () => centerOn(index + 1));
  btnPrev.addEventListener('click', () => centerOn(index - 1));

  window.addEventListener('resize', () => centerOn(index));
  window.addEventListener('load', () => centerOn(index));
}
