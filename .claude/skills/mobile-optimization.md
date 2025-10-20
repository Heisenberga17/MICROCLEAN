# Mobile Optimization

## Purpose
Optimize website performance and user experience on mobile devices

## When to Use
- Fixing mobile-specific bugs
- Improving touch interactions
- Optimizing performance for slower connections
- Adjusting layouts for small screens

## Key Breakpoints
```css
/* Mobile Portrait */
@media (max-width: 767px) {}

/* Mobile Landscape */
@media (max-width: 767px) and (orientation: landscape) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {}

/* Desktop */
@media (min-width: 1024px) {}
```

## Touch Optimization

### 1. Remove Hover Effects
```css
@media (hover: none) and (pointer: coarse) {
    /* Touch devices */
    .element:hover {
        /* Remove hover states */
        transform: none !important;
        box-shadow: none !important;
    }
}
```

### 2. Touch-Friendly Sizing
```css
/* Minimum touch target: 44x44px */
.button, .clickable {
    min-height: 44px;
    min-width: 44px;
    padding: 12px;
}
```

### 3. Prevent Accidental Zooming
```html
<meta name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

## Performance Optimizations

### 1. Image Loading
```html
<!-- Lazy load images below fold -->
<img loading="lazy" src="image.jpg" alt="Description">

<!-- Preload critical images -->
<link rel="preload" as="image" href="hero.jpg">
```

### 2. Font Loading
```css
/* Use font-display for better loading -->
@font-face {
    font-family: 'Custom';
    src: url('font.woff2');
    font-display: swap; /* Show fallback immediately */
}
```

### 3. Reduce JavaScript
```javascript
// Debounce scroll events
let ticking = false;
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateUI);
        ticking = true;
    }
}
```

## Common Mobile Issues & Fixes

### 1. Hamburger Menu
```javascript
// In js/main.js
menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    // Prevent body scroll when menu open
    document.body.style.overflow =
        navMenu.classList.contains('active') ? 'hidden' : '';
});
```

### 2. WhatsApp FAB Position
```css
/* Avoid blocking content */
.whatsapp-fab {
    bottom: 20px; /* Higher on mobile */
    right: 15px;
    z-index: 999;
}
```

### 3. Form Inputs
```css
/* Prevent zoom on input focus (iOS) */
input, textarea, select {
    font-size: 16px; /* Minimum to prevent zoom */
}
```

### 4. Smooth Scrolling
```css
/* Enable momentum scrolling (iOS) */
.scrollable {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
}
```

## Testing Tools
1. **Chrome DevTools:** Device emulation
2. **Lighthouse:** Performance audit
3. **Real devices:** Best for touch testing

## Checklist
- [ ] Touch targets ≥ 44px
- [ ] No horizontal scroll
- [ ] Images optimized and lazy loaded
- [ ] Forms easy to complete
- [ ] Text readable without zooming (16px+)
- [ ] Critical CSS inlined
- [ ] JavaScript deferred/async
- [ ] Service worker for offline