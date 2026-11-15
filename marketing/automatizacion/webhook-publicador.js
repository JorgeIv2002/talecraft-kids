/**
 * TaleCraft Kids - Webhook Publicador Automático
 *
 * Envía automáticamente publicaciones y actualizaciones de lanzamiento a Webhooks
 * compatibles con Make.com, n8n, Discord o Telegram sin necesidad de publicar manualmente.
 *
 * Uso:
 *   node marketing/automatizacion/webhook-publicador.js
 *
 * Configuración en .env.local:
 *   WEBHOOK_DISTRIBUTION_URL="https://hook.eu1.make.com/tu-webhook-secreto"
 */

const fs = require("fs");
const path = require("path");

const WEBHOOK_URL = process.env.WEBHOOK_DISTRIBUTION_URL;

const CAMPAIGN_MESSAGES = [
  {
    channel: "Instagram / Facebook",
    title: "Lanzamiento TaleCraft Kids",
    text: "✨ ¡La hora de dormir ahora tiene superpoderes! Descubre TaleCraft Kids: cuentos interactivos donde tus hijos eligen su propio camino y aprenden valores positivos con narración dulce de estudio. Pruébalo gratis en el enlace del perfil. 📖🌙",
    tags: ["#CuentosInfantiles", "#CrianzaPositiva", "#MaternidadConsciente", "#EducacionInfantil"]
  },
  {
    channel: "X (Twitter) / Threads",
    title: "Hilo: Menos pantallas ruidosas, más calma",
    text: "¿Sabías que los videos rápidos antes de dormir aumentan la ansiedad infantil? En TaleCraft Kids creamos historias tranquilas con lectura guiada y elecciones morales para que tus pequeños duerman en paz y aprendan bondad. 🦉⭐",
    tags: ["#EdTech", "#FamilyTech", "#KidsApps"]
  },
  {
    channel: "Comunidad / Telegram",
    title: "Pase Familiar Pro Disponible",
    text: "👑 ¡Nuevo Pase Familiar Pro en TaleCraft Kids! Biblioteca ilimitada de cuentos, hasta 3 perfiles infantiles y creador de aventuras mágicas. Activa tu prueba gratuita de 7 días hoy.",
    tags: ["#TaleCraftKids", "#OfertaLanzamiento"]
  }
];

async function broadcastUpdates() {
  console.log("🚀 Iniciando automatización de distribución TaleCraft Kids...\n");

  if (!WEBHOOK_URL) {
    console.warn("⚠️ AVISO: Variable WEBHOOK_DISTRIBUTION_URL no configurada en el entorno.");
    console.log("ℹ️ Muestra de los mensajes preparados listos para ser distribuidos:");
    CAMPAIGN_MESSAGES.forEach((msg, idx) => {
      console.log(`\n[${idx + 1}] Destino: ${msg.channel}`);
      console.log(`Título: ${msg.title}`);
      console.log(`Cuerpo: ${msg.text}`);
      console.log(`Tags: ${msg.tags.join(" ")}`);
    });
    console.log("\n💡 Para enviar automáticamente vía Make.com o n8n:");
    console.log("1. Añade WEBHOOK_DISTRIBUTION_URL='https://tu-url-de-webhook' en .env.local");
    console.log("2. Vuelve a ejecutar este script con: node marketing/automatizacion/webhook-publicador.js\n");
    return;
  }

  try {
    for (const msg of CAMPAIGN_MESSAGES) {
      console.log(`📤 Enviando publicación a ${msg.channel}...`);
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "TaleCraft Kids Auto-Distributor",
          timestamp: new Date().toISOString(),
          ...msg
        })
      });

      if (response.ok) {
        console.log(`✅ ${msg.channel} publicado con éxito (HTTP ${response.status}).`);
      } else {
        console.error(`❌ Error enviando a ${msg.channel}: HTTP ${response.status}`);
      }
    }
    console.log("\n🎉 ¡Distribución completada exitosamente!");
  } catch (err) {
    console.error("❌ Error de conexión al webhook:", err.message);
  }
}

broadcastUpdates();
