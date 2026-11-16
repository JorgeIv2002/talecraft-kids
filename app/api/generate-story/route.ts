import { NextRequest, NextResponse } from "next/server";
import { Story, ValueCategory, StoryNode, StoryChoice } from "@/lib/types";

interface GenerateStoryRequest {
  topic: string;
  childName?: string;
  childAge?: number;
  petName?: string;
  valueCategory: ValueCategory;
  emoji?: string;
  locale?: "es" | "en";
}

// ============================================================================
// GENERADOR PROCEDURAL AVANZADO (LITERATURA INFANTIL DE CUNA RICA Y DETALLADA)
// ============================================================================
function generateRichProceduralStory(req: GenerateStoryRequest): Story {
  const {
    topic,
    childName = "Pequeño Aventurero",
    petName = "Chispas",
    valueCategory = "Amistad",
    emoji = "✨",
    locale = "es",
  } = req;

  const storyId = `story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const cleanTopic = topic.trim();

  // Paletas de color y degradados según el valor
  const categoryThemes: Record<
    ValueCategory,
    { gradient: string; accent: string; virtue: string }
  > = {
    Amistad: {
      gradient: "from-[#2DD4BF] via-[#0D9488] to-[#115E59]",
      accent: "#0D9488",
      virtue: locale === "en" ? "Friendship" : "Amistad",
    },
    Valentía: {
      gradient: "from-[#FF7A59] via-[#F05735] to-[#D94524]",
      accent: "#D94524",
      virtue: locale === "en" ? "Courage" : "Valentía",
    },
    Perseverancia: {
      gradient: "from-[#F59E0B] via-[#D97706] to-[#B45309]",
      accent: "#D97706",
      virtue: locale === "en" ? "Perseverance" : "Perseverancia",
    },
    Naturaleza: {
      gradient: "from-[#10B981] via-[#059669] to-[#047857]",
      accent: "#059669",
      virtue: locale === "en" ? "Kindness to Nature" : "Cuidado de la Naturaleza",
    },
    Generosidad: {
      gradient: "from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]",
      accent: "#7C3AED",
      virtue: locale === "en" ? "Generosity" : "Generosidad",
    },
    Curiosidad: {
      gradient: "from-[#38BDF8] via-[#0284C7] to-[#0369A1]",
      accent: "#0284C7",
      virtue: locale === "en" ? "Curiosity & Wonder" : "Curiosidad e Ingenio",
    },
  };

  const theme = categoryThemes[valueCategory] || categoryThemes["Amistad"];

  if (locale === "en") {
    const title = `${cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)}`;
    const synopsis = `A soothing bedtime journey where ${childName} and ${petName} discover that ${theme.virtue.toLowerCase()} illuminates even the quietest night. Featuring 4 interactive chapters.`;

    const nodes: Record<string, StoryNode> = {
      "node-1": {
        id: "node-1",
        chapterNumber: 1,
        totalChapters: 4,
        sceneEmoji: emoji,
        text: `Twilight gently settled over the whispering hills. The stars were beginning to blink like tiny fireflies across the velvet indigo sky. ${childName} and ${petName} sat by the windowsill, wrapped in a cozy woven blanket, when a soft golden breeze carried a mysterious gentle chime through the garden. It was the beginning of an adventure about ${cleanTopic}. At the edge of the sleeping meadows, two glowing paths unfolded under the silver crescent moon.`,
        choices: [
          {
            id: "opt-1a",
            label: `Follow the mossy lantern trail with ${petName} at a calm, gentle pace`,
            hint: "Taking your time reveals wonderful little secrets hidden in the shadows.",
            nextNodeId: "node-2a",
          },
          {
            id: "opt-1b",
            label: "Listen carefully to the gentle song of the old weeping willow by the brook",
            hint: "Patience and attentive listening unlock great wisdom.",
            nextNodeId: "node-2b",
          },
        ],
      },
      "node-2a": {
        id: "node-2a",
        chapterNumber: 2,
        totalChapters: 4,
        sceneEmoji: "🌿",
        text: `The moss beneath their footsteps was soft as a velvet cloud, glowing with a soothing emerald light that kept the chill away. Along the trail, ${childName} discovered that a shy little woodland creature had gotten its basket of sweet bedtime berries caught in a tangle of honeysuckle vines. ${petName} gently sniffed the flowers, nudging a path forward. To free the berries without waking the forest, they had to choose with kindness.`,
        choices: [
          {
            id: "opt-2a1",
            label: `Untangle the delicate vines together, speaking soft comforting words`,
            hint: "Gentle hands and warm words always calm troubled hearts.",
            nextNodeId: "node-3",
          },
          {
            id: "opt-2a2",
            label: `Share some of their own golden acorns to comfort the little friend`,
            hint: "Generosity brings immediate warmth and smiles.",
            nextNodeId: "node-3",
          },
        ],
      },
      "node-2b": {
        id: "node-2b",
        chapterNumber: 2,
        totalChapters: 4,
        sceneEmoji: "🍃",
        text: `The weeping willow swayed rhythmically in the warm evening breeze, its long leafy braids brushing the mirror-like brook. As ${childName} approached, the tree whispered a forgotten melody of peace. Below its roots, a small stone bridge was veiled in evening mist. An elder owl adjusted its tiny glasses, watching ${childName} and ${petName} with curious, kind eyes. 'To cross safely,' the owl chirped, 'one must demonstrate true ${theme.virtue.toLowerCase()}'.`,
        choices: [
          {
            id: "opt-2b1",
            label: "Offer a sincere greeting and help the owl tidy the fallen leaves",
            hint: "Respect and kindness are the greatest keys in any world.",
            nextNodeId: "node-3",
          },
          {
            id: "opt-2b2",
            label: "Hum the willow's bedtime lullaby in soft harmony with the stream",
            hint: "Peaceful music unites all creatures in harmony.",
            nextNodeId: "node-3",
          },
        ],
      },
      "node-3": {
        id: "node-3",
        chapterNumber: 3,
        totalChapters: 4,
        sceneEmoji: "✨",
        text: `With hearts full of joy and mutual trust, they reached the heart of the clearing. There, shimmering beneath the canopy of ancient stars, lay the wondrous answer to ${cleanTopic}. The air was fragrant with blooming night jasmine, and a soft warm glow enveloped ${childName} and ${petName}. Every creature in the valley gathered in quiet awe, nodding in gratitude for the love and ${theme.virtue.toLowerCase()} shown throughout the journey. It was almost time for the stars to tuck the world to sleep.`,
        choices: [
          {
            id: "opt-3a",
            label: "Make a bedtime wish for all the children and animals of the world",
            hint: "A selfless wish carries the warmest magic into dreams.",
            nextNodeId: "node-4-end",
          },
          {
            id: "opt-3b",
            label: `Snuggle closely with ${petName} and watch the fireflies perform their dance`,
            hint: "Gratitude in the quiet moments brings the sweetest rest.",
            nextNodeId: "node-4-end",
          },
        ],
      },
      "node-4-end": {
        id: "node-4-end",
        chapterNumber: 4,
        totalChapters: 4,
        sceneEmoji: "🌙",
        text: `The night grew deep and quiet. A blanket of serene peace covered the hills. ${childName}'s eyes felt pleasantly heavy, and ${petName} rested its head with a contented sigh. The gentle moon looked down like a nightlight, guarding their dreams. They knew that on this night, they had not only solved ${cleanTopic}, but had proven that ${theme.virtue.toLowerCase()} makes every home warmer and every heart brave. Goodnight, little hero. The stars are watching over you.`,
        isEnding: true,
        moralLesson: {
          title: `The Gift of ${theme.virtue}`,
          description: `${childName} proved that with gentle courage and a kind heart, bedtime is a sanctuary of peace and imagination.`,
          starsAwarded: 5,
        },
      },
    };

    return {
      id: storyId,
      title,
      synopsis,
      valueCategory,
      estimatedMinutes: 8,
      coverEmoji: emoji,
      accentColor: theme.accent,
      decisionsCount: 3,
      startNodeId: "node-1",
      isPremium: false,
      collection: "popular",
      gradientBg: theme.gradient,
      nodes,
    };
  }

  // Versión en Español
  const title = `${cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)}`;
  const synopsis = `Una travesía nocturna llena de ternura donde ${childName} y su compañero ${petName} demuestran cómo la ${theme.virtue.toLowerCase()} vence cualquier miedo a la oscuridad. Cuento interactivo de 4 capítulos.`;

  const nodes: Record<string, StoryNode> = {
    "node-1": {
      id: "node-1",
      chapterNumber: 1,
      totalChapters: 4,
      sceneEmoji: emoji,
      text: `El crepúsculo teñía de violeta y oro las colinas del Valle del Descanso. En el cielo, las primeras estrellas despertaban como pequeñas velitas encendidas por los ángeles de la cuna. ${childName} y ${petName} contemplaban el horizonte arrebujados en una tibia manta de lana suave, cuando una brisa perfumada a lavanda trajo un murmullo misterioso. Era el inicio de una historia inolvidable sobre ${cleanTopic}. Al pie de los prados dormidos, se abrían dos senderos iluminados por la luna creciente.`,
      choices: [
        {
          id: "opt-1a",
          label: `Seguir el sendero de los musgos fosforescentes con paso sereno junto a ${petName}`,
          hint: "Caminar con calma permite descubrir tesoros que los apresurados nunca ven.",
          nextNodeId: "node-2a",
        },
        {
          id: "opt-1b",
          label: "Acercarse al sauce milenario que susurra nanitas junto al arroyo de cristal",
          hint: "Escuchar con atención abre puertas secretas en el corazón.",
          nextNodeId: "node-2b",
        },
      ],
    },
    "node-2a": {
      id: "node-2a",
      chapterNumber: 2,
      totalChapters: 4,
      sceneEmoji: "🌿",
      text: `El musgo bajo sus pies era tan esponjoso y tibio como una almohada de plumas. Al doblar una curva bordeada de campanillas dormilonas, ${childName} descubrió a un pequeño animalito del bosque que tenía su canastita de bayas dulces atrapada entre unas ramas de madreselva. ${petName} olfateó con delicadeza, moviendo la colita para transmitir tranquilidad. Había que ayudarlo con paciencia para no lastimar sus hojitas ni romper el silencio protector de la noche.`,
      choices: [
        {
          id: "opt-2a1",
          label: `Desenredar las ramas con caricias suaves, hablándole con voz maternal`,
          hint: "La paciencia y el cariño deshacen cualquier nudo en la vida.",
          nextNodeId: "node-3",
        },
        {
          id: "opt-2a2",
          label: `Compartir sus propias bellotas doradas para reconfortar al nuevo amiguito`,
          hint: "La generosidad abriga más que el fuego más grande del invierno.",
          nextNodeId: "node-3",
        },
      ],
    },
    "node-2b": {
      id: "node-2b",
      chapterNumber: 2,
      totalChapters: 4,
      sceneEmoji: "🍃",
      text: `Las ramas del viejo sauce se mecían suavemente sobre el agua transparente del arroyo, produciendo un sonido tan relajante que el aire olía a descanso. Al acercarse, un sabio búho con anteojos de concha de tortuga saludó inclinando su cabecita. 'Pocos niños visitan el sauce a esta hora', susurró con voz arrulladora. 'Para cruzar el puente de piedra y encontrar el misterio de ${cleanTopic}, se necesita un corazón que practique la verdadera ${theme.virtue.toLowerCase()}'.`,
      choices: [
        {
          id: "opt-2b1",
          label: "Saludar con educación y ayudar al búho a acomodar las hojas caídas",
          hint: "El respeto a los mayores y a la naturaleza es el mayor puente hacia el bien.",
          nextNodeId: "node-3",
        },
        {
          id: "opt-2b2",
          label: "Tararear la canción de cuna del arroyo al unísono con el viento",
          hint: "La melodía de la paz calma cualquier temor.",
          nextNodeId: "node-3",
        },
      ],
    },
    "node-3": {
      id: "node-3",
      chapterNumber: 3,
      totalChapters: 4,
      sceneEmoji: "✨",
      text: `Con el corazón rebosante de satisfacción y alegría compartida, ${childName} y ${petName} llegaron al claro del bosque encantado. En el centro, bajo un manto de luciérnagas doradas que giraban en círculos perfectos, se reveló la solución mágica a ${cleanTopic}. Todos los animalitos nocturnos —erizos, conejitos y castores con sus piyamas de algodón— se reunieron en reverencia silenciosa. Agradecieron a ${childName} su nobleza y compasión. La hora de cerrar los ojitos había llegado.`,
      choices: [
        {
          id: "opt-3a",
          label: "Lanzar un deseo de bendición y sueños hermosos para todos los niños del mundo",
          hint: "Desear el bien a otros llena el propio sueño de estrellas.",
          nextNodeId: "node-4-end",
        },
        {
          id: "opt-3b",
          label: `Acurrucarse junto a ${petName} contemplando las últimas luces del bosque`,
          hint: "El abrazo sincero es el mejor refugio para dormir.",
          nextNodeId: "node-4-end",
        },
      ],
    },
    "node-4-end": {
      id: "node-4-end",
      chapterNumber: 4,
      totalChapters: 4,
      sceneEmoji: "🌙",
      text: `La noche se volvió mansa y serena. Un silencio amoroso arropó cada rincón del valle. ${childName} sintió sus párpados pesados y su respiración suave como una pluma al viento. ${petName} bostezó profundamente y se acurrucó a sus pies. Habían demostrado que con ${theme.virtue.toLowerCase()}, bondad y valentía tranquila, no hay noche solitaria ni camino difícil. La luna cuidaría de ellos hasta que el sol volviera a sonreír. Dulces sueños, pequeño héroe.`,
      isEnding: true,
      moralLesson: {
        title: `El Poder de la ${theme.virtue}`,
        description: `${childName} demostró que los valores nobles y el amor por los demás convierten la noche en un remanso de paz y felicidad.`,
        starsAwarded: 5,
      },
    },
  };

  return {
    id: storyId,
    title,
    synopsis,
    valueCategory,
    estimatedMinutes: 8,
    coverEmoji: emoji,
    accentColor: theme.accent,
    decisionsCount: 3,
    startNodeId: "node-1",
    isPremium: false,
    collection: "popular",
    gradientBg: theme.gradient,
    nodes,
  };
}

// ============================================================================
// HANDLER PRINCIPAL DE LA API ROUTE
// ============================================================================
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateStoryRequest;

    if (!body || !body.topic || typeof body.topic !== "string") {
      return NextResponse.json(
        { error: "El tema o idea del cuento es obligatorio." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Si hay GEMINI_API_KEY en variables de entorno, intentar generar con LLM
    if (apiKey) {
      try {
        const prompt = `Crea un cuento infantil interactivo para la hora de dormir basado en el tema: "${body.topic}".
El protagonista se llama "${body.childName || "Leo"}" (${body.childAge || 5} años) y su compañero peluche/mascota se llama "${body.petName || "Chispas"}".
Valor moral a practicar: "${body.valueCategory}". Idioma: "${body.locale || "es"}".
El cuento DEBE ser largo, poético, inmersivo, relajante para dormir, con 4 capítulos.
En el capítulo 1 y 2 presenta 2 opciones morales donde el niño elija el camino.
En el capítulo 4 presenta un desenlace tranquilizador con moralLesson ({ title, description, starsAwarded: 5 }).
Responde ÚNICAMENTE un JSON válido que cumpla con la estructura Story (id, title, synopsis, valueCategory, estimatedMinutes: 8, coverEmoji: "${body.emoji || "✨"}", accentColor, decisionsCount: 3, startNodeId: "node-1", isPremium: false, collection: "popular", gradientBg, nodes: Record<string, StoryNode>).`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsedStory = JSON.parse(rawText) as Story;
            if (parsedStory && parsedStory.title && parsedStory.nodes) {
              parsedStory.id = `story-${Date.now()}`;
              return NextResponse.json({ story: parsedStory, source: "gemini" });
            }
          }
        }
      } catch (geminiError) {
        console.warn("Fallo en Gemini API, usando motor procedural literario:", geminiError);
      }
    }

    // Motor literario procedural avanzado (100% confiable, largo, poético y adaptativo)
    const story = generateRichProceduralStory(body);
    return NextResponse.json({ story, source: "procedural" });
  } catch (error) {
    console.error("Error al generar cuento:", error);
    return NextResponse.json(
      { error: "No se pudo generar el cuento en este momento." },
      { status: 500 }
    );
  }
}
