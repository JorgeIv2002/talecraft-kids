import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TikTokPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transiciones fluidas entre escenas
  const scene1Progress = interpolate(frame, [0, 20, 95, 115], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene2Progress = interpolate(frame, [110, 125, 215, 230], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene3Progress = interpolate(frame, [225, 240, 330, 345], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene4Progress = interpolate(frame, [340, 355], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dinámica física del teléfono (respiración suave y rotación sutil)
  const phoneFloat = Math.sin(frame / 20) * 8;
  const phoneTilt = Math.sin(frame / 35) * 1.5;

  // Animación de pulso táctil para la decisión en Escena 2
  const tapScale = interpolate(frame, [160, 168, 178], [1, 0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tapRipple = interpolate(frame, [168, 195], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animación del temporizador de cuna en Escena 3
  const timerSeconds = Math.max(0, 15 - Math.floor((frame - 230) / 7));
  const timerCircleOffset = interpolate(frame, [230, 330], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Luciérnagas flotantes (partículas orgánicas cálidas con desenfoque)
  const fireflies = [
    { x: 120, y: 340, size: 8, delay: 0 },
    { x: 920, y: 480, size: 12, delay: 10 },
    { x: 220, y: 980, size: 10, delay: 25 },
    { x: 860, y: 1180, size: 14, delay: 15 },
    { x: 140, y: 1540, size: 9, delay: 35 },
    { x: 940, y: 1680, size: 11, delay: 5 },
    { x: 520, y: 220, size: 7, delay: 20 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0C101A",
        fontFamily:
          "'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#FDFBF7",
        overflow: "hidden",
      }}
    >
      {/* ========================================================= */}
      {/* FONDO AMBIENTAL: LUZ DE HABITACIÓN CÁLIDA & BOSQUE NOCTURNO */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 25%, #1A243B 0%, #0C101A 75%)",
        }}
      />

      {/* Aura cálida ámbar detrás del teléfono */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(229, 169, 60, 0.18) 0%, rgba(217, 83, 47, 0.08) 45%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Luciérnagas / Estrellas cálidas orgánicas */}
      {fireflies.map((ff, i) => {
        const floatY = Math.sin((frame + ff.delay * 5) / 18) * 16;
        const floatX = Math.cos((frame + ff.delay * 5) / 22) * 12;
        const glow = 0.5 + Math.sin((frame + ff.delay * 7) / 14) * 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ff.x + floatX,
              top: ff.y + floatY,
              width: ff.size,
              height: ff.size,
              borderRadius: "50%",
              backgroundColor: "#FCE588",
              boxShadow: `0 0 ${ff.size * 2}px ${ff.size}px rgba(245, 180, 50, ${
                glow * 0.8
              })`,
              opacity: glow,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* ========================================================= */}
      {/* CABECERA DINÁMICA SUPERIOR (TEXTO GANCHO PARA PADRES)     */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          top: "90px",
          left: "60px",
          right: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 40,
        }}
      >
        {/* Badge superior de confianza */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 24px",
            borderRadius: "50px",
            backgroundColor: "rgba(229, 169, 60, 0.15)",
            border: "1.5px solid rgba(229, 169, 60, 0.4)",
            color: "#FAD873",
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          <span>🧸 Cuentos de Cuna Personalizados</span>
        </div>

        {/* Textos cambiantes según la escena */}
        {frame < 120 && (
          <div style={{ opacity: scene1Progress }}>
            <h1
              style={{
                fontSize: "58px",
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-1px",
              }}
            >
              ¿La hora de dormir es <br />
              <span style={{ color: "#FF7B54" }}>una batalla diaria?</span> 🌙
            </h1>
            <p
              style={{
                fontSize: "26px",
                color: "#CBD5E1",
                marginTop: "12px",
                fontWeight: 500,
              }}
            >
              Cambia pantallas ruidosas por cuentos que los calman.
            </p>
          </div>
        )}

        {frame >= 115 && frame < 235 && (
          <div style={{ opacity: scene2Progress }}>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-1px",
              }}
            >
              Ellos eligen el camino y <br />
              <span style={{ color: "#38D39F" }}>aprenden valores reales</span> ✨
            </h1>
            <p
              style={{
                fontSize: "26px",
                color: "#CBD5E1",
                marginTop: "12px",
                fontWeight: 500,
              }}
            >
              Decisiones formativas: Paciencia, empatía y valentía.
            </p>
          </div>
        )}

        {frame >= 230 && frame < 345 && (
          <div style={{ opacity: scene3Progress }}>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-1px",
              }}
            >
              Modo Cuna con Temporizador <br />
              <span style={{ color: "#818CF8" }}>Se apaga cuando se duermen</span> ⏳
            </h1>
            <p
              style={{
                fontSize: "26px",
                color: "#CBD5E1",
                marginTop: "12px",
                fontWeight: 500,
              }}
            >
              Voces cariñosas de cuentacuentos y luz tenue relajante.
            </p>
          </div>
        )}

        {frame >= 340 && (
          <div style={{ opacity: scene4Progress }}>
            <h1
              style={{
                fontSize: "60px",
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-1px",
                color: "#FF8A65",
              }}
            >
              TaleCraft Kids 🌟
            </h1>
            <p
              style={{
                fontSize: "28px",
                color: "#E2E8F0",
                marginTop: "10px",
                fontWeight: 600,
              }}
            >
              La app que convierte la noche en un momento mágico.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TELÉFONO SMARTPHONE ARTESANAL Y REALISTA (MOCKUP EN VIVO)  */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          top: "420px",
          left: "50%",
          width: "580px",
          height: "980px",
          transform: `translateX(-50%) translateY(${phoneFloat}px) rotate(${phoneTilt}deg)`,
          borderRadius: "54px",
          border: "8px solid #283046",
          backgroundColor: "#161D2E",
          boxShadow:
            "0 35px 80px -15px rgba(0,0,0,0.8), 0 0 50px rgba(229,169,60,0.12), inset 0 0 4px rgba(255,255,255,0.2)",
          overflow: "hidden",
          zIndex: 30,
        }}
      >
        {/* Altavoz / Isla superior */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "140px",
            height: "22px",
            backgroundColor: "#0D111A",
            borderRadius: "16px",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#1F293D",
              marginRight: "8px",
            }}
          />
          <div
            style={{
              width: "48px",
              height: "4px",
              borderRadius: "4px",
              backgroundColor: "#1F293D",
            }}
          />
        </div>

        {/* Barra de estado móvil (Android / iOS) */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "28px",
            right: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 700,
            color: frame >= 225 ? "#CBD5E1" : "#4B5563",
            zIndex: 55,
          }}
        >
          <span>20:45</span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span>📶</span>
            <span>🔋 94%</span>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* PANTALLA INTERNA 1: PORTADA LIBRO DE CUENTO (0 - 115)     */}
        {/* --------------------------------------------------------- */}
        {frame < 120 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#FDFBF7",
              color: "#1F2421",
              padding: "48px 28px 24px",
              display: "flex",
              flexDirection: "column",
              opacity: scene1Progress,
            }}
          >
            {/* Header de la app */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "16px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "28px" }}>🦉</span>
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "#1F2421",
                      lineHeight: 1,
                    }}
                  >
                    TaleCraft Kids
                  </div>
                  <div style={{ fontSize: "12px", color: "#635F59" }}>
                    Para Leo (5 años) ⭐ 24
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  backgroundColor: "#EFE9DF",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#3A7D6B",
                }}
              >
                ES | EN
              </div>
            </div>

            {/* Ilustración de cuento física en portada (Estilo Ghibli / Storybook) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "500px",
                borderRadius: "32px",
                overflow: "hidden",
                boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
                backgroundColor: "#16233B",
              }}
            >
              {/* Cielo nocturno con luna suave */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 520 500"
                style={{ position: "absolute", inset: 0 }}
              >
                <defs>
                  <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B2A4A" />
                    <stop offset="100%" stopColor="#0E1626" />
                  </linearGradient>
                  <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#FFB300" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Fondo cielo */}
                <rect width="520" height="500" fill="url(#nightSky)" />

                {/* Luna llena suave */}
                <circle cx="430" cy="90" r="45" fill="#FFF8E1" opacity="0.9" />
                <circle cx="415" cy="85" r="35" fill="#FFE082" opacity="0.4" />

                {/* Estrellitas en el cielo */}
                <circle cx="80" cy="70" r="3" fill="#FFFFFF" opacity="0.8" />
                <circle cx="160" cy="110" r="2.5" fill="#FFFFFF" opacity="0.7" />
                <circle cx="280" cy="60" r="3.5" fill="#FFFFFF" opacity="0.9" />
                <circle cx="340" cy="130" r="2" fill="#FFFFFF" opacity="0.6" />

                {/* Colinas de bosque */}
                <path
                  d="M0 430 Q 140 370 280 410 T 520 390 L 520 500 L 0 500 Z"
                  fill="#0B1320"
                />
                <path
                  d="M0 450 Q 180 410 360 440 T 520 420 L 520 500 L 0 500 Z"
                  fill="#070C15"
                />

                {/* Árboles de pino */}
                <polygon points="60,430 40,490 80,490" fill="#0E1A2D" />
                <polygon points="100,410 75,485 125,485" fill="#11213A" />
                <polygon points="450,400 420,490 480,490" fill="#0E1A2D" />

                {/* Halo de luz de linterna mágica */}
                <circle cx="260" cy="310" r="140" fill="url(#lanternGlow)" />

                {/* Búho tierno Barnaby */}
                {/* Cuerpo */}
                <ellipse cx="260" cy="270" rx="60" ry="75" fill="#D97706" />
                {/* Pecho suave */}
                <ellipse cx="260" cy="285" rx="42" ry="50" fill="#FEF3C7" />
                {/* Ojos grandes y tiernos */}
                <circle cx="238" cy="240" r="22" fill="#FFFFFF" />
                <circle cx="282" cy="240" r="22" fill="#FFFFFF" />
                <circle cx="240" cy="240" r="12" fill="#1F2937" />
                <circle cx="280" cy="240" r="12" fill="#1F2937" />
                <circle cx="244" cy="236" r="4" fill="#FFFFFF" />
                <circle cx="284" cy="236" r="4" fill="#FFFFFF" />
                {/* Pico */}
                <polygon points="260,250 252,264 268,264" fill="#F59E0B" />
                {/* Alas */}
                <ellipse cx="205" cy="285" rx="16" ry="45" fill="#B45309" />
                <ellipse cx="315" cy="285" rx="16" ry="45" fill="#B45309" />

                {/* Linterna colgando del ala */}
                <rect x="316" y="295" width="28" height="42" rx="6" fill="#F59E0B" />
                <rect x="320" y="300" width="20" height="32" rx="4" fill="#FFFBEB" />
              </svg>

              {/* Título flotante sobre portada */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                  borderRadius: "20px",
                  padding: "16px 20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#D9532F",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  ⭐ Historia Interactiva
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#1F2421",
                    lineHeight: 1.2,
                  }}
                >
                  El Búho y la Linterna Mágica
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#3A7D6B",
                    fontWeight: 700,
                    marginTop: "4px",
                  }}
                >
                  Valores: Amistad, Paciencia y Cuidado
                </div>
              </div>
            </div>

            {/* Botón de acción en la app */}
            <div
              style={{
                marginTop: "24px",
                padding: "18px 24px",
                borderRadius: "24px",
                backgroundColor: "#D9532F",
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 900,
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(217, 83, 47, 0.35)",
              }}
            >
              Comenzar Aventura Nocturna →
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* PANTALLA INTERNA 2: DECISIÓN MORAL INTERACTIVA (110 - 230) */}
        {/* --------------------------------------------------------- */}
        {frame >= 110 && frame < 235 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#FDFBF7",
              color: "#1F2421",
              padding: "48px 28px 24px",
              display: "flex",
              flexDirection: "column",
              opacity: scene2Progress,
            }}
          >
            {/* Cabecera del capítulo */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#635F59" }}>
                Capítulo 2 de 4
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#D9532F",
                  backgroundColor: "#FCEEEA",
                  padding: "4px 12px",
                  borderRadius: "12px",
                }}
              >
                Pausa de Decisión
              </span>
            </div>

            {/* Párrafo del cuento físico */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                padding: "24px",
                border: "1.5px solid #EFE9DF",
                boxShadow: "0 10px 24px rgba(0,0,0,0.04)",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "28px" }}>🦉</span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#1F2421",
                  }}
                >
                  Barnaby se detiene...
                </span>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.5,
                  color: "#374151",
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                "El sendero del bosque se divide en dos. Hacia el arroyo se escucha a un pequeño erizo que necesita ayuda para encontrar su casa..."
              </p>
            </div>

            <div
              style={{
                fontSize: "15px",
                fontWeight: 900,
                color: "#1F2421",
                marginBottom: "14px",
              }}
            >
              ¿Qué decides que haga Leo? 👇
            </div>

            {/* OPCIÓN A (Pulsada por el dedo con efecto ripple) */}
            <div
              style={{
                position: "relative",
                padding: "18px 20px",
                borderRadius: "22px",
                backgroundColor: frame >= 168 ? "#3A7D6B" : "#FFFFFF",
                color: frame >= 168 ? "#FFFFFF" : "#1F2421",
                border: `2px solid ${frame >= 168 ? "#3A7D6B" : "#D1D5DB"}`,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                marginBottom: "14px",
                transform: `scale(${frame >= 160 && frame < 185 ? tapScale : 1})`,
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800 }}>
                    1. Ayudar al erizo con la linterna 🔦
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      opacity: 0.85,
                      marginTop: "4px",
                    }}
                  >
                    Valor: Solidaridad y Amabilidad
                  </div>
                </div>
                <span style={{ fontSize: "20px" }}>
                  {frame >= 168 ? "✅" : "👉"}
                </span>
              </div>

              {/* Efecto Ripple táctil */}
              {frame >= 168 && frame < 195 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "30px",
                    transform: "translate(50%, -50%)",
                    width: `${tapRipple * 140}px`,
                    height: `${tapRipple * 140}px`,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    opacity: 1 - tapRipple,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* OPCIÓN B */}
            <div
              style={{
                padding: "18px 20px",
                borderRadius: "22px",
                backgroundColor: "#FFFFFF",
                color: "#6B7280",
                border: "2px solid #E5E7EB",
                marginBottom: "20px",
                opacity: 0.7,
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: 800 }}>
                2. Seguir derecho hacia la colina 🌲
              </div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                Ruta rápida de aventura
              </div>
            </div>

            {/* Recompensa de decisión moral */}
            {frame >= 172 && (
              <div
                style={{
                  padding: "14px 20px",
                  borderRadius: "20px",
                  backgroundColor: "#FEF3C7",
                  border: "2px solid #F59E0B",
                  color: "#92400E",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                  fontWeight: 900,
                  animation: "bounce 0.5s ease",
                }}
              >
                <span style={{ fontSize: "24px" }}>⭐</span>
                <span>¡Decisión valiosa! +3 Estrellas ganadas</span>
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* PANTALLA INTERNA 3: MODO NOCHE & TEMPORIZADOR (225 - 345)  */}
        {/* --------------------------------------------------------- */}
        {frame >= 225 && frame < 345 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#111827",
              color: "#F9FAFB",
              padding: "48px 28px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              opacity: scene3Progress,
            }}
          >
            {/* Indicador de Modo Cuna activo */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "20px",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                border: "1px solid #6366F1",
                color: "#A5B4FC",
                fontSize: "13px",
                fontWeight: 800,
                marginTop: "16px",
                marginBottom: "24px",
              }}
            >
              <span>🌙 Modo Noche Cálido Activado</span>
            </div>

            {/* Círculo del temporizador de cuna */}
            <div
              style={{
                position: "relative",
                width: "220px",
                height: "220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
              }}
            >
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotate(-90deg)",
                }}
              >
                <circle
                  cx="110"
                  cy="110"
                  r="95"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="12"
                />
                <circle
                  cx="110"
                  cy="110"
                  r="95"
                  fill="none"
                  stroke="#E5A93C"
                  strokeWidth="12"
                  strokeDasharray="597"
                  strokeDashoffset={timerCircleOffset}
                  strokeLinecap="round"
                />
              </svg>

              <span style={{ fontSize: "40px" }}>🌙</span>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#FDFBF7",
                  marginTop: "4px",
                }}
              >
                14:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
              </div>
              <span
                style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Apagado Automático
              </span>
            </div>

            {/* Onda sonora del reproductor de audio dulce */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#1F293D",
                borderRadius: "24px",
                padding: "20px",
                marginBottom: "20px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#E5A93C",
                    }}
                  >
                    🎙️ Narrado por Tía Salomé
                  </div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                    Voz dulce · Música suave de fondo
                  </div>
                </div>
                <span style={{ fontSize: "24px" }}>🎵</span>
              </div>

              {/* Barras de audio animadas */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  height: "36px",
                }}
              >
                {[12, 28, 18, 34, 22, 16, 30, 24, 36, 20, 14, 26, 32, 18].map(
                  (baseHeight, idx) => {
                    const waveHeight =
                      baseHeight + Math.sin((frame + idx * 8) / 6) * 10;
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: `${Math.max(6, waveHeight)}px`,
                          backgroundColor: "#6366F1",
                          borderRadius: "4px",
                        }}
                      />
                    );
                  }
                )}
              </div>
            </div>

            {/* Mensaje de tranquilidad para los padres */}
            <div
              style={{
                fontSize: "13px",
                color: "#A5B4FC",
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              ✨ El audio desvanece suavemente cuando tu peque concilia el sueño.
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* PANTALLA INTERNA 4: LOGRO & DESCARGA (340 - 450)          */}
        {/* --------------------------------------------------------- */}
        {frame >= 340 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#FDFBF7",
              color: "#1F2421",
              padding: "48px 24px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              opacity: scene4Progress,
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "30px",
                backgroundColor: "#FEF3C7",
                border: "3px solid #F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                marginTop: "16px",
                marginBottom: "16px",
                boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
              }}
            >
              🏆
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: 900,
                color: "#1F2421",
                lineHeight: 1.2,
                marginBottom: "6px",
              }}
            >
              ¡Racha de 7 Noches!
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#635F59",
                marginBottom: "20px",
              }}
            >
              Leo desbloqueó el Sombrero Mágico ⭐
            </div>

            {/* Tarjeta de descarga web / android */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                padding: "20px",
                border: "1.5px solid #EFE9DF",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#3A7D6B",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Disponible Gratis
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#D9532F",
                  marginBottom: "12px",
                }}
              >
                talecraft-kids.vercel.app
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    padding: "8px 14px",
                    borderRadius: "14px",
                    backgroundColor: "#111827",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  🌐 Navegador Web
                </div>
                <div
                  style={{
                    padding: "8px 14px",
                    borderRadius: "14px",
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  🤖 APK Android
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#6B7280",
                fontWeight: 600,
              }}
            >
              100% Sin Anuncios · Seguro para Niños
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* BOTONES / LLAMADO A LA ACCIÓN INFERIOR EXTERNO AL TELÉFONO */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: "70px",
          left: "60px",
          right: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            width: "100%",
            maxWidth: "840px",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "24px 20px",
              borderRadius: "32px",
              backgroundColor: "#D9532F",
              color: "#FFFFFF",
              fontSize: "26px",
              fontWeight: 900,
              textAlign: "center",
              boxShadow: "0 15px 35px rgba(217, 83, 47, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <span>🌐 talecraft-kids.vercel.app</span>
          </div>

          <div
            style={{
              padding: "24px 32px",
              borderRadius: "32px",
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              fontSize: "26px",
              fontWeight: 900,
              textAlign: "center",
              boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>🤖 Descargar APK</span>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "22px",
            color: "#94A3B8",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          Cero anuncios molestos · Bilingüe (Español / English)
        </div>
      </div>
    </AbsoluteFill>
  );
};
