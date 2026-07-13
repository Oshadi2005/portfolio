// Typing Effect for Hero Section
const textArray = ["AI Systems Developer", "Computer Science Undergraduate", "UI/UX & Web Developer"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typingTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typingTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle hamburger icon
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// Navbar Scroll Effect and Active Section Highlighting
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// Click-to-play Project Videos (avoid autoplaying multiple large videos at once)
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playBtn = wrapper.querySelector('.play-btn');

    playBtn.addEventListener('click', () => {
        video.controls = true;
        video.loop = true;
        wrapper.classList.add('playing');
        video.play();
    });

    video.addEventListener('pause', () => wrapper.classList.remove('playing'));
});

// Contact Form (opens the visitor's email client with a pre-filled message)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        const subject = `Portfolio enquiry from ${name}`;
        const body = `${message}\n\n— ${name} (${email})`;

        window.location.href = `mailto:oshadikumaravel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Reveal Animation on Scroll (staggers cards within the same grid)
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            const siblings = entry.target.parentElement ? Array.from(entry.target.parentElement.children) : [];
            const staggerIndex = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = staggerIndex > 0 ? `${Math.min(staggerIndex * 0.08, 0.4)}s` : '0s';
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
    });
}

// Cursor Glow (desktop only, respects reduced-motion preference)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cursorGlow = document.getElementById('cursor-glow');
const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (cursorGlow && !prefersReducedMotion && !isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorGlow.style.opacity = '1';
    });
    window.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// Hero Particle Network
const particleCanvas = document.getElementById('particle-canvas');
if (particleCanvas && !prefersReducedMotion) {
    const ctx = particleCanvas.getContext('2d');
    const heroSection = particleCanvas.closest('.hero');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 55;

    function resizeCanvas() {
        particleCanvas.width = heroSection.offsetWidth;
        particleCanvas.height = heroSection.offsetHeight;
    }

    function createParticles() {
        particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.8 + 1
        }));
    }

    function drawParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > particleCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > particleCanvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(107, 176, 179, 0.55)';
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(107, 176, 179, ${0.18 * (1 - dist / 130)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    // Re-sync canvas size whenever the hero's actual box size changes
    // (e.g. late web-font loads shifting layout), not just window resize.
    let resizeTimeout;
    const heroResizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            createParticles();
        }, 150);
    });
    heroResizeObserver.observe(heroSection);
}
