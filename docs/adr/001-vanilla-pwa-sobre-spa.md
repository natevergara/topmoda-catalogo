# ADR 001: Arquitectura Vanilla PWA sobre Frameworks SPA / SSR

**Fecha:** 2024-10-08  
**Estado:** Aceptado  
**Decisores:** Principal Architect & Technical Lead  

---

## Contexto del Problema
TOP MODA opera en el circuito comercial del Brás (São Paulo), donde los clientes potenciales acceden a la aplicación en movimiento desde conexiones de telefonía celular frecuentemente saturadas (3G y 4G inestable) o dispositivos móviles con recursos limitados.

El objetivo principal de la aplicación es convertir visitas procedentes de Instagram y códigos QR físicos en conversaciones de venta directa por WhatsApp en menos de 3 segundos desde el primer clic.

Se evaluaron dos caminos arquitectónicos:
1. Construir la solución con un framework moderno tipo React / Next.js / Vue.
2. Construir la solución utilizando HTML5 nativo, CSS3, Vanilla JavaScript modular y Service Worker PWA.

---

## Decisión
Se decidió mantener y potenciar la arquitectura en **Vanilla JavaScript con PWA nativa**, prescindiendo de cualquier framework o paso de compilación pesado.

Los datos del catálogo se desacoplan en un archivo estructurado `produtos.json`, consumido asíncronamente con mecanismo de respaldo fuera de línea.

---

## Consecuencias y Análisis de Trade-offs

### Ganancias (Pros):
* **Velocidad Extrema (Performance):** El bundle de JavaScript pesa menos de 15 KB (frente a los 150 KB+ de un runtime de React). El *First Contentful Paint* (FCP) ocurre en menos de 400 milisegundos.
* **Cero Complejidad de Construcción:** No requiere Node.js, Webpack, Vite ni procesos de build para desplegar o probar en local.
* **Costo Operativo Cero:** Al tratarse de activos estáticos puros, el costo de alojamiento en redes de distribución de contenido (CDN de Cloudflare) es de \$0 USD por mes de por vida.
* **Resiliencia Fuera de Línea:** El Service Worker almacena en caché la interfaz completa y el catálogo para funcionar incluso sin señal de internet en las calles del Brás.

### Pérdidas (Contras):
* **Manipulación Manual del DOM:** No se dispone del enlace reactivo de datos bidireccional que ofrecen librerías como React o Svelte.
* **Mitigación:** Como la interfaz se limita a una vitrina de productos y un modal deslizante, la lógica del DOM se encapsuló en funciones puras y predecibles (`renderGrid`, `openModal`), eliminando la necesidad de abstracciones complejas.
