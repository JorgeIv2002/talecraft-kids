"use client";

import React from "react";
import { Clock, Compass, ArrowRight, Lock, Crown, Sparkles } from "lucide-react";
import { Story } from "@/lib/types";

interface StoryCardProps {
  story: Story;
  isNightMode: boolean;
  isPro: boolean;
  onSelect: (story: Story) => void;
  onRequestPro: () => void;
}

export default function StoryCard({
  story,
  isNightMode,
  isPro,
  onSelect,
  onRequestPro,
}: StoryCardProps) {
  const isLocked = story.isPremium && !isPro;

  const handleClick = () => {
    if (isLocked) {
      onRequestPro();
    } else {
      onSelect(story);
    }
  };

  // Fondos pastel degradados según la categoría
  const categoryGradients: Record<string, string> = {
    Amistad: "from-[#FEF3C7] to-[#FDE68A]",
    Perseverancia: "from-[#FFEDD5] to-[#FED7AA]",
    Naturaleza: "from-[#DCFCE7] to-[#BBF7D0]",
    Generosidad: "from-[#F3E8FF] to-[#E9D5FF]",
    Curiosidad: "from-[#E0F2FE] to-[#BAE6FD]",
  };

  const bgGradient = categoryGradients[story.valueCategory] || "from-[#FEF3C7] to-[#FDE68A]";

  return (
    <article
      onClick={handleClick}
      className={`rounded-[30px] p-4.5 border-2 transition-all cursor-pointer card-storybook flex flex-col justify-between group relative overflow-hidden ${
        isNightMode
          ? "bg-[#1C2035] border-[#2D3352] hover:border-[#FF6B4A] text-white"
          : "bg-white border-[#EFE6DA] hover:border-[#FF6B4A] text-[#2D231B]"
      }`}
    >
      <div>
        {/* Metadatos superiores con badges estilo sticker */}
        <div className="flex items-center justify-between pb-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-display font-bold tracking-wide border ${
                isNightMode
                  ? "bg-[#252C48] text-[#34D399] border-[#38436B]"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              🌿 {story.valueCategory}
            </span>

            {story.isPremium && (
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-display font-bold flex items-center gap-1 shadow-2xs ${
                  isPro
                    ? "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]"
                    : "bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]"
                }`}
              >
                {isPro ? (
                  <>
                    <Crown className="w-3.5 h-3.5 fill-current text-[#D97706]" />
                    <span>👑 Desbloqueado</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span>Pase Pro</span>
                  </>
                )}
              </span>
            )}
          </div>

          <span
            className={`text-xs font-display font-semibold flex items-center gap-1 ${
              isNightMode ? "text-slate-400" : "text-[#786C60]"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-storybook-coral" />
            {story.estimatedMinutes} min
          </span>
        </div>

        {/* Título y contenido principal con Avatar Orgánico */}
        <div className="flex items-start gap-3.5 mt-1">
          <div
            className={`w-15 h-15 rounded-3xl flex items-center justify-center text-4xl shrink-0 border-2 bg-gradient-to-br ${bgGradient} border-white dark:border-[#2D3352] shadow-sm relative`}
          >
            <span className="transform group-hover:scale-110 transition-transform">
              {story.coverEmoji}
            </span>
            {isLocked && (
              <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center backdrop-blur-2xs">
                <Lock className="w-6 h-6 text-white drop-shadow" />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-base leading-snug group-hover:text-storybook-coral transition-colors flex items-center gap-1.5">
              <span>{story.title}</span>
            </h3>
            <p
              className={`text-xs leading-relaxed font-body ${
                isNightMode ? "text-slate-300" : "text-[#6E6259]"
              }`}
            >
              {story.synopsis}
            </p>
          </div>
        </div>
      </div>

      {/* Pie de tarjeta con botón físico */}
      <div
        className={`mt-3.5 pt-3 flex items-center justify-between border-t text-xs ${
          isNightMode ? "border-[#252C48]" : "border-[#F4ECE1]"
        }`}
      >
        <span
          className={`text-xs font-display font-bold flex items-center gap-1.5 ${
            isNightMode ? "text-slate-400" : "text-[#786C60]"
          }`}
        >
          <Compass className="w-4 h-4 text-storybook-coral" />
          {story.decisionsCount} decisiones mágicas
        </span>

        {isLocked ? (
          <span className="text-amber-700 dark:text-amber-400 font-display font-bold text-xs flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-200">
            <span>Desbloquear</span>
            <Lock className="w-3.5 h-3.5" />
          </span>
        ) : (
          <span className="btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
            <span>Comenzar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </article>
  );
}
