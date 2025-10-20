# WhatsApp Integration

## Purpose
Manage WhatsApp buttons, links, and messaging functionality across the site

## When to Use
- Updating WhatsApp phone number
- Modifying pre-filled messages
- Adding new WhatsApp CTAs
- Fixing WhatsApp link issues

## Current Integrations

### 1. Floating Action Button (FAB)
**Location:** All pages, bottom-right corner
```html
<!-- In index.html and cotizador.html -->
<a href="https://wa.me/50764177111?text=..."
   class="whatsapp-fab">
```

### 2. Header WhatsApp Button
**Location:** Navigation menu
```html
<a href="https://wa.me/50764177111?text=..."
   class="btn-whatsapp-header">
```

### 3. Cotizador WhatsApp Submit
**Location:** Quote form submission
```javascript
// In js/cotizador.js
const numeroWhatsApp = '50764177111';
const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
```

## Phone Number Format
- **Current:** 50764177111
- **Format:** Country code (507) + Number (64177111)
- **No spaces, dashes, or special characters**

## Message Templates

### General Inquiry
```
Hola MicroClean, quiero una cotización.
```

### From Cotizador
```
🧹 COTIZACIÓN MICROCLEAN
📋 Servicios Solicitados:
[Service List]
💰 Total Estimado: $XX.00
👤 Cliente: [Name]
📞 WhatsApp: [Phone]
📍 Dirección: [Address]
```

## URL Encoding
```javascript
// Always encode messages
const mensaje = "Hola MicroClean";
const mensajeCodificado = encodeURIComponent(mensaje);
const url = `https://wa.me/50764177111?text=${mensajeCodificado}`;
```

## Styling WhatsApp Elements
```css
/* FAB Button */
.whatsapp-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #25D366;
    /* Green shadow for depth */
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
}

/* Pulse animation for attention */
@keyframes whatsapp-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}
```

## Testing WhatsApp Links
1. **Desktop:** Opens WhatsApp Web or prompts to open app
2. **Mobile:** Opens WhatsApp app directly
3. **Test URL:** https://wa.me/50764177111?text=Test%20Message

## Common Issues
- **Link not working:** Check phone number format
- **Message not appearing:** Ensure proper URL encoding
- **Button not visible:** Check z-index and positioning