# Responsive Design Skill

## Description
Manage responsive breakpoints and mobile-first design for MicroClean website.

## Breakpoints

### Mobile First Approach
```css
/* Mobile: 0-767px (base styles) */
/* Tablet: 768px-1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { }
```

## Key Responsive Components

### 1. Navigation
- **Mobile**: Hamburger menu (`.menu-toggle`)
- **Desktop**: Full nav bar with dropdowns

### 2. Service Cards Grid
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3 columns

### 3. Contact Section
- **Mobile**: Stacked layout
- **Desktop**: Grid layout (1.2fr 1fr)

### 4. Gallery
- **Mobile**: 1:1 aspect ratio
- **Tablet/Desktop**: 4:3 aspect ratio

## Mobile Menu (main.js:44-98)
- Hamburger icon with 3 lines
- Animated transform on click
- Creates fixed sidebar navigation
- Prevents body scroll when open
- Auto-closes on link click

## Viewport Meta
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

## Touch Optimization
- Large tap targets (48px minimum)
- Touch-friendly before/after slider
- Pointer events for cross-device support
- No hover states on touch devices

## Testing Checklist
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad
- [ ] Test on small screens (320px width)
- [ ] Test landscape orientation
- [ ] Verify touch interactions work
- [ ] Check text is readable (16px min)

---
*MicroClean Responsive Design Management*