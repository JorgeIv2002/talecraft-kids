"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Story } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import VooksBookCard from "./VooksBookCard";

interface VooksSectionRowProps {
  title: string;
  subtitle?: string;
  stories: Story[];
  isNightMode: boolean;
  isPro: boolean;
  onSelectStory: (story: Story) => void;
  onRequestPro: () => void;
  onViewAll?: () => void;
}

export default function VooksSectionRow({
  title,
  subtitle,
  stories,
  isNightMode,
  isPro,
  onSelectStory,
  onRequestPro,
  onViewAll,
}: VooksSectionRowProps) {
  const { t } = useLanguage();
  if (stories.length === 0) return null;

  return (
    <section className="space-y-2.5">
      {/* Cabecera de la Fila con botón de explorar */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3
            className={`font-display font-bold text-base tracking-normal flex items-center gap-1 cursor-pointer group ${
              isNightMode ? "text-white" : "text-[#2D231B]"
            }`}
            onClick={onViewAll}
          >
            <span>{title}</span>
            <ChevronRight className="w-4 h-4 text-storybook-coral group-hover:translate-x-1 transition-transform" />
          </h3>
          {subtitle && (
            <p className="text-[11px] font-body text-[#786C60] dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <button
          onClick={onViewAll}
          className="text-xs font-display font-bold text-storybook-coral hover:underline"
        >
          {t.sections.seeAll}
        </button>
      </div>

      {/* Riel de Desplazamiento Horizontal (Netflix / Vooks Kids style) */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 pt-0.5 px-1">
        {stories.map((story) => (
          <VooksBookCard
            key={story.id}
            story={story}
            isNightMode={isNightMode}
            isPro={isPro}
            onSelect={onSelectStory}
            onRequestPro={onRequestPro}
          />
        ))}
      </div>
    </section>
  );
}
