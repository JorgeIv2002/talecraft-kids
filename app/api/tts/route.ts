import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "es-MX-DaliaNeural", rate = 0, pitch = 0 } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "El texto es obligatorio" }, { status: 400 });
    }

    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    // Opciones de ritmo y tono para mayor dulzura infantil
    const options = {
      rate: rate || "-5%",
      pitch: pitch || "+8Hz",
    };

    const { audioStream } = tts.toStream(text.trim(), options);

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      audioStream.on("end", () => resolve());
      audioStream.on("error", (err: Error) => reject(err));
    });

    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Error en TTS Neural:", error);
    return NextResponse.json(
      { error: "Error al generar el audio neuronal" },
      { status: 500 }
    );
  }
}
