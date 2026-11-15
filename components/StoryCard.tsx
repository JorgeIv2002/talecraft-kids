"use client";

import React from "react";
import { Clock, Compass, ArrowRight, Lock, Crown } from "lucide-react";
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

  return (
    <article
      onClick={handleClick}
      className={`rounded-3xl p-4 border transition-all cursor-pointer touch-press shadow-xs flex flex-col justify-between group relative overflow-hidden ${
        isNightMode
          ? "bg-[#1A2333] border-[#2D3748] hover:border-[#D9532F] text-white"
          : "bg-white border-[#EFE9DF] hover:border-[#D9532F] text-ink-primary"
      }`}
    >
      <div>
        {/* Metadatos superiores */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                isNightMode
                  ? "bg-[#1E293B] text-[#34D399] border-[#334155]"
                  : "bg-storybook-mintLight text-storybook-mint border-[#C5DDD2]"
              }`}
            >
              {story.valueCategory}
            </span>

            {story.isPremium && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                  isPro
                    ? "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]"
                    : "bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]"
                }`}
              >
                {isPro ? (
                  <>
                    <Crown className="w-3 h-3 fill-current text-[#D97706]" />
                    <span>👑 Desbloqueado</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-[#B91C1C]" />
                    <span>Pase Pro</span>
                  </>
                )}
              </span>
            )}
          </div>

          <span
            className={`text-[11px] font-medium flex items-center gap-1 ${
              isNightMode ? "text-slate-400" : "text-ink-secondary"
            }`}
          >
            <Clock className="w-3 h-3" />
            {story.estimatedMinutes} min
          </span>
        </div>

        {/* Título y contenido principal con Avatar */}
        <div className="flex items-start gap-3 mt-1.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border relative ${
              isNightMode
                ? "bg-[#253248] border-[#334155]"
                : "bg-[#FEF9EE] border-[#FDE8B3]"
            }`}
          >
            {story.coverEmoji}
            {isLocked && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center backdrop-blur-2xs">
                <Lock className="w-5 h-5 text-white drop-shadow" />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-sm leading-snug group-hover:text-storybook-coral transition-colors flex items-center gap-1.5">
              <span>{story.title}</span>
            </h3>
            <p
              className={`text-[11px] line-clamp-2 leading-relaxed ${
                isNightMode ? "text-slate-400" : "text-ink-secondary"
              }`}
            >
              {story.synopsis}
            </p>
          </div>
        </div>
      </div>

      {/* Pie de tarjeta */}
      <div
        className={`mt-3 pt-2.5 flex items-center justify-between border-t text-xs ${
          isNightMode ? "border-[#253248]" : "border-[#F4F1EA]"
        }`}
      >
        <span
          className={`text-[11px] flex items-center gap-1 font-medium ${
            isNightMode ? "text-slate-400" : "text-ink-secondary"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-storybook-coral" />
          {story.decisionsCount} decisiones
        </span>

        {isLocked ? (
          <span className="text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center gap-1">
            <span>Desbloquear con Pro</span>
            <Lock className="w-3 h-3" />
          </span>
        ) : (
          <span className="text-storybook-coral font-bold font-display text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Comenzar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </article>
  );
}
