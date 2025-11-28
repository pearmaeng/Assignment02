// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to Cart Functionality
document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Visual feedback
        this.textContent = 'Added!';
        this.style.background = '#28a745';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '#8B4513';
        }, 2000);
        
        console.log(`Added ${productName} to cart`);
    });
});

// Scroll to Top Button (optional enhancement)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product and category cards
document.querySelectorAll('.product-card, .category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(card);
});

// Scroll-driven image sequence for About section
(function () {
    const aboutSection = document.querySelector('.about-section');
    const sequenceContainer = document.querySelector('#about-scroll-sequence img');

    if (!aboutSection || !sequenceContainer) return;

    const frameCount = 23; // 00000 - 00022
    const frameSources = [];

    // Generate frame sources and preload images
    for (let i = 0; i < frameCount; i++) {
        const frameNumber = String(i).padStart(5, '0');
        const src = `asset/Sofa_Video_Generation_Request/Sofa_Video_Generation_Request_${frameNumber}.png`;
        frameSources.push(src);

        // Preload images for smoother playback
        const img = new Image();
        img.src = src;
    }

    // Set initial frame
    sequenceContainer.src = frameSources[0];

    function updateSequence() {
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;

        // Start when section begins to appear, finish when section ends
        const startScroll = sectionTop - windowHeight;
        const endScroll = sectionTop + sectionHeight - windowHeight;
        const totalScroll = endScroll - startScroll;

        if (totalScroll <= 0) return;

        let progress = (scrollY - startScroll) / totalScroll;
        progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1

        // Map progress to frame index
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * (frameCount - 1))
        );

        sequenceContainer.src = frameSources[frameIndex];
    }

    window.addEventListener('scroll', updateSequence);
    window.addEventListener('resize', updateSequence);
    updateSequence(); // Initial call
})();