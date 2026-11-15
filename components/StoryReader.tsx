"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, ArrowLeft, Star, Sparkles, CheckCircle2, RotateCcw, Headphones, Music2, Heart } from "lucide-react";
import { Story, StoryNode, ChildProfile } from "@/lib/types";

interface StoryReaderProps {
  story: Story;
  profile: ChildProfile;
  isNightMode: boolean;
  onExit: () => void;
  onAwardStars: (count: number) => void;
}

type VoiceStyle = "hada" | "mama" | "nana";

export default function StoryReader({
  story,
  profile,
  isNightMode,
  onExit,
  onAwardStars,
}: StoryReaderProps) {
  const [currentNodeId, setCurrentNodeId] = useState<string>(story.startNodeId);
  const [isNarrating, setIsNarrating] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("hada");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const currentNode: StoryNode = story.nodes[currentNodeId] || story.nodes[story.startNodeId];

  // Reemplazar nombres dinámicos
  const personalizedText = currentNode.text
    .replace(/Barnaby/g, `Barnaby (con ${profile.name})`)
    .replace(/Mateo/g, profile.name)
    .replace(/Chispas/g, profile.petName);

  // Divide el texto en oraciones para el Read-Along de Vooks
  const sentences = personalizedText.split(". ").filter(Boolean);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);

  // Cargar y seleccionar la mejor voz femenina en español
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const findBestFemaleVoice = (voices: SpeechSynthesisVoice[]) => {
      const spanishVoices = voices.filter((v) => v.lang.startsWith("es"));
      if (spanishVoices.length === 0) return null;

      // 1. Voces femeninas naturales de alta calidad (Microsoft Natural / Google)
      const naturalFemale = spanishVoices.find((v) => {
        const name = v.name.toLowerCase();
        return (
          (name.includes("natural") || name.includes("online") || name.includes("google")) &&
          (name.includes("dalia") ||
            name.includes("elvira") ||
            name.includes("sabina") ||
            name.includes("monica") ||
            name.includes("laura") ||
            name.includes("paulina") ||
            name.includes("español"))
        );
      });
      if (naturalFemale) return naturalFemale;

      // 2. Nombres femeninos comunes de voces TTS en español
      const femaleNames = [
        "dalia",
        "elvira",
        "sabina",
        "helena",
        "laura",
        "monica",
        "paulina",
        "lucia",
        "penelope",
        "conchita",
        "maria",
        "maría",
        "rosa",
        "carmen",
        "zira",
        "google español",
      ];
      const matched = spanishVoices.find((v) => {
        const name = v.name.toLowerCase();
        return femaleNames.some((fn) => name.includes(fn)) || name.includes("female") || name.includes("mujer");
      });
      if (matched) return matched;

      // 3. Fallback: primera voz en español disponible
      return spanishVoices[0];
    };

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      const best = findBestFemaleVoice(voices);
      if (best) {
        setSelectedVoice(best);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Cancelar narración al cambiar de capítulo
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      setActiveSentenceIndex(0);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentNodeId]);

  const toggleNarration = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("La narración no está disponible en este navegador.");
      return;
    }

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(personalizedText);
      utterance.lang = "es-ES";

      // Asignar voz femenina dulce seleccionada
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Parámetros de voz según el estilo elegido para máxima dulzura infantil
      if (voiceStyle === "hada") {
        // Tono cantarino, dulce y cariñoso de hada de cuentos
        utterance.pitch = 1.25;
        utterance.rate = 0.85;
      } else if (voiceStyle === "mama") {
        // Tono cálido, protector y maternal
        utterance.pitch = 1.12;
        utterance.rate = 0.82;
      } else {
        // Nana relajante para dormir
        utterance.pitch = 1.04;
        utterance.rate = 0.78;
      }

      utterance.onboundary = (event) => {
        if (event.name === "sentence" || event.charIndex > 0) {
          const ratio = event.charIndex / personalizedText.length;
          const idx = Math.min(Math.floor(ratio * sentences.length), sentences.length - 1);
          setActiveSentenceIndex(idx);
        }
      };

      utterance.onend = () => {
        setIsNarrating(false);
        setActiveSentenceIndex(sentences.length - 1);
      };
      utterance.onerror = () => setIsNarrating(false);

      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  const handleChoice = (nextNodeId: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    }

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
          onClick={onExit}
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

        {/* Botón de Narración con Dulce Voz Femenina */}
        <button
          onClick={toggleNarration}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 shadow-xs transition-all active:scale-95 relative ${
            isNarrating
              ? "bg-[#FEF9EE] border-amber-400 text-amber-600 animate-pulse scale-105"
              : isNightMode
              ? "bg-[#1E243A] border-[#313B5E] text-slate-300"
              : "bg-white border-[#EFE6DA] text-[#6E6259]"
          }`}
          title={isNarrating ? "Pausar narración" : "Escuchar voz dulce de cuentacuentos"}
        >
          {isNarrating ? (
            <VolumeX className="w-5 h-5 text-storybook-coral" />
          ) : (
            <Volume2 className="w-5 h-5 text-storybook-coral" />
          )}
          <span className="absolute -top-1 -right-1 text-xs">🧚‍♀️</span>
        </button>
      </div>

      {/* Selector de Estilo de Voz Dulce Femenina */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#15192B] border-2 border-[#EFE6DA] dark:border-[#2D3352] text-xs">
        <span className="text-[11px] font-display font-bold pl-2 text-storybook-coral flex items-center gap-1">
          <span>🧚‍♀️</span>
          <span className="hidden sm:inline">Voz de Mujer:</span>
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setVoiceStyle("hada")}
            className={`px-2.5 py-1 rounded-xl font-display font-bold text-[11px] transition-all ${
              voiceStyle === "hada"
                ? "bg-storybook-coral text-white shadow-2xs"
                : "text-[#786C60] dark:text-slate-300 hover:text-[#2D231B]"
            }`}
          >
            ✨ Dulce Hada
          </button>

          <button
            onClick={() => setVoiceStyle("mama")}
            className={`px-2.5 py-1 rounded-xl font-display font-bold text-[11px] transition-all ${
              voiceStyle === "mama"
                ? "bg-storybook-coral text-white shadow-2xs"
                : "text-[#786C60] dark:text-slate-300 hover:text-[#2D231B]"
            }`}
          >
            🌸 Mamá Sabia
          </button>

          <button
            onClick={() => setVoiceStyle("nana")}
            className={`px-2.5 py-1 rounded-xl font-display font-bold text-[11px] transition-all ${
              voiceStyle === "nana"
                ? "bg-storybook-coral text-white shadow-2xs"
                : "text-[#786C60] dark:text-slate-300 hover:text-[#2D231B]"
            }`}
          >
            🌙 Nana Relajante
          </button>
        </div>
      </div>

      {/* Escena Ilustrada Activa: Pantalla Vooks */}
      <div
        className={`rounded-[36px] p-5 md:p-6 border-2 text-center space-y-4 shadow-storybook relative overflow-hidden transition-all ${
          isNightMode
            ? "bg-[#1C2035] border-[#2D3352] text-white"
            : "bg-gradient-to-b from-[#FFFDF9] to-[#FBF6ED] border-[#EFE6DA] text-[#2D231B]"
        }`}
      >
        {/* Banner Ilustrado con Fondo de Color Vivo de la Historia */}
        <div
          className={`w-full h-36 rounded-3xl bg-gradient-to-br ${story.gradientBg} flex items-center justify-center text-6xl shadow-md border-2 border-white/30 relative overflow-hidden sparkle-float`}
        >
          <span className="drop-shadow-lg transform hover:scale-110 transition-transform">
            {currentNode.sceneEmoji}
          </span>
          {/* Badge Read-Along */}
          <div className="absolute top-2.5 right-3 bg-black/35 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-display font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Voz Femenina Activa</span>
          </div>
        </div>

        {/* Texto con Resaltado Guiado (Highlighted Read-Along Text de Vooks) */}
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] font-display font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                isNightMode
                  ? "bg-[#1E293B] text-[#34D399] border-[#334155]"
                  : "bg-emerald-100 text-emerald-800 border-emerald-200"
              }`}
            >
              Héroe: {profile.name}
            </span>
            <span className="text-[11px] font-display font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Tu turno de elegir
            </span>
          </div>

          {/* Oraciones interactivas */}
          <div className="space-y-1.5 text-base md:text-lg leading-relaxed font-body font-semibold">
            {sentences.map((sentence, idx) => {
              const isHighlight = isNarrating && activeSentenceIndex === idx;
              return (
                <span
                  key={idx}
                  className={`transition-all duration-200 inline ${
                    isHighlight
                      ? "bg-amber-200/90 dark:bg-amber-900/70 text-[#2D231B] dark:text-amber-100 px-1.5 py-0.5 rounded-lg shadow-2xs font-bold"
                      : isNightMode
                      ? "text-slate-100"
                      : "text-[#3A2E24]"
                  }`}
                >
                  {sentence}.{" "}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decisiones Táctiles Grandes Estilo Vooks */}
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

      {/* Pantalla Final: Moraleja y Estrellas */}
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
            onClick={onExit}
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
