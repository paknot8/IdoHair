document.addEventListener('DOMContentLoaded', function() {
            
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    // Check if elements exist (important for multi-page sites)
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Sluit mobiel menu wanneer op een link wordt geklikt
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
            }
        });
    }

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Sluit andere items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                // Toggle het huidige item
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    // Stel max height in op scrollHeight voor correcte open/sluit functionaliteit
                    answer.style.maxHeight = answer.scrollHeight + 'px'; 
                } else {
                    answer.style.maxHeight = null; // Inklappen
                }
            });
        });
        
        // 4. Stel de initiële open status in voor het eerste FAQ-item
        const firstFaqItem = faqItems[0];
        if (firstFaqItem) {
            const firstAnswer = firstFaqItem.querySelector('.faq-answer');
            firstFaqItem.classList.add('active');
            // Stel max-height in nadat de klasse actief is
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
    }
    
    // 3. Review Slider
    const sliderInner = document.getElementById('review-slider-inner');
    const reviews = document.querySelectorAll('.review-card');
    const nextBtn = document.getElementById('next-review');
    const prevBtn = document.getElementById('prev-review');

    if (sliderInner && reviews.length > 0) {
        let currentIndex = 0;
        let reviewWidth = reviews[0].offsetWidth + 40; // kaart breedte + marge
        
        // Functie om slider te bewegen
        function goToSlide(index) {
            if (index < 0) {
                index = reviews.length - 1;
            } else if (index >= reviews.length) {
                index = 0;
            }
            
            // Op mobiel: centreer de kaart
            if (window.innerWidth < 768) {
               reviewWidth = sliderInner.offsetWidth;
               sliderInner.style.transform = 'translateX(' + (-index * reviewWidth) + 'px)';
            } else {
                // Op desktop: centreer de slider
                const offset = (sliderInner.offsetWidth - reviewWidth + 40) / 2;
                sliderInner.style.transform = 'translateX(' + (offset - (index * reviewWidth)) + 'px)';
            }

            currentIndex = index;
        }

        // Herbereken breedte bij verandering schermgrootte
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                reviewWidth = sliderInner.offsetWidth;
            } else {
                reviewWidth = reviews[0].offsetWidth + 40;
            }
            goToSlide(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        // Initiële positie van slider (begint bij de tweede kaart)
        goToSlide(1);
    }


    // 5. Dropdown Menu Toggle (Werkt voor alle .dropdown elementen)
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menuLinks = dropdown.querySelectorAll('.dropdown-menu a');
            
            toggle.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                // Sluit andere open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });

                // Toggle de huidige dropdown
                dropdown.classList.toggle('active');
            });

            // Sluit dropdown en mobiel menu wanneer een link in de dropdown wordt geklikt
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    dropdown.classList.remove('active');
                    if (navLinks) navLinks.classList.remove('active');
                });
            });
        });

        // Sluit dropdowns wanneer buiten de navigatie wordt geklikt
        document.addEventListener('click', (e) => {
            const navbar = document.querySelector('.navbar');
            // Check if the click target is outside the navbar
            if (navbar && !navbar.contains(e.target)) { 
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
});