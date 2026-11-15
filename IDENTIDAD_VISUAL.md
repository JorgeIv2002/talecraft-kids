# IDENTIDAD VISUAL: TaleCraft Kids
**Dirección de Arte:** Brand Director  
**Fecha:** 2026-11-15  
**Estilo:** Cálido Orgánico & Storybook Moderno (Inspirado en la literatura infantil europea y animación de Studio Ghibli)

---

## 1. Principios Anti-Cliché (Diseño Infantil Respetuoso)
- **Cero Estridencia Visual:** Prohibidos los colores neón chillones, luces psicodélicas y degradados artificiales morado/azul que saturan a los niños y agotan la vista de los padres.
- **Textura de Cuento Físico:** El fondo general evoca el tacto de una página de libro ilustrado en tono marfil suave `#FDFBF7`.
- **Sensación Táctil Móvil:** Botones redondeados con micro-elevación suave (`rounded-2xl` y `rounded-3xl`), tarjetas con bordes finos color avena (`#EFE9DF`) y sombras suaves multicapa.

---

## 2. Paleta Cromática Oficial (Tokens HEX)

| Rol de Color | Nombre | Código HEX | Uso en UI |
| :--- | :--- | :--- | :--- |
| **Canvas Principal** | Warm Bookpage | `#FDFBF7` | Fondo de la aplicación y páginas de lectura |
| **Superficie Card** | Cloud White | `#FFFFFF` | Tarjetas de cuentos, modales y opciones |
| **Tinta Principal** | Forest Charcoal | `#1F2421` | Texto principal, títulos y botones primarios |
| **Tinta Secundaria** | Soft Umber | `#635F59` | Subtítulos, autor del cuento y metadatos |
| **Color Primario** | Storybook Coral | `#D9532F` | Botón de acción principal, decisiones destacadas |
| **Color Acento Mágico**| Forest Mint | `#3A7D6B` | Insignias de valores (Valentía, Amistad) y modo noche |
| **Acento de Recompensa**| Firefly Amber | `#E5A93C` | Estrellas mágicas, marcadores de páginas y logros |
| **Borde Suave** | Oat Cream | `#EFE9DF` | Delimitación sutil y estética de 1px |

---

## 3. Tipografía con Personalidad
- **Títulos y Portadas:** `Plus Jakarta Sans` / `Outfit`, pesos bold y extra-bold (`font-bold`, `tracking-tight`), amigable y con curvas suaves pero moderna y nítida.
- **Lectura de Cuentos:** `Inter`, optimizada con interlineado generoso (`leading-relaxed` / `leading-loose`) y tamaño legible para lectura nocturna (`text-base` y `text-lg`).
- **Páginas y Decisión:** `Plus Jakarta Sans` medium con bordes suaves.

---

## 4. Reglas de Composición Móvil Android
1. **Viewport Mobile-First:** Diseñado específicamente como aplicación móvil con layout centrado, barra de estado superior estilo Android y barra de navegación inferior con accesos rápidos (Descubrir, Mis Cuentos, Crear, Modo Noche).
2. **Selector de Decisiones en 2 Opciones:** Cada bifurcación de la historia presenta máximo 2 opciones grandes y táctiles para que el niño pueda pulsar fácilmente con el pulgar.
3. **Modo Noche Cálido (Bedtime Mode):** Un conmutador rápido transforma la paleta a tonos azul noche profundo (`#121824`) con luz cálida ámbar para favorecer el sueño.
4. **Cumplimiento Técnico:** En el `layout.tsx` raíz se debe incluir siempre `suppressHydrationWarning` en `<html>` y `<body>`.
