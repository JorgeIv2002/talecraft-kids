"use client";

import React from "react";
import { Star, Sparkles } from "lucide-react";
import { ChildProfile } from "@/lib/types";

interface HeaderProfileProps {
  profile: ChildProfile;
  isNightMode: boolean;
  onOpenPersonalize: () => void;
}

export default function HeaderProfile({
  profile,
  isNightMode,
  onOpenPersonalize,
}: HeaderProfileProps) {
  return (
    <header className="flex items-center justify-between pb-3 pt-1">
      {/* Información del Niño */}
      <div
        onClick={onOpenPersonalize}
        className="flex items-center gap-3 cursor-pointer group touch-press"
        title="Toca para editar el perfil del héroe"
      >
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-xs transition-colors border ${
            isNightMode
              ? "bg-[#1E293B] border-[#334155]"
              : "bg-[#EBF5F1] border-[#C5DDD2]"
          }`}
        >
          🦊
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1
              className={`font-display font-bold text-sm tracking-tight ${
                isNightMode ? "text-white" : "text-ink-primary"
              }`}
            >
              Aventuras de {profile.name}
            </h1>
            <span className="text-[10px] text-storybook-coral font-bold px-1.5 py-0.2 rounded-full bg-storybook-coral/10">
              {profile.age} años
            </span>
          </div>
          <p
            className={`text-[11px] flex items-center gap-1 ${
              isNightMode ? "text-slate-400" : "text-ink-secondary"
            }`}
          >
            <span>Con {profile.petName}</span>
            <span className="text-storybook-coral text-[9px]">✎ editar</span>
          </p>
        </div>
      </div>

      {/* Contador de Estrellas Mágicas */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xs select-none transition-all ${
          isNightMode
            ? "bg-[#282218] border-[#78541D] text-[#FBBF24]"
            : "bg-[#FEF9EE] border-[#FDE8B3] text-[#B45309]"
        }`}
      >
        <Star className="w-4 h-4 fill-current animate-pulse text-[#E5A93C]" />
        <span className="font-display font-bold text-xs tracking-tight">
          {profile.starsCount}
        </span>
        <span className="text-[10px] opacity-80 font-semibold">★</span>
      </div>
    </header>
  );
}
