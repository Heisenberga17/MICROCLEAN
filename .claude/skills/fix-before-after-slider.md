# Fix Before/After Image Slider

## Purpose
Optimize and fix the before/after image comparison slider used in the gallery section

## When to Use
- Slider is laggy or unresponsive
- Images appear cropped or zoomed incorrectly
- Slider doesn't initialize at 50/50 split
- Touch/mobile interactions aren't working properly

## Key Files
- `js/main.js` (lines 192-338) - Slider JavaScript logic
- `style.css` (lines 722-900) - Slider styling
- `index.html` (lines 350-483) - Gallery HTML structure

## Common Issues & Solutions

### 1. Slider Starting Position Wrong
```javascript
// In js/main.js, ensure position starts at 50
let position = 50; // Should be exactly 50 for 50/50 split
updateSliderPosition(50, true); // Force initial position
```

### 2. Images Too Zoomed/Cropped
```css
/* In style.css - adjust object-fit based on need */
.before-image img,
.after-image img {
    object-fit: contain; /* Shows full image */
    /* OR */
    object-fit: cover; /* Fills container, may crop */
}
```

### 3. Laggy Performance
```javascript
// Replace spring physics with linear interpolation
const smoothing = 0.15; // Higher = more responsive
position += distance * smoothing; // Direct calculation
```

### 4. Aspect Ratio Issues
```css
.image-pair {
    aspect-ratio: 4 / 3; /* Standard ratio */
    /* Responsive ratios */
    @media (max-width: 767px) {
        aspect-ratio: 1 / 1; /* Square on mobile */
    }
}
```

## Testing Commands
```bash
# Start local server
python -m http.server 8000
# Navigate to http://localhost:8000/#galeria
```

## Performance Optimizations
- Use `requestAnimationFrame` for smooth 60fps
- Cache DOM queries in variables
- Remove unnecessary transforms
- Use GPU-accelerated properties (`transform`, `clip-path`)