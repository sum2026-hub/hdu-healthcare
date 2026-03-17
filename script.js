// ===============================
// HDU Healthcare - JavaScript
// ===============================

document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 60);
        scrollTop.classList.toggle('visible', y > 500);
    });

    // --- Scroll to Top ---
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Mobile dropdown toggle
    document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownToggle.parentElement.classList.toggle('active');
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // --- Hero Floating Particles ---
    const particlesContainer = document.getElementById('heroParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 8 + 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 5) + 's';
        particlesContainer.appendChild(particle);
    }

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const start = Date.now();

                const animate = () => {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(ease * target);

                    counter.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                animate();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Scroll Reveal (Custom AOS) ---
    const revealElements = document.querySelectorAll('[data-aos]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Reviews Carousel Dots ---
    const dotsContainer = document.getElementById('carouselDots');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    let currentSlide = 0;

    // Create dots
    for (let i = 0; i < reviewCards.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateDots();

        // Highlight effect on mobile
        if (window.innerWidth <= 768) {
            reviewCards.forEach((card, i) => {
                card.style.display = i === currentSlide ? 'block' : 'none';
            });
        } else {
            reviewCards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '1';
            });
            reviewCards[currentSlide].style.transform = 'translateY(-5px)';
            reviewCards[currentSlide].style.boxShadow = '0 8px 32px rgba(0,44,91,0.12)';
        }
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + reviewCards.length) % reviewCards.length;
        goToSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % reviewCards.length;
        goToSlide(currentSlide);
    });

    // --- Form Submission ---
    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value;
        const phone = document.getElementById('formPhone').value;
        const service = document.getElementById('formService').value;
        const city = document.getElementById('formCity').value;

        if (name && phone && service && city) {
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Appointment Booked!</span>';
            btn.style.background = 'linear-gradient(135deg, #00897b, #26a69a)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Parallax subtle effect for hero ---
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const y = window.scrollY;
            if (y < window.innerHeight) {
                hero.style.setProperty('--parallax', y * 0.3 + 'px');
            }
        }
    });

});
