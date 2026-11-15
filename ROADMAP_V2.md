# ROADMAP V2: TaleCraft Kids

**Auditoría y Plan de Retención, Crecimiento y Monetización**  
**Versión Actual:** 1.1 (MVP Vooks-Style + Audio Narradoras de Estudio)  
**Objetivo V2:** Maximizar la retención semanal de los padres, viralidad orgánica y aumento del LTV del Pase Familiar Pro.

---

## 1. Mejoras Rápidas (Quick Wins - Implementables en < 1 hora)

1. **Temporizador de Apagado de Cuna ("Sleep Timer"):**
   - Selector en la barra de lectura con opciones (10 min, 20 min, al terminar el capítulo).
   - Atenuación progresiva del volumen hasta detenerse para que los padres dejen el móvil reproduciendo mientras el niño se duerme.
2. **Medalla de Racha de Lectura (Reading Streak):**
   - Contador de "3 días seguidos leyendo juntos" en la cabecera del perfil infantil.
   - Bonus de +10 estrellas mágicas al completar 7 noches consecutivas.
3. **Botón de Compartir Diploma Familiar:**
   - Al terminar cualquier cuento, botón para compartir un diploma ilustrado con el nombre del niño: *"¡Leo completó la aventura de La Linterna Mágica y practicó el valor de la Amistad!"*.

---

## 2. Nuevas Funcionalidades V2 (Alto Valor y Conversión Pro)

1. **Voz de Papá / Mamá (Grabador de Cuentacuentos Familiar):**
   - Permitir a los padres o abuelos grabar las frases del cuento con su propio micrófono para que sus hijos los escuchen aunque estén de viaje de trabajo o lejos de casa.
2. **Descarga Offline para Viajes y Vuelos (Modo Avión):**
   - Botón de un solo clic para precachear el audio MP3 y las escenas del cuento en el almacenamiento local del dispositivo.
3. **Colección de Sonidos Blancos para el Bazar:**
   - Ampliar la tienda de recompensas con pistas de sonido ambiente desbloqueables con estrellas (Lluvia suave en el tejado, Fuego de chimenea, Olas del mar nocturnas).
4. **Diplomas y Certificados Imprimibles en PDF:**
   - Generación de diplomas para colorear en casa con los personajes favoritos de los cuentos que el niño haya superado.

---

## 3. Optimización Técnica y Escalabilidad

1. **Pre-caching Proactivo de Capítulos en Audio:**
   - Mientras el niño lee o escucha el Capítulo 1, el Service Worker descarga silenciosamente en segundo plano el audio del Capítulo 2 para una transición con latencia 0 ms.
2. **Autenticación Biométrica / PIN Parental:**
   - Bloqueo simple para evitar que los niños pequeños abran la pasarela de compra de suscripción sin permiso de los padres.
3. **Sincronización Cloud Supabase Real-Time:**
   - Respaldo de estrellas y perfiles entre varios dispositivos de la misma familia (iPad de mamá, teléfono de papá).
