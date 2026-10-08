# 🛍️ TOP MODA | Catálogo Brás

PWA ultra-optimizada para conversión móvil directa a WhatsApp para clientes mayoristas y minoristas en el Brás, São Paulo.

---

## 📁 Estructura del Proyecto

```text
/
├── index.html           # Interfaz principal y configuración Open Graph
├── style.css            # Estilos móviles, diseño responsivo y tema oscuro/dorado
├── app.js               # Orquestación de la UI, estado de horario comercial y modales
├── sw.js                # Service Worker PWA (almacenamiento en caché y modo offline)
├── produtos.json        # Fuente de verdad desacoplada del catálogo
├── README.md            # Este documento
│
├── fotos/               # Activos multimedia optimizados (.webp y .mp4)
│   ├── paris-*.webp
│   ├── venus-thumb.webp
│   ├── channel-*.webp
│   └── *.mp4
│
├── fonts/               # Tipografías locales optimizadas en formato WOFF2
│
└── docs/                # Documentación técnica y operativa
    ├── ARQUITECTURA.md          # Fundamentos de arquitectura y decisiones técnicas
    ├── GUIA_OPERATIVA.md        # Manual para agregar/modificar prendas y fotos
    ├── CHECKLIST_DESPLIEGUE.md  # Paso a paso para publicar en Cloudflare/Vercel
    └── adr/
        └── 001-vanilla-pwa-sobre-spa.md # Registro de decisión arquitectónica
```

---

## 🚀 Cómo levantar el proyecto en Local (< 1 minuto)

No requiere instalación de frameworks ni dependencias pesadas:

```bash
# Opción 1: Con Python (disponible por defecto en Linux/macOS)
python3 -m http.server 8080

# Opción 2: Con Node.js
npx serve .
```

Abre en tu navegador en `http://localhost:8080`.
> 💡 **Tip:** Abre las herramientas de desarrollador (`F12`) y activa el **Modo Dispositivo Móvil (iPhone/Pixel)**, ya que la experiencia está 100% calibrada para pantallas táctiles.

---

## 📚 Documentación Detallada

* **[Guía de Arquitectura](docs/ARQUITECTURA.md):** Conoce a fondo cómo funciona el sistema, por qué no usamos frameworks pesados y cómo se optimizó para conexiones móviles del Brás.
* **[Guía Operativa del Catálogo](docs/GUIA_OPERATIVA.md):** Manual paso a paso para agregar prendas a `produtos.json`, comprimir videos y convertir fotos a WebP.
* **[Checklist de Despliegue (Go-Live)](docs/CHECKLIST_DESPLIEGUE.md):** Instrucciones directas para publicar el sitio gratis en Cloudflare Pages o Vercel cuando decidas lanzarlo.
* **[ADR 001](docs/adr/001-vanilla-pwa-sobre-spa.md):** Registro formal de la decisión arquitectónica (Vanilla PWA vs React).

---

## 📍 Puntos Físicos (São Paulo - Brás)
* **Rua Hannemann, 415** (Frente a Page Brás)
* **Rua Alexandrinho Pedroso, 412** (Frente a New Bancas)
* **Rua Tiers, 461** (Frente a McDonald's)

## 💬 WhatsApp Comercial
* **Número:** `+55 11 99400-4379`
