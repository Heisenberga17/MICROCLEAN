// MicroClean Premium JavaScript - Progressive Enhancement
(function() {
    'use strict';
    
    // Feature Detection
    document.documentElement.classList.add('js-enabled');
    document.documentElement.classList.remove('no-js');
    
    // DOM References
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const yearSpan = document.getElementById('year');
    const contactForm = document.getElementById('contact-form');
    
    // Auto-update copyright year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Header Scroll Effect
    let scrolled = false;
    function handleScroll() {
        const shouldBeScrolled = window.scrollY > 50;
        if (shouldBeScrolled !== scrolled) {
            scrolled = shouldBeScrolled;
            if (scrolled) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
    
    // Throttled scroll handler
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) return;
        scrollTimer = setTimeout(function() {
            scrollTimer = null;
            handleScroll();
        }, 10);
    });
    
    // Mobile Menu Toggle
    if (menuToggle) {
        let menuOpen = false;
        
        menuToggle.addEventListener('click', function() {
            menuOpen = !menuOpen;
            this.classList.toggle('active', menuOpen);
            this.setAttribute('aria-expanded', menuOpen);
            
            // Create/toggle mobile menu
            let mobileNav = document.querySelector('.mobile-nav');
            if (!mobileNav) {
                mobileNav = createMobileNav();
            }
            mobileNav.classList.toggle('active', menuOpen);
        });
        
        function createMobileNav() {
            const nav = document.createElement('nav');
            nav.className = 'mobile-nav';
            nav.innerHTML = `
                <a href="#servicios" class="mobile-nav-link">Servicios</a>
                <a href="#galeria" class="mobile-nav-link">Galería</a>
                <a href="#contacto" class="mobile-nav-link">Contacto</a>
                <a href="https://wa.me/50764177111?text=Hola%20MicroClean%2C%20quiero%20una%20cotizaci%C3%B3n." 
                   target="_blank" 
                   rel="noopener" 
                   class="mobile-nav-whatsapp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                </a>
            `;
            header.appendChild(nav);
            
            // Add click handlers to close menu
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    menuOpen = false;
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', false);
                    nav.classList.remove('active');
                });
            });
            
            return nav;
        }
    }
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
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
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Smooth Scroll for Navigation Links
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
    
    // Before/After Slider Functionality
    const sliders = document.querySelectorAll('.before-after-container');
    
    sliders.forEach(container => {
        const handle = container.querySelector('.slider-handle');
        const afterImage = container.querySelector('.after-image');
        const wrapper = container.querySelector('.slider-wrapper');
        
        if (!handle || !afterImage || !wrapper) return;
        
        let isDragging = false;
        let currentPosition = 50;
        
        // Apply initial position
        updateSliderPosition(currentPosition);
        
        function updateSliderPosition(percent) {
            const clampedPercent = Math.max(0, Math.min(100, percent));
            handle.style.left = clampedPercent + '%';
            afterImage.style.left = clampedPercent + '%';
            afterImage.style.clipPath = `inset(0 0 0 ${clampedPercent}%)`;
        }
        
        function getPositionFromEvent(e) {
            const rect = wrapper.getBoundingClientRect();
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            return (x / rect.width) * 100;
        }
        
        // Mouse events
        handle.addEventListener('mousedown', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            currentPosition = getPositionFromEvent(e);
            updateSliderPosition(currentPosition);
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Touch events
        handle.addEventListener('touchstart', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentPosition = getPositionFromEvent(e);
            updateSliderPosition(currentPosition);
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
        
        // Click to position
        wrapper.addEventListener('click', function(e) {
            if (e.target === handle || handle.contains(e.target)) return;
            currentPosition = getPositionFromEvent(e);
            updateSliderPosition(currentPosition);
        });
    });
    
    // Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Build WhatsApp message
            let message = `Hola MicroClean, quiero una cotización.\n\n`;
            message += `Nombre: ${data.name}\n`;
            message += `Teléfono: ${data.phone}\n`;
            
            if (data.service) {
                const services = {
                    'sofa': 'Limpieza de Sofás',
                    'colchon': 'Limpieza de Colchones',
                    'presion': 'Lavado a Presión',
                    'otro': 'Servicio Personalizado'
                };
                message += `Servicio: ${services[data.service] || data.service}\n`;
            }
            
            if (data.message) {
                message += `Mensaje: ${data.message}\n`;
            }
            
            // Open WhatsApp with message
            const whatsappUrl = `https://wa.me/50764177111?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            showFormSuccess();
        });
        
        function showFormSuccess() {
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = '✓ Redirigiendo a WhatsApp...';
            successDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--whatsapp);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(successDiv);
            
            setTimeout(() => {
                successDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(successDiv);
                }, 300);
            }, 3000);
        }
    }
    
    // Lazy Load Images Enhancement
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src && !img.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 900;
        }
        
        .mobile-nav.active {
            transform: translateY(0);
        }
        
        .mobile-nav a {
            display: block;
            padding: 1rem 1.5rem;
            color: var(--gray-800);
            border-bottom: 1px solid var(--gray-200);
            transition: background 0.2s;
        }
        
        .mobile-nav a:hover {
            background: var(--gray-50);
        }
        
        .mobile-nav-whatsapp {
            background: var(--whatsapp) !important;
            color: white !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 600;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        img.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
})();
