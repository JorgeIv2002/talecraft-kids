import React from "react";

// ============================================================================
// COMPONENTE BASE: CELULAR MÓVIL EN PERSPECTIVA PARA SLIDES
// ============================================================================
interface PhoneMockupProps {
  children: React.ReactNode;
  isDark?: boolean;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, isDark = false }) => {
  return (
    <div
      style={{
        width: "360px",
        height: "640px",
        borderRadius: "44px",
        border: "7px solid #283046",
        backgroundColor: isDark ? "#111827" : "#FDFBF7",
        boxShadow:
          "0 25px 60px -10px rgba(0,0,0,0.7), 0 0 35px rgba(229,169,60,0.15), inset 0 0 2px rgba(255,255,255,0.2)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dynamic Island / Altavoz */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90px",
          height: "16px",
          backgroundColor: "#0D111A",
          borderRadius: "12px",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#1F293D",
            marginRight: "6px",
          }}
        />
        <div
          style={{
            width: "32px",
            height: "3px",
            borderRadius: "3px",
            backgroundColor: "#1F293D",
          }}
        />
      </div>

      {/* Status Bar */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "20px",
          right: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
          fontWeight: 700,
          color: isDark ? "#CBD5E1" : "#4B5563",
          zIndex: 45,
        }}
      >
        <span>20:45</span>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span>📶</span>
          <span>🔋 94%</span>
        </div>
      </div>

      {/* Contenido de la Pantalla */}
      <div
        style={{
          paddingTop: "32px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// 1. SLIDE 1: PORTADA DEL CUENTO
// ============================================================================
export const GalleryCover: React.FC = () => {
  return (
    <div
      style={{
        width: "1270px",
        height: "760px",
        backgroundColor: "#0C101A",
        fontFamily:
          "'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#FDFBF7",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
      }}
    >
      {/* Fondo estético con glow cálido */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 75% 45%, #1C2742 0%, #0C101A 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "220px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229,169,60,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Panel Izquierdo: Textos y Propuesta de Valor */}
      <div style={{ width: "620px", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "50px",
            backgroundColor: "rgba(229, 169, 60, 0.15)",
            border: "1.5px solid rgba(229, 169, 60, 0.4)",
            color: "#FAD873",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "20px",
          }}
        >
          <span>🧸 Cuentos Personalizados para Dormir</span>
        </div>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: 900,
            lineHeight: 1.15,
            margin: "0 0 20px 0",
            letterSpacing: "-1px",
          }}
        >
          Donde tus hijos son los <br />
          <span style={{ color: "#FF7B54" }}>héroes del cuento</span> 🦉
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#CBD5E1",
            lineHeight: 1.5,
            marginBottom: "32px",
          }}
        >
          Transforma la hora de dormir en un ritual de paz e imaginación. Cero
          pantallas sobreestimulantes, narraciones suaves e historias con
          valores positivos.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            "🦊 Personalizado con el nombre, edad y mascota del pequeño.",
            "🎙️ Voces cariñosas de cuentacuentos (Tía Salomé, Dalia y Elvira).",
            "🌍 Experiencia 100% bilingüe (Español e Inglés instantáneo).",
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#E2E8F0",
              }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Derecho: Mockup Móvil de la Portada */}
      <div style={{ zIndex: 10 }}>
        <PhoneMockup>
          <div
            style={{
              padding: "12px 18px 16px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Header app */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "20px" }}>🦉</span>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 900,
                      color: "#1F2421",
                    }}
                  >
                    TaleCraft Kids
                  </div>
                  <div style={{ fontSize: "9px", color: "#635F59" }}>
                    Para Leo (5 años) ⭐ 24
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  backgroundColor: "#EFE9DF",
                  padding: "4px 8px",
                  borderRadius: "10px",
                  color: "#3A7D6B",
                }}
              >
                ES | EN
              </span>
            </div>

            {/* Ilustración de portada de libro */}
            <div
              style={{
                width: "100%",
                height: "360px",
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#16233B",
                boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 320 360">
                <rect width="320" height="360" fill="#141E34" />
                <circle cx="260" cy="60" r="30" fill="#FFF8E1" opacity="0.9" />
                <circle cx="50" cy="40" r="2" fill="#FFF" />
                <circle cx="120" cy="80" r="2" fill="#FFF" opacity="0.8" />
                <circle cx="200" cy="50" r="2.5" fill="#FFF" />
                <path
                  d="M0 310 Q 90 270 180 300 T 320 280 L 320 360 L 0 360 Z"
                  fill="#0B1320"
                />
                <circle cx="160" cy="220" r="95" fill="#FFB300" opacity="0.3" />
                <circle cx="160" cy="220" r="60" fill="#FFE082" opacity="0.5" />
                {/* Búho */}
                <ellipse cx="160" cy="190" rx="42" ry="54" fill="#D97706" />
                <ellipse cx="160" cy="202" rx="30" ry="36" fill="#FEF3C7" />
                <circle cx="144" cy="170" r="16" fill="#FFF" />
                <circle cx="176" cy="170" r="16" fill="#FFF" />
                <circle cx="145" cy="170" r="8" fill="#1F2937" />
                <circle cx="175" cy="170" r="8" fill="#1F2937" />
                <polygon points="160,178 154,188 166,188" fill="#F59E0B" />
                {/* Linterna */}
                <rect x="195" cy="205" width="22" height="32" rx="4" fill="#F59E0B" />
                <rect x="198" cy="209" width="16" height="24" rx="2" fill="#FFFBEB" />
              </svg>

              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "16px",
                  padding: "10px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 800,
                    color: "#D9532F",
                    textTransform: "uppercase",
                  }}
                >
                  ⭐ Cuento Recomendado
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#1F2421",
                  }}
                >
                  El Búho y la Linterna Mágica
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#3A7D6B",
                    fontWeight: 700,
                  }}
                >
                  Valores: Amistad y Paciencia
                </div>
              </div>
            </div>

            {/* Botón */}
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                borderRadius: "18px",
                backgroundColor: "#D9532F",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              Comenzar Aventura Nocturna →
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
};

// ============================================================================
// 2. SLIDE 2: PANTALLA DE DECISIÓN INTERACTIVA
// ============================================================================
export const GalleryChoice: React.FC = () => {
  return (
    <div
      style={{
        width: "1270px",
        height: "760px",
        backgroundColor: "#0C101A",
        fontFamily:
          "'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#FDFBF7",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 75% 45%, #162B32 0%, #0C101A 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "220px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(58,125,107,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Panel Izquierdo */}
      <div style={{ width: "620px", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "50px",
            backgroundColor: "rgba(58, 125, 107, 0.2)",
            border: "1.5px solid rgba(58, 125, 107, 0.5)",
            color: "#6EE7B7",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "20px",
          }}
        >
          <span>🌱 Interactividad con Valores Morales</span>
        </div>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: 900,
            lineHeight: 1.15,
            margin: "0 0 20px 0",
            letterSpacing: "-1px",
          }}
        >
          Ellos eligen el camino y <br />
          <span style={{ color: "#34D399" }}>aprenden valores</span> ✨
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#CBD5E1",
            lineHeight: 1.5,
            marginBottom: "32px",
          }}
        >
          En lugar de deslizar pasivamente sin fin, los niños participan
          activamente en momentos clave de la historia tomando decisiones éticas
          que recompensan la bondad y la paciencia.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            "🧭 Bifurcaciones claras de 2 opciones diseñadas para sus manitas.",
            "⭐ Recompensa con Estrellas Mágicas canjeables en el Bazar.",
            "💡 Refuerzo de valores: amistad, generosidad y valentía.",
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#E2E8F0",
              }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Derecho: Mockup Decisión */}
      <div style={{ zIndex: 10 }}>
        <PhoneMockup>
          <div
            style={{
              padding: "14px 18px 16px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "#FDFBF7",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span
                style={{ fontSize: "11px", fontWeight: 800, color: "#635F59" }}
              >
                Capítulo 2 de 4
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#D9532F",
                  backgroundColor: "#FCEEEA",
                  padding: "3px 8px",
                  borderRadius: "8px",
                }}
              >
                Tu Elección
              </span>
            </div>

            {/* Texto del cuento */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "18px",
                padding: "16px",
                border: "1.5px solid #EFE9DF",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "18px" }}>🦉</span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#1F2421",
                  }}
                >
                  Barnaby escucha un crujido...
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.4,
                  color: "#374151",
                  margin: 0,
                }}
              >
                "El arroyo está oscuro y una pequeña nutria busca su linterna
                perdida. ¿Qué decides que haga tu pequeño héroe?"
              </p>
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 900,
                color: "#1F2421",
                marginBottom: "10px",
              }}
            >
              ¿Qué camino eliges? 👇
            </div>

            {/* Opción 1 Seleccionada */}
            <div
              style={{
                padding: "14px",
                borderRadius: "16px",
                backgroundColor: "#3A7D6B",
                color: "#FFFFFF",
                border: "2px solid #3A7D6B",
                marginBottom: "10px",
                boxShadow: "0 6px 14px rgba(58,125,107,0.3)",
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
                  <div style={{ fontSize: "12px", fontWeight: 800 }}>
                    1. Ayudar a la nutria con paciencia 🔦
                  </div>
                  <div
                    style={{ fontSize: "10px", opacity: 0.9, marginTop: "2px" }}
                  >
                    Valor: Solidaridad y Amistad
                  </div>
                </div>
                <span>✅</span>
              </div>
            </div>

            {/* Opción 2 */}
            <div
              style={{
                padding: "14px",
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                color: "#6B7280",
                border: "1.5px solid #E5E7EB",
                marginBottom: "14px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 800 }}>
                2. Seguir hacia la colina mágica 🌲
              </div>
              <div style={{ fontSize: "10px", marginTop: "2px" }}>
                Ruta rápida de aventura
              </div>
            </div>

            {/* Recompensa ganada */}
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "14px",
                backgroundColor: "#FEF3C7",
                border: "1.5px solid #F59E0B",
                color: "#92400E",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 900,
              }}
            >
              <span style={{ fontSize: "16px" }}>⭐</span>
              <span>¡Buena acción! +3 Estrellas Mágicas</span>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
};

// ============================================================================
// 3. SLIDE 3: TEMPORIZADOR EN MODO NOCHE
// ============================================================================
export const GalleryNightMode: React.FC = () => {
  return (
    <div
      style={{
        width: "1270px",
        height: "760px",
        backgroundColor: "#0C101A",
        fontFamily:
          "'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#FDFBF7",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 75% 45%, #18233C 0%, #0C101A 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "220px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Panel Izquierdo */}
      <div style={{ width: "620px", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "50px",
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            border: "1.5px solid rgba(99, 102, 241, 0.5)",
            color: "#A5B4FC",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "20px",
          }}
        >
          <span>🌙 Sueño Profundo y Descanso</span>
        </div>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: 900,
            lineHeight: 1.15,
            margin: "0 0 20px 0",
            letterSpacing: "-1px",
          }}
        >
          Temporizador de cuna <br />
          <span style={{ color: "#818CF8" }}>que se apaga solo</span> ⏳
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#CBD5E1",
            lineHeight: 1.5,
            marginBottom: "32px",
          }}
        >
          La luz tenue nocturna protege la melatonina infantil. El audio
          desvanece suavemente cuando el pequeño se queda dormido, sin necesidad
          de entrar al cuarto a apagar la pantalla.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            "⏱️ Temporizador configurable: 15, 30 o 45 minutos de cuna.",
            "🎶 Desvanecimiento progresivo de volumen (fade-out gradual).",
            "🚫 Sin interrupciones, anuncios ruidosos ni sorpresas.",
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#E2E8F0",
              }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Derecho: Mockup Modo Noche */}
      <div style={{ zIndex: 10 }}>
        <PhoneMockup isDark={true}>
          <div
            style={{
              padding: "14px 18px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "16px",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                border: "1px solid #6366F1",
                color: "#A5B4FC",
                fontSize: "10px",
                fontWeight: 800,
                marginBottom: "20px",
              }}
            >
              <span>🌙 Modo Noche Cálido</span>
            </div>

            {/* Temporizador Circular */}
            <div
              style={{
                position: "relative",
                width: "170px",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <svg
                width="170"
                height="170"
                viewBox="0 0 170 170"
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotate(-90deg)",
                }}
              >
                <circle
                  cx="85"
                  cy="85"
                  r="72"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="10"
                />
                <circle
                  cx="85"
                  cy="85"
                  r="72"
                  fill="none"
                  stroke="#E5A93C"
                  strokeWidth="10"
                  strokeDasharray="452"
                  strokeDashoffset="120"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontSize: "28px" }}>🌙</span>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "#FDFBF7",
                  marginTop: "2px",
                }}
              >
                14:59
              </div>
              <span
                style={{
                  fontSize: "9px",
                  color: "#9CA3AF",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                TEMPORIZADOR
              </span>
            </div>

            {/* Tarjeta de Audio */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#1F293D",
                borderRadius: "18px",
                padding: "14px",
                textAlign: "left",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#E5A93C",
                    }}
                  >
                    🎙️ Narrado por Tía Salomé
                  </div>
                  <div style={{ fontSize: "9px", color: "#9CA3AF" }}>
                    Voz maternal dulce · Música de cuna
                  </div>
                </div>
                <span style={{ fontSize: "18px" }}>🎵</span>
              </div>

              {/* Ondas */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  height: "24px",
                }}
              >
                {[10, 22, 14, 26, 18, 12, 24, 20, 28, 16, 12, 20].map(
                  (h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}px`,
                        backgroundColor: "#6366F1",
                        borderRadius: "3px",
                      }}
                    />
                  )
                )}
              </div>
            </div>

            <div
              style={{
                fontSize: "10px",
                color: "#9CA3AF",
                lineHeight: 1.3,
              }}
            >
              ✨ Se apagará al terminar el temporizador.
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SLIDE 4: RACHA DE LECTURA Y BAZAR DE ESTRELLAS
// ============================================================================
export const GalleryStreakBazaar: React.FC = () => {
  return (
    <div
      style={{
        width: "1270px",
        height: "760px",
        backgroundColor: "#0C101A",
        fontFamily:
          "'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#FDFBF7",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 75% 45%, #2A2114 0%, #0C101A 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "220px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229,169,60,0.22) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Panel Izquierdo */}
      <div style={{ width: "620px", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "50px",
            backgroundColor: "rgba(229, 169, 60, 0.2)",
            border: "1.5px solid rgba(229, 169, 60, 0.5)",
            color: "#FCD34D",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "20px",
          }}
        >
          <span>⭐ Hábitos Sanos de Lectura</span>
        </div>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: 900,
            lineHeight: 1.15,
            margin: "0 0 20px 0",
            letterSpacing: "-1px",
          }}
        >
          Racha nocturna y <br />
          <span style={{ color: "#FBBF24" }}>Bazar de Estrellas</span> 🏆
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#CBD5E1",
            lineHeight: 1.5,
            marginBottom: "32px",
          }}
        >
          Incentiva la lectura diaria con un sistema de recompensas positivo.
          Los pequeños canjean las estrellas obtenidas por buenas acciones por
          mascotas y sombreros mágicos en el Bazar.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            "🔥 Racha diaria que fortalece la constancia cada noche.",
            "🧸 Bazar Mágico de accesorios y amigos animales.",
            "📱 Disponible en Web y en APK Android (.apk v1.0.0).",
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#E2E8F0",
              }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Derecho: Mockup Racha & Bazar */}
      <div style={{ zIndex: 10 }}>
        <PhoneMockup>
          <div
            style={{
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              backgroundColor: "#FDFBF7",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "20px",
                backgroundColor: "#FEF3C7",
                border: "2px solid #F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                marginBottom: "10px",
                boxShadow: "0 6px 14px rgba(245, 158, 11, 0.2)",
              }}
            >
              🏆
            </div>

            <div
              style={{
                fontSize: "16px",
                fontWeight: 900,
                color: "#1F2421",
                marginBottom: "2px",
              }}
            >
              ¡Racha de 7 Noches!
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#635F59",
                marginBottom: "16px",
              }}
            >
              Leo desbloqueó el Sombrero de Búho ⭐
            </div>

            {/* Bazar preview */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "12px",
                border: "1.5px solid #EFE9DF",
                marginBottom: "12px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#D9532F",
                  marginBottom: "8px",
                }}
              >
                🛍️ Bazar de Estrellas Mágicas
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { icon: "🧙‍♂️", name: "Gorro Mago", stars: "10 ⭐" },
                  { icon: "🦊", name: "Zorrito", stars: "15 ⭐" },
                  { icon: "🌟", name: "Linterna Dorada", stars: "20 ⭐" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      backgroundColor: "#F9FAFB",
                      borderRadius: "12px",
                      padding: "8px 4px",
                      textAlign: "center",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <div style={{ fontSize: "18px" }}>{item.icon}</div>
                    <div
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        color: "#1F2421",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "8px",
                        color: "#D97706",
                        fontWeight: 800,
                      }}
                    >
                      {item.stars}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge de descarga */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#111827",
                borderRadius: "16px",
                padding: "12px",
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#34D399",
                  marginBottom: "4px",
                }}
              >
                🌐 talecraft-kids.vercel.app
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#9CA3AF",
                }}
              >
                Descarga disponible en APK para Android
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
};
