# Service Cards Management

## Purpose
Manage and update the service cards displayed on the homepage

## When to Use
- Adding new services
- Updating service descriptions or images
- Fixing card hover effects
- Improving mobile responsiveness

## Card Structure
```html
<!-- In index.html (lines 145-225) -->
<article class="service-card">
    <div class="service-image">
        <img src="/public/images/services/service.jpg"
             alt="Service name" loading="lazy">
    </div>
    <div class="service-content">
        <h3>Service Title</h3>
        <p>Service description...</p>
        <ul class="service-features">
            <li>Feature 1</li>
            <li>Feature 2</li>
        </ul>
    </div>
</article>
```

## Current Services
1. **Limpieza de Sofás**
   - Deep cleaning for fabric sofas
   - Stain removal
2. **Limpieza de Colchones**
   - Allergen elimination
   - Sanitization
3. **Limpieza de Sillas**
   - Office and dining chairs
   - Various materials
4. **Limpieza de Alfombras**
   - Deep extraction cleaning
   - Odor removal
5. **Tratamiento de Cuero**
   - Cleaning and conditioning
   - Protection treatment
6. **Servicios Adicionales**
   - Custom cleaning solutions

## Styling & Effects
```css
/* Card hover effect */
.service-card {
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

/* Image zoom on hover - REMOVED for better UX */
.service-card:hover .service-image img {
    /* transform: scale(1.1); - Removed */
}
```

## Mobile Optimizations
```css
@media (max-width: 767px) {
    .services-grid {
        grid-template-columns: 1fr; /* Single column */
        gap: 1.5rem;
    }

    /* Remove hover effects on touch devices */
    @media (hover: none) {
        .service-card:hover {
            transform: none;
        }
    }
}
```

## Adding New Service Card
1. Add image to `/public/images/services/`
2. Insert card HTML in services section
3. Update navigation if needed
4. Add to cotizador if applicable

## Image Optimization
- **Size:** 400x300px recommended
- **Format:** WebP with JPG fallback
- **Loading:** Use `loading="lazy"`
- **Alt text:** Descriptive for SEO

## Common Issues
- **Cards uneven height:** Use `min-height` on content
- **Images stretched:** Check `object-fit: cover`
- **Hover stuck on mobile:** Add `@media (hover: hover)`
- **Click not working:** Ensure proper link wrapping