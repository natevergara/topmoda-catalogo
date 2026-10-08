# 🏛️ Arquitectura del Sistema: TOP MODA | Catálogo Brás

## 1. Visión General y Filosofía de Diseño
Este proyecto fue diseñado bajo el principio de **Product-Led Engineering (Ingeniería Guiada por Producto)** con foco absoluto en la velocidad de conversión comercial:
* **Público Objetivo:** Compradores mayoristas y minoristas que recorren las calles del Brás (São Paulo) o ingresan desde Instagram (`@topmoda.aa`).
* **Condición de Red:** Conexiones móviles 3G/4G congestionadas y dispositivos de gama media-baja.
* **Métrica Clave:** *Time to Interactive (TTI)* inferior a 500 ms y 0% de fricción para saltar a WhatsApp.

---

## 2. Decisiones Técnicas Fundamentales

### A. Cero Frameworks (Vanilla JS + CSS3 + HTML5)
* **Por qué NO React / Next.js / Vue:** Una SPA o framework SSR agregaría entre 120 KB y 400 KB de JavaScript en tiempo de ejecución solo para renderizar una vitrina interactiva. En una red congestionada de calle, ese peso se traduce en 2 a 4 segundos de pantalla en blanco y clientes perdidos.
* **Arquitectura de UI:** Manipulación directa del DOM con renderizado reactivo a partir de `produtos.json`.

### B. Desacoplamiento de Datos (`produtos.json`)
* El catálogo no está cableado en el código fuente.
* `app.js` consume `produtos.json` de manera asíncrona mediante `fetch()`.
* Si la red falla o el archivo se abre localmente sin servidor web, existe un bloque de respaldo (*offline fallback*) que asegura que el catálogo nunca quede en blanco.

### C. Estrategia PWA y Offline-First (`sw.js`)
* **Service Worker:** Implementa una estrategia de caché estricta para la interfaz, tipografías y datos del catálogo.
* **Invalidación de Caché:** Cada actualización mayor incrementa la constante `CACHE_NAME` (`topmoda-vX`), forzando a los navegadores clientes a purgar activos viejos y activar la nueva versión al instante (`skipWaiting` + `clients.claim`).
* **Aislamiento de Video:** Los archivos `.mp4` se excluyen intencionalmente de la caché del Service Worker para no saturar el almacenamiento local de los teléfonos móviles.

### D. Optimización Multimedia Agresiva
* **Imágenes:** 100% convertidas a formato `.webp` con compresión selectiva (peso promedio: 20 KB a 75 KB por imagen).
* **Videos:** Codificados en H.264 con `CRF 28`, perfil High, sin pista de audio innecesaria para el catálogo y bandera `+faststart` (los metadatos atómicos se colocan al inicio del archivo, permitiendo reproducción instantánea sin esperar a la descarga completa).

---

## 3. Mapa de Componentes y Flujo de Datos

```
[ Cliente Móvil / Instagram ]
            │
            ▼
     [ index.html ] ────► [ sw.js (PWA Cache v6) ]
            │
      [ app.js ] ◄───────► [ produtos.json ]
            │                     │
            ├──► Detección de Horario Comercial (SP)
            ├──► Generador de Enlaces Directos WhatsApp
            └──► Modal / Carrusel Multimedia
                        │
                        ▼
            [ WhatsApp de la Tienda ]
              (+55 11 99400-4379)
```
