// MicroClean - Main Application JavaScript - FIXED
(function() {
    'use strict';
    
    // Feature Detection
    document.documentElement.classList.add('js-enabled');
    document.documentElement.classList.remove('no-js');
    
    // DOM References
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const yearSpan = document.getElementById('year');
    const contactForm = document.getElementById('contact-form');
    
    // Auto-update copyright year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // ===== HEADER SCROLL EFFECT =====
    let scrolled = false;
    let ticking = false;
    
    function updateHeader() {
        const shouldBeScrolled = window.scrollY > 50;
        if (shouldBeScrolled !== scrolled) {
            scrolled = shouldBeScrolled;
            if (header) {
                header.classList.toggle('scrolled', scrolled);
            }
        }
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ===== MOBILE MENU - FIXED NAVIGATION =====
    if (menuToggle) {
        let menuOpen = false;
        
        menuToggle.addEventListener('click', function() {
            menuOpen = !menuOpen;
            this.classList.toggle('active', menuOpen);
            this.setAttribute('aria-expanded', menuOpen);
            
            let mobileNav = document.querySelector('.mobile-nav');
            if (!mobileNav) {
                mobileNav = createMobileNav();
            }
            mobileNav.classList.toggle('active', menuOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = menuOpen ? 'hidden' : '';
        });
        
        function createMobileNav() {
            const nav = document.createElement('nav');
            nav.className = 'mobile-nav';

            nav.innerHTML = `
                <a href="#quienes-somos" class="mobile-nav-link">Quiénes Somos</a>
                <a href="#servicios" class="mobile-nav-link">Servicios</a>
                <a href="#galeria" class="mobile-nav-link">Galería</a>
                <a href="#contacto" class="mobile-nav-link">Contacto</a>
                <a href="https://wa.me/50764177111?text=Hola%20MicroClean%2C%20quiero%20una%20cotización." 
                   target="_blank" 
                   rel="noopener" 
                   class="mobile-nav-whatsapp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                </a>
            `;
            document.body.appendChild(nav);
            
            // Close menu when clicking links
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    menuOpen = false;
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', false);
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            return nav;
        }
    }
    
    // ===== ACTIVE NAV LINKS =====
    const sections = document.querySelectorAll('section[id]');
    let navTicking = false;
    
    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        if (!navTicking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                navTicking = false;
            });
            navTicking = true;
        }
    });
    
    updateActiveNav();
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const top = target.offsetTop - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });
    
    // ===== SERVICE CARDS EXPAND - ENTIRE CARD CLICKABLE =====
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const button = card.querySelector('.service-link');

        // Make entire card clickable
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Prevent expanding if clicking on links
            if (e.target.tagName === 'A' && e.target !== button) {
                return;
            }
            e.preventDefault();
            const isExpanded = card.classList.contains('expanded');
            card.classList.toggle('expanded');
            if (button) {
                button.textContent = isExpanded ? 'Ver más' : 'Ver menos';
            }
        });

        // Remove hover state on touch devices after tap
        if ('ontouchstart' in window) {
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    card.blur();
                }, 300);
            });
        }
    });
    
    // ===== BEFORE/AFTER SLIDER - PERFECT VERSION =====
    const sliders = document.querySelectorAll('.before-after-container');
    
    sliders.forEach(container => {
        const handle = container.querySelector('.slider-handle');
        const afterImage = container.querySelector('.after-image');
        const beforeImage = container.querySelector('.before-image');
        const wrapper = container.querySelector('.slider-wrapper');
        const beforeLabel = beforeImage.querySelector('.label');
        const afterLabel = afterImage.querySelector('.label');

        if (!handle || !afterImage || !wrapper || !beforeImage) return;

        let position = 0; // Start at 0% (showing only BEFORE)
        let isDragging = false;
        let rafId = null;
        let pendingPosition = null;

        // Initial setup
        applyPosition();

        function updateSliderPosition(pos) {
            const clampedPos = Math.max(0, Math.min(100, pos));
            pendingPosition = clampedPos;

            // Schedule immediate update using RAF for smooth 60fps rendering
            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    if (pendingPosition !== null) {
                        position = pendingPosition;
                        pendingPosition = null;
                        applyPosition();
                    }
                    rafId = null;
                });
            }
        }

        function applyPosition() {
            // Direct DOM updates for instant response
            const posStr = position + '%';

            // Update handle position
            handle.style.left = posStr;
            handle.style.setProperty('--slider-position', posStr);

            // Update clip-path for immediate image reveal
            afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;

            // Update label opacity
            const fadeThreshold = 15;
            const fadeRange = 20;

            if (beforeLabel) {
                const beforeOpacity = position < fadeThreshold ? 1 :
                                    position < fadeThreshold + fadeRange ?
                                    1 - ((position - fadeThreshold) / fadeRange) : 0;
                beforeLabel.style.opacity = beforeOpacity;
            }

            if (afterLabel) {
                const afterOpacity = position < fadeThreshold ? 0 :
                                   position < fadeThreshold + fadeRange ?
                                   (position - fadeThreshold) / fadeRange : 1;
                afterLabel.style.opacity = afterOpacity;
            }
        }

        function getPosition(clientX) {
            const rect = wrapper.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            return percentage;
        }

        function handlePointerDown(e) {
            e.preventDefault();
            isDragging = true;
            wrapper.setPointerCapture(e.pointerId);
            updateSliderPosition(getPosition(e.clientX));
        }

        function handlePointerMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            updateSliderPosition(getPosition(e.clientX));
        }

        function handlePointerUp(e) {
            isDragging = false;
            if (wrapper.hasPointerCapture(e.pointerId)) {
                wrapper.releasePointerCapture(e.pointerId);
            }
        }

        // Event listeners with passive for better scroll performance
        wrapper.addEventListener('pointerdown', handlePointerDown);
        wrapper.addEventListener('pointermove', handlePointerMove, { passive: false });
        wrapper.addEventListener('pointerup', handlePointerUp);
        wrapper.addEventListener('pointercancel', handlePointerUp);

        // Add keyboard support for accessibility (arrow keys)
        handle.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                updateSliderPosition(Math.max(0, position - 5));
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                updateSliderPosition(Math.min(100, position + 5));
            }
        });
    });
    
    // ===== CONTACT FORM =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            let msg = `Hola MicroClean, quiero una cotizacion.\n\n`;
            msg += `Nombre: ${formData.get('name')}\n`;
            msg += `Telefono: ${formData.get('phone')}\n`;
            
            if (formData.get('service')) {
                const services = {
                    'tapiceria-tela': 'Tapiceria en Tela',
                    'tapiceria-cuero': 'Tapiceria en Cuero',
                    'limpieza-espacios': 'Limpieza de Espacios',
                    'impermeabilizacion': 'Impermeabilizacion',
                    'tratamiento-enzimatico': 'Tratamiento Enzimatico',
                    'otro': 'Otro Servicio'
                };
                msg += `Servicio: ${services[formData.get('service')]}\n`;
            }
            
            if (formData.get('message')) {
                msg += `Mensaje: ${formData.get('message')}\n`;
            }
            
            const url = `https://wa.me/50764177111?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
            
            this.reset();
            showFormSuccess();
        });
        
        function showFormSuccess() {
            const div = document.createElement('div');
            div.className = 'form-success';
            div.innerHTML = '✔ Redirigiendo a WhatsApp...';
            div.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--whatsapp);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(div);
            
            setTimeout(() => {
                div.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (div.parentNode) document.body.removeChild(div);
                }, 300);
            }, 3000);
        }
    }
    
    // ===== EAGER LOAD GALLERY IMAGES, LAZY LOAD OTHERS =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    if (img.dataset.src && !img.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Add loaded class after image loads (only for non-gallery images)
                    if (!img.closest('.before-after-container')) {
                        if (img.complete) {
                            img.classList.add('loaded');
                        } else {
                            img.addEventListener('load', function() {
                                img.classList.add('loaded');
                            }, { once: true });
                        }
                    }

                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe all lazy images (excluding gallery images)
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });

        // Immediately mark all gallery images as loaded
        document.querySelectorAll('.before-after-container img').forEach(img => {
            img.classList.add('loaded');
            img.style.opacity = '1';
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
        });

        // Immediately mark all gallery images as loaded
        document.querySelectorAll('.before-after-container img').forEach(img => {
            img.classList.add('loaded');
            img.style.opacity = '1';
        });
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
})();

// ==================== UX ANIMATIONS & ENHANCEMENTS ====================

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

    // HEADER SCROLL EFFECT - Handled by app.js (no duplicate needed)

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

    // SMOOTH SCROLL - Handled by app.js (no duplicate needed)

    // SERVICE CARD EXPAND - Handled by app.js (no duplicate needed)

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
