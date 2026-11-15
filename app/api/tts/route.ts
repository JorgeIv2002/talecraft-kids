import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

// Cache en memoria para reproducción instantánea y ahorro de recursos
const audioCache = new Map<string, Buffer>();

export async function POST(req: NextRequest) {
  try {
    const {
      text,
      voice = "es-CO-SalomeNeural",
      rate = "0%",
      pitch = "0Hz",
    } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "El texto es obligatorio para la narración" },
        { status: 400 }
      );
    }

    const cleanText = text.trim();
    const cacheKey = `${voice}_${rate}_${pitch}_${cleanText}`;

    // Respuesta inmediata desde caché en memoria
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      return new NextResponse(new Uint8Array(cached), {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": cached.length.toString(),
          "Cache-Control": "public, max-age=604800, immutable",
        },
      });
    }

    const tts = new MsEdgeTTS();
    // 96kbps mono MP3 de alta fidelidad para voz de estudio limpia sin compresión metálica
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    // Sin distorsión artificial: preserva la acústica natural y humana de la locutora
    const options = {
      rate: rate || "0%",
      pitch: pitch || "0Hz",
    };

    const { audioStream } = tts.toStream(cleanText, options);

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      audioStream.on("end", () => resolve());
      audioStream.on("error", (err: Error) => reject(err));
    });

    const audioBuffer = Buffer.concat(chunks);

    // Limitar tamaño de caché a 250 clips para no consumir memoria excesiva
    if (audioCache.size > 250) {
      const oldestKey = audioCache.keys().next().value;
      if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(cacheKey, audioBuffer);

    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  } catch (error) {
    console.error("Error al preparar la narración de audio:", error);
    return NextResponse.json(
      { error: "No se pudo reproducir la narración en este momento" },
      { status: 500 }
    );
  }
}
