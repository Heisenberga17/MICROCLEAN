# Update Cotizador (Quote Calculator)

## Purpose
Manage and update the interactive quotation calculator for cleaning services

## When to Use
- Adding new services or categories
- Updating prices
- Modifying calculation logic
- Fixing cart functionality
- Improving mobile layout

## Key Files
- `js/cotizador.js` - Main calculator logic and service data
- `cotizador.html` - Calculator page structure
- `style.css` (lines 1050-1700) - Cotizador styling

## Service Structure
```javascript
// In js/cotizador.js
const serviciosData = {
    tela: [
        {
            nombre: "Service Name",
            precio: 25,
            unidad: "por unidad",
            hasQuantity: true,
            hasSize: false
        }
    ]
};
```

## Common Updates

### 1. Add New Service
```javascript
// In serviciosData object
nuevoServicio: {
    nombre: "Limpieza de Cortinas",
    precio: 15,
    unidad: "por panel",
    hasQuantity: true
}
```

### 2. Update Prices
```javascript
// Find service in serviciosData
colchones: {
    precio: 35, // Update this value
}
```

### 3. Mobile Layout Order
```css
/* In style.css - Reorder for mobile */
@media (max-width: 1023px) {
    .servicios-panel { order: 2; }
    .carrito-wrapper { order: 1; } /* Cart shows first */
}
```

### 4. WhatsApp Message Format
```javascript
// In js/cotizador.js - formatearMensajeWhatsApp()
let mensaje = `🧹 *COTIZACIÓN MICROCLEAN*\n\n`;
mensaje += `📋 *Servicios Solicitados:*\n`;
// Customize message format here
```

## Calculation Logic
- Base price × Quantity = Subtotal
- Size multipliers: Small (0.8x), Medium (1x), Large (1.2x), XL (1.5x)
- Additional services add to total
- No tax calculations currently

## Testing
```bash
# Test locally
python -m http.server 8000
# Navigate to http://localhost:8000/cotizador.html
```

## Mobile Optimization Tips
- Keep "Tu Cotización" visible
- Use accordion for service categories
- Ensure touch-friendly sliders
- Test WhatsApp link on mobile