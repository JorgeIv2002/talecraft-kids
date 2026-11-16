import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Story } from "@/lib/types";

// Credenciales de Supabase (con fallback predeterminado para producción)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://yswiunuavyfktgyzislo.supabase.co";

const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_Bmt508tiyndkPiK0Tiw-zQ_EqPhdgs6";

// Archivo local de persistencia y caché
const DATA_FILE = path.join(process.cwd(), "data", "community-stories.json");
let memoryStoriesCache: Story[] = [];

function loadLocalStories(): Story[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryStoriesCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error al leer local community-stories.json:", err);
  }
  return memoryStoriesCache;
}

function saveLocalStories(stories: Story[]): boolean {
  memoryStoriesCache = stories;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(stories, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn("No se pudo escribir en disco local:", err);
    return false;
  }
}

// GET: Obtener todos los cuentos de la comunidad (Supabase Nube -> Local Fallback)
export async function GET() {
  const localStories = loadLocalStories();

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/community_stories?select=id,title,synopsis,story_data,created_at&order=created_at.desc&limit=50`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          cache: "no-store",
        }
      );

      if (res.ok) {
        const rows = (await res.json()) as Array<{ story_data: Story }>;
        if (Array.isArray(rows) && rows.length > 0) {
          const cloudStories = rows
            .map((r) => r.story_data)
            .filter((s): s is Story => Boolean(s && s.id && s.title));

          // Combinar con los cuentos semilla locales para asegurar variedad
          const cloudIds = new Set(cloudStories.map((s) => s.id));
          const merged = [
            ...cloudStories,
            ...localStories.filter((s) => !cloudIds.has(s.id)),
          ];

          return NextResponse.json(
            { stories: merged, source: "supabase" },
            {
              headers: {
                "Cache-Control": "public, s-maxage=5, stale-while-revalidate=30",
              },
            }
          );
        }
      }
    } catch (cloudErr) {
      console.warn("Fallo en consulta Supabase, usando respaldo local:", cloudErr);
    }
  }

  return NextResponse.json(
    { stories: localStories, source: "local" },
    {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60",
      },
    }
  );
}

// POST: Publicar un nuevo cuento creado (Supabase Nube + Caché Local)
export async function POST(req: NextRequest) {
  try {
    const newStory = (await req.json()) as Story;

    if (!newStory || !newStory.id || !newStory.title || !newStory.nodes) {
      return NextResponse.json(
        { error: "Estructura de cuento inválida" },
        { status: 400 }
      );
    }

    let savedInCloud = false;

    // 1. Intentar persistir en Supabase para que llegue a todos los usuarios del mundo
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const cloudRes = await fetch(`${SUPABASE_URL}/rest/v1/community_stories`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify({
            id: newStory.id,
            title: newStory.title,
            synopsis: newStory.synopsis || "",
            story_data: newStory,
          }),
        });

        if (cloudRes.ok) {
          savedInCloud = true;
        } else {
          const errorMsg = await cloudRes.text();
          console.warn("Respuesta de inserción en Supabase:", errorMsg);
        }
      } catch (cloudError) {
        console.warn("Error conectando con Supabase:", cloudError);
      }
    }

    // 2. Guardar también en caché local en el servidor
    const currentStories = loadLocalStories();
    const filtered = currentStories.filter((s) => s.id !== newStory.id);
    const updated = [newStory, ...filtered];
    saveLocalStories(updated);

    return NextResponse.json({
      success: true,
      savedInCloud,
      message: savedInCloud
        ? "Cuento sincronizado en Supabase y visible para toda la comunidad global"
        : "Cuento guardado en caché local (ejecuta el script SQL en Supabase para sincronización global)",
      story: newStory,
      totalCommunityStories: updated.length,
    });
  } catch (error) {
    console.error("Error al publicar cuento en la comunidad:", error);
    return NextResponse.json(
      { error: "No se pudo publicar el cuento en este momento" },
      { status: 500 }
    );
  }
}
