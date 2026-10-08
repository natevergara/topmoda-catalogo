# 🛍️ TOP MODA | Catálogo Brás

PWA ultra-optimizada para conversión móvil directa a WhatsApp para clientes mayoristas y minoristas en el Brás, São Paulo.

---

## 🚀 Cómo levantar el proyecto en Local (< 1 minuto)

No requiere instalación de frameworks ni dependencias pesadas:

```bash
# Opción 1: Con Python (disponible por defecto en la mayoría de sistemas)
python3 -m http.server 8080

# Opción 2: Con Node.js
npx serve .
```

Abre en tu navegador en `http://localhost:8080`.
> 💡 **Tip:** Abre las herramientas de desarrollador (`F12`) y activa el **Modo Dispositivo Móvil (iPhone/Pixel)**, ya que la experiencia está 100% calibrada para pantallas táctiles.

---

## 📝 Cómo agregar o editar productos del Catálogo

El catálogo está desacoplado del código en el archivo **`produtos.json`**.

Para agregar o modificar un producto, solo edita ese archivo:

```json
[
  {
    "id": 1,
    "nome": "Macaquinho Paris",
    "subtitulo": "Crepe GGT",
    "sticker": "✨ Lançamento",
    "thumb": "fotos/paris-1.webp",
    "video": "fotos/paris.mp4",
    "fotos": [
      "fotos/paris-1.webp",
      "fotos/paris-3.webp",
      "fotos/paris-2.webp"
    ]
  }
]
```

### Reglas para los medios:
1. **Fotos:** Guarda siempre en formato `.webp` en la carpeta `fotos/` (resolución recomendada: 900x1200 px, peso < 80 KB cada una).
2. **Video:** Opcional por producto (`video: "fotos/tu-video.mp4"` o déjalo en `null`/elimina la clave si no tiene video). Procura que no supere 1 MB de peso.
3. **Cupos del catálogo:** El diseño mantiene una cuadrícula limpia de mínimo 6 espacios. Si configuras menos de 6, los espacios restantes muestran "Espaço Disponível".

---

## 📍 Puntos Físicos (São Paulo - Brás)
* **Rua Hannemann, 415** (Frente a Page Brás)
* **Rua Alexandrinho Pedroso, 412** (Frente a New Bancas)
* **Rua Tiers, 461** (Frente a McDonald's)

## 💬 WhatsApp Comercial
* **Número:** `+55 11 99400-4379` (configurado en `app.js`).
