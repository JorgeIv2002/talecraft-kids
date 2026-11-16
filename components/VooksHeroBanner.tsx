"use client";

import React from "react";
import { Play, Sparkles, Clock, Compass, ArrowRight } from "lucide-react";
import { Story, ChildProfile } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface VooksHeroBannerProps {
  story: Story;
  profile: ChildProfile;
  isNightMode: boolean;
  onStartStory: (story: Story) => void;
}

export default function VooksHeroBanner({
  story,
  profile,
  isNightMode,
  onStartStory,
}: VooksHeroBannerProps) {
  const { t } = useLanguage();

  return (
    <section className="relative group cursor-pointer" onClick={() => onStartStory(story)}>
      {/* Tarjeta Cinematográfica Estilo Vooks */}
      <div
        className={`w-full rounded-[34px] p-5 md:p-6 bg-gradient-to-br ${story.gradientBg} text-white shadow-storybook relative overflow-hidden flex flex-col justify-between min-h-[220px] border-2 border-white/20`}
      >
        {/* Elementos flotantes de fondo */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute top-3 right-4 opacity-15 font-display font-black text-7xl select-none pointer-events-none">
          {story.coverEmoji}
        </div>

        {/* Cabecera del Hero */}
        <div className="flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md font-display font-bold text-xs uppercase tracking-wider border border-white/30 flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-current text-yellow-300" />
            <span>{t.hero.featuredBadge}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-md font-display font-bold text-xs flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{story.estimatedMinutes} {t.hero.min}</span>
          </span>
        </div>

        {/* Contenido Central: Gran Título y Sinopsis */}
        <div className="z-10 my-3 space-y-1.5 max-w-[280px]">
          <h2 className="font-display font-bold text-xl md:text-2xl leading-tight drop-shadow-md">
            {story.title}
          </h2>
          <p className="text-xs font-body font-semibold text-white/90 line-clamp-2 leading-relaxed">
            {story.synopsis}
          </p>
        </div>

        {/* Pie con Botón de Reproducción Táctil */}
        <div className="z-10 flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs font-display font-bold bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-xs">
            <Compass className="w-3.5 h-3.5 text-yellow-300" />
            <span>{story.decisionsCount} {t.sections.decisions} · {profile.name}</span>
          </div>

          <button className="btn-toy-coral px-4 py-2 rounded-2xl bg-white text-storybook-coral hover:bg-[#FFF5EB] font-display font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <Play className="w-4 h-4 fill-current" />
            <span>{t.hero.startAdventure}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
