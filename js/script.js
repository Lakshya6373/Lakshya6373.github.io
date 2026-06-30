// Mobile nav
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Nav background
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 10 ? '#1a1a1a' : 'transparent';
});

// Scroll reveal
function initReveal() {
    const els = document.querySelectorAll('.project, .skill-block, .exp-card, .about-layout, .contact-layout');
    els.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
}
initReveal();

// Counter animation
const statNums = document.querySelectorAll('.stat-num');
let counted = false;
function countUp() {
    if (counted) return;
    statNums.forEach(el => {
        const target = +el.dataset.target;
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    });
    counted = true;
}
const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { countUp(); statsObserver.disconnect(); }
}, { threshold: 0.3 });
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
