"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Loader2,
  Play,
  Pause,
  Music,
  Moon,
} from "lucide-react";
import { Story, StoryNode, ChildProfile } from "@/lib/types";

interface StoryReaderProps {
  story: Story;
  profile: ChildProfile;
  isNightMode: boolean;
  onExit: () => void;
  onAwardStars: (count: number) => void;
}

// Voces humanas profesionales seleccionadas con timbre maternal, dulce y cálido para niños
const STORY_NARRATORS = [
  {
    id: "es-CO-SalomeNeural",
    name: "🌸 Tía Salomé",
    desc: "Dulce y suave",
    badge: "Ideal para descansar",
  },
  {
    id: "es-MX-DaliaNeural",
    name: "✨ Tía Dalia",
    desc: "Cálida y alegre",
    badge: "Expresiva de cuento",
  },
  {
    id: "es-ES-ElviraNeural",
    name: "📖 Tía Elvira",
    desc: "Cuentacuentos clásica",
    badge: "Tradicional y tierna",
  },
];

export default function StoryReader({
  story,
  profile,
  isNightMode,
  onExit,
  onAwardStars,
}: StoryReaderProps) {
  const [currentNodeId, setCurrentNodeId] = useState<string>(story.startNodeId);
  const [audioState, setAudioState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [hasCompleted, setHasCompleted] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState("es-CO-SalomeNeural");
  const [progressPercent, setProgressPercent] = useState(0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [isBgMusicEnabled, setIsBgMusicEnabled] = useState(true);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number>(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);

  // Controladores de audio y peticiones concurrentes
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const audioCacheRef = useRef<Map<string, string>>(new Map());

  // Fondo sonoro ambiental suave (Web Audio API) para atmósfera de cuento
  const bgAudioCtxRef = useRef<AudioContext | null>(null);
  const bgGainRef = useRef<GainNode | null>(null);

  const currentNode: StoryNode = story.nodes[currentNodeId] || story.nodes[story.startNodeId];

  // Integración natural del nombre del niño sin alterar la gramática de la narración
  const personalizedText = useMemo(() => {
    let text = currentNode.text;
    if (text.includes("Mateo")) {
      text = text.replace(/Mateo/g, profile.name);
    }
    if (text.includes("Sofía")) {
      text = text.replace(/Sofía/g, profile.name);
    }
    if (text.includes("Clara")) {
      text = text.replace(/Clara/g, profile.name);
    }
    if (text.includes("Chispas")) {
      text = text.replace(/Chispas/g, profile.petName);
    }
    if (text.includes("Barnaby") && currentNode.chapterNumber === 1 && !text.includes(profile.name)) {
      text = text.replace(
        "Barnaby el búho",
        `Barnaby el búho y su amigo ${profile.name}`
      );
    }
    return text;
  }, [currentNode.text, currentNode.chapterNumber, profile.name, profile.petName]);

  // Limpieza del texto para locución humana impecable
  const cleanSpeechText = useMemo(() => {
    return personalizedText
      .replace(/[()]/g, "")
      .replace(/[*_#]/g, "")
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }, [personalizedText]);

  // Segmentación precisa por oraciones para el iluminado interactivo (Read-Along)
  const sentences = useMemo(() => {
    const parts = personalizedText.match(/[^.!?]+[.!?]+(\s|$)/g);
    if (!parts || parts.length === 0) {
      return [personalizedText];
    }
    return parts.map((s) => s.trim()).filter(Boolean);
  }, [personalizedText]);

  // Música ambiental suave (tonos armónicos relajantes de cuna)
  const startSoftAmbient = useCallback(() => {
    if (!isBgMusicEnabled) return;
    try {
      if (!bgAudioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        bgAudioCtxRef.current = new AudioContextClass();
      }
      const ctx = bgAudioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (!bgGainRef.current) {
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.015, ctx.currentTime); // Volumen sutilísimo de fondo
        gain.connect(ctx.destination);
        bgGainRef.current = gain;

        // Dos osciladores armónicos en frecuencias relajantes de cuna (220Hz / 330Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(220, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(329.63, ctx.currentTime);

        osc1.connect(gain);
        osc2.connect(gain);
        osc1.start();
        osc2.start();
      }
    } catch (e) {
      console.warn("Fondo ambiental no inicializado:", e);
    }
  }, [isBgMusicEnabled]);

  const stopSoftAmbient = useCallback(() => {
    if (bgGainRef.current && bgAudioCtxRef.current) {
      try {
        bgGainRef.current.gain.setTargetAtTime(0, bgAudioCtxRef.current.currentTime, 0.2);
        setTimeout(() => {
          if (bgAudioCtxRef.current && bgAudioCtxRef.current.state !== "closed") {
            bgAudioCtxRef.current.close().catch(() => {});
            bgAudioCtxRef.current = null;
            bgGainRef.current = null;
          }
        }, 300);
      } catch (e) {
        console.warn("Error cerrando fondo ambiental:", e);
      }
    }
  }, []);

  // Función infalible para detener cualquier reproducción previa y cancelar peticiones
  const stopAudio = useCallback(() => {
    // 1. Cancelar cualquier petición HTTP pendiente
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    requestIdRef.current += 1;

    // 2. Detener y desvincular el elemento HTMLAudioElement para evitar reproducción zombi
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onerror = null;
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current = null;
    }

    stopSoftAmbient();
    setAudioState("idle");
    setProgressPercent(0);
    setActiveSentenceIndex(0);
  }, [stopSoftAmbient]);

  // Limpieza al desmontar componente o cambiar de capítulo
  useEffect(() => {
    stopAudio();
    return () => {
      stopAudio();
    };
  }, [currentNodeId, stopAudio]);

  // Temporizador de sueño para la hora de dormir
  useEffect(() => {
    if (sleepTimerMinutes === 0) {
      setTimerSecondsLeft(0);
      return;
    }
    setTimerSecondsLeft(sleepTimerMinutes * 60);
  }, [sleepTimerMinutes]);

  useEffect(() => {
    if (timerSecondsLeft <= 0 || audioState !== "playing") return;

    const interval = setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          stopAudio();
          setSleepTimerMinutes(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerSecondsLeft, audioState, stopAudio]);

  const handleCycleSleepTimer = () => {
    const cycle = [0, 5, 15, 30];
    const nextIdx = (cycle.indexOf(sleepTimerMinutes) + 1) % cycle.length;
    setSleepTimerMinutes(cycle[nextIdx]);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Ejecutor de audio con protección de concurrencia
  const playAudioWithVoice = async (voiceId: string) => {
    const currentRequestId = ++requestIdRef.current;

    // Si ya había una petición pendiente, abortarla
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Detener cualquier audio previo
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current = null;
    }

    setAudioState("loading");

    try {
      const cacheKey = `${currentNodeId}-${voiceId}`;
      let audioUrl = audioCacheRef.current.get(cacheKey);

      if (!audioUrl) {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            text: cleanSpeechText,
            voice: voiceId,
            rate: "0%",
            pitch: "0Hz",
          }),
        });

        if (!res.ok) throw new Error("No se pudo obtener la narración");

        const blob = await res.blob();
        audioUrl = URL.createObjectURL(blob);
        audioCacheRef.current.set(cacheKey, audioUrl);
      }

      // Comprobar que esta petición siga siendo la más reciente
      if (requestIdRef.current !== currentRequestId) {
        return;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (requestIdRef.current !== currentRequestId) return;
        if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
          const ratio = audio.currentTime / audio.duration;
          setProgressPercent(Math.min(ratio * 100, 100));
          const idx = Math.min(
            Math.floor(ratio * sentences.length),
            sentences.length - 1
          );
          setActiveSentenceIndex(idx);
        }
      };

      audio.onended = () => {
        if (requestIdRef.current !== currentRequestId) return;
        setAudioState("idle");
        setProgressPercent(100);
        setActiveSentenceIndex(sentences.length - 1);
        stopSoftAmbient();
      };

      audio.onerror = () => {
        if (requestIdRef.current !== currentRequestId) return;
        console.warn("Aviso en el reproductor de narración");
        setAudioState("idle");
        stopSoftAmbient();
      };

      await audio.play();

      if (requestIdRef.current === currentRequestId) {
        setAudioState("playing");
        startSoftAmbient();
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return; // Cancelación voluntaria normal
      }
      console.warn("Fallo en la narración:", err);
      if (requestIdRef.current === currentRequestId) {
        setAudioState("idle");
        stopSoftAmbient();
      }
    }
  };

  const handleTogglePlay = async () => {
    // 1. Pausar si está reproduciendo
    if (audioState === "playing" && audioRef.current) {
      audioRef.current.pause();
      setAudioState("paused");
      stopSoftAmbient();
      return;
    }

    // 2. Reanudar si estaba pausado
    if (audioState === "paused" && audioRef.current) {
      try {
        await audioRef.current.play();
        setAudioState("playing");
        startSoftAmbient();
      } catch (err) {
        console.warn("Error reanudando audio:", err);
        playAudioWithVoice(selectedVoiceId);
      }
      return;
    }

    // 3. Iniciar reproducción limpia
    playAudioWithVoice(selectedVoiceId);
  };

  const handleRestartAudio = () => {
    if (audioRef.current && audioState !== "idle") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setAudioState("playing");
        setProgressPercent(0);
        setActiveSentenceIndex(0);
        startSoftAmbient();
      }).catch(() => {
        playAudioWithVoice(selectedVoiceId);
      });
    } else {
      playAudioWithVoice(selectedVoiceId);
    }
  };

  // Cambio fluido de narradora: si ya estaba escuchando, continúa automáticamente con la nueva voz
  const handleSelectVoice = (voiceId: string) => {
    const wasActive = audioState === "playing" || audioState === "loading";
    setSelectedVoiceId(voiceId);
    stopAudio();
    if (wasActive) {
      setTimeout(() => {
        playAudioWithVoice(voiceId);
      }, 50);
    }
  };

  const handleChoice = (nextNodeId: string) => {
    stopAudio();

    const nextNode = story.nodes[nextNodeId];
    if (nextNode && nextNode.isEnding && !hasCompleted) {
      setHasCompleted(true);
      const awarded = nextNode.moralLesson?.starsAwarded || 5;
      onAwardStars(awarded);
    }

    setCurrentNodeId(nextNodeId);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Barra Superior estilo Vooks Reader */}
      <div
        className={`flex items-center justify-between pb-3 border-b-2 ${
          isNightMode ? "border-[#252C48]" : "border-[#EFE6DA]"
        }`}
      >
        <button
          onClick={() => {
            stopAudio();
            onExit();
          }}
          className={`font-display font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border transition-all active:scale-95 ${
            isNightMode
              ? "bg-[#1E243A] border-[#313B5E] text-slate-300 hover:text-white"
              : "bg-white border-[#EFE6DA] text-[#6E6259] hover:text-[#2D231B] shadow-2xs"
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-storybook-coral" />
          <span>Biblioteca</span>
        </button>

        <div className="text-center">
          <span
            className={`font-display font-bold text-sm block truncate max-w-[170px] ${
              isNightMode ? "text-white" : "text-[#2D231B]"
            }`}
          >
            {story.title}
          </span>
          <span className="text-[11px] font-display font-bold text-storybook-coral">
            Capítulo {currentNode.chapterNumber} de {currentNode.totalChapters}
          </span>
        </div>

        {/* Botón Superior de Play/Pause */}
        <button
          onClick={handleTogglePlay}
          disabled={audioState === "loading"}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 shadow-xs transition-all active:scale-95 relative ${
            audioState === "playing"
              ? "bg-[#FEF9EE] border-amber-400 text-amber-600 animate-pulse scale-105"
              : isNightMode
              ? "bg-[#1E243A] border-[#313B5E] text-slate-300"
              : "bg-white border-[#EFE6DA] text-[#6E6259]"
          }`}
          title={audioState === "playing" ? "Pausar narración" : "Escuchar cuento"}
        >
          {audioState === "loading" ? (
            <Loader2 className="w-5 h-5 text-storybook-coral animate-spin" />
          ) : audioState === "playing" ? (
            <Pause className="w-5 h-5 text-storybook-coral fill-current" />
          ) : (
            <Volume2 className="w-5 h-5 text-storybook-coral" />
          )}
        </button>
      </div>

      {/* Selector de Narradora del Cuento (Humana, Cálida y sin Términos Técnicos) */}
      <div className="p-3 rounded-3xl bg-[#FFFDF9] dark:bg-[#15192B] border-2 border-[#EFE6DA] dark:border-[#2D3352] space-y-2.5">
        <div className="flex items-center justify-between px-1 text-xs font-display font-bold">
          <span className="text-storybook-coral flex items-center gap-1.5">
            <span>📖</span>
            <span>Narradora del Cuento:</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCycleSleepTimer}
              className={`text-[11px] flex items-center gap-1 px-2.5 py-0.5 rounded-full border transition-all active:scale-95 ${
                sleepTimerMinutes > 0
                  ? "bg-indigo-100 border-indigo-300 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 font-bold"
                  : "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
              title="Temporizador de apagado de cuna para dormir"
            >
              <Moon className="w-3 h-3 text-indigo-500" />
              <span>
                {sleepTimerMinutes > 0
                  ? `Apagar: ${formatTimer(timerSecondsLeft)}`
                  : "Sueño"}
              </span>
            </button>

            <button
              onClick={() => setIsBgMusicEnabled(!isBgMusicEnabled)}
              className={`text-[11px] flex items-center gap-1 px-2 py-0.5 rounded-full border transition-colors ${
                isBgMusicEnabled
                  ? "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
                  : "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
              title="Activar/desactivar música suave de fondo"
            >
              <Music className="w-3 h-3" />
              <span>{isBgMusicEnabled ? "Música" : "Muda"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {STORY_NARRATORS.map((v) => {
            const isSelected = selectedVoiceId === v.id;
            return (
              <button
                key={v.id}
                onClick={() => handleSelectVoice(v.id)}
                className={`p-2.5 rounded-2xl text-center border-2 transition-all flex flex-col items-center justify-center active:scale-95 ${
                  isSelected
                    ? "bg-storybook-coral text-white border-[#D94524] shadow-xs scale-[1.02]"
                    : isNightMode
                    ? "bg-[#1E2238] border-[#2D3352] text-slate-300 hover:border-slate-500"
                    : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B] hover:border-amber-300"
                }`}
              >
                <span className="font-display font-bold text-xs block truncate w-full">
                  {v.name}
                </span>
                <span className="text-[10px] font-body opacity-90 block mt-0.5 line-clamp-1">
                  {v.desc}
                </span>
                <span
                  className={`text-[9px] font-display font-bold px-1.5 py-0.2 rounded-full mt-1.5 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-amber-100 dark:bg-slate-800 text-amber-800 dark:text-amber-300"
                  }`}
                >
                  {v.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Escena Ilustrada del Cuento */}
      <div
        className={`rounded-[36px] p-5 md:p-6 border-2 text-center space-y-4 shadow-storybook relative overflow-hidden transition-all ${
          isNightMode
            ? "bg-[#1C2035] border-[#2D3352] text-white"
            : "bg-gradient-to-b from-[#FFFDF9] to-[#FBF6ED] border-[#EFE6DA] text-[#2D231B]"
        }`}
      >
        {/* Banner de Ilustración */}
        <div
          className={`w-full h-36 rounded-3xl bg-gradient-to-br ${story.gradientBg} flex items-center justify-center text-6xl shadow-md border-2 border-white/30 relative overflow-hidden sparkle-float`}
        >
          <span className="drop-shadow-lg transform hover:scale-110 transition-transform">
            {currentNode.sceneEmoji}
          </span>

          {/* Barra de progreso de lectura interactiva */}
          {progressPercent > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Control Principal de Audio y Estado */}
        <div className="flex items-center justify-between border-b pb-2 pt-1 border-inherit">
          <span
            className={`text-[11px] font-display font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
              isNightMode
                ? "bg-[#1E293B] text-[#34D399] border-[#334155]"
                : "bg-emerald-100 text-emerald-800 border-emerald-200"
            }`}
          >
            Aventura de {profile.name}
          </span>

          <div className="flex items-center gap-2">
            {audioState === "playing" || audioState === "paused" ? (
              <button
                onClick={handleRestartAudio}
                className="text-xs font-display font-bold text-[#786C60] hover:text-[#2D231B] flex items-center gap-1 active:scale-95"
                title="Volver a escuchar desde el principio"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            ) : null}

            <button
              onClick={handleTogglePlay}
              disabled={audioState === "loading"}
              className="btn-toy-coral px-4 py-2 rounded-xl bg-storybook-coral text-white font-display font-bold text-xs shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              {audioState === "loading" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparando voz...</span>
                </>
              ) : audioState === "playing" ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{audioState === "paused" ? "Continuar" : "Escuchar Cuento"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Texto del Cuento con Resaltado Suave en Tiempo Real (Read-Along) */}
        <div className="space-y-3 text-left">
          <div className="space-y-1.5 text-base md:text-lg leading-relaxed font-body font-semibold">
            {sentences.map((sentence, idx) => {
              const isHighlight =
                audioState === "playing" && activeSentenceIndex === idx;
              return (
                <span
                  key={idx}
                  className={`transition-all duration-300 inline ${
                    isHighlight
                      ? "bg-amber-200/90 dark:bg-amber-900/70 text-[#2D231B] dark:text-amber-100 px-1.5 py-0.5 rounded-lg shadow-2xs font-bold"
                      : isNightMode
                      ? "text-slate-100"
                      : "text-[#3A2E24]"
                  }`}
                >
                  {sentence}{" "}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decisiones Táctiles Grandes */}
      {!currentNode.isEnding && currentNode.choices && (
        <div className="space-y-3 pt-2">
          <div
            className={`flex items-center gap-1.5 text-xs font-display font-bold ${
              isNightMode ? "text-slate-300" : "text-[#4A3D31]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-storybook-coral animate-bounce" />
            <span>¿Qué decides que haga {profile.name}?</span>
          </div>

          <div className="space-y-2.5">
            {currentNode.choices.map((choice, index) => {
              const isFirst = index === 0;
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.nextNodeId)}
                  className={`w-full text-left p-4 rounded-3xl border-2 transition-all flex items-center justify-between group shadow-sm active:scale-98 ${
                    isFirst
                      ? "btn-toy-coral bg-gradient-to-r from-[#FF7A59] to-[#FF6B4A] border-[#D94524] text-white"
                      : "btn-toy-mint bg-gradient-to-r from-[#10B981] to-[#059669] border-[#047857] text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-2xl bg-white/20 backdrop-blur-xs font-display font-black text-sm flex items-center justify-center shrink-0 border border-white/30">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-display font-bold text-sm leading-snug block">
                        {choice.label}
                      </span>
                      <span className="text-xs block mt-0.5 opacity-90 font-body font-medium">
                        {choice.hint}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl group-hover:translate-x-1.5 transition-transform pl-2 font-display font-bold">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pantalla Final con Lección Moral */}
      {currentNode.isEnding && (
        <div className="space-y-3.5 pt-2">
          {currentNode.moralLesson && (
            <div
              className={`p-5 rounded-[32px] border-2 shadow-storybook space-y-2.5 text-center ${
                isNightMode
                  ? "bg-[#172723] border-[#204E40] text-slate-100"
                  : "bg-gradient-to-b from-[#F0FDF4] to-[#ECFDF5] border-[#A7F3D0] text-[#1F2421]"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white mx-auto flex items-center justify-center text-2xl shadow-sm">
                🌟
              </div>
              <h3 className="font-display font-bold text-base text-emerald-800 dark:text-emerald-300">
                {currentNode.moralLesson.title}
              </h3>
              <p className="text-xs md:text-sm font-body leading-relaxed text-[#475569] dark:text-slate-200">
                {currentNode.moralLesson.description}
              </p>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-300 text-amber-900 dark:text-amber-200 font-display font-bold text-xs mt-1 shadow-2xs">
                <span>¡Has ganado +{currentNode.moralLesson.starsAwarded} Estrellas Mágicas!</span>
                <span>⭐</span>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              stopAudio();
              onExit();
            }}
            className="w-full py-4 rounded-3xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-sm shadow-md flex items-center justify-center gap-2"
          >
            <span>Guardar en el Diario de {profile.name} y Volver</span>
            <span>⭐</span>
          </button>
        </div>
      )}
    </div>
  );
}
