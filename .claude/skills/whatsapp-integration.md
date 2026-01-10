# WhatsApp Integration Skill

## Description
Manage all WhatsApp contact points and integration throughout the MicroClean website.

## WhatsApp Contact
**Phone:** +507 6417-7111
**URL:** `https://wa.me/50764177111`

## WhatsApp Touchpoints

### 1. Header Button
- Class: `.btn-whatsapp-header`
- Location: Desktop navigation
- Color: `var(--whatsapp)` (#25D366)

### 2. Hero CTA
- Class: `.btn-whatsapp-hero`
- Multiple locations: Home hero, service heroes
- Pre-filled message: "Hola MicroClean, quiero una cotización."

### 3. Floating Action Button (FAB)
- Class: `.whatsapp-fab`
- Fixed bottom-right position
- Pulse animation on scroll
- CSS: lines 1523-1545 in style.css
- Always visible across all pages

### 4. Contact Section
- Class: `.whatsapp-cta-box`
- Large icon with "MicroClean" branding
- Button: "Iniciar Conversación"

### 5. Footer Link
- Quick contact in footer
- Icon + text combination

## Contact Form Integration

### Form to WhatsApp (main.js:294-354)
Converts contact form submissions to WhatsApp messages:

```javascript
// Form data is formatted as:
let msg = `Hola MicroClean, quiero una cotizacion.\n\n`;
msg += `Nombre: ${formData.get('name')}\n`;
msg += `Telefono: ${formData.get('phone')}\n`;
msg += `Servicio: ${services[formData.get('service')]}\n`;
msg += `Mensaje: ${formData.get('message')}\n`;

// Opens WhatsApp with pre-filled message
const url = `https://wa.me/50764177111?text=${encodeURIComponent(msg)}`;
window.open(url, '_blank');
```

## Service Types (for forms)
- `tapiceria-tela` → "Tapiceria en Tela"
- `tapiceria-cuero` → "Tapiceria en Cuero"
- `limpieza-espacios` → "Limpieza de Espacios"
- `impermeabilizacion` → "Impermeabilizacion"
- `tratamiento-enzimatico` → "Tratamiento Enzimatico"
- `otro` → "Otro Servicio"

## Styling

### WhatsApp Green
```css
--whatsapp: #25D366;
```

### Button Styles
```css
.btn-whatsapp-hero {
    background: var(--whatsapp);
    color: white;
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-full);
    transition: all 0.3s ease;
}

.btn-whatsapp-hero:hover {
    background: #1DA851; /* Darker shade */
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
```

### FAB Pulse Animation
```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.whatsapp-fab {
    animation: pulse 0.6s ease-in-out;
}
```

## Testing Checklist
- [ ] All WhatsApp links use correct phone number
- [ ] Pre-filled messages are URL encoded
- [ ] FAB visible on all pages
- [ ] Contact form creates proper message format
- [ ] Success notification appears after form submit
- [ ] WhatsApp opens in new tab (_blank)
- [ ] Mobile: WhatsApp app opens directly
- [ ] Desktop: Opens web.whatsapp.com

## Best Practices
- Always include meaningful pre-filled text
- Test on both mobile and desktop
- Ensure phone number includes country code (+507)
- Use `rel="noopener noreferrer"` for security

---
*MicroClean WhatsApp Integration Management*