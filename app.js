// Setup HTM with React
const html = htm.bind(React.createElement);
const { useState, useEffect, useRef } = React;

// ============================================
// COMPONENTS
// ============================================

// Mobile Menu Component
function MobileMenu({ isOpen, toggleMenu }) {
    return html`
        <div class="mobile-menu ${isOpen ? 'active' : ''}">
            <button class="menu-toggle" onClick=${toggleMenu}>
                ${isOpen ? '✕' : '☰'}
            </button>
            ${isOpen && html`
                <nav class="mobile-nav">
                    <a href="#home" onClick=${toggleMenu}>Home</a>
                    <a href="#services" onClick=${toggleMenu}>Services</a>
                    <a href="#gallery" onClick=${toggleMenu}>Gallery</a>
                    <a href="#contact" onClick=${toggleMenu}>Contact</a>
                </nav>
            `}
        </div>
    `;
}

// Header Component
function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return html`
        <header class="${scrolled ? 'scrolled' : ''}">
            <div class="header-content">
                <div class="logo">
                    <span class="logo-icon">💧</span>
                    <span class="logo-text">MicroClean</span>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="desktop-nav">
                    <a href="#services">Services</a>
                    <a href="#gallery">Gallery</a>
                    <a href="#contact">Contact</a>
                    <a href="tel:555-123-4567" class="call-btn">Call Now</a>
                </nav>
                
                <!-- Mobile Menu -->
                <${MobileMenu} 
                    isOpen=${mobileMenuOpen} 
                    toggleMenu=${() => setMobileMenuOpen(!mobileMenuOpen)}
                />
            </div>
        </header>
    `;
}

// Hero Component
function Hero() {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
    }, []);

    return html`
        <section id="home" class="hero ${visible ? 'visible' : ''}">
            <div class="hero-content">
                <h1>Professional Cleaning Services</h1>
                <p>Transform your spaces with our expert cleaning solutions</p>
                <div class="hero-buttons">
                    <a href="#services" class="btn btn-primary">View Services</a>
                    <a href="tel:555-123-4567" class="btn btn-secondary">Call Now</a>
                </div>
            </div>
            <div class="hero-image"></div>
        </section>
    `;
}

// Service Card Component
function ServiceCard({ service, imagePath }) {
    const [imageError, setImageError] = useState(false);
    
    return html`
        <div class="service-card">
            ${!imageError && imagePath && html`
                <img 
                    class="service-image"
                    src=${imagePath}
                    alt=${service.name}
                    loading="lazy"
                    onError=${() => setImageError(true)}
                />
            `}
            ${(imageError || !imagePath) && html`
                <div class="service-placeholder">
                    <span class="placeholder-icon">🧹</span>
                </div>
            `}
            <div class="service-info">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="price-container">
                    <span class="price">$${service.price}</span>
                    <span class="price-unit">USD</span>
                </div>
                <button class="book-btn" onClick=${() => handleBooking(service)}>
                    Book Now
                </button>
            </div>
        </div>
    `;
}

// Services Component
function Services({ services, assets }) {
    const getImagePath = (slug) => {
        const filename = assets[slug];
        return filename ? `/public/images/services/${filename}` : null;
    };

    return html`
        <section id="services" class="services">
            <div class="container">
                <div class="section-header">
                    <h2>Our Services</h2>
                    <p>Professional cleaning solutions for every need</p>
                </div>
                <div class="service-grid">
                    ${services.map(service => html`
                        <${ServiceCard}
                            key=${service.slug}
                            service=${service}
                            imagePath=${getImagePath(service.slug)}
                        />
                    `)}
                </div>
            </div>
        </section>
    `;
}

// Before/After Comparison Component
function BeforeAfterCard({ item, getImagePath }) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef(null);
    
    const handleMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const pos = ((x - rect.left) / rect.width) * 100;
        setPosition(Math.min(Math.max(pos, 0), 100));
    };

    return html`
        <div class="before-after-card">
            <h3>${item.label}</h3>
            <div 
                class="comparison-container"
                ref=${containerRef}
                onMouseMove=${handleMove}
                onTouchMove=${handleMove}
            >
                <div class="comparison-image before">
                    <img src=${getImagePath(item.before)} alt="Before" />
                    <span class="label">Before</span>
                </div>
                <div 
                    class="comparison-image after"
                    style=${{clipPath: `inset(0 ${100 - position}% 0 0)`}}
                >
                    <img src=${getImagePath(item.after)} alt="After" />
                    <span class="label">After</span>
                </div>
                <div 
                    class="slider-handle"
                    style=${{left: `${position}%`}}
                >
                    <span>↔</span>
                </div>
            </div>
        </div>
    `;
}

// Gallery Component
function Gallery({ assets }) {
    const beforeAfter = [
        { before: 'antes_silla1', after: 'despues_silla1', label: 'Chair Cleaning' },
        { before: 'antes_cama1', after: 'despues_cama1', label: 'Mattress Cleaning' }
    ];

    const getImagePath = (key) => {
        const filename = assets[key];
        return filename ? `/public/images/gallery/${filename}` : '/public/images/placeholder.svg';
    };

    return html`
        <section id="gallery" class="gallery">
            <div class="container">
                <div class="section-header">
                    <h2>Before & After</h2>
                    <p>See the MicroClean difference</p>
                </div>
                <div class="gallery-grid">
                    ${beforeAfter.map(item => html`
                        <${BeforeAfterCard}
                            key=${item.label}
                            item=${item}
                            getImagePath=${getImagePath}
                        />
                    `)}
                </div>
            </div>
        </section>
    `;
}

// Contact Component
function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert('Thank you! We will contact you soon.');
        setFormData({ name: '', phone: '', service: '', message: '' });
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return html`
        <section id="contact" class="contact">
            <div class="container">
                <div class="section-header">
                    <h2>Get In Touch</h2>
                    <p>Book your cleaning service today</p>
                </div>
                <div class="contact-grid">
                    <div class="contact-info">
                        <div class="info-item">
                            <span class="icon">📧</span>
                            <div>
                                <h4>Email</h4>
                                <p>info@microclean.com</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <span class="icon">📱</span>
                            <div>
                                <h4>Phone</h4>
                                <p>(555) 123-4567</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <span class="icon">🕐</span>
                            <div>
                                <h4>Hours</h4>
                                <p>Mon-Fri: 8AM - 6PM</p>
                                <p>Sat: 9AM - 4PM</p>
                            </div>
                        </div>
                    </div>
                    <form class="contact-form" onSubmit=${handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value=${formData.name}
                            onChange=${(e) => updateField('name', e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value=${formData.phone}
                            onChange=${(e) => updateField('phone', e.target.value)}
                            required
                        />
                        <select
                            value=${formData.service}
                            onChange=${(e) => updateField('service', e.target.value)}
                            required
                        >
                            <option value="">Select Service</option>
                            <option value="sofa">Sofa Cleaning</option>
                            <option value="mattress">Mattress Cleaning</option>
                            <option value="chair">Chair Cleaning</option>
                            <option value="rug">Rug Cleaning</option>
                            <option value="pressure">Pressure Washing</option>
                        </select>
                        <textarea
                            placeholder="Additional Details"
                            value=${formData.message}
                            onChange=${(e) => updateField('message', e.target.value)}
                            rows="4"
                        ></textarea>
                        <button type="submit" class="btn btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    `;
}

// Footer Component
function Footer() {
    return html`
        <footer>
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="logo">
                        <span class="logo-icon">💧</span>
                        <span class="logo-text">MicroClean</span>
                    </div>
                    <p>Professional cleaning services you can trust</p>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <a href="#services">Services</a>
                    <a href="#gallery">Gallery</a>
                    <a href="#contact">Contact</a>
                </div>
                <div class="footer-social">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 MicroClean. All rights reserved.</p>
            </div>
        </footer>
    `;
}

// ============================================
// MAIN APP
// ============================================

function App() {
    const [services, setServices] = useState([]);
    const [assets, setAssets] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [servicesRes, assetsRes] = await Promise.all([
                fetch('/public/data/latest.json'),
                fetch('/public/data/assets.json')
            ]);

            if (!servicesRes.ok || !assetsRes.ok) {
                throw new Error('Failed to load data');
            }

            const servicesData = await servicesRes.json();
            const assetsData = await assetsRes.json();

            setServices(servicesData.services || []);
            setAssets(assetsData || {});
            setLoading(false);
        } catch (err) {
            console.error('Error loading data:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return html`
            <div class="loading-screen">
                <div class="spinner"></div>
                <p>Loading MicroClean...</p>
            </div>
        `;
    }

    if (error) {
        return html`
            <div class="error-screen">
                <h2>Oops! Something went wrong</h2>
                <p>${error}</p>
                <button onClick=${loadData}>Try Again</button>
            </div>
        `;
    }

    return html`
        <${Header} />
        <${Hero} />
        <${Services} services=${services} assets=${assets} />
        <${Gallery} assets=${assets} />
        <${Contact} />
        <${Footer} />
    `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function handleBooking(service) {
    // Scroll to contact form
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill the service in the form if possible
    const selectElement = document.querySelector('select');
    if (selectElement) {
        selectElement.value = service.slug.split('-')[0];
    }
}

// ============================================
// INITIALIZE APP
// ============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(React.createElement(App));
}
