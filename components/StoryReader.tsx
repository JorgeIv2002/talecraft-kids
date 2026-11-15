"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, ArrowLeft, Star, Sparkles, CheckCircle2, RotateCcw, Headphones, Loader2 } from "lucide-react";
import { Story, StoryNode, ChildProfile } from "@/lib/types";

interface StoryReaderProps {
  story: Story;
  profile: ChildProfile;
  isNightMode: boolean;
  onExit: () => void;
  onAwardStars: (count: number) => void;
}

const NEURAL_VOICES = [
  {
    id: "es-MX-DaliaNeural",
    name: "✨ Dalia (Hada Dulce)",
    desc: "Cálida, dulce y expresiva de actriz de doblaje",
    rate: "-4%",
    pitch: "+8Hz",
  },
  {
    id: "es-ES-ElviraNeural",
    name: "🌸 Elvira (Voz Maternal)",
    desc: "Suave, pausada y reconfortante para la noche",
    rate: "-6%",
    pitch: "+2Hz",
  },
  {
    id: "es-ES-AbrilNeural",
    name: "🌟 Abril (Voz Alegre)",
    desc: "Jovial, dulce y llena de ternura",
    rate: "-2%",
    pitch: "+6Hz",
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState("es-MX-DaliaNeural");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentNode: StoryNode = story.nodes[currentNodeId] || story.nodes[story.startNodeId];

  // Reemplazar nombres dinámicos
  const personalizedText = currentNode.text
    .replace(/Barnaby/g, `Barnaby (con ${profile.name})`)
    .replace(/Mateo/g, profile.name)
    .replace(/Chispas/g, profile.petName);

  // Divide el texto en oraciones para el Read-Along de Vooks
  const sentences = personalizedText.split(". ").filter(Boolean);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);

  // Detener audio al cambiar de escena o desmontar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setActiveSentenceIndex(0);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentNodeId]);

  const toggleNeuralAudio = async () => {
    // Si ya está reproduciendo, pausar
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // Si ya existe el audio creado y está pausado, reanudar
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // Generar audio neuronal humano en tiempo real desde /api/tts
    try {
      setIsLoadingAudio(true);
      const voiceConfig =
        NEURAL_VOICES.find((v) => v.id === selectedVoiceId) || NEURAL_VOICES[0];

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: personalizedText,
          voice: voiceConfig.id,
          rate: voiceConfig.rate,
          pitch: voiceConfig.pitch,
        }),
      });

      if (!res.ok) throw new Error("Error generando audio");

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (audio.duration) {
          const ratio = audio.currentTime / audio.duration;
          const idx = Math.min(
            Math.floor(ratio * sentences.length),
            sentences.length - 1
          );
          setActiveSentenceIndex(idx);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setActiveSentenceIndex(sentences.length - 1);
      };

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Fallo en TTS Neuronal, usando fallback local:", err);
      // Fallback a speech synthesis del navegador si la red falla
      fallbackBrowserSpeech();
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const fallbackBrowserSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(personalizedText);
    utterance.lang = "es-ES";
    utterance.pitch = 1.25;
    utterance.rate = 0.85;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleChoice = (nextNodeId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);

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

        {/* Botón de Narración con Voz Neuronal Humana */}
        <button
          onClick={toggleNeuralAudio}
          disabled={isLoadingAudio}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 shadow-xs transition-all active:scale-95 relative ${
            isPlaying
              ? "bg-[#FEF9EE] border-amber-400 text-amber-600 animate-pulse scale-105"
              : isNightMode
              ? "bg-[#1E243A] border-[#313B5E] text-slate-300"
              : "bg-white border-[#EFE6DA] text-[#6E6259]"
          }`}
          title={isPlaying ? "Pausar narración" : "Escuchar con voz humana real"}
        >
          {isLoadingAudio ? (
            <Loader2 className="w-5 h-5 text-storybook-coral animate-spin" />
          ) : isPlaying ? (
            <VolumeX className="w-5 h-5 text-storybook-coral" />
          ) : (
            <Volume2 className="w-5 h-5 text-storybook-coral" />
          )}
          <span className="absolute -top-1 -right-1 text-xs">🎙️</span>
        </button>
      </div>

      {/* Selector de Actriz de Doblaje / Voz Humana */}
      <div className="p-2 rounded-2xl bg-[#FFFDF9] dark:bg-[#15192B] border-2 border-[#EFE6DA] dark:border-[#2D3352] space-y-1.5">
        <div className="flex items-center justify-between px-1 text-[11px] font-display font-bold">
          <span className="text-storybook-coral flex items-center gap-1">
            <span>🎙️</span>
            <span>Voz de Actriz (IA Neuronal Real):</span>
          </span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">Calidad Estudio ✨</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {NEURAL_VOICES.map((v) => {
            const isSelected = selectedVoiceId === v.id;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVoiceId(v.id);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current = null;
                    setIsPlaying(false);
                  }
                }}
                className={`p-2 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? "bg-storybook-coral text-white border-[#D94524] shadow-xs"
                    : isNightMode
                    ? "bg-[#1E2238] border-[#2D3352] text-slate-300"
                    : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B]"
                }`}
              >
                <span className="font-display font-bold text-[11px] block line-clamp-1">
                  {v.name.split(" ")[1]}
                </span>
                <span className="text-[9px] font-body opacity-90 line-clamp-1">
                  {v.name.split("(")[1]?.replace(")", "") || "Dulce"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Escena Ilustrada Activa con Botón de Play Destacado */}
      <div
        className={`rounded-[36px] p-5 md:p-6 border-2 text-center space-y-4 shadow-storybook relative overflow-hidden transition-all ${
          isNightMode
            ? "bg-[#1C2035] border-[#2D3352] text-white"
            : "bg-gradient-to-b from-[#FFFDF9] to-[#FBF6ED] border-[#EFE6DA] text-[#2D231B]"
        }`}
      >
        {/* Banner Ilustrado */}
        <div
          className={`w-full h-36 rounded-3xl bg-gradient-to-br ${story.gradientBg} flex items-center justify-center text-6xl shadow-md border-2 border-white/30 relative overflow-hidden sparkle-float`}
        >
          <span className="drop-shadow-lg transform hover:scale-110 transition-transform">
            {currentNode.sceneEmoji}
          </span>
          {/* Badge Audio Humano */}
          <div className="absolute top-2.5 right-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-display font-bold flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-emerald-400"}`}></span>
            <span>{isPlaying ? "Reproduciendo Voz Real" : "Voz Humana Lista"}</span>
          </div>
        </div>

        {/* Texto con Resaltado Guiado (Read-Along) */}
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
            <button
              onClick={toggleNeuralAudio}
              className="text-xs font-display font-bold text-storybook-coral hover:underline flex items-center gap-1"
            >
              {isLoadingAudio ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Cargando audio...</span>
                </>
              ) : isPlaying ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>▶ Escuchar a la cuentacuentos</span>
                </>
              )}
            </button>
          </div>

          {/* Oraciones */}
          <div className="space-y-1.5 text-base md:text-lg leading-relaxed font-body font-semibold">
            {sentences.map((sentence, idx) => {
              const isHighlight = isPlaying && activeSentenceIndex === idx;
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

      {/* Pantalla Final */}
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
