# SEO Optimization

## Purpose
Improve search engine visibility and ranking for MicroClean website

## When to Use
- Updating meta tags and descriptions
- Adding structured data
- Optimizing page speed
- Improving content for search engines

## Meta Tags Structure

### Homepage (index.html)
```html
<title>MicroClean - Limpieza Profesional en Panamá | Sofás, Colchones y Más</title>
<meta name="description" content="Servicios profesionales de limpieza...">
<meta name="keywords" content="limpieza sofás panamá, limpieza colchones...">
```

### Cotizador Page
```html
<title>Cotizador Online - MicroClean | Calcula tu Presupuesto</title>
<meta name="description" content="Cotizador interactivo de servicios...">
```

## Structured Data

### Local Business Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MicroClean",
  "telephone": "+507-6417-7111",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PA"
  }
}
```

### Service Schema
```json
{
  "@type": "Service",
  "serviceType": "Limpieza de Tapicería",
  "provider": {
    "@type": "LocalBusiness",
    "name": "MicroClean"
  }
}
```

## Image Optimization

### Alt Text Guidelines
```html
<!-- Good: Descriptive and keyword-rich -->
<img alt="Limpieza profesional de sofá gris en Panamá">

<!-- Bad: Generic or missing -->
<img alt="imagen1">
```

### Image File Names
- ✅ `limpieza-sofa-panama.jpg`
- ❌ `IMG_20240101.jpg`

## Content Optimization

### Heading Hierarchy
```html
<h1>MicroClean - Limpieza Profesional</h1>
  <h2>Nuestros Servicios</h2>
    <h3>Limpieza de Sofás</h3>
    <h3>Limpieza de Colchones</h3>
  <h2>Galería</h2>
```

### Keyword Placement
- Title tag (most important)
- H1 heading
- First paragraph
- Image alt text
- URL structure

## Technical SEO

### Sitemap (sitemap.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://microcleanpa.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Robots.txt
```
User-agent: *
Allow: /
Sitemap: https://microcleanpa.com/sitemap.xml
```

## Page Speed Optimization
1. **Compress images:** WebP format, <100KB
2. **Minify CSS/JS:** Remove whitespace
3. **Enable caching:** Via _headers file
4. **Lazy load:** Images below fold
5. **Critical CSS:** Inline above-fold styles

## Local SEO
- Google My Business listing
- Local keywords: "Panamá", "Ciudad de Panamá"
- Local phone number: +507
- Spanish language targeting

## Monitoring Tools
- Google Search Console
- Google Analytics
- PageSpeed Insights
- GTmetrix

## Checklist
- [ ] Unique title tags (<60 chars)
- [ ] Meta descriptions (<160 chars)
- [ ] Canonical URLs set
- [ ] Schema markup implemented
- [ ] Sitemap submitted
- [ ] Images optimized
- [ ] Mobile-friendly
- [ ] HTTPS enabled
- [ ] Fast loading (<3s)