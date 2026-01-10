# Animations & Effects Skill

## Description
Manage all animations, transitions, and visual effects across the MicroClean website.

## Key Animations

### 1. Gradient Shift (Hero Background)
```css
@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.hero {
    background: linear-gradient(135deg, var(--blue-1), var(--blue-2), var(--blue-accent));
    background-size: 200% 200%;
    animation: gradientShift 15s ease infinite;
}
```

### 2. Scroll Reveal (main.js:438-499)
Elements fade in and slide up when scrolling:
- Uses IntersectionObserver
- Staggered delays (8 levels: `.stagger-1` to `.stagger-8`)
- CSS class: `.scroll-reveal` → `.revealed`

### 3. Card Hover Lift
```css
.service-card-simple:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(2, 62, 138, 0.15);
}
```

### 4. Ripple Effect (main.js:504-559)
Material Design ripple on button clicks:
- Creates `<span class="ripple-effect">`
- Expands from click point
- Fades out after 0.6s

### 5. WhatsApp FAB Pulse (main.js:580-593)
Pulses on scroll activity:
```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}
```

### 6. Parallax Hero (main.js:561-574)
Hero background moves slower than scroll:
```javascript
const rate = scrolled * 0.5; // 50% scroll speed
heroBg.style.transform = `translateY(${rate}px)`;
```

### 7. Number Counter Animation (main.js:620-679)
Animated counting numbers with easeOutExpo:
- Triggers on scroll (IntersectionObserver)
- Smooth 2-second animation
- Handles integers and decimals

## Transitions

### Standard Easing
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Timing Functions
- **Fast**: `0.2s` - Hover states, ripples
- **Standard**: `0.3s` - Most transitions
- **Slow**: `0.6s` - Ripple animation
- **Very Slow**: `15s` - Gradient shift

## Performance Optimization

### Hardware Acceleration
```css
will-change: transform;
transform: translateZ(0); /* Force GPU */
```

### RAF Throttling
All animations use `requestAnimationFrame` for 60fps:
- Scroll events
- Slider dragging
- Parallax effects

### Passive Listeners
```javascript
window.addEventListener('scroll', handler, { passive: true });
```

## CSS Custom Properties for Shadows

### Shadow System
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-soft: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-medium: 0 8px 16px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 16px 32px rgba(0, 0, 0, 0.15);
--shadow-floating: 0 20px 40px rgba(0, 0, 0, 0.2);
--shadow-blue: 0 8px 16px rgba(9, 101, 198, 0.25);
```

## Stagger System

### Scroll Reveal Stagger
```css
.scroll-reveal.stagger-1 { transition-delay: 0.1s; }
.scroll-reveal.stagger-2 { transition-delay: 0.2s; }
/* ... up to stagger-8 (0.8s) */
```

### Application
Applied automatically by JavaScript to sibling elements:
```javascript
const siblingIndex = siblings.indexOf(el);
if (siblingIndex > 0 && siblingIndex <= 8) {
    el.classList.add(`stagger-${siblingIndex}`);
}
```

## Form Animations (main.js:595-618)

### Focus State
```css
input:focus {
    border-color: var(--blue-2);
    box-shadow: 0 0 0 3px rgba(9, 101, 198, 0.1);
}
```

### Filled State
JavaScript adds `.filled` class when input has value.

## Notification Toast (main.js:328-353)
Success message after form submission:
```css
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
```

## Testing Checklist
- [ ] Animations run at 60fps
- [ ] No jank or stuttering
- [ ] Reduced motion respected
- [ ] Hover states work on desktop
- [ ] Touch states work on mobile
- [ ] Scroll reveals trigger correctly
- [ ] Counter animations count up smoothly

## Accessibility

### Prefers Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## MicroClean Branding
**Animation colors:**
- Blue gradient: `#023E8A` → `#0965C6` → `#0077B6`
- Hover shadow: `rgba(2, 62, 138, 0.15)`
- Focus ring: `rgba(9, 101, 198, 0.1)`

---
*MicroClean Animations & Effects Management*