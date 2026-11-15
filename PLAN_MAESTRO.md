# PLAN MAESTRO: TaleCraft Kids

**Proyecto:** TaleCraft Kids — Aplicación móvil Android / Web interactiva de cuentos "Elige tu propia aventura" donde el niño es el protagonista y aprende valores positivos.  
**Tech Stack:** Next.js (App Router, Mobile-First PWA), TypeScript, Tailwind CSS, Lucide React, Supabase PostgreSQL.  
**Fecha:** 2026-11-15  
**Estado:** Etapa 5 Completada (Listo para Lanzamiento en Producción)

---

## 1. Visión del Producto y MVP
- **Objetivo:** Transformar la hora de dormir o los momentos de lectura en una experiencia inmersiva y educativa, donde padres e hijos crean y deciden el rumbo del cuento en capítulos interactivos con elecciones morales ("Elige tu camino").
- **Público Objetivo:** Niños de 4 a 10 años junto a sus padres o educadores, buscando entretenimiento sano sin anuncios ni estímulos sobrecargados.
- **Monetización:** Freemium (2 cuentos completos gratis al mes) + Membresía Familiar "Club de Cuentos Mágicos" ($6.99/mes o $49/año) con biblioteca ilimitada, personalización de nombre/mascota del niño, narración con audio y modo noche relajante.

---

## 2. Checklist de Ejecución Paso a Paso

### Etapa 2: Estrategia y Dirección de Arte
- [x] Definición de MVP móvil y arquitectura técnica (`PLAN_MAESTRO.md`)
- [x] Creación de manual estético infantil anti-cliché (`IDENTIDAD_VISUAL.md`)
- [x] Generación del borrador / prototipo interactivo en vista móvil Android
- [x] Visto bueno del CEO / Usuario

### Etapa 3: Construcción Visual Artesanal
- [x] Inicialización del proyecto Next.js + Tailwind CSS + Lucide Icons
- [x] Configuración del contenedor móvil Android responsivo (look & feel nativo de aplicación móvil)
- [x] Barra superior con selector de perfil infantil (Avatar, nombre del niño y estrellas mágicas)
- [x] Explorador de Cuentos con categorías de valores (Valentía, Trabajo en Equipo, Amabilidad, Curiosidad)
- [x] Motor de Cuentos Interactivo "Elige tu Aventura":
  - [x] Vista de lectura con tipografía optimizada y modo noche conmutador
  - [x] Tarjetas de decisión interactiva con micro-animaciones
  - [x] Indicador de página / progreso del capítulo
- [x] Modal de Personalización rápida (Ingresar nombre del niño, mascota y avatar)
- [x] Pantalla de suscripción familiar con botón de prueba gratuita

### Etapa 4: Ingeniería y Base de Datos
- [x] Gestión de estado local (Historial de decisiones tomadas, cuentos favoritos, progreso)
- [x] Validación de formularios de personalización y suscripción
- [x] Creación de `supabase_schema.sql` (tablas: `child_profiles`, `stories`, `story_nodes`, `choices`, `reading_logs`)
- [x] Creación de `.env.example` y configuración de cliente modular

### Etapa 5: Control de Calidad, Despliegue y Marketing
- [x] Verificación de compilación limpia (`npm run build`) en terminal y corrección autónoma de errores
- [x] Configuración PWA / manifiesto móvil (`manifest.json`, iconos y metadatos Android)
- [x] Metadatos SEO en `layout.tsx`, `robots.ts` y `sitemap.ts`
- [x] Generación de kit de marketing en `/marketing/REDES_SOCIALES.md` y `/marketing/ANUNCIOS.md`
- [x] Inicialización y commit en repositorio Git local
- [x] Entrega del Reporte Final de Lanzamiento

### Etapa 6: Expansión, Distribución y Retención V2
- [x] Guiones virales verticales (9:16) y prompts para TikTok/Reels/Shorts (`/marketing/videos/GUIONES_Y_PROMPTS.md`)
- [x] Guía de registro en directorios con copy optimizado (`/marketing/automatizacion/DIRECTORIOS_LANZAMIENTO.md`)
- [x] Script automatizado de distribución por Webhooks (`/marketing/automatizacion/webhook-publicador.js`)
- [x] Auditoría de producto, retención parental y plan de escalabilidad (`ROADMAP_V2.md`)
