import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Story } from "@/lib/types";

// Archivo persistente en servidor
const DATA_FILE = path.join(process.cwd(), "data", "community-stories.json");

// Memoria compartida en tiempo de ejecución (fallback en serverless si el disco es de solo lectura)
let memoryStoriesCache: Story[] = [];

function loadStories(): Story[] {
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
    console.error("Error al leer community-stories.json:", err);
  }
  return memoryStoriesCache;
}

function saveStories(stories: Story[]): boolean {
  memoryStoriesCache = stories;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(stories, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn("No se pudo escribir en disco (entorno serverless), persistido en memoria:", err);
    return false;
  }
}

// GET: Obtener todos los cuentos de la comunidad
export async function GET() {
  const stories = loadStories();
  return NextResponse.json({ stories }, {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60",
    },
  });
}

// POST: Publicar un nuevo cuento creado por una familia
export async function POST(req: NextRequest) {
  try {
    const newStory = (await req.json()) as Story;

    if (!newStory || !newStory.id || !newStory.title || !newStory.nodes) {
      return NextResponse.json(
        { error: "Estructura de cuento inválida" },
        { status: 400 }
      );
    }

    const currentStories = loadStories();
    
    // Evitar duplicados por id
    const filtered = currentStories.filter((s) => s.id !== newStory.id);
    const updated = [newStory, ...filtered];

    saveStories(updated);

    return NextResponse.json({
      success: true,
      message: "Cuento publicado exitosamente para toda la comunidad",
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
