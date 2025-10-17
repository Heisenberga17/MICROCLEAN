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
            
            // FIXED: Detect current page and adjust links accordingly
            const currentPage = window.location.pathname;
            const isOnCotizador = currentPage.includes('cotizador.html');
            
            // If on cotizador, all section links should go back to index.html
            const baseUrl = isOnCotizador ? 'index.html' : '';
            
            nav.innerHTML = `
                <a href="cotizador.html" class="mobile-nav-link">Cotizador</a>
                <a href="${baseUrl}#quienes-somos" class="mobile-nav-link">Quiénes Somos</a>
                <a href="${baseUrl}#servicios" class="mobile-nav-link">Servicios</a>
                <a href="${baseUrl}#galeria" class="mobile-nav-link">Galería</a>
                <a href="${baseUrl}#contacto" class="mobile-nav-link">Contacto</a>
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
    
    // ===== SERVICE CARDS EXPAND =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const button = card.querySelector('.service-link');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const isExpanded = card.classList.contains('expanded');
                card.classList.toggle('expanded');
                button.textContent = isExpanded ? 'Ver más' : 'Ver menos';
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
        
        if (!handle || !afterImage || !wrapper || !beforeImage) return;
        
        let position = 0; // Start at 0% (showing only BEFORE)
        let isDragging = false;
        
        // Initial setup
        updateSliderPosition(position);
        
        function updateSliderPosition(pos) {
            const clampedPos = Math.max(0, Math.min(100, pos));
            position = clampedPos;
            
            // Move handle
            handle.style.left = position + '%';
            
            // Clip the AFTER image to reveal it as we slide right
            // At 0%: after image is completely hidden (clip-path: inset(0 100% 0 0))
            // At 100%: after image is fully visible (clip-path: inset(0 0 0 0))
            afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
        }
        
        function getPosition(clientX) {
            const rect = wrapper.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            return percentage;
        }
        
        // Mouse Events
        handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isDragging = true;
        });
        
        wrapper.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isDragging = true;
            updateSliderPosition(getPosition(e.clientX));
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            updateSliderPosition(getPosition(e.clientX));
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Touch Events
        handle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            isDragging = true;
        });
        
        wrapper.addEventListener('touchstart', function(e) {
            isDragging = true;
            updateSliderPosition(getPosition(e.touches[0].clientX));
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            updateSliderPosition(getPosition(e.touches[0].clientX));
        }, { passive: false });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
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
