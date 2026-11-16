"use client";

import React from "react";
import { Star, Crown, ChevronDown } from "lucide-react";
import { ChildProfile } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  const accessoryEmoji =
    profile.equippedAccessory === "acc-crown"
      ? "👑"
      : profile.equippedAccessory === "acc-cape"
      ? "🧣"
      : profile.equippedAccessory === "acc-compass"
      ? "🧭"
      : null;

  return (
    <header className="flex items-center justify-between pb-2 pt-1">
      {/* Información del Niño y Avatar Burbuja */}
      <div className="flex items-center gap-3">
        <div
          onClick={onOpenPersonalize}
          className={`w-13 h-13 rounded-3xl flex items-center justify-center text-3xl shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer relative border-2 ${
            isNightMode
              ? "bg-[#202742] border-[#384168]"
              : "bg-gradient-to-b from-[#FFF5EB] to-[#FFE8D6] border-[#FFD0B5]"
          }`}
          title="Editar perfil del pequeño héroe"
        >
          <span>{profile.avatarEmoji || "🦊"}</span>
          {accessoryEmoji && (
            <div className="absolute -top-2.5 -left-1 text-base drop-shadow animate-bounce">
              {accessoryEmoji}
            </div>
          )}
          {isPro && (
            <div className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-white p-1 rounded-full shadow-md border-2 border-white dark:border-[#202742]">
              <Crown className="w-2.5 h-2.5 fill-current" />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            {isPro && profilesList.length > 1 ? (
              <div className="relative inline-flex items-center">
                <select
                  value={profile.id}
                  onChange={(e) => onSelectChild(e.target.value)}
                  className={`font-display font-bold text-base tracking-normal bg-transparent border-0 outline-none pr-4 cursor-pointer ${
                    isNightMode ? "text-white" : "text-[#2D231B]"
                  }`}
                >
                  {profilesList.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      className={isNightMode ? "bg-[#1E2238] text-white" : "bg-white text-[#2D231B]"}
                    >
                      {t.header.adventuresOf} {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-0 pointer-events-none opacity-60" />
              </div>
            ) : (
              <h1
                onClick={onOpenPersonalize}
                className={`font-display font-bold text-base tracking-normal cursor-pointer hover:text-storybook-coral transition-colors ${
                  isNightMode ? "text-white" : "text-[#2D231B]"
                }`}
              >
                {t.header.adventuresOf} {profile.name}
              </h1>
            )}

            <span className="text-[11px] font-display font-bold px-2 py-0.5 rounded-full bg-[#FFEAE3] text-storybook-coral border border-[#FFD5C8]">
              {profile.age} {t.header.years}
            </span>
            <span
              className="text-[10px] font-display font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] flex items-center gap-0.5 shadow-2xs"
              title={t.header.streakTooltip}
            >
              <span>🔥</span>
              <span>3 {t.header.nights}</span>
            </span>
          </div>

          <p
            onClick={onOpenPersonalize}
            className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${
              isNightMode ? "text-slate-400" : "text-[#786C60]"
            }`}
          >
            <span>{t.header.with} {profile.petName}</span>
            <span className="text-storybook-coral text-[10px] font-bold">✎ {t.header.edit}</span>
          </p>
        </div>
      </div>

      {/* Botón Táctil de Estrellas con Estilo de Botón de Juguete */}
      <button
        onClick={onOpenShop}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl border-2 shadow-sm select-none transition-all hover:scale-105 active:scale-95 ${
          isNightMode
            ? "bg-[#282218] border-[#78541D] text-[#FBBF24]"
            : "bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] border-[#FDE68A] text-[#B45309]"
        }`}
        title={t.header.shopTooltip}
      >
        <Star className="w-4 h-4 fill-current text-[#F59E0B] animate-spin-slow" />
        <span className="font-display font-bold text-sm tracking-tight text-[#92400E] dark:text-[#FBBF24]">
          {profile.starsCount}
        </span>
        <span className="text-[10px] font-display font-extrabold uppercase px-1.5 py-0.5 rounded-lg bg-[#F59E0B] text-white">
          {t.header.shop}
        </span>
      </button>
    </header>
  );
}
