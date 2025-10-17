// ========================================
// MICROCLEAN - UI/UX GOD MODE ANIMATIONS
// Scroll Reveals, Micro-interactions, Parallax
// ========================================

(function() {
    'use strict';

    // ==================== SCROLL REVEAL OBSERVER ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after revealing for performance
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.addEventListener('DOMContentLoaded', () => {
        const elementsToReveal = document.querySelectorAll(`
            .service-card,
            .before-after-container,
            .contact-form,
            .contact-info,
            .about-content,
            .section-header
        `);

        elementsToReveal.forEach(el => {
            el.classList.add('scroll-reveal');
            scrollObserver.observe(el);
        });
    });

    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ==================== RIPPLE EFFECT ON BUTTONS ====================
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple-effect');

        // Remove existing ripples
        const ripple = button.getElementsByClassName('ripple-effect')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Apply to buttons
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll(`
            .btn-primary,
            .btn-submit,
            .service-link,
            .btn-agregar
        `);

        buttons.forEach(button => {
            button.addEventListener('click', createRipple);
        });
    });

    // ==================== PARALLAX EFFECT FOR HERO ====================
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');

    if (hero && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;

            if (scrolled < hero.offsetHeight) {
                heroBg.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });

    // ==================== SERVICE CARD EXPAND ANIMATION ====================
    document.addEventListener('DOMContentLoaded', () => {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            const button = card.querySelector('.service-link');
            const details = card.querySelector('.service-details');

            if (button && details) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Toggle expanded state
                    const isExpanded = card.classList.contains('expanded');

                    // Close all other cards
                    serviceCards.forEach(c => {
                        if (c !== card) {
                            c.classList.remove('expanded');
                            const btn = c.querySelector('.service-link');
                            if (btn) btn.textContent = 'Ver más';
                        }
                    });

                    // Toggle current card
                    card.classList.toggle('expanded');
                    button.textContent = isExpanded ? 'Ver más' : 'Ver menos';

                    // Smooth scroll to card if expanding
                    if (!isExpanded) {
                        setTimeout(() => {
                            card.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }, 100);
                    }
                });
            }
        });
    });

    // ==================== WHATSAPP FAB PULSE ON SCROLL ====================
    const whatsappFab = document.querySelector('.whatsapp-fab');
    let scrollTimer;

    if (whatsappFab) {
        window.addEventListener('scroll', () => {
            whatsappFab.style.animation = 'none';

            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                whatsappFab.style.animation = 'pulse 0.6s ease-in-out';
            }, 150);
        }, { passive: true });
    }

    // ==================== FORM INPUT ANIMATIONS ====================
    document.addEventListener('DOMContentLoaded', () => {
        const inputs = document.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Add focus class to parent on focus
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement?.classList.remove('focused');
            });

            // Add filled class if input has value
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('filled');
                } else {
                    input.classList.remove('filled');
                }
            });
        });
    });

    // ==================== ANIMATE NUMBERS ON SCROLL ====================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ==================== CURSOR TRAIL EFFECT (OPTIONAL) ====================
    // Uncomment for premium cursor trail effect
    /*
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    if (circles.length === 0) {
        // Create cursor trail elements
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, rgba(9, 101, 198, 0.3), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(circle);
        }
    }

    document.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        document.querySelectorAll('.cursor-circle').forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(20 - index) / 20})`;

            const nextCircle = document.querySelectorAll('.cursor-circle')[index + 1] || document.querySelectorAll('.cursor-circle')[0];
            x += (parseInt(nextCircle.style.left) - x) * 0.3;
            y += (parseInt(nextCircle.style.top) - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
    */

    // ==================== PAGE LOAD ANIMATION ====================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add loaded state CSS
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body {
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        body:not(.loaded) {
            opacity: 0;
        }
    `;
    document.head.appendChild(loadedStyle);

    // ==================== MOBILE MENU ENHANCEMENTS ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== PERFORMANCE OPTIMIZATIONS ====================
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Use debounced scroll for non-critical animations
    const debouncedScroll = debounce(() => {
        // Add any non-critical scroll animations here
    }, 100);

    window.addEventListener('scroll', debouncedScroll, { passive: true });

    console.log('🎨 MicroClean UX Enhancements Loaded - UI/UX GOD MODE ACTIVATED! 🚀');
})();
