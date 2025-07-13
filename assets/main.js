// Set dark theme as default
document.body.setAttribute('data-theme', 'dark');
document.querySelector('.theme-toggle').textContent = '☀️';
localStorage.setItem('theme', 'dark');

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Text Animation with Fade
const texts = [
    'Arijit 👋🏻              ',
    'an Android Developer 💚',
    'a UI/UX Enthusiast 🎉  ',
    'a Problem Solver 💡    ',
    'a Tech Explorer ��     ',
    'a Creative Developer 🎨'
];
let currentIndex = 0;
const animatedText = document.querySelector('.animated-text');

function fadeText() {
    // Fade out
    animatedText.style.opacity = '0';
    animatedText.style.transform = 'translateY(10px)';

    // Wait for fade out to complete
    setTimeout(() => {
        // Change text
        currentIndex = (currentIndex + 1) % texts.length;
        animatedText.textContent = texts[currentIndex];

        // Fade in
        requestAnimationFrame(() => {
            animatedText.style.opacity = '1';
            animatedText.style.transform = 'translateY(0)';
        });
    }, 500);
}

// Initial text setup
animatedText.textContent = texts[0];

// Start the text rotation after initial fade in
setTimeout(() => {
    setInterval(fadeText, 2000);
}, 1600);

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // adjust for navbar height
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact form mailto handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent('New message from ' + firstName + ' ' + lastName);
    const body = encodeURIComponent('Name: ' + firstName + ' ' + lastName + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
});

// Header Scroll Effect
function handleHeaderScroll() {
    const nav = document.querySelector('nav');
    const homeSection = document.getElementById('home');
    const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;

    if (window.scrollY < homeSectionBottom - 100) {
        nav.classList.add('floating');
    } else {
        nav.classList.remove('floating');
    }
}

// Initial check
handleHeaderScroll();

// Add scroll event listener
window.addEventListener('scroll', handleHeaderScroll);

// Testimonial Carousel Logic
(function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    let current = 0;
    let autoSlideInterval;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (slides.length > 0) {
        showSlide(current);
        startAutoSlide();

        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
})();

// Cursor Animation (only for devices with hover capability)
if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}
