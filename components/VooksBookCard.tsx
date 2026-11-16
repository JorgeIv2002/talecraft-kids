"use client";

import React from "react";
import { Clock, Lock, Crown, Headphones, Sparkles, Play } from "lucide-react";
import { Story } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface VooksBookCardProps {
  story: Story;
  isNightMode: boolean;
  isPro: boolean;
  onSelect: (story: Story) => void;
  onRequestPro: () => void;
}

export default function VooksBookCard({
  story,
  isNightMode,
  isPro,
  onSelect,
  onRequestPro,
}: VooksBookCardProps) {
  const { t } = useLanguage();
  const isLocked = story.isPremium && !isPro;

  const handleClick = () => {
    if (isLocked) {
      onRequestPro();
    } else {
      onSelect(story);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-40 sm:w-44 shrink-0 flex flex-col cursor-pointer group select-none touch-press"
    >
      {/* Portada Estilo Libro Ilustrado Vertical (Aspect Ratio 4:5) */}
      <div
        className={`w-full aspect-[4/5] rounded-[26px] bg-gradient-to-b ${story.gradientBg} p-3.5 flex flex-col justify-between relative overflow-hidden shadow-storybook group-hover:shadow-storybook-hover transition-all border-2 border-white/20`}
      >
        {/* Badges Superiores */}
        <div className="flex items-center justify-between z-10">
          {story.isAudioOnly ? (
            <span className="px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white font-display font-bold text-[10px] flex items-center gap-1 border border-white/20">
              <Headphones className="w-2.5 h-2.5" />
              <span>Audio</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-md text-white font-display font-bold text-[10px] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>{story.estimatedMinutes}m</span>
            </span>
          )}

          {story.isPremium && (
            <span
              className={`p-1 rounded-full text-[10px] shadow-sm flex items-center justify-center ${
                isPro
                  ? "bg-[#F59E0B] text-white"
                  : "bg-black/50 text-white backdrop-blur-xs"
              }`}
            >
              {isPro ? (
                <Crown className="w-3 h-3 fill-current" />
              ) : (
                <Lock className="w-3 h-3" />
              )}
            </span>
          )}
        </div>

        {/* Ilustración Central del Cuento */}
        <div className="my-auto text-center transform group-hover:scale-115 transition-transform duration-300">
          <span className="text-5xl drop-shadow-md inline-block">
            {story.coverEmoji}
          </span>
        </div>

        {/* Título en la Base de la Portada */}
        <div className="z-10 bg-black/35 backdrop-blur-xs -mx-3.5 -mb-3.5 p-2.5 rounded-b-[24px]">
          <h4 className="font-display font-bold text-xs text-white line-clamp-1 leading-snug drop-shadow-xs">
            {story.title}
          </h4>
          <span className="text-[10px] font-body text-white/80 block line-clamp-1">
            {story.valueCategory}
          </span>
        </div>

        {/* Candado overlay si está bloqueado */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-2xs flex flex-col items-center justify-center text-white space-y-1">
            <div className="w-9 h-9 rounded-2xl bg-[#D97706] flex items-center justify-center shadow-md">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-[10px] bg-black/60 px-2 py-0.5 rounded-full">
              {t.nav.pro}
            </span>
          </div>
        )}
      </div>

      {/* Título y metadatos debajo de la portada */}
      <div className="pt-2 px-1 space-y-0.5">
        <h3
          className={`font-display font-bold text-xs leading-snug line-clamp-1 group-hover:text-storybook-coral transition-colors ${
            isNightMode ? "text-white" : "text-[#2D231B]"
          }`}
        >
          {story.title}
        </h3>
        <p className="text-[11px] font-body text-[#786C60] dark:text-slate-400 line-clamp-1">
          {story.decisionsCount} {t.sections.decisions}
        </p>
      </div>
    </div>
  );
}
