# 📋 Guía Operativa: Cómo Administrar el Catálogo

Esta guía está pensada para que cualquier persona (desarrollador o encargado de tienda) pueda actualizar fotos, prendas y videos en menos de 5 minutos sin romper la aplicación.

---

## 1. Estructura de un Producto en `produtos.json`

Abre el archivo `produtos.json` ubicado en la raíz del proyecto. Cada prenda sigue este modelo:

```json
{
  "id": 1,
  "nome": "Nombre de la Prenda",
  "subtitulo": "Tipo de tela o modelo (Ej: Crepe GGT)",
  "sticker": "✨ Lançamento",
  "thumb": "fotos/nombre-1.webp",
  "video": "fotos/nombre.mp4",
  "fotos": [
    "fotos/nombre-1.webp",
    "fotos/nombre-2.webp"
  ]
}
```

### Opciones de configuración:
* **Producto solo con fotos:** Deja `"video": null`. El modal funcionará como galería deslizante.
* **Producto solo con video:** Deja `"fotos": []`. El modal abrirá el video en pantalla completa de inmediato.
* **Producto con video y fotos:** Incluye ambos. El video será la primera diapositiva y las fotos le seguirán.
* **Stickers recomendados:**
  * `"✨ Lançamento"`
  * `"🔥 Mais Vendido"`
  * `"✨ Novo Look"`
  * `"⚡ Últimas Peças"`

---

## 2. Preparación de Imágenes

1. **Formato:** Usa siempre formato `.webp` (evita subir `.jpg` o `.png` pesados).
2. **Dimensiones sugeridas:** Entre 800x1000 px y 1000x1200 px.
3. **Peso objetivo:** Menos de 80 KB por foto.
4. **Comando rápido para convertir imágenes a WebP:**
   ```bash
   python3 -c "from PIL import Image; im = Image.open('foto.jpg'); im.thumbnail((1000, 1000)); im.save('fotos/nueva-1.webp', 'WEBP', quality=80)"
   ```

---

## 3. Preparación de Videos

1. **Formato:** `.mp4` (H.264).
2. **Peso objetivo:** Menos de 2.5 MB (los videos de WhatsApp crudos suelen pesar más de 5 MB).
3. **Comando de optimización con FFmpeg (Fast-Start para carga instantánea):**
   ```bash
   ffmpeg -i "video_original.mp4" -an -c:v libx264 -crf 28 -preset fast -movflags +faststart "fotos/nombre.mp4"
   ```
   > 💡 **Nota:** El parámetro `-an` elimina el audio innecesario y ahorra un 20% de peso adicional.

---

## 4. Invalidar la Caché del Navegador

Cuando hagas cambios en fotos o en `produtos.json`, abre `sw.js` e incrementa el número de versión:
```javascript
// Si estaba en topmoda-v6, cámbialo a topmoda-v7
const CACHE_NAME = 'topmoda-v7';
```
Esto asegura que los celulares de tus clientes descarguen el nuevo catálogo de inmediato en lugar de mostrar la versión anterior en memoria.
