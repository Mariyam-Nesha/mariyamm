document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Mobile Hamburger Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- 3. Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // threshold

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- 4. Active Navigation State on Scroll ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // --- 5. Testimonial Carousel ---
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const showSlide = (n) => {
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slideIndex = n;
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;

        slides[slideIndex].classList.add('active');
        if(dots[slideIndex]) dots[slideIndex].classList.add('active');
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(slideIndex - 1));
        nextBtn.addEventListener('click', () => showSlide(slideIndex + 1));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto loop carousel
    setInterval(() => {
        showSlide(slideIndex + 1);
    }, 6000);

});