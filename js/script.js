// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2800);
});

// ===== Typing Animation =====
const commands = [
    'kubectl get pods -A --no-headers | wc -l',
    'terraform plan -out=infra.tfplan',
    'docker build -t app:latest .',
    'helm upgrade --install app ./charts/app',
    'aws eks update-kubeconfig --name prod',
    'ansible-playbook deploy.yml -i inventory',
    'argocd app sync production --prune',
    'prometheus --query "up == 1"',
];

let cmdIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');
const typeSpeed = 60;
const deleteSpeed = 30;
const pauseTime = 2200;

function typeCommand() {
    if (!typingEl) return;
    const current = commands[cmdIndex];

    if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            setTimeout(() => { isDeleting = true; typeCommand(); }, pauseTime);
            return;
        }
    } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
        }
    }
    setTimeout(typeCommand, isDeleting ? deleteSpeed : typeSpeed);
}

setTimeout(typeCommand, 3200);

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + id) {
                    item.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ===== Navbar background on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'var(--border)';
    }
});

// ===== Scroll to Top =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Counter Animation =====
const metricValues = document.querySelectorAll('.metric-val');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;
    metricValues.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(tick);
    });
    counterAnimated = true;
}

const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const metricsRow = document.querySelector('.metrics-row');
if (metricsRow) metricsObserver.observe(metricsRow);

// ===== Scroll Reveal =====
function initScrollReveal() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .timeline-card, .about-card, .contact-item');
    elements.forEach(el => el.classList.add('fade-up'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => revealObserver.observe(el));
}
document.addEventListener('DOMContentLoaded', initScrollReveal);

// ===== Project Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => { card.style.display = 'none'; }, 250);
            }
        });
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const message = contactForm.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill all required fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        alert('Thank you for reaching out! I will get back to you soon.');
        contactForm.reset();
    });
}

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
