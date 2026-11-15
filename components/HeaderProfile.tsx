"use client";

import React from "react";
import { Star, Crown, ChevronDown, Sparkles } from "lucide-react";
import { ChildProfile } from "@/lib/types";

interface HeaderProfileProps {
  profile: ChildProfile;
  profilesList: ChildProfile[];
  onSelectChild: (childId: string) => void;
  isNightMode: boolean;
  isPro: boolean;
  onOpenPersonalize: () => void;
  onOpenShop: () => void;
}

export default function HeaderProfile({
  profile,
  profilesList,
  onSelectChild,
  isNightMode,
  isPro,
  onOpenPersonalize,
  onOpenShop,
}: HeaderProfileProps) {
  // Accesorio equipado
  const accessoryEmoji =
    profile.equippedAccessory === "acc-crown"
      ? "👑"
      : profile.equippedAccessory === "acc-cape"
      ? "🧣"
      : profile.equippedAccessory === "acc-compass"
      ? "🧭"
      : null;

  return (
    <header className="flex items-center justify-between pb-3 pt-1">
      {/* Información del Niño y Selector Multi-Hijo */}
      <div className="flex items-center gap-3">
        <div
          onClick={onOpenPersonalize}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-xs transition-colors border cursor-pointer touch-press relative ${
            isNightMode
              ? "bg-[#1E293B] border-[#334155]"
              : "bg-[#EBF5F1] border-[#C5DDD2]"
          }`}
          title="Editar perfil infantil"
        >
          {profile.avatarEmoji || "🦊"}
          {accessoryEmoji && (
            <div className="absolute -top-2 -left-1 text-sm drop-shadow">
              {accessoryEmoji}
            </div>
          )}
          {isPro && (
            <div className="absolute -top-1 -right-1 bg-[#D97706] text-white p-0.5 rounded-full shadow-xs">
              <Crown className="w-2.5 h-2.5 fill-current" />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            {/* Si es Pro y hay varios niños, permite cambiar de hijo */}
            {isPro && profilesList.length > 1 ? (
              <div className="relative inline-flex items-center">
                <select
                  value={profile.id}
                  onChange={(e) => onSelectChild(e.target.value)}
                  className={`font-display font-bold text-sm tracking-tight bg-transparent border-0 outline-none pr-4 cursor-pointer ${
                    isNightMode ? "text-white" : "text-ink-primary"
                  }`}
                >
                  {profilesList.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      className={isNightMode ? "bg-[#1A2333] text-white" : "bg-white text-ink-primary"}
                    >
                      Aventuras de {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-0 pointer-events-none opacity-60" />
              </div>
            ) : (
              <h1
                onClick={onOpenPersonalize}
                className={`font-display font-bold text-sm tracking-tight cursor-pointer hover:underline ${
                  isNightMode ? "text-white" : "text-ink-primary"
                }`}
              >
                Aventuras de {profile.name}
              </h1>
            )}

            <span className="text-[10px] text-storybook-coral font-bold px-1.5 py-0.2 rounded-full bg-storybook-coral/10">
              {profile.age} años
            </span>

            {isPro && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] flex items-center gap-0.5">
                <Crown className="w-2.5 h-2.5 fill-current text-[#D97706]" />
                <span>PRO</span>
              </span>
            )}
          </div>

          <p
            onClick={onOpenPersonalize}
            className={`text-[11px] flex items-center gap-1 cursor-pointer ${
              isNightMode ? "text-slate-400" : "text-ink-secondary"
            }`}
          >
            <span>Con {profile.petName}</span>
            <span className="text-storybook-coral text-[9px]">✎ editar</span>
          </p>
        </div>
      </div>

      {/* Botón Táctil: Bazar de Estrellas Mágicas */}
      <button
        onClick={onOpenShop}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xs select-none touch-press transition-all hover:scale-105 ${
          isNightMode
            ? "bg-[#282218] border-[#78541D] text-[#FBBF24] hover:bg-[#382B18]"
            : "bg-[#FEF9EE] border-[#FDE8B3] text-[#B45309] hover:bg-[#FEF3C7]"
        }`}
        title="Toca para abrir el Bazar de las Estrellas Mágicas"
      >
        <Star className="w-4 h-4 fill-current animate-pulse text-[#E5A93C]" />
        <span className="font-display font-bold text-xs tracking-tight">
          {profile.starsCount}
        </span>
        <span className="text-[10px] opacity-80 font-semibold">★</span>
        <span className="text-[9px] px-1 py-0.2 rounded-md bg-[#D97706]/20 text-[#B45309] font-bold">
          Bazar
        </span>
      </button>
    </header>
  );
}
