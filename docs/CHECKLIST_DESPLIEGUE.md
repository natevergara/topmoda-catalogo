# 🚀 Checklist de Despliegue (Go-Live)

Cuando decidas publicar el catálogo en Internet, sigue cualquiera de estas 2 opciones recomendadas. Ambas son **100% gratuitas (\$0 USD/mes)** y ofrecen certificados SSL (HTTPS) automáticos.

---

## Opción 1: Cloudflare Pages (La Opción #1 Recomendada)
*Ideal para Brasil porque Cloudflare cuenta con centro de datos directo en São Paulo (borde ultra-rápido).*

1. **Crear cuenta en Cloudflare:** Entra a [dash.cloudflare.com](https://dash.cloudflare.com) y crea tu cuenta gratuita.
2. **Ir a Workers & Pages:** En el menú lateral izquierdo, haz clic en **Compute (Workers) > Workers & Pages**.
3. **Subir el proyecto:**
   * Haz clic en **Create application > Pages > Upload assets**.
   * Ponle nombre al proyecto: `topmoda` (o el que prefieras).
   * Arrastra la carpeta completa del proyecto o conéctalo con tu repositorio de GitHub.
4. **Dominio instantáneo:** Obtendrás un enlace tipo `topmoda.pages.dev` listo para colocar en la biografía de Instagram o estados de WhatsApp.
5. **(Opcional) Dominio propio:** En la pestaña *Custom domains*, puedes vincular tu propio dominio `.com.br` sin costo adicional.

---

## Opción 2: Vercel

1. **Crear cuenta en Vercel:** Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. **Importar repositorio:** Haz clic en **Add New > Project** y selecciona este repositorio.
3. **Framework Preset:** Selecciona **Other** (ya que es Vanilla HTML/CSS/JS sin compilador).
4. **Deploy:** Haz clic en **Deploy**. En menos de 20 segundos tendrás tu enlace `.vercel.app`.

---

## Verificación Post-Lanzamiento

Una vez publicado el enlace en vivo:
- [ ] Abrir el enlace en el navegador móvil y comprobar que el candado HTTPS esté activo.
- [ ] Compartir el enlace en un chat de WhatsApp y confirmar que se muestre la miniatura con el logotipo dorado y el título de TOP MODA.
- [ ] Tocar el botón principal de WhatsApp y verificar que abra el chat con el mensaje prefijado.
- [ ] Abrir el modal de cada prenda y verificar la reproducción fluida de los videos y fotos.
- [ ] Copiar y pegar el enlace final en la biografía de Instagram `@topmoda.aa`.
