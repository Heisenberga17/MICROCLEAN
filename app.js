// Configuration
const WHATSAPP_NUMBER = '5215512345678';
const PHONE_NUMBER = '+525512345678';
const WHATSAPP_MESSAGE = 'Hola, me gustaría solicitar una cotización para servicio de limpieza';

// HTM Setup
const html = htm.bind(React.createElement);
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// Service data with actual repo images
const servicesData = [
    {
        id: 'sofa',
        name: 'Limpieza de Sofás',
        description: 'Limpieza profunda y desinfección de sofás y sillones',
        icon: '🛋️',
        image: 'Sofa.jpg',
        price: 'Desde $299'
    },
    {
        id: 'mattress',
        name: 'Limpieza de Colchones',
        description: 'Eliminación de ácaros, manchas y olores en colchones',
        icon: '🛏️',
        image: 'Cama.jpg',
        price: 'Desde $249'
    },
    {
        id: 'tips',
        name: 'Tips de Limpieza',
        description: 'Consejos profesionales para mantener tus muebles',
        icon: '💡',
        image: 'Tips.jpg',
        price: 'Gratis'
    },
    {
        id: 'promo',
        name: 'Promociones',
        description: 'Descuentos especiales y paquetes',
        icon: '🏷️',
        image: 'Promo.jpg',
        price: 'Ver ofertas'
    },
    {
        id: 'user',
        name: 'Servicio Personalizado',
        description: 'Cotización a medida para tus necesidades',
        icon: '👤',
        image: 'User.jpg',
        price: 'Cotizar'
    },
    {
        id: 'pressure',
        name: 'Lavado a Presión',
        description: 'Limpieza de exteriores y superficies duras',
        icon: '💦',
        image: 'antrd_y_despues.jpg',
        price: 'Desde $399'
    }
];

// Gallery pairs from repo
const galleryPairs = [
    {
        before: 'antes_silla1.jpg',
        after: 'despues_silla1.jpg',
        label: 'Limpieza de Sillas',
        category: 'silla'
    },
    {
        before: 'antes_cama1.jpg',
        after: 'despues_cama1.jpg',
        label: 'Limpieza de Colchones',
        category: 'cama'
    }
];

// Components
function Header({ scrolled }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    
    const scrollToSection = useCallback((e, sectionId) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    }, []);

    return html`
        <header class="${scrolled ? 'scrolled' : ''}">
            <div class="container">
                <div class="header-content">
                    <div class="logo-wrapper">
                        <img 
                            src="/public/images/MicroClean_Main.jpg" 
                            alt="MicroClean" 
                            class="logo"
                            onError=${(e) => {
                                e.target.style.display = 'none';
                                console.warn('Logo not found: MicroClean_Main.jpg');
                            }}
                        />
                        <span class="logo-text">MicroClean</span>
                    </div>
                    
                    <nav class="desktop-nav">
                        <a href="#services" onClick=${(e) => scrollToSection(e, 'services')}>Servicios</a>
                        <a href="#gallery" onClick=${(e) => scrollToSection(e, 'gallery')}>Galería</a>
                        <a href="#contact" onClick=${(e) => scrollToSection(e, 'contact')}>Contacto</a>
                        <a href="tel:${PHONE_NUMBER}" class="call-btn">
                            <span class="icon">📞</span>
                            Llamar Ahora
                        </a>
                    </nav>
                    
                    <button 
                        class="mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}"
                        onClick=${toggleMenu}
                        aria-label="Menú"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                
                ${mobileMenuOpen && html`
                    <nav class="mobile-nav">
                        <a href="#services" onClick=${(e) => scrollToSection(e, 'services')}>Servicios</a>
                        <a href="#gallery" onClick=${(e) => scrollToSection(e, 'gallery')}>Galería</a>
                        <a href="#contact" onClick=${(e) => scrollToSection(e, 'contact')}>Contacto</a>
                        <a href="tel:${PHONE_NUMBER}" class="mobile-call-btn">
                            <span class="icon">📞</span>
                            Llamar Ahora
                        </a>
                    </nav>
                `}
            </div>
        </header>
    `;
}

function ServiceCard({ service, onClick }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    const imagePath = `/public/images/services/${service.image}`;
    
    return html`
        <div class="service-card" onClick=${() => onClick(service)}>
            <div class="service-image-wrapper">
                ${!imageError ? html`
                    <img 
                        src=${imagePath}
                        alt=${service.name}
                        class="service-image ${imageLoaded ? 'loaded' : ''}"
                        onLoad=${() => setImageLoaded(true)}
                        onError=${() => {
                            setImageError(true);
                            console.warn('Service image not found:', service.image);
                        }}
                        loading="lazy"
                    />
                ` : html`
                    <div class="service-placeholder">
                        <span class="service-icon">${service.icon}</span>
                    </div>
                `}
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="service-footer">
                    <span class="service-price">${service.price}</span>
                    <button class="service-btn">Ver más</button>
                </div>
            </div>
        </div>
    `;
}

function Services({ services }) {
    const handleServiceClick = useCallback((service) => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const messageField = document.querySelector('textarea[name="message"]');
                if (messageField) {
                    messageField.value = `Me interesa el servicio: ${service.name}`;
                    messageField.focus();
                }
            }, 500);
        }
    }, []);

    return html`
        <section id="services" class="services">
            <div class="container">
                <div class="section-header">
                    <h2>Nuestros Servicios</h2>
                    <p>Tapicería, colchones, sillas, alfombras y más. Servicio a domicilio disponible.</p>
                </div>
                <div class="services-grid">
                    ${services.map(service => html`
                        <${ServiceCard} 
                            key=${service.id} 
                            service=${service} 
                            onClick=${handleServiceClick}
                        />
                    `)}
                </div>
            </div>
        </section>
    `;
}

function BeforeAfterSlider({ pair }) {
    const [position, setPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
    const [imageErrors, setImageErrors] = useState({ before: false, after: false });
    
    const beforePath = `/public/images/gallery/${pair.before}`;
    const afterPath = `/public/images/gallery/${pair.after}`;
    
    const handleMove = useCallback((clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setPosition(Math.min(Math.max(percentage, 0), 100));
    }, []);
    
    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();
        handleMove(e.clientX);
    }, [isDragging, handleMove]);
    
    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    }, [isDragging, handleMove]);
    
    useEffect(() => {
        if (isDragging) {
            const handleMouseUp = () => setIsDragging(false);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('touchend', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            
            return () => {
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('touchend', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
            };
        }
    }, [isDragging, handleMouseMove, handleTouchMove]);
    
    if (imageErrors.before || imageErrors.after) {
        return null;
    }
    
    return html`
        <div class="before-after-slider">
            <h3>${pair.label}</h3>
            <div 
                class="slider-container"
                ref=${containerRef}
                onMouseDown=${() => setIsDragging(true)}
                onTouchStart=${() => setIsDragging(true)}
            >
                <div class="slider-image before-image">
                    <img 
                        src=${beforePath}
                        alt="Antes"
                        onLoad=${() => setImagesLoaded(prev => ({ ...prev, before: true }))}
                        onError=${() => {
                            setImageErrors(prev => ({ ...prev, before: true }));
                            console.warn('Before image not found:', pair.before);
                        }}
                    />
                    <span class="slider-label before-label">Antes</span>
                </div>
                <div 
                    class="slider-image after-image"
                    style=${{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                    <img 
                        src=${afterPath}
                        alt="Después"
                        onLoad=${() => setImagesLoaded(prev => ({ ...prev, after: true }))}
                        onError=${() => {
                            setImageErrors(prev => ({ ...prev, after: true }));
                            console.warn('After image not found:', pair.after);
                        }}
                    />
                    <span class="slider-label after-label">Después</span>
                </div>
                <div 
                    class="slider-handle"
                    style=${{ left: `${position}%` }}
                >
                    <div class="handle-line"></div>
                    <div class="handle-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 9L5 12L8 15M16 9L19 12L16 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function Gallery({ pairs }) {
    const validPairs = useMemo(() => pairs.filter(pair => pair.before && pair.after), [pairs]);
    
    if (validPairs.length === 0) {
        return null;
    }
    
    return html`
        <section id="gallery" class="gallery">
            <div class="container">
                <div class="section-header">
                    <h2>Antes y Después</h2>
                    <p>Resultados reales de nuestros servicios profesionales</p>
                </div>
                <div class="gallery-grid">
                    ${validPairs.map(pair => html`
                        <${BeforeAfterSlider} key=${pair.label} pair=${pair} />
                    `)}
                </div>
            </div>
        </section>
    `;
}

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);
    
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setSending(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSending(false);
        setSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
            setFormData({
                name: '',
                phone: '',
                email: '',
                service: '',
                message: ''
            });
            setSuccess(false);
        }, 3000);
    }, [formData]);
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    
    return html`
        <section id="contact" class="contact">
            <div class="container">
                <div class="section-header">
                    <h2>Contáctanos</h2>
                    <p>Solicita tu cotización sin compromiso</p>
                </div>
                
                <div class="contact-content">
                    <div class="contact-info">
                        <div class="info-card">
                            <div class="info-icon">📍</div>
                            <div>
                                <h4>Cobertura</h4>
                                <p>Toda la zona metropolitana</p>
                                <p>Servicio a domicilio</p>
                            </div>
                        </div>
                        
                        <div class="info-card">
                            <div class="info-icon">⏰</div>
                            <div>
                                <h4>Horario</h4>
                                <p>Lunes a Viernes: 8:00 - 19:00</p>
                                <p>Sábados: 9:00 - 15:00</p>
                            </div>
                        </div>
                        
                        <div class="info-card">
                            <div class="info-icon">✨</div>
                            <div>
                                <h4>Garantía</h4>
                                <p>100% de satisfacción</p>
                                <p>Productos ecológicos</p>
                            </div>
                        </div>
                        
                        <div class="cta-buttons">
                            <a 
                                href=${whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-whatsapp"
                            >
                                <span class="icon">💬</span>
                                Cotiza por WhatsApp
                            </a>
                            <a 
                                href="tel:${PHONE_NUMBER}"
                                class="btn btn-call"
                            >
                                <span class="icon">📞</span>
                                Llámanos
                            </a>
                        </div>
                    </div>
                    
                    <form class="contact-form" onSubmit=${handleSubmit}>
                        ${success ? html`
                            <div class="success-message">
                                <span class="success-icon">✅</span>
                                <p>¡Mensaje enviado con éxito!</p>
                                <p>Te contactaremos pronto.</p>
                            </div>
                        ` : html`
                            <div class="form-grid">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Tu nombre"
                                        value=${formData.name}
                                        onChange=${handleChange}
                                        required
                                    />
                                </div>
                                
                                <div class="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Teléfono"
                                        value=${formData.phone}
                                        onChange=${handleChange}
                                        required
                                    />
                                </div>
                                
                                <div class="form-group full-width">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo electrónico (opcional)"
                                        value=${formData.email}
                                        onChange=${handleChange}
                                    />
                                </div>
                                
                                <div class="form-group full-width">
                                    <select
                                        name="service"
                                        value=${formData.service}
                                        onChange=${handleChange}
                                        required
                                    >
                                        <option value="">Selecciona un servicio</option>
                                        ${servicesData.map(service => html`
                                            <option value=${service.id}>${service.name}</option>
                                        `)}
                                    </select>
                                </div>
                                
                                <div class="form-group full-width">
                                    <textarea
                                        name="message"
                                        placeholder="Cuéntanos más detalles..."
                                        value=${formData.message}
                                        onChange=${handleChange}
                                        rows="4"
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    class="btn btn-submit full-width"
                                    disabled=${sending}
                                >
                                    ${sending ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>
                            </div>
                        `}
                    </form>
                </div>
            </div>
        </section>
    `;
}

function Footer() {
    return html`
        <footer>
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <img 
                            src="/public/images/MicroClean_Compact.jpg" 
                            alt="MicroClean" 
                            class="footer-logo"
                            onError=${(e) => {
                                e.target.style.display = 'none';
                                console.warn('Footer logo not found: MicroClean_Compact.jpg');
                            }}
                        />
                        <p>Servicios profesionales de limpieza con los más altos estándares de calidad.</p>
                        <div class="social-links">
                            <a href="#" aria-label="Facebook">📘</a>
                            <a href="#" aria-label="Instagram">📷</a>
                            <a href="#" aria-label="WhatsApp">💬</a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Servicios</h4>
                        <ul>
                            <li><a href="#services">Limpieza de Sofás</a></li>
                            <li><a href="#services">Limpieza de Colchones</a></li>
                            <li><a href="#services">Lavado a Presión</a></li>
                            <li><a href="#services">Servicios Especiales</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Contacto Rápido</h4>
                        <p>📞 ${PHONE_NUMBER}</p>
                        <p>💬 WhatsApp disponible</p>
                        <p>📧 info@microclean.mx</p>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2024 MicroClean. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    `;
}

function App() {
    const [scrolled, setScrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        // Simulate data loading
        const loadData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Error al cargar los datos');
                setLoading(false);
            }
        };
        
        loadData();
    }, []);
    
    if (loading) {
        return html`
            <div class="loading-screen">
                <div class="spinner"></div>
                <p>Cargando MicroClean...</p>
            </div>
        `;
    }
    
    if (error) {
        return html`
            <div class="error-screen">
                <h2>¡Oops! Algo salió mal</h2>
                <p>${error}</p>
                <button onClick=${() => window.location.reload()}>
                    Intentar de nuevo
                </button>
            </div>
        `;
    }
    
    return html`
        <${Header} scrolled=${scrolled} />
        <main>
            <${Services} services=${servicesData} />
            <${Gallery} pairs=${galleryPairs} />
            <${ContactForm} />
        </main>
        <${Footer} />
    `;
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(React.createElement(App));
}
