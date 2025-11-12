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



// === REVIEW SLIDER ===
const slider = document.getElementById('review-slider-inner');
const nextBtn = document.getElementById('next-review');
const prevBtn = document.getElementById('prev-review');

if (slider && nextBtn && prevBtn) {
  let index = 0;
  const slides = slider.children;
  const total = slides.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    updateSlider();
  });
}
