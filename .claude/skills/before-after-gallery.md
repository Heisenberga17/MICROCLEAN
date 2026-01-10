# Before/After Gallery Skill

## Description
Manage and optimize the before/after slider gallery feature for MicroClean service pages. This skill handles the interactive image comparison slider, gallery image management, and slider functionality.

## When to Use
- Adding new before/after image pairs to the gallery
- Fixing slider drag functionality or pointer events
- Adjusting slider appearance or animations
- Updating gallery layout or responsiveness
- Debugging slider keyboard controls (arrow keys)
- Optimizing gallery image loading

## Key Files
- `/servicios/tapiceria.html` - Main gallery implementation
- `/servicios/espacios.html` - Space cleaning gallery
- `/servicios/eventos.html` - Events gallery
- `/js/main.js` (lines 185-292) - Slider JavaScript logic
- `/style.css` (lines 824-1048) - Gallery styling
- `/public/images/gallery/` - Before/after image pairs

## Gallery Structure

### HTML Pattern
```html
<div class="before-after-container">
    <div class="slider-wrapper">
        <div class="before-image">
            <img src="/public/images/gallery/antes_sofa1.jpg" alt="Antes">
            <span class="label">Antes</span>
        </div>
        <div class="after-image">
            <img src="/public/images/gallery/despues_sofa1.jpg" alt="Después">
            <span class="label">Después</span>
        </div>
        <div class="slider-handle" tabindex="0" aria-label="Deslizar para comparar">
            <div class="handle-line"></div>
        </div>
    </div>
</div>
```

### Current Gallery Images
**Available image pairs in `/public/images/gallery/`:**
- `antes_sofa1.jpg` / `despues_sofa1.jpg`
- `antes_silla1.jpg` / `despues_silla1.jpg`
- `antes_silla2.jpg` / `despues_silla2.jpg`
- `antes_cama1.jpg` / `despues_cama1.jpg`
- `antes_cama2.jpg` / `despues_cama2.jpg`
- Total: 11 before/after pairs

## Slider Functionality

### JavaScript Features (main.js:185-292)
1. **Pointer Events**: Drag with mouse, touch, or pen
2. **Keyboard Support**: Arrow keys for accessibility
3. **RAF Animation**: 60fps smooth dragging
4. **Dynamic Labels**: Fades "Antes"/"Después" based on position
5. **Clip-path Reveal**: CSS clip-path for image reveal effect
6. **Pointer Capture**: Prevents drag escaping

### Key JavaScript Functions
```javascript
// Initial position (0% = showing only BEFORE)
let position = 0;

// Update slider position with RAF
function updateSliderPosition(pos) {
    const clampedPos = Math.max(0, Math.min(100, pos));
    pendingPosition = clampedPos;
    if (!rafId) {
        rafId = requestAnimationFrame(() => {
            position = pendingPosition;
            applyPosition();
        });
    }
}

// Apply visual changes
function applyPosition() {
    handle.style.left = position + '%';
    afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    // Label logic: < 50% shows "Antes", >= 50% shows "Después"
}
```

### CSS Styling (style.css:824-1048)
- `.before-after-container` - Main wrapper with aspect ratio
- `.slider-wrapper` - Relative positioned container
- `.before-image` / `.after-image` - Absolute positioned layers
- `.slider-handle` - Draggable handle with line
- `.label` - Animated "Antes"/"Después" labels

## Common Tasks

### 1. Add New Image Pair
```bash
# 1. Add images to gallery folder
cp new_antes.jpg /public/images/gallery/antes_[name].jpg
cp new_despues.jpg /public/images/gallery/despues_[name].jpg

# 2. Add HTML to service page
<div class="before-after-container">
    <div class="slider-wrapper">
        <div class="before-image">
            <img src="/public/images/gallery/antes_[name].jpg" alt="Antes" loading="lazy">
            <span class="label">Antes</span>
        </div>
        <div class="after-image">
            <img src="/public/images/gallery/despues_[name].jpg" alt="Después" loading="lazy">
            <span class="label">Después</span>
        </div>
        <div class="slider-handle" tabindex="0" aria-label="Deslizar para comparar">
            <div class="handle-line"></div>
        </div>
    </div>
</div>
```

### 2. Fix Slider Not Dragging
**Check:**
- Pointer event listeners are attached (main.js:277-280)
- `.slider-wrapper` has correct z-index
- No CSS preventing pointer events
- RAF is not blocked or throttled

**Debug:**
```javascript
// Add console logs in main.js
function handlePointerDown(e) {
    console.log('Pointer down:', e.clientX);
    isDragging = true;
    // ... rest of code
}
```

### 3. Adjust Slider Sensitivity
```javascript
// In main.js, modify getPosition function
function getPosition(clientX) {
    const rect = wrapper.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    return percentage; // Already 0-100%, no adjustment needed
}
```

### 4. Change Initial Position
```javascript
// In main.js, change starting position
let position = 50; // Start at 50% (showing half and half)
// OR
let position = 100; // Start at 100% (showing only AFTER)
```

### 5. Customize Handle Appearance
```css
/* In style.css */
.slider-handle {
    width: 48px;
    height: 48px;
    background: var(--blue-2); /* Change color */
    border: 3px solid white; /* Adjust border */
    cursor: ew-resize;
}

.handle-line {
    width: 2px; /* Adjust thickness */
    background: white;
}
```

## Responsive Behavior

### Mobile (<768px)
- Touch-friendly handle (48px)
- Full-width gallery
- Aspect ratio: 1:1 or 4:3

### Tablet (768-1023px)
- 2-column gallery grid
- Aspect ratio: 4:3

### Desktop (1024px+)
- 3-column gallery grid
- Min-height: 400px
- Aspect ratio: 4:3

## Performance Optimization

### Current Optimizations
1. **Lazy Loading**: `loading="lazy"` on images
2. **RAF Throttling**: Prevents excessive repaints
3. **Pointer Capture**: Smooth dragging without lag
4. **Clip-path**: Hardware-accelerated reveal
5. **Will-change**: GPU acceleration hint

### Best Practices
- Keep images under 500KB each
- Use WebP format for better compression
- Preload gallery images on service pages
- Limit to 6-8 pairs per page for performance

## Accessibility

### Keyboard Support
- **Arrow Left**: Move slider left (show more ANTES)
- **Arrow Right**: Move slider right (show more DESPUÉS)
- **Tab**: Focus handle
- **Shift+Tab**: Reverse focus

### ARIA Labels
```html
<div class="slider-handle"
     tabindex="0"
     aria-label="Deslizar para comparar antes y después"
     role="slider"
     aria-valuemin="0"
     aria-valuemax="100"
     aria-valuenow="0">
```

## Troubleshooting

### Issue: Slider jumps or stutters
**Solution**: Check RAF is not being blocked
```javascript
// Ensure rafId is properly managed
if (!rafId) {
    rafId = requestAnimationFrame(() => {
        // animation logic
        rafId = null;
    });
}
```

### Issue: Images don't align
**Solution**: Ensure both images have identical dimensions
```css
.before-image img,
.after-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintains aspect ratio */
}
```

### Issue: Handle doesn't follow cursor on mobile
**Solution**: Use pointer events instead of mouse events
```javascript
// ✓ Correct (already implemented)
wrapper.addEventListener('pointerdown', handlePointerDown);
wrapper.addEventListener('pointermove', handlePointerMove);

// ✗ Wrong
wrapper.addEventListener('mousedown', handlePointerDown);
```

### Issue: Label doesn't fade correctly
**Solution**: Check position threshold in main.js
```javascript
// Label visibility logic (line ~236-245)
if (position < 50) {
    beforeLabel.style.opacity = 1;
    afterLabel.style.opacity = 0;
} else {
    beforeLabel.style.opacity = 0;
    afterLabel.style.opacity = 1;
}
```

## Testing Checklist

- [ ] Slider drags smoothly on desktop (mouse)
- [ ] Slider drags smoothly on mobile (touch)
- [ ] Keyboard arrows work (left/right)
- [ ] Labels fade at 50% threshold
- [ ] Images align perfectly
- [ ] Handle stays centered on line
- [ ] No lag or stuttering during drag
- [ ] Works in Chrome, Safari, Firefox
- [ ] Lazy loading works for images
- [ ] Accessibility: Screen reader announces slider

## Related Skills
- `service-pages.md` - For adding galleries to service pages
- `image-optimization.md` - For optimizing gallery images
- `responsive-design.md` - For mobile gallery layouts

## MicroClean Branding
**Colors for gallery UI:**
- Handle: `var(--blue-2)` (#0965C6)
- Handle border: White (#FFFFFF)
- Labels: White with shadow for contrast
- Handle line: White 2px

---
*Skill for MicroClean Before/After Gallery Management*