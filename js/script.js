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
    if (!aboutSection) return;

    // Sequence 1: sofa1 (frames 15-70, 56 frames)
    const sequence1Container = document.querySelector('#about-scroll-sequence-1 img');
    const sequence1Config = {
        container: sequence1Container,
        folder: 'sofa1',
        prefix: 'sofa1_',
        startFrame: 15,
        endFrame: 70,
        frameCount: 56
    };

    // Sequence 2: sofa2 (frames 10-66, 57 frames)
    const sequence2Container = document.querySelector('#about-scroll-sequence-2 img');
    const sequence2Config = {
        container: sequence2Container,
        folder: 'sofa2',
        prefix: 'Comp 2_',
        startFrame: 10,
        endFrame: 66,
        frameCount: 57
    };

    const sequences = [sequence1Config, sequence2Config].filter(seq => seq.container);

    // Generate frame sources and preload images for each sequence
    sequences.forEach(seq => {
        seq.frameSources = [];
        for (let i = seq.startFrame; i <= seq.endFrame; i++) {
            const frameNumber = String(i).padStart(5, '0');
            const src = `asset/${seq.folder}/${seq.prefix}${frameNumber}.png`;
            seq.frameSources.push(src);

            // Preload images for smoother playback
            const img = new Image();
            img.src = src;
        }

        // Set initial frame
        if (seq.frameSources.length > 0) {
            seq.container.src = seq.frameSources[0];
        }
    });

    function updateSequences() {
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

        // Update all sequences simultaneously
        sequences.forEach(seq => {
            if (!seq.frameSources || seq.frameSources.length === 0) return;

            // Map progress to frame index
            const frameIndex = Math.min(
                seq.frameSources.length - 1,
                Math.floor(progress * (seq.frameSources.length - 1))
            );

            seq.container.src = seq.frameSources[frameIndex];
        });
    }

    window.addEventListener('scroll', updateSequences);
    window.addEventListener('resize', updateSequences);
    updateSequences(); // Initial call
})();