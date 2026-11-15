"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, ArrowLeft, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { Story, StoryNode, ChildProfile } from "@/lib/types";

interface StoryReaderProps {
  story: Story;
  profile: ChildProfile;
  isNightMode: boolean;
  onExit: () => void;
  onAwardStars: (count: number) => void;
}

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

  const currentNode: StoryNode = story.nodes[currentNodeId] || story.nodes[story.startNodeId];

  // Reemplazar dinámicamente nombres por el héroe personalizado
  const personalizedText = currentNode.text
    .replace(/Barnaby/g, `Barnaby (con ${profile.name})`)
    .replace(/Mateo/g, profile.name)
    .replace(/Chispas/g, profile.petName);

  // Narración por voz (Web Speech API)
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentNodeId]);

  const toggleNarration = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("La narración por voz no está disponible en este navegador.");
      return;
    }

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(personalizedText);
      utterance.lang = "es-ES";
      utterance.rate = 0.9; // Ritmo pausado y relajante para niños
      utterance.pitch = 1.05;
      utterance.onend = () => setIsNarrating(false);
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
      const awarded = nextNode.moralLesson?.starsAwarded || 1;
      onAwardStars(awarded);
    }

    setCurrentNodeId(nextNodeId);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Barra Superior del Cuento */}
      <div
        className={`flex items-center justify-between pb-3 border-b ${
          isNightMode ? "border-[#253248]" : "border-[#EFE9DF]"
        }`}
      >
        <button
          onClick={onExit}
          className={`text-xs font-bold flex items-center gap-1.5 touch-press ${
            isNightMode ? "text-slate-400 hover:text-white" : "text-ink-secondary hover:text-ink-primary"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Biblioteca</span>
        </button>

        <div className="text-center">
          <span
            className={`font-display font-bold text-xs block truncate max-w-[170px] ${
              isNightMode ? "text-white" : "text-ink-primary"
            }`}
          >
            {story.title}
          </span>
          <span className="text-[10px] text-storybook-coral font-bold">
            Capítulo {currentNode.chapterNumber} de {currentNode.totalChapters}
          </span>
        </div>

        {/* Botón de Audio Narrador */}
        <button
          onClick={toggleNarration}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center border shadow-xs touch-press transition-all ${
            isNarrating
              ? "bg-[#FEF9EE] border-storybook-amber text-storybook-amber animate-pulse"
              : isNightMode
              ? "bg-[#1A2333] border-[#2D3748] text-slate-300"
              : "bg-white border-[#EFE9DF] text-ink-secondary"
          }`}
          title={isNarrating ? "Pausar narración" : "Escuchar narración en voz alta"}
        >
          {isNarrating ? (
            <VolumeX className="w-4 h-4 text-storybook-coral" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Escena Ilustrada Activa */}
      <div
        className={`rounded-3xl p-5 border text-center space-y-3.5 shadow-xs transition-colors ${
          isNightMode
            ? "bg-[#1A2333] border-[#2D3748] text-white"
            : "bg-white border-[#EFE9DF] text-ink-primary"
        }`}
      >
        {/* Emoji de Escena con micro-animación */}
        <div
          className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-inner border transition-transform ${
            isNightMode
              ? "bg-[#253248] border-[#334155]"
              : "bg-[#FEF9EE] border-[#FDE8B3]"
          }`}
        >
          {currentNode.sceneEmoji}
        </div>

        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isNightMode
                  ? "bg-[#1E293B] text-[#34D399]"
                  : "bg-storybook-mintLight text-storybook-mint"
              }`}
            >
              Héroe: {profile.name}
            </span>
            <span className="text-[10px] text-storybook-amber font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Toma tu decisión
            </span>
          </div>

          <p
            className={`text-sm md:text-base leading-relaxed font-normal ${
              isNightMode ? "text-slate-200" : "text-ink-primary"
            }`}
          >
            {personalizedText}
          </p>
        </div>
      </div>

      {/* Bifurcaciones de Decisión o Pantalla Final */}
      {!currentNode.isEnding && currentNode.choices && (
        <div className="space-y-2.5 pt-1">
          <div
            className={`flex items-center gap-1.5 text-xs font-bold ${
              isNightMode ? "text-slate-300" : "text-ink-primary"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-storybook-coral" />
            <span>¿Qué camino eliges para {profile.name}?</span>
          </div>

          <div className="space-y-2">
            {currentNode.choices.map((choice, index) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.nextNodeId)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all touch-press flex items-center justify-between group shadow-xs ${
                  isNightMode
                    ? "bg-[#1A2333] border-[#2D3748] hover:border-storybook-coral text-white"
                    : "bg-white border-[#EFE9DF] hover:border-storybook-coral text-ink-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl font-display font-bold text-xs flex items-center justify-center shrink-0 ${
                      index === 0
                        ? "bg-[#FEF3C7] text-[#B45309]"
                        : "bg-[#DCFCE7] text-[#166534]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <span className="font-display font-bold text-xs leading-snug block">
                      {choice.label}
                    </span>
                    <span
                      className={`text-[11px] block mt-0.5 ${
                        isNightMode ? "text-slate-400" : "text-ink-secondary"
                      }`}
                    >
                      {choice.hint}
                    </span>
                  </div>
                </div>
                <span className="text-storybook-coral group-hover:translate-x-1 transition-transform pl-2">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pantalla Final: Moraleja Desbloqueada y Celebración */}
      {currentNode.isEnding && (
        <div className="space-y-3 pt-2">
          {currentNode.moralLesson && (
            <div
              className={`p-4 rounded-3xl border shadow-xs space-y-2 ${
                isNightMode
                  ? "bg-[#172723] border-[#204E40] text-slate-200"
                  : "bg-[#EBF5F1] border-[#A3D9C9] text-ink-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xs text-storybook-mint flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {currentNode.moralLesson.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-storybook-amber/20 text-[#B45309] dark:text-[#FBBF24] text-[10px] font-bold">
                  +{currentNode.moralLesson.starsAwarded} ⭐
                </span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isNightMode ? "text-slate-300" : "text-[#475569]"
                }`}
              >
                {currentNode.moralLesson.description}
              </p>
            </div>
          )}

          <button
            onClick={onExit}
            className="w-full py-3.5 rounded-2xl bg-storybook-coral hover:bg-storybook-coralHover text-white font-display font-bold text-xs shadow-md touch-press flex items-center justify-center gap-2"
          >
            <span>Guardar en el Diario de {profile.name} y Volver</span>
            <span>⭐</span>
          </button>
        </div>
      )}
    </div>
  );
}
