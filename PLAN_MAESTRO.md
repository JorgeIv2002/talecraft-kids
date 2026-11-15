# PLAN MAESTRO: TaleCraft Kids

**Proyecto:** TaleCraft Kids — Aplicación móvil Android / Web interactiva de cuentos "Elige tu propia aventura" donde el niño es el protagonista y aprende valores positivos.  
**Tech Stack:** Next.js (App Router, Mobile-First PWA), TypeScript, Tailwind CSS, Lucide React, Supabase PostgreSQL.  
**Fecha:** 2026-11-15  
**Estado:** Etapa 2 (Aprobación de Arquitectura e Identidad Visual)

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
- [ ] Visto bueno del CEO / Usuario

### Etapa 3: Construcción Visual Artesanal
- [ ] Inicialización del proyecto Next.js + Tailwind CSS + Lucide Icons
- [ ] Configuración del contenedor móvil Android responsivo (look & feel nativo de aplicación móvil)
- [ ] Barra superior con selector de perfil infantil (Avatar, nombre del niño y estrellas mágicas)
- [ ] Explorador de Cuentos con categorías de valores (Valentía, Trabajo en Equipo, Amabilidad, Curiosidad)
- [ ] Motor de Cuentos Interactivo "Elige tu Aventura":
  - Vista de lectura con tipografía optimizada y modo noche conmutador
  - Tarjetas de decisión interactiva con micro-animaciones
  - Indicador de página / progreso del capítulo
- [ ] Modal de Personalización rápida (Ingresar nombre del niño, mascota y avatar)
- [ ] Pantalla de suscripción familiar con botón de prueba gratuita

### Etapa 4: Ingeniería y Base de Datos
- [ ] Gestión de estado local (Historial de decisiones tomadas, cuentos favoritos, progreso)
- [ ] Validación de formularios de personalización y suscripción
- [ ] Creación de `supabase_schema.sql` (tablas: `child_profiles`, `stories`, `story_nodes`, `choices`, `reading_logs`)
- [ ] Creación de `.env.example` y configuración de cliente modular

### Etapa 5: Control de Calidad, Despliegue y Marketing
- [ ] Verificación de compilación limpia (`npm run build`) en terminal y corrección autónoma de errores
- [ ] Configuración PWA / manifiesto móvil (`manifest.json`, iconos y metadatos Android)
- [ ] Metadatos SEO en `layout.tsx`, `robots.ts` y `sitemap.ts`
- [ ] Generación de kit de marketing en `/marketing/REDES_SOCIALES.md` y `/marketing/ANUNCIOS.md`
- [ ] Inicialización y commit en repositorio Git local
- [ ] Entrega del Reporte Final de Lanzamiento
