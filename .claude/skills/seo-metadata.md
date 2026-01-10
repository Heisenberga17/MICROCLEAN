# SEO & Metadata Skill

## Description
Manage SEO optimization, meta tags, structured data, and search engine visibility for MicroClean.

## Meta Tags Template

### Primary Meta Tags
```html
<title>MicroClean - Limpieza Profesional de Tapicería en Panamá | Sofás, Colchones y Más</title>
<meta name="description" content="Servicio profesional de limpieza de tapicería en Panamá. Especialistas en sofás, colchones, sillas, alfombras y cuero.">
<meta name="keywords" content="limpieza tapicería Panamá, limpieza sofás, limpieza colchones">
```

### Open Graph (Facebook)
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://microcleanpa.com/">
<meta property="og:title" content="MicroClean - Limpieza Profesional de Tapicería en Panamá">
<meta property="og:description" content="Transformamos tus muebles con limpieza profesional.">
<meta property="og:image" content="https://microcleanpa.com/public/images/MicroClean_Main.jpg">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MicroClean - Limpieza Profesional de Tapicería en Panamá">
<meta name="twitter:image" content="https://microcleanpa.com/public/images/MicroClean_Main.jpg">
```

## Structured Data (JSON-LD)

### LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MicroClean",
  "description": "Servicio profesional de limpieza de tapicería",
  "telephone": "+507-6417-7111",
  "email": "microcleanpa@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ciudad de Panamá",
    "addressCountry": "PA"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
```

## Canonical URLs
```html
<link rel="canonical" content="https://microcleanpa.com/">
```

## Geo Tags
```html
<meta name="geo.region" content="PA-8">
<meta name="geo.placename" content="Ciudad de Panamá">
<meta name="geo.position" content="8.9824;-79.5199">
```

## Sitemap & Robots

### sitemap.xml Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://microcleanpa.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://microcleanpa.com/servicios/tapiceria.html</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://microcleanpa.com/sitemap.xml
```

## Performance Meta Tags

### Preconnect
```html
<link rel="dns-prefetch" href="https://wa.me">
<link rel="preconnect" href="https://wa.me">
```

### Preload Critical Resources
```html
<link rel="preload" href="/public/images/MicroClean_Hero.png" as="image" fetchpriority="high">
<link rel="preload" href="style.css" as="style">
```

## Keywords by Page

### Home Page
- limpieza tapicería Panamá
- limpieza sofás Panamá
- limpieza colchones
- limpieza profesional

### Tapicería Service
- limpieza tapicería en tela
- limpieza tapicería en cuero
- limpieza de alfombras
- inyección-succión

### Espacios Service
- limpieza de espacios Panamá
- limpieza residencial
- limpieza Airbnb
- limpieza corporativa

### Eventos Service
- limpieza de eventos
- limpieza de bodas
- limpieza post-evento

## Image Optimization for SEO

### Alt Text Best Practices
```html
<img src="antes_sofa.jpg" alt="Sofá antes de limpieza profesional MicroClean">
<img src="despues_sofa.jpg" alt="Sofá después de limpieza profesional MicroClean - resultado impecable">
```

### Social Share Image
- **Size**: 1200x630px
- **Format**: JPG or PNG
- **File**: `/public/images/MicroClean_Main.jpg`

## Local SEO

### Google Business Profile
- Name: MicroClean
- Category: Cleaning Service
- Location: Ciudad de Panamá
- Phone: +507 6417-7111
- Hours: Lun-Vie 8AM-6PM, Sáb 9AM-2PM

### Citation Consistency
Ensure NAP (Name, Address, Phone) is consistent across:
- Website
- Google Business
- Social media
- Directories

## Testing Checklist
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Open Graph image displays correctly
- [ ] Sitemap is accessible
- [ ] robots.txt allows crawling
- [ ] Canonical URLs are correct
- [ ] Mobile-friendly (Google Mobile-Friendly Test)
- [ ] Page speed score > 90 (PageSpeed Insights)

## Tools
- Google Search Console
- Google Rich Results Test
- Facebook Sharing Debugger
- Twitter Card Validator
- Schema.org Validator

---
*MicroClean SEO & Metadata Management*